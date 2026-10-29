import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import { evidenceHearsayQuestions, evidenceHearsaySubject } from "./evidenceHearsayQuestions.js";
import { findMatchingAnswer, getQuestionAnswers, normalizeAnswer } from "./quizLogic.js";

const question = (suffix) => evidenceHearsayQuestions.find((item) => item.id === `evidence-hearsay-${suffix}`);

test("Evidence exposes the slide-based exception lists and keeps persistent IDs distinct", () => {
  const evidence = courseCatalog.find((course) => course.id === "evidence-fall-2026");
  assert.equal(evidence.subjects.find((subject) => subject.id === evidenceHearsaySubject.id), evidenceHearsaySubject);
  assert.deepEqual(evidenceHearsayQuestions.map((item) => item.id), [
    "803-1", "803-2", "803-3", "803-4", "803-5", "803-6-steps", "803-6-foundation", "805",
  ].map((suffix) => `evidence-hearsay-${suffix}`));
  const allQuestions = evidence.subjects.flatMap((subject) => subject.questions);
  const ids = allQuestions.flatMap((item) => [item.id, ...getQuestionAnswers(item).map((answer) => answer.id)]);
  assert.equal(new Set(ids).size, ids.length);
  for (const item of evidenceHearsayQuestions) {
    assert.ok(item.courseSources.some((source) => /Class 20|Class 21/.test(source)), item.id);
    assert.ok(item.sourceUrl.startsWith("https://"), item.id);
  }
});

test("recorded recollection preserves the professor's six separate elements and the exhibit restriction", () => {
  const recorded = question("803-5");
  const answers = getQuestionAnswers(recorded);
  assert.equal(answers.length, 6);
  const required = [/personal knowledge/i, /forgotten|cannot recall/i, /record/i, /made or adopted/i, /fresh/i, /accurate/i];
  required.forEach((pattern, index) => assert.match(answers[index].answer, pattern));
  assert.match(recorded.courseSources.join(" "), /12/);
  assert.match(recorded.listExplanation, /read/i);
  assert.match(recorded.listExplanation, /exhibit/i);
  assert.match(recorded.listExplanation, /adverse|oppos/i);
});

test("complete element lists accept each alias unambiguously in any order without duplicate credit", () => {
  const lists = evidenceHearsayQuestions.filter((item) => item.recallMode === "list");
  assert.equal(lists.length, 7);
  assert.deepEqual(lists.map((item) => getQuestionAnswers(item).length), [2, 2, 2, 3, 6, 4, 4]);
  for (const item of lists) {
    assert.equal(item.columns.length, 1, item.id);
    assert.notEqual(item.answerMatching, "active", item.id);
    const answers = getQuestionAnswers(item);
    for (const answer of answers) {
      for (const wording of [answer.answer, ...(answer.acceptedAnswers ?? [])]) {
        assert.equal(findMatchingAnswer(answers, new Set(), normalizeAnswer(wording))?.id, answer.id,
          `${answer.id}: ${wording}`);
      }
    }
    const recalled = new Set();
    for (const answer of [...answers].reverse()) {
      const guess = normalizeAnswer(answer.acceptedAnswers?.[0] ?? answer.answer);
      assert.equal(findMatchingAnswer(answers, recalled, guess)?.id, answer.id);
      recalled.add(answer.id);
      assert.equal(findMatchingAnswer(answers, recalled, guess), null);
    }
    assert.equal(findMatchingAnswer(answers, new Set(), normalizeAnswer("hearsay")), null);
  }
});

test("803(3) keeps the memory/belief limit and business records separate steps from foundation facts", () => {
  const stateOfMind = JSON.stringify(question("803-3"));
  assert.match(stateOfMind, /memory/i);
  assert.match(stateOfMind, /belief/i);
  assert.match(stateOfMind, /will/i);
  const foundation = getQuestionAnswers(question("803-6-foundation")).map((answer) => answer.answer).join(" ");
  for (const pattern of [/knowledge/i, /at or near/i, /regular practice/i, /regularly conducted/i]) {
    assert.match(foundation, pattern);
  }
  const steps = JSON.stringify(question("803-6-steps"));
  assert.match(steps, /certification/i);
  assert.match(steps, /trustworth/i);
  const layered = question("805");
  assert.equal(layered.answerMatching, "active");
  assert.equal(getQuestionAnswers(layered).length, 4);
});
