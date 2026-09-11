import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import { floridaCivilProcedureTimelines as timelines, floridaCivilProcedureTimelineQuestions as questions } from "./floridaCivilProcedureTimelines.js";
import { getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "./quizLogic.js";

test("every sourced timeline is reachable in mixed, topic, and period practice with independent progress IDs", () => {
  const course = courseCatalog.find((item) => item.id === "overview-of-florida-law-fall-2026");
  assert.equal(course.subjects.find((subject) => subject.id === "florida-civil-procedure-timelines").questions, questions);
  const allAnswers = questions.flatMap(getQuestionAnswers);
  const catalogIds = courseCatalog.flatMap((course) => course.subjects.flatMap((subject) => subject.questions.map((q) => q.id)));
  assert.equal(new Set(catalogIds).size, catalogIds.length);
  assert.equal(new Set(allAnswers.map((a) => a.id)).size, allAnswers.length);
  for (const timeline of timelines) {
    const variants = allAnswers.filter((answer) => answer.timelineId === timeline.id);
    assert.equal(variants.length, 3, timeline.id);
    assert.equal(variants.filter((answer) => answer.answer === timeline.period).length, 2);
    assert.equal(variants.filter((answer) => answer.answer === timeline.action).length, 1);
    assert.ok(timeline.clock && timeline.rule && timeline.outlinePages && timeline.sourceUrl.startsWith("https://"));
  }
  for (const question of questions) {
    assert.equal(question.answerMatching, "active");
    for (const answer of getQuestionAnswers(question)) {
      for (const candidate of [answer.answer, ...answer.acceptedAnswers]) {
        assert.ok(!candidate.includes("undefined"));
        assert.ok(isAnswerMatch(answer, normalizeAnswer(candidate)));
      }
    }
  }
});

test("calendar periods accept year equivalents but never silently substitute days for months", () => {
  const answers = getQuestionAnswers(questions[0]);
  const sixMonths = answers.find((a) => a.timelineId === "complex-earliest-trial");
  assert.ok(isAnswerMatch(sixMonths, normalizeAnswer("six months")));
  assert.ok(!isAnswerMatch(sixMonths, normalizeAnswer("180 days")));
  assert.ok(!isAnswerMatch(sixMonths, normalizeAnswer("6 days")));
  const oneYear = answers.find((a) => a.timelineId === "judgment-relief");
  assert.ok(isAnswerMatch(oneYear, normalizeAnswer("1 year")));
  assert.ok(!isAnswerMatch(oneYear, normalizeAnswer("365 days")));
  const sixMonthDrill = questions.find((q) => q.id === "fl-civpro-timelines-period-6-months");
  assert.deepEqual(getQuestionAnswers(sixMonthDrill).map((a) => a.timelineId).sort(), ["complex-earliest-trial", "small-inactivity"]);
});
