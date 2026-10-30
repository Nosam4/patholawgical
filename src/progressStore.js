import { getQuestionAnswers, readProgressMap, STORAGE_KEY } from "./quizLogic.js";
import { questionRevision, saveRun, validAnswerIds } from "./studyProgress.js";

export const PROGRESS_ENTRY_PREFIX = `${STORAGE_KEY}:question:`;
export const PROGRESS_PENDING_PREFIX = `${STORAGE_KEY}:pending:`;

export function createRunId() {
  return globalThis.crypto?.randomUUID?.()
    ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function entryKey(questionId) {
  return `${PROGRESS_ENTRY_PREFIX}${encodeURIComponent(questionId)}`;
}

function withRunIdentity(entry) {
  if (!entry?.run) return entry;
  const run = entry.run;
  if (typeof run !== "object" || Array.isArray(run)
    || !Array.isArray(run.targetIds) || !Array.isArray(run.guessedIds)) {
    // A damaged run must not crash the session or discard otherwise usable
    // score history. The next successful submission starts a clean run.
    return { ...entry, run: null };
  }
  // The legacy map has one run per question. A deterministic identity lets two
  // tabs resume that same run without either creating a replacement for it.
  return { ...entry, run: { ...run, practice: run.practice === true,
    closed: run.closed === true,
    id: typeof run.id === "string" && run.id ? run.id : `legacy-${run.updatedAt ?? 0}` } };
}

function readStoredMap(storage) {
  if (!storage) throw new Error("Browser storage is unavailable.");
  const map = readProgressMap(storage);
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (!key?.startsWith(PROGRESS_ENTRY_PREFIX)) continue;
    try {
      const entry = JSON.parse(storage.getItem(key));
      if (entry && typeof entry === "object" && !Array.isArray(entry)) {
        map[decodeURIComponent(key.slice(PROGRESS_ENTRY_PREFIX.length))] = entry;
      }
    } catch {
      // A damaged individual record must not hide other questions' progress.
    }
  }
  return Object.fromEntries(Object.entries(map).map(([id, entry]) => [id, withRunIdentity(entry)]));
}

/** Apply one update to the latest entry while holding that question's lock. */
export function updateProgressEntry({ entry, question, targetIds, guessedIds,
  practice = false, closed = false, runId, newRun = false, now = Date.now(), makeId, generation }) {
  const revision = questionRevision(question);
  const current = entry?.revision === revision ? withRunIdentity(entry) : undefined;
  const currentRun = current?.run;
  const startsFresh = newRun && currentRun?.id !== runId;
  if (startsFresh && generation && currentRun?.generation
    && compareGeneration(generation, currentRun.generation) < 0) {
    return { entry: current, runId: currentRun.id, conflict: true };
  }
  if (!newRun && runId && currentRun && currentRun.id !== runId) {
    // A newer Start Fresh / practice run wins. Never resurrect a stale tab's run.
    return { entry: current, runId: currentRun.id, conflict: true };
  }

  const sameRun = !startsFresh && currentRun
    && (runId ? currentRun.id === runId : !currentRun.closed)
    && currentRun.practice === practice
    && JSON.stringify(currentRun.targetIds) === JSON.stringify(validAnswerIds(question, targetIds));
  if (!startsFresh && runId && currentRun?.id === runId && !sameRun) {
    return { entry: current, runId, conflict: true };
  }
  const id = sameRun ? currentRun.id : (runId ?? makeId?.() ?? createRunId());
  if (sameRun && currentRun.closed) {
    // Two tabs can close the same run. Its original attempt is counted once.
    const extras = [...guessedIds].some((answerId) => !currentRun.guessedIds.includes(answerId));
    return { entry: current, runId: id, conflict: extras || !closed };
  }

  const guesses = new Set(sameRun ? [...currentRun.guessedIds, ...guessedIds] : guessedIds);
  const targets = validAnswerIds(question, targetIds);
  const accepted = validAnswerIds(question, [...guesses]).filter((answerId) => targets.includes(answerId));
  const isClosed = closed || (targets.length > 0 && accepted.length === targets.length);
  const next = saveRun({ progressMap: current ? { [question.id]: current } : {}, question,
    targetIds: targets, guessedIds: new Set(accepted), practice, closed: isClosed, now })[question.id];
  return { entry: { ...next, run: { ...next.run, id,
    generation: sameRun ? currentRun.generation : generation } }, runId: id, conflict: false };
}

function compareGeneration(first, second) {
  return first[0] - second[0] || String(first[1]).localeCompare(String(second[1])) || first[2] - second[2];
}

function pendingOperations(storage, questionId) {
  const pending = [];
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (!key?.startsWith(PROGRESS_PENDING_PREFIX)) continue;
    try {
      const operation = JSON.parse(storage.getItem(key));
      const update = operation?.update;
      if (update?.question?.type !== "flowchart" || typeof update.question.id !== "string"
        || !Array.isArray(update.question.nodes) || !Array.isArray(update.targetIds)
        || !Array.isArray(update.guessedIds) || !Array.isArray(update.generation)
        || update.generation.length !== 3 || !Number.isFinite(update.generation[0])
        || !Number.isFinite(update.generation[2]) || typeof update.runId !== "string") continue;
      if (!questionId || update.question.id === questionId) pending.push({ key, update });
    } catch { /* Ignore only the damaged journal record. */ }
  }
  return pending.sort((first, second) => compareGeneration(first.update.generation, second.update.generation));
}

