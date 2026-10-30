import assert from "node:assert/strict";
import { test } from "node:test";
import { createProgressStore, PROGRESS_ENTRY_PREFIX, PROGRESS_PENDING_PREFIX, updateProgressEntry } from "./progressStore.js";
import { STORAGE_KEY } from "./quizLogic.js";
import { saveRun } from "./studyProgress.js";

const question = { id: "q", type: "flowchart", nodes: [
  { id: "a", answer: "first" }, { id: "b", answer: "second" }, { id: "c", answer: "third" },
] };
const targets = ["a", "b", "c"];
function memoryStorage() {
  const values = new Map();
  return { get length() { return values.size; }, key(index) { return [...values.keys()][index] ?? null; },
    getItem(key) { return values.get(key) ?? null; }, setItem(key, value) { values.set(key, value); },
    removeItem(key) { values.delete(key); } };
}
function serialLocks() {
  const pending = new Map();
  return { request(name, callback) {
    const next = (pending.get(name) ?? Promise.resolve()).then(callback);
    pending.set(name, next.catch(() => {}));
    return next;
  } };
}
function update(guesses, options = {}) {
  return { question, targetIds: targets, guessedIds: new Set(guesses), ...options };
}

test("stale tabs studying different questions preserve both runs without rewriting legacy storage", async () => {
  const storage = memoryStorage();
  const locks = serialLocks();
  storage.setItem(STORAGE_KEY, JSON.stringify({ historic: { attempts: 4, bestScore: 2 } }));
  const first = createProgressStore({ storage, locks });
  const second = createProgressStore({ storage, locks });
  const other = { ...question, id: "other" };
  await Promise.all([first.save(update(["a"])), second.save(update(["b"], { question: other }))]);
  const map = createProgressStore({ storage, locks }).read();
  assert.deepEqual(map.q.run.guessedIds, ["a"]);
  assert.deepEqual(map.other.run.guessedIds, ["b"]);
  assert.equal(map.historic.attempts, 4);
  assert.deepEqual(JSON.parse(storage.getItem(STORAGE_KEY)), { historic: { attempts: 4, bestScore: 2 } });
  assert.equal(storage.length, 3);
});

test("same-run writes merge accepted answers and count simultaneous completion once", async () => {
  const storage = memoryStorage();
  const locks = serialLocks();
  const first = createProgressStore({ storage, locks });
  const second = createProgressStore({ storage, locks });
  const { runId } = await first.save(update(["a"]));
  await Promise.all([
    first.save(update(["a", "b"], { runId })),
    second.save(update(["a", "c"], { runId })),
  ]);
  const result = first.read().q;
  assert.deepEqual(new Set(result.run.guessedIds), new Set(targets));
  assert.equal(result.run.closed, true);
  assert.equal(result.attempts, 1);
  assert.equal(result.bestScore, 3);
  await Promise.all([
    first.save(update(targets, { runId, closed: true })),
    second.save(update(targets, { runId, closed: true })),
  ]);
  assert.equal(first.read().q.attempts, 1);
  assert.equal(storage.length, 1, "updates overwrite only this question's bounded record");
});

test("a fresh run wins over stale writes and preserves completed history", async () => {
  const storage = memoryStorage();
  const locks = serialLocks();
  const first = createProgressStore({ storage, locks });
  const second = createProgressStore({ storage, locks });
  const initial = await first.save(update(["a"], { closed: true }));
  const fresh = await first.save(update([], { newRun: true, runId: "fresh-run" }));
  assert.equal(fresh.entry.attempts, 1);
  const stale = await second.save(update(["a", "b"], { runId: initial.runId }));
  assert.equal(stale.conflict, true);
  assert.equal(stale.runId, "fresh-run");
  assert.deepEqual(first.read().q.run.guessedIds, []);
  assert.equal(first.read().q.attempts, 1);
  const completed = await first.save(update(targets, { runId: fresh.runId, closed: true }));
  assert.equal(completed.entry.attempts, 2);
});

