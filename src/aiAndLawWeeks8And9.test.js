import assert from "node:assert/strict";
import { test } from "node:test";
import { aiAndLawWeeks8And9Questions } from "./aiAndLawWeeks8And9.js";
import { courseCatalog } from "./courseData.js";
import { findMatchingAnswer, getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "./quizLogic.js";

test("Weeks 8–9 are selectable with source-backed, globally unique drills", () => {
  const course = courseCatalog.find((item) => item.id === "ai-and-law-fall-2026");
  const subject = course.subjects.find((item) => item.id === "week-8-9-intellectual-property");
  assert.equal(subject.title, "Weeks 8–9: Intellectual Property");
  assert.equal(subject.questions, aiAndLawWeeks8And9Questions);
  const allQuestions = courseCatalog.flatMap((item) => item.subjects.flatMap((section) => section.questions));
  const newAnswerIds = new Set();
  for (const question of subject.questions) {
    assert.equal(allQuestions.filter((item) => item.id === question.id).length, 1, question.id);
    assert.equal(question.type, "sporcle-grid");
    assert.equal(question.clueLayout, "above");
    assert.ok(question.courseSources.length >= 2, question.id);
    assert.equal(new URL(question.sourceUrl).protocol, "https:");
    assert.ok(question.sourceLabel, question.id);
    assert.ok(getQuestionAnswers(question).length > 0, question.id);
    for (const answer of getQuestionAnswers(question)) {
      assert.ok(answer.answer.trim(), answer.id);
      assert.ok(answer.indicator.trim(), answer.id);
      assert.ok(!newAnswerIds.has(answer.id), answer.id);
      newAnswerIds.add(answer.id);
    }
  }
  const otherAnswerIds = new Set(allQuestions.filter((item) => !subject.questions.includes(item)).flatMap(getQuestionAnswers).map((item) => item.id));
  assert.ok([...newAnswerIds].every((id) => !otherAnswerIds.has(id)));
});

test("every new answer and alias selects its intended blank without column collisions", () => {
  for (const question of aiAndLawWeeks8And9Questions) {
    for (const column of question.columns) {
      for (const answer of column.answers) {
        for (const guess of [answer.answer, ...answer.acceptedAnswers]) {
          const match = findMatchingAnswer(column.answers, new Set(), normalizeAnswer(guess));
          assert.equal(match?.id, answer.id, `${question.id}: ${guess}`);
        }
      }
    }
  }
});

test("legal shorthand is accepted while distinct doctrines and opposing answers are rejected", () => {
  const answers = aiAndLawWeeks8And9Questions.flatMap(getQuestionAnswers);
  const cases = [
    ["ai-weeks8-9-ip-toolkit-patent", "patents", "copyright"],
    ["ai-weeks8-9-human-authorship-human", "human author", "AI authorship"],
    ["ai-weeks8-9-training-cases-ross", "ROSS", "Bartz"],
    ["ai-weeks8-9-litigation-process-district", "SDNY", "NDCA"],
    ["ai-weeks8-9-ai-inventorship-human", "humans", "AI systems"],
    ["ai-weeks8-9-human-conception-goal", "not alone", "yes"],
    ["ai-weeks8-9-patent-eligibility-more", "inventive concept", "novelty"],
    ["ai-weeks8-9-trade-secrets-proper", "lawful means", "improper means"],
  ];
  for (const [id, accepted, rejected] of cases) {
    const answer = answers.find((item) => item.id === id);
    assert.ok(answer, id);
    assert.ok(isAnswerMatch(answer, normalizeAnswer(accepted)), `${id}: ${accepted}`);
    assert.ok(!isAnswerMatch(answer, normalizeAnswer(rejected)), `${id}: ${rejected}`);
  }
});
