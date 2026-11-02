import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import { evidenceCases, evidenceCaseSubject } from "./evidenceCaseQuestions.js";
import { evidenceSlideQuestions } from "./evidenceSlideQuestions.js";
import { getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "./quizLogic.js";

const evidence = courseCatalog.find(course => course.id === "evidence-fall-2026");
const questions = evidence.subjects.flatMap(subject => subject.questions);
const row = (questionId, suffix) => getQuestionAnswers(questions.find(q => q.id === questionId)).find(a => a.id.endsWith(suffix));

test("master case review covers every source-list entry, preserves spelling, and separates midterm cases", () => {
  assert.deepEqual(evidenceCases.map(item => item.listedName), [
    "Old Chief", "Crawford", "Hammon", "Davis", "Bryant", "Williams", "Owens", "Hillman",
    "Bruton", "Daubert", "Melendez-Diaz", "Upjohn", "Huddleston (stolen videotapes case)",
  ]);
  assert.deepEqual(evidenceCases.filter(item => item.midterm).map(item => item.short), ["Old Chief", "Daubert", "Huddleston"]);
  const all = evidenceCaseSubject.questions.find(q => q.id === "evidence-cases-identify-all");
  assert.equal(getQuestionAnswers(all).length, 13);
  const hillmon = getQuestionAnswers(all).find(a => a.id.endsWith("hillmon"));
  for (const spelling of ["Hillman", "Hillmon", "Mutual Life Insurance Co. v. Hillmon"]) {
    assert.ok(isAnswerMatch(hillmon, normalizeAnswer(spelling)));
  }
  for (const item of evidenceCases) {
    const question = questions.find(q => q.id === `evidence-case-${item.key}`);
    assert.equal(question.sourceUrl, item.sourceUrl);
    assert.ok(getQuestionAnswers(question).length >= 4);
  }
});

test("new drills work with the existing answer engine and use unique persistent identifiers", () => {
  const ids = questions.map(q => q.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const question of [...evidenceSlideQuestions, ...evidenceCaseSubject.questions]) {
    assert.equal(question.answerMatching, "active", "repeated yes/no answers must stay on the selected question");
    assert.ok(question.courseSources.length);
    for (const answer of getQuestionAnswers(question)) {
      assert.ok(answer.indicator);
      assert.ok(isAnswerMatch(answer, normalizeAnswer(answer.answer)), answer.id);
      for (const alias of answer.acceptedAnswers) assert.ok(isAnswerMatch(answer, normalizeAnswer(alias)), answer.id);
    }
  }
});

test("application drills distinguish extrinsic routes and different conviction balances", () => {
  assert.ok(isAnswerMatch(row("evidence-slides-extrinsic", "-bias"), normalizeAnswer("yes")));
  assert.ok(isAnswerMatch(row("evidence-slides-extrinsic", "-dishonesty"), normalizeAnswer("no")));
  assert.ok(!isAnswerMatch(row("evidence-slides-extrinsic", "-dishonesty"), normalizeAnswer("yes")));
  assert.ok(isAnswerMatch(row("evidence-slides-609-practice", "-eight"), normalizeAnswer("609(a)(2)")));
  assert.ok(isAnswerMatch(row("evidence-slides-609-practice", "-eleven"), normalizeAnswer("609(b)")));
  assert.ok(!isAnswerMatch(row("evidence-slides-609-balances", "-accused"), normalizeAnswer("403")));
});

test("existing rule entries retain the omitted qualifications", () => {
  assert.match(row("fre-rule-609-criminal-convictions", "nondefendant-403").answer, /civil witnesses and criminal witnesses/);
  assert.match(row("fre-rule-410-pleas-and-discussions", "plea-discussion").answer, /no guilty plea results or it is later withdrawn/);
  assert.match(row("fre-rule-1101-applicability", "privilege-survives").answer, /privilege rules still apply/);
  assert.match(row("evidence-case-williams", "-majority").explanation, /Five rejected/);
  assert.ok(isAnswerMatch(row("evidence-case-williams", "-smith"), normalizeAnswer("Smith v. Arizona")));
});