test("legacy unfinished runs gain a shared identity and resume without losing history", async () => {
  const storage = memoryStorage();
  let legacy = saveRun({ progressMap: {}, ...update(["a"], { closed: true, now: 100 }) });
  legacy = saveRun({ progressMap: legacy, ...update(["b"], { now: 200 }) });
  storage.setItem(STORAGE_KEY, JSON.stringify(legacy));
  const first = createProgressStore({ storage, locks: serialLocks() });
  const runId = first.read().q.run.id;
  assert.equal(runId, "legacy-200");
  const saved = await first.save(update(["b", "c"], { runId }));
  assert.equal(saved.saved, true);
  assert.equal(saved.runId, runId);
  assert.equal(saved.entry.attempts, 1);
  assert.deepEqual(saved.entry.run.guessedIds, ["b", "c"]);
});

test("missed-answer practice stays separate while shared closure is deduplicated", async () => {
  const storage = memoryStorage();
  const store = createProgressStore({ storage, locks: serialLocks() });
  await store.save(update(["a"], { closed: true }));
  const practice = await store.save(update([], { targetIds: ["b", "c"], practice: true, newRun: true }));
  const completed = await store.save(update(["b", "c"], {
    runId: practice.runId, targetIds: ["b", "c"], practice: true, closed: true,
  }));
  await store.save(update(["b", "c"], {
    runId: practice.runId, targetIds: ["b", "c"], practice: true, closed: true,
  }));
  assert.equal(completed.entry.attempts, 1);
  assert.equal(completed.entry.bestScore, 1);
  assert.equal(store.read().q.practiceAttempts, 1);
});

test("unavailable coordination and failed storage keep work in memory without unsafe writes", async () => {
  const storage = memoryStorage();
  const store = createProgressStore({ storage, locks: {} });
  const first = await store.save(update(["a"]));
  assert.equal(first.saved, false);
  assert.equal(storage.length, 0);
  assert.deepEqual(store.read().q.run.guessedIds, ["a"]);
  const blocked = createProgressStore({ storage: { getItem() { throw Error("blocked"); },
    setItem() { throw Error("blocked"); }, get length() { throw Error("blocked"); } }, locks: serialLocks() });
  const result = await blocked.save(update(["b"]));
  assert.equal(result.saved, false);
  assert.deepEqual(blocked.read().q.run.guessedIds, ["b"]);
});

test("storage notifications refresh other-tab entries and unsubscribe cleanly", async () => {
  const storage = memoryStorage();
  const callbacks = new Set();
  const eventTarget = { addEventListener(type, callback) { callbacks.add(callback); },
    removeEventListener(type, callback) { callbacks.delete(callback); } };
  const store = createProgressStore({ storage, locks: serialLocks(), eventTarget });
  let received;
  const unsubscribe = store.subscribe((map) => { received = map; });
  const saved = await store.save(update(["a"]));
  for (const callback of callbacks) callback({ key: `${PROGRESS_ENTRY_PREFIX}q` });
  assert.equal(received.q.run.id, saved.runId);
  assert.deepEqual(received.q.run.guessedIds, ["a"]);
  unsubscribe();
  assert.equal(callbacks.size, 0);
});

test("substantive content versions replace stale results, not unrelated question records", () => {
  const saved = updateProgressEntry({ ...update(["a"], { closed: true }), makeId: () => "old" });
  const corrected = updateProgressEntry({ ...update([], { question: { ...question, contentVersion: 1 } }),
    entry: saved.entry, makeId: () => "corrected" });
  assert.equal(corrected.entry.attempts, undefined);
  assert.equal(corrected.entry.bestScore, undefined);
  assert.equal(corrected.runId, "corrected");
});

test("malformed persisted runs cannot crash saving or erase usable score history", async () => {
  for (const run of [
    { id: "corrupt", targetIds: targets, guessedIds: { a: true }, closed: false },
    { id: "corrupt", targetIds: targets, guessedIds: { a: true }, closed: true },
    { id: "corrupt", targetIds: "not-an-array", guessedIds: ["a"] },
    "not-a-run",
  ]) {
    const storage = memoryStorage();
    const entry = saveRun({ progressMap: {}, ...update(["a"], { closed: true }) }).q;
    storage.setItem(`${PROGRESS_ENTRY_PREFIX}q`, JSON.stringify({ ...entry, run }));
    const store = createProgressStore({ storage, locks: serialLocks() });
    const saved = await store.save(update(["b"], { runId: "corrupt" }));
    assert.equal(saved.saved, true);
    assert.equal(saved.entry.attempts, 1);
    assert.deepEqual(saved.entry.run.guessedIds, ["b"]);
  }
});

