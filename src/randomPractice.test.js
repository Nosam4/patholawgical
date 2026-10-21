import assert from "node:assert/strict";
import { test } from "node:test";
import { nextRandomQuestion } from "./randomPractice.js";

const questions = ["a", "b", "c"].map((id) => ({ id }));
const keepOrder = () => 0.999;

test("a new session treats the displayed question as already seen", () => {
  assert.deepEqual(nextRandomQuestion(questions, "a", null, keepOrder), {
    questionId: "b",
    remainingIds: ["c"],
  });
});

test("each remaining question is selected once before the next full cycle", () => {
  let currentQuestionId = "a";
  let remainingIds = null;
  const selectedIds = [];

  for (let index = 0; index < 5; index += 1) {
    const next = nextRandomQuestion(questions, currentQuestionId, remainingIds, keepOrder);
    selectedIds.push(next.questionId);
    currentQuestionId = next.questionId;
    remainingIds = next.remainingIds;
  }

  assert.deepEqual(selectedIds, ["b", "c", "a", "b", "c"]);
  assert.deepEqual(remainingIds, []);
});

test("a new full cycle avoids repeating the displayed question and keeps it in the bag", () => {
  assert.deepEqual(nextRandomQuestion(questions, "a", [], keepOrder), {
    questionId: "b",
    remainingIds: ["a", "c"],
  });
});

test("the supplied random source determines the initial shuffled order", () => {
  assert.deepEqual(nextRandomQuestion(questions, null, null, () => 0), {
    questionId: "b",
    remainingIds: ["c", "a"],
  });
});

test("an existing bag keeps its shuffled order without drawing more randomness", () => {
  const unexpectedRandom = () => {
    throw new Error("An existing bag does not need reshuffling");
  };

  assert.deepEqual(nextRandomQuestion(questions, "a", ["c", "b"], unexpectedRandom), {
    questionId: "c",
    remainingIds: ["b"],
  });
});

test("manual selection removes the displayed question from the remaining bag", () => {
  assert.deepEqual(nextRandomQuestion(questions, "c", ["c", "b"], keepOrder), {
    questionId: "b",
    remainingIds: [],
  });
});

test("stale and duplicate IDs are removed from the remaining bag", () => {
  assert.deepEqual(nextRandomQuestion(questions, "a", ["removed", "c", "c", "b"], keepOrder), {
    questionId: "c",
    remainingIds: ["b"],
  });
});

test("a bag exhausted by stale or manually selected IDs starts a complete new cycle", () => {
  assert.deepEqual(nextRandomQuestion(questions, "a", ["removed", "a"], keepOrder), {
    questionId: "b",
    remainingIds: ["a", "c"],
  });
});

test("zero and one question are handled without errors or unnecessary random draws", () => {
  const unexpectedRandom = () => {
    throw new Error("Zero or one question does not need randomness");
  };

  assert.deepEqual(nextRandomQuestion([], "a", ["a"], unexpectedRandom), {
    questionId: null,
    remainingIds: [],
  });
  assert.deepEqual(nextRandomQuestion([{ id: "a" }], "a", null, unexpectedRandom), {
    questionId: "a",
    remainingIds: [],
  });
  assert.deepEqual(nextRandomQuestion([{ id: "a" }], "a", [], unexpectedRandom), {
    questionId: "a",
    remainingIds: [],
  });
});

test("questions and the supplied bag are not mutated", () => {
  const frozenQuestions = Object.freeze(questions.map((question) => Object.freeze({ ...question })));
  const frozenBag = Object.freeze(["c", "b"]);

  nextRandomQuestion(frozenQuestions, "a", null, () => 0);
  const result = nextRandomQuestion(frozenQuestions, "a", frozenBag, keepOrder);

  assert.deepEqual(frozenQuestions, questions);
  assert.deepEqual(frozenBag, ["c", "b"]);
  assert.notEqual(result.remainingIds, frozenBag);
});

test("question IDs are unique within a cycle", () => {
  assert.deepEqual(nextRandomQuestion([{ id: "a" }, { id: "a" }, { id: "b" }], null, null, keepOrder), {
    questionId: "a",
    remainingIds: ["b"],
  });
});
