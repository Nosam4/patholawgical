import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import { floridaCriminalProcedureQuestions as questions } from "./floridaCriminalProcedureQuestions.js";
import { getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "./quizLogic.js";
import { OVERVIEW_COURSE_ID, getOverviewSubjects } from "./overviewReview.js";

const overview = courseCatalog.find((course) => course.id === OVERVIEW_COURSE_ID);
const answersById = new Map(questions.flatMap(getQuestionAnswers).map((answer) => [answer.id, answer]));

function answer(id) {
  const entry = answersById.get(`fl-crimpro-${id}`);
  assert.ok(entry, `Missing recall target: ${id}`);
  return entry;
}

test("Florida Criminal Procedure is integrated and available at every review depth", () => {
  assert.equal(overview.subjects.find((subject) => subject.id === "florida-criminal-procedure").questions, questions);
  const levels = ["core", "standard", "comprehensive"].map((level) =>
    getOverviewSubjects(overview, level).find((subject) => subject.id === "florida-criminal-procedure").questions,
  );
  assert.ok(levels[0].length > 0);
  assert.ok(levels[0].length < levels[1].length);
  assert.ok(levels[1].length < levels[2].length);
  assert.deepEqual(levels[2], questions);
  assert.equal(questions.length, 33);
});

test("criminal procedure prompts are playable, use selected-blank matching, and identify class and official sources", () => {
  for (const question of questions) {
    assert.equal(question.type, "sporcle-grid", question.id);
    assert.equal(question.answerMatching, "active", question.id);
    assert.ok(question.courseSources.some((source) => /(?:Slide Notes|Slide Outline|Flowers\.CriminalProcedure)\.pdf/.test(source)), question.id);
    assert.ok(question.sourceUrl.startsWith("https://"), question.id);
    const answers = getQuestionAnswers(question);
    assert.ok(answers.length > 0, question.id);
    for (const answer of answers) {
      assert.ok(answer.indicator, answer.id);
      assert.ok(isAnswerMatch(answer, normalizeAnswer(answer.answer)), answer.id);
      for (const alias of answer.acceptedAnswers ?? []) {
        assert.ok(isAnswerMatch(answer, normalizeAnswer(alias)), `${answer.id}: ${alias}`);
      }
    }
  }
});

test("new criminal procedure identifiers do not collide with any existing Overview drill or answer", () => {
  const allQuestions = overview.subjects.flatMap((subject) => subject.questions);
  const questionIds = allQuestions.map((question) => question.id);
  const answerIds = allQuestions.flatMap(getQuestionAnswers).map((answer) => answer.id);
  assert.equal(new Set(questionIds).size, questionIds.length);
  assert.equal(new Set(answerIds).size, answerIds.length);
});

test("speedy-trial targets preserve the current filing trigger, demand range, recapture, and dismissal distinction", () => {
  assert.equal(answer("ordinary-speedy-misdemeanor").answer, "90 days");
  assert.equal(answer("ordinary-speedy-felony").answer, "175 days");
  assert.equal(answer("ordinary-speedy-trigger").answer, "Formally charged");
  assert.ok(!isAnswerMatch(answer("ordinary-speedy-trigger"), normalizeAnswer("arrest")));
  assert.equal(answer("demand-trial").answer, "60 days");
  assert.equal(answer("calendar-call-minimum").answer, "5 days");
  assert.equal(answer("calendar-call-maximum").answer, "60 days");
  assert.ok(!isAnswerMatch(answer("calendar-call-maximum"), normalizeAnswer("45 days")));
  assert.equal(answer("expiration-hearing").answer, "5 days");
  assert.equal(answer("expiration-recapture").answer, "30 days");
  assert.equal(answer("remedies-rule-only").answer, "Without prejudice");
  assert.equal(answer("remedies-constitutional").answer, "With prejudice");
});

test("current motion deadline and competency rules do not retain superseded source answers", () => {
  assert.equal(answer("dismissal-timing-deadline").answer, "Court-set deadline");
  assert.ok(!isAnswerMatch(answer("dismissal-timing-deadline"), normalizeAnswer("at or before arraignment")));
  assert.match(answer("dismissal-timing-deadline").explanation, /superseded/);
  assert.equal(answer("competency-effect-trial").answer, "No");
  assert.match(answer("competency-effect-trial").explanation, /trial, entry of a plea, and sentencing/);
});

test("jury allowances and probable-cause extensions keep the rule's decisive qualifications", () => {
  assert.equal(answer("peremptories-death-life").answer, "10");
  assert.match(answer("peremptories-death-life").indicator, /life/);
  assert.equal(answer("peremptories-felony").answer, "6");
  assert.equal(answer("peremptories-misdemeanor").answer, "3");
  assert.equal(answer("custody-pc-time").answer, "48 hours");
  assert.equal(answer("custody-pc-showing").answer, "Extraordinary circumstances");
  assert.ok(!isAnswerMatch(answer("custody-pc-showing"), normalizeAnswer("good cause")));
  assert.match(answer("psi-age").explanation, /found guilty.*under the age of 18/);
});