test("an immediate reload recovers a submission before its Web Lock is granted", async () => {
  const storage = memoryStorage();
  const requests = [];
  const locks = { request(name, callback) {
    return new Promise((resolve, reject) => requests.push({ callback, resolve, reject }));
  } };
  const firstPage = createProgressStore({ storage, locks });
  void firstPage.save(update(["a"]));
  assert.deepEqual(firstPage.read().q.run.guessedIds, ["a"], "journal is staged synchronously");
  const pendingKeys = [...Array(storage.length)].map((_, index) => storage.key(index))
    .filter((key) => key.startsWith(PROGRESS_PENDING_PREFIX));
  assert.equal(pendingKeys.length, 1);

  // Navigation cancels the old document's lock request, not its durable journal.
  requests.shift();
  const reloaded = createProgressStore({ storage, locks });
  assert.deepEqual(reloaded.read().q.run.guessedIds, ["a"]);
  const runId = reloaded.read().q.run.id;
  const saved = reloaded.save(update(["a", "b"], { runId }));
  const request = requests.shift();
  request.resolve(request.callback());
  assert.equal((await saved).saved, true);
  assert.deepEqual(createProgressStore({ storage, locks }).read().q.run.guessedIds, ["a", "b"]);
  assert.equal(storage.length, 1, "all captured journal operations are consolidated");
});

test("journal replay after a commit interrupted before cleanup never duplicates an attempt", async () => {
  const storage = memoryStorage();
  const remove = storage.removeItem;
  storage.removeItem = () => { throw Error("document stopped during cleanup"); };
  const first = createProgressStore({ storage, locks: serialLocks() });
  await first.save(update(targets, { newRun: true, runId: "complete", closed: true }));
  const pendingKey = [...Array(storage.length)].map((_, index) => storage.key(index))
    .find((key) => key.startsWith(PROGRESS_PENDING_PREFIX));
  const originalOperation = storage.getItem(pendingKey);
  storage.removeItem = remove;
  const reloaded = createProgressStore({ storage, locks: serialLocks() });
  assert.equal(reloaded.read().q.attempts, 1);
  assert.equal(reloaded.read().q.run.closed, true);
  await reloaded.save(update([], { newRun: true, runId: "fresh" }));
  assert.equal(reloaded.read().q.attempts, 1);
  assert.deepEqual(reloaded.read().q.run.guessedIds, []);
  // Even a late old Start Fresh operation cannot resurrect its older run.
  storage.setItem(pendingKey, originalOperation);
  const replayed = createProgressStore({ storage, locks: serialLocks() }).read().q;
  assert.equal(replayed.attempts, 1);
  assert.equal(replayed.run.id, "fresh");
  assert.deepEqual(replayed.run.guessedIds, []);
});

test("consolidation removes only the pending keys captured before the committed write", async () => {
  const storage = memoryStorage();
  const set = storage.setItem;
  let extraKey;
  storage.setItem = (key, value) => {
    set(key, value);
    if (key.startsWith(PROGRESS_ENTRY_PREFIX) && !extraKey) {
      // A different tab can stage a new operation between commit and cleanup.
      const pendingKey = [...Array(storage.length)].map((_, index) => storage.key(index))
        .find((candidate) => candidate.startsWith(PROGRESS_PENDING_PREFIX));
      const operation = JSON.parse(storage.getItem(pendingKey));
      extraKey = `${PROGRESS_PENDING_PREFIX}later-operation`;
      operation.update.guessedIds = ["a", "b"];
      operation.update.newRun = false;
      operation.update.generation[0] += 1;
      set(extraKey, JSON.stringify(operation));
    }
  };
  const store = createProgressStore({ storage, locks: serialLocks() });
  await store.save(update(["a"]));
  assert.ok(storage.getItem(extraKey), "uncaptured operation stays durable");
  assert.deepEqual(store.read().q.run.guessedIds, ["a", "b"]);
});