function replayOperations(map, operations) {
  const next = { ...map };
  const results = new Map();
  for (const operation of operations) {
    const { update } = operation;
    const result = updateProgressEntry({ ...update, guessedIds: new Set(update.guessedIds),
      entry: next[update.question.id] });
    next[update.question.id] = result.entry;
    results.set(operation.key, result);
  }
  return { map: next, results };
}

/**
 * One consolidated record per question, with Web Locks serializing writes.
 * A synchronous, uniquely keyed operation journal survives immediate reloads;
 * consolidation removes only the exact operations included in its commit.
 * Old whole-map records remain readable and are never rewritten or deleted.
 * Without coordination/storage, studying continues in memory and `saved` is
 * false so the UI can explicitly warn that this session cannot be persisted.
 */
export function createProgressStore(options = {}) {
  let storage;
  let locks;
  try { storage = options.storage ?? globalThis.localStorage; } catch { /* In-memory fallback. */ }
  try { locks = options.locks ?? globalThis.navigator?.locks; } catch { /* In-memory fallback. */ }
  const eventTarget = options.eventTarget ?? globalThis.window;
  let memory = {};
  let memoryOnly = false;
  const writerId = createRunId();
  let sequence = 0;
  const read = () => {
    if (memoryOnly) return memory;
    try { memory = replayOperations(readStoredMap(storage), pendingOperations(storage)).map; }
    catch { /* Retain the usable in-memory session. */ }
    return memory;
  };
  read();

  return {
    read,
    async save(update) {
      const apply = (map) => {
        const result = updateProgressEntry({ ...update, entry: map[update.question.id] });
        return { ...result, progressMap: { ...map, [update.question.id]: result.entry } };
      };
      if (memoryOnly || !storage || typeof locks?.request !== "function") {
        memoryOnly = true;
        const result = apply(memory);
        memory = result.progressMap;
        return { ...result, saved: false };
      }
      let staged;
      try {
        const currentMap = read();
        const previous = currentMap[update.question.id];
        const preview = updateProgressEntry({ ...update, entry: previous });
        const generation = [globalThis.performance?.timeOrigin + globalThis.performance?.now()
          || Date.now(), writerId, sequence++];
        staged = { key: `${PROGRESS_PENDING_PREFIX}${createRunId()}`, update: {
          question: { id: update.question.id, type: "flowchart",
            nodes: getQuestionAnswers(update.question).map(({ id, answer }) => ({ id, answer })),
            progressAnswerOrder: update.question.progressAnswerOrder,
            contentVersion: update.question.contentVersion },
          targetIds: [...update.targetIds], guessedIds: [...update.guessedIds],
          practice: update.practice === true, closed: update.closed === true,
          runId: update.runId ?? preview.runId,
          newRun: update.newRun === true || (!update.runId && (!previous?.run || previous.run.closed
            || previous.revision !== questionRevision(update.question))),
          now: update.now ?? Date.now(), generation,
        } };
        // This write happens before the first await. Navigation cannot cancel an
        // accepted answer while it waits for another tab to release the lock.
        storage.setItem(staged.key, JSON.stringify({ update: staged.update }));
        read();
        return await locks.request(`${PROGRESS_ENTRY_PREFIX}${update.question.id}`, () => {
          const captured = pendingOperations(storage, update.question.id);
          const replayed = replayOperations(readStoredMap(storage), captured);
          const entry = replayed.map[update.question.id];
          storage.setItem(entryKey(update.question.id), JSON.stringify(entry));
          for (const operation of captured) storage.removeItem(operation.key);
          const progressMap = read();
          const latestEntry = progressMap[update.question.id];
          return { entry: latestEntry, runId: latestEntry.run.id, progressMap,
            conflict: replayed.results.get(staged.key)?.conflict === true
              || latestEntry.run.id !== staged.update.runId, saved: true };
        });
      } catch {
        memoryOnly = true;
        if (staged && memory[update.question.id]?.run?.id === staged.update.runId) {
          return { progressMap: memory, entry: memory[update.question.id],
            runId: staged.update.runId, conflict: false, saved: false };
        }
        const result = apply(memory);
        memory = result.progressMap;
        return { ...result, saved: false };
      }
    },
    subscribe(callback) {
      const listener = (event) => {
        if (event.key == null || event.key === STORAGE_KEY || event.key.startsWith(PROGRESS_ENTRY_PREFIX)
          || event.key.startsWith(PROGRESS_PENDING_PREFIX)) {
          callback(read());
        }
      };
      eventTarget?.addEventListener?.("storage", listener);
      return () => eventTarget?.removeEventListener?.("storage", listener);
    },
  };
}
