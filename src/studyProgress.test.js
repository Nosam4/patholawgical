import assert from "node:assert/strict";
import { test } from "node:test";
import { saveRun, savedRunFor, missedAnswerIds, latestResumableRun } from "./studyProgress.js";
import { readProgressMap, writeProgressMap } from "./quizLogic.js";

const question = { id: "q", type: "flowchart", nodes: [
  { id: "context", quiz: false, label: "Context" },
  { id: "a", answer: "first" }, { id: "b", answer: "second" }, { id: "c", answer: "third" },
] };
const targets = ["a", "b", "c"];
function save(progressMap, guessedIds, options = {}) {
  return saveRun({ progressMap, question, guessedIds: new Set(guessedIds), targetIds: targets, ...options });
}

test("an interrupted run resumes without counting an attempt", () => {
  const map = save({}, ["a"], { now: 100 });
  assert.deepEqual(savedRunFor(question, map.q), { targetIds: targets, guessedIds: ["a"], practice: false });
  assert.equal(map.q.attempts, undefined);
  const catalog = [{ id: "course", subjects: [{ id: "subject", questions: [question] }] }];
  assert.equal(latestResumableRun(catalog, map).question.id, "q");
});

test("reveal records the original score and missed blanks, without counting context", () => {
  const map = save({}, ["a", "context", "unknown"], { closed: true });
  assert.equal(map.q.attempts, 1);
  assert.equal(map.q.bestScore, 1);
  assert.deepEqual(missedAnswerIds(question, map.q), ["b", "c"]);
  assert.equal(savedRunFor(question, map.q), null);
});

test("missed practice preserves full-drill scores and supports interrupted practice", () => {
  let map = save({}, ["a"], { closed: true });
  map = save(map, ["b"], { targetIds: ["b", "c"], practice: true });
  assert.deepEqual(savedRunFor(question, map.q), { targetIds: ["b", "c"], guessedIds: ["b"], practice: true });
  map = save(map, ["b", "c"], { targetIds: ["b", "c"], practice: true, closed: true });
  assert.equal(map.q.bestScore, 1);
  assert.equal(map.q.attempts, 1);
  assert.equal(map.q.practiceAttempts, 1);
  assert.deepEqual(missedAnswerIds(question, map.q), []);
});

test("starting fresh preserves history, but content revisions invalidate stale results", () => {
  let map = save({}, ["a"], { closed: true });
  map = save(map, []);
  assert.equal(map.q.attempts, 1);
  assert.equal(map.q.bestScore, 1);
  const changed = { ...question, nodes: question.nodes.map((node) => node.id === "a" ? { ...node, answer: "corrected" } : node) };
  assert.equal(savedRunFor(changed, map.q), null);
  assert.deepEqual(missedAnswerIds(changed, map.q), []);
  assert.equal(savedRunFor(question, { run: "corrupt" }), null);
});

test("blocked storage cannot crash a study session", () => {
  const storage = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("quota"); } };
  assert.deepEqual(readProgressMap(storage), {});
  assert.equal(writeProgressMap({}, storage), false);
});
