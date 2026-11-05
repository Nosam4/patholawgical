import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import { evidenceCases, evidenceCaseSubject } from "./evidenceCaseQuestions.js";
import { evidenceAidsAndSummariesQuestion, evidenceWitnessFoundationsQuestion } from "./evidenceFoundationQuestions.js";
import { getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "./quizLogic.js";
import { latestResumableRun, saveRun, savedRunFor } from "./studyProgress.js";

const evidence = courseCatalog.find(course => course.id === "evidence-fall-2026");
const questions = evidence.subjects.flatMap(subject => subject.questions);
const row = (questionId, suffix) => getQuestionAnswers(questions.find(q => q.id === questionId)).find(a => a.id.endsWith(suffix));

test("cumulative case review preserves every source-list entry, spelling, and individual case principle", () => {
  assert.deepEqual(evidenceCases.map(item => item.listedName), [
    "Old Chief", "Crawford", "Hammon", "Davis", "Bryant", "Williams", "Owens", "Hillman",
    "Bruton", "Daubert", "Melendez-Diaz", "Upjohn", "Huddleston (stolen videotapes case)",
  ]);
  assert.ok(evidenceCases.every(item => !("midterm" in item)));
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

test("case and foundation drills work with the answer engine and use unique persistent identifiers", () => {
  const ids = questions.map(q => q.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const question of [evidenceAidsAndSummariesQuestion, evidenceWitnessFoundationsQuestion, ...evidenceCaseSubject.questions]) {
    assert.equal(question.answerMatching, "active", "repeated yes/no answers must stay on the selected question");
    assert.ok(question.courseSources.length);
    for (const answer of getQuestionAnswers(question)) {
      assert.ok(answer.indicator);
      assert.ok(isAnswerMatch(answer, normalizeAnswer(answer.answer)), answer.id);
      for (const alias of answer.acceptedAnswers) assert.ok(isAnswerMatch(answer, normalizeAnswer(alias)), answer.id);
    }
  }
});

test("core rules retain distinct impeachment routes and conviction balancing standards", () => {
  assert.ok(isAnswerMatch(row("fre-rule-608-truthfulness-character", "rule-609"), normalizeAnswer("609")));
  assert.ok(isAnswerMatch(row("fre-rule-609-criminal-convictions", "nondefendant-403"), normalizeAnswer("Rule 403")));
  assert.ok(!isAnswerMatch(row("fre-rule-609-criminal-convictions", "defendant-balance"), normalizeAnswer("403")));
  assert.ok(isAnswerMatch(row("fre-rule-609-criminal-convictions", "defendant-balance"), normalizeAnswer("probative outweighs prejudice")));
  assert.ok(isAnswerMatch(row("fre-rule-609-criminal-convictions", "substantially-outweighs"), normalizeAnswer("substantially outweighs prejudice")));
});

test("retained foundations distinguish illustrative aids from evidence and preserve witness safeguards", () => {
  assert.ok(isAnswerMatch(row(evidenceAidsAndSummariesQuestion.id, "-status"), normalizeAnswer("not evidence")));
  assert.ok(!isAnswerMatch(row(evidenceAidsAndSummariesQuestion.id, "-status"), normalizeAnswer("yes")));
  assert.ok(isAnswerMatch(row(evidenceAidsAndSummariesQuestion.id, "-evidence"), normalizeAnswer("substantive evidence")));
  assert.ok(isAnswerMatch(row(evidenceAidsAndSummariesQuestion.id, "-underlying"), normalizeAnswer("admissible materials")));
  assert.ok(isAnswerMatch(row(evidenceWitnessFoundationsQuestion.id, "-judge"), normalizeAnswer("no")));
  assert.ok(isAnswerMatch(row(evidenceWitnessFoundationsQuestion.id, "-cross"), normalizeAnswer("each party")));
  assert.ok(isAnswerMatch(row(evidenceWitnessFoundationsQuestion.id, "-object"), normalizeAnswer("outside jury presence")));
});

test("retired midterm material stays out of the catalog and cannot displace retained saved runs", () => {
  assert.doesNotMatch(JSON.stringify(evidence), /midterm/i);
  assert.ok(!evidence.subjects.some(subject => subject.id === "evidence-slide-applications"));
  assert.ok(!questions.some(question => question.id === "evidence-analysis-full"));
  assert.deepEqual(questions.filter(question => question.id.startsWith("evidence-slides-")).map(question => question.id).sort(), [
    "evidence-slides-aids-summaries", "evidence-slides-witness-foundations",
  ]);

  const retired = {
    id: "evidence-cases-identify-midterm",
    type: "sporcle-grid",
    columns: [{ answers: [
      { id: "evidence-cases-identify-midterm-old-chief", answer: "Old Chief" },
      { id: "evidence-cases-identify-midterm-daubert", answer: "Daubert" },
      { id: "evidence-cases-identify-midterm-huddleston", answer: "Huddleston" },
    ] }],
  };
  const retiredProgress = saveRun({ progressMap: {}, question: retired,
    targetIds: getQuestionAnswers(retired).map(answer => answer.id),
    guessedIds: new Set(["evidence-cases-identify-midterm-old-chief"]), now: 10000 });
  assert.ok(savedRunFor(retired, retiredProgress[retired.id]), "fixture is a resumable legacy run");
  assert.equal(latestResumableRun([evidence], retiredProgress), null);

  for (const [question, subjectId] of [
    [evidenceAidsAndSummariesQuestion, "authentication-and-contents"],
    [evidenceWitnessFoundationsQuestion, "privileges-and-witnesses"],
  ]) {
    const answers = getQuestionAnswers(question);
    const progress = saveRun({ progressMap: retiredProgress, question,
      targetIds: answers.map(answer => answer.id), guessedIds: new Set([answers[0].id]), now: 1000 });
    const resumable = latestResumableRun([evidence], progress);
    assert.equal(resumable.question, question);
    assert.equal(resumable.subject.id, subjectId);
    assert.deepEqual(resumable.run.guessedIds, [answers[0].id]);
  }
});

test("existing rule entries retain the omitted qualifications", () => {
  assert.match(row("fre-rule-609-criminal-convictions", "nondefendant-403").answer, /civil witnesses and criminal witnesses/);
  assert.match(row("fre-rule-410-pleas-and-discussions", "plea-discussion").answer, /no guilty plea results or it is later withdrawn/);
  assert.match(row("fre-rule-1101-applicability", "privilege-survives").answer, /privilege rules still apply/);
  assert.match(row("evidence-case-williams", "-majority").explanation, /Five rejected/);
  assert.ok(isAnswerMatch(row("evidence-case-williams", "-smith"), normalizeAnswer("Smith v. Arizona")));
});
