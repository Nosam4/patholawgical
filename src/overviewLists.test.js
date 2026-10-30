import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import { OVERVIEW_LISTS_COURSE_ID, OVERVIEW_LIST_LIMIT, overviewListQuestions, overviewListsCourse } from "./overviewLists.js";
import { OVERVIEW_COURSE_ID, getOverviewSubjects } from "./overviewReview.js";
import { findMatchingAnswer, getColumnMnemonicClues, getQuestionAnswers, normalizeAnswer } from "./quizLogic.js";
import { latestResumableRun, missedAnswerIds, questionRevision, saveRun, savedRunFor } from "./studyProgress.js";

test("SCANND presentation preserves the arrest-warrant list's legacy scores and unfinished run", () => {
  const question = overviewListQuestions.find((item) => item.id === "fl-lists-arrest-warrant-course-contents");
  const legacyAnswers = [
    ["defendant-name", "Name of the defendant, if known"],
    ["offense", "Nature of the offense"],
    ["date", "Date the warrant is issued"],
    ["county", "County where it is issued"],
    ["bail", "Amount of bail"],
    ["signature", "Signature of the judge"],
  ].map(([key, answer]) => [`fl-lists-warrant-course-${key}`, answer]);
  const legacyIds = legacyAnswers.map(([id]) => id);
  const entry = {
    revision: JSON.stringify(legacyAnswers), attempts: 4, bestScore: 3,
    missedIds: legacyIds.slice(3),
    run: { targetIds: legacyIds, guessedIds: legacyIds.slice(0, 3), practice: false, closed: false },
  };
  assert.deepEqual(getQuestionAnswers(question).map(({ answer }) => answer), [
    "Signature of the judge", "County where it is issued", "Amount of bail",
    "Name of the defendant, if known", "Nature of the offense", "Date the warrant is issued",
  ]);
  assert.deepEqual(getColumnMnemonicClues(question.columns[0]), [..."SCANND"]);
  assert.equal(questionRevision(question), entry.revision);
  const run = savedRunFor(question, entry);
  assert.deepEqual(run, { targetIds: legacyIds, guessedIds: legacyIds.slice(0, 3), practice: false });
  assert.deepEqual(missedAnswerIds(question, entry), legacyIds.slice(3));
  const saved = saveRun({ progressMap: { [question.id]: entry }, question,
    targetIds: run.targetIds, guessedIds: new Set([...run.guessedIds, legacyIds[3]]) });
  assert.equal(saved[question.id].attempts, 4);
  assert.equal(saved[question.id].bestScore, 3);
  assert.deepEqual(savedRunFor(question, saved[question.id]).guessedIds, legacyIds.slice(0, 4));
});

test("the thirteen-list bank stays under its fifteen-list ceiling across all review depths", () => {
  assert.equal(courseCatalog.find((course) => course.id === OVERVIEW_LISTS_COURSE_ID), overviewListsCourse);
  assert.equal(overviewListQuestions.length, 13);
  assert.equal(OVERVIEW_LIST_LIMIT, 15);
  assert.equal(overviewListsCourse.listLimit, OVERVIEW_LIST_LIMIT);
  assert.ok(overviewListQuestions.length <= OVERVIEW_LIST_LIMIT);
  assert.equal(overviewListsCourse.subjects.length, 5);
  assert.ok(overviewListsCourse.subjects.every((subject) => subject.questions.length));
  for (const level of ["core", "standard", "comprehensive"]) {
    assert.equal(getOverviewSubjects(overviewListsCourse, level), overviewListsCourse.subjects);
  }
  const overview = courseCatalog.find((course) => course.id === OVERVIEW_COURSE_ID);
  assert.equal(overview.subjects.flatMap((subject) => subject.questions).length, 152);
});

test("list progress IDs cannot collide with existing drills or answers", () => {
  const originalQuestions = courseCatalog.filter((course) => course.id !== OVERVIEW_LISTS_COURSE_ID)
    .flatMap((course) => course.subjects.flatMap((subject) => subject.questions));
  const originalIds = new Set(originalQuestions.flatMap((question) => [question.id, ...getQuestionAnswers(question).map((answer) => answer.id)]));
  const ids = overviewListQuestions.flatMap((question) => [question.id, ...getQuestionAnswers(question).map((answer) => answer.id)]);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) {
    assert.ok(id.startsWith("fl-lists-"), id);
    assert.ok(!originalIds.has(id), id);
  }
});

test("the three additions separate legal checklists from related but incorrect answers", () => {
  const examples = [
    ["fl-lists-financing-statement-contents", ["debtor name", "secured party name", "collateral indication"],
      ["name", "debtor signature", "filing office", "filing authorization"]],
    ["fl-lists-first-appearance-advice", ["charges and complaint", "right to remain silent", "right to counsel", "right to communicate"],
      ["24 hours", "bail amount", "probable cause"]],
    ["fl-lists-corporate-distribution-solvency", ["cash flow test", "balance sheet test"],
      ["profitability", "positive income", "shareholder approval"]],
  ];
  for (const [id, correct, incorrect] of examples) {
    const question = overviewListQuestions.find((question) => question.id === id);
    assert.ok(question, id);
    const answers = getQuestionAnswers(question);
    const guessed = new Set();
    for (const wording of correct) {
      const match = findMatchingAnswer(answers, guessed, normalizeAnswer(wording));
      assert.ok(match, `${id}: ${wording}`);
      guessed.add(match.id);
    }
    assert.equal(guessed.size, answers.length);
    for (const wording of incorrect) {
      assert.equal(findMatchingAnswer(answers, new Set(), normalizeAnswer(wording)), null, `${id}: ${wording}`);
    }
  }
});

test("each list supports unprompted recall with unambiguous aliases in any order", () => {
  for (const question of overviewListQuestions) {
    assert.equal(question.recallMode, "list", question.id);
    assert.equal(question.columns.length, 1, question.id);
    assert.notEqual(question.answerMatching, "active", question.id);
    assert.ok(question.sourceUrl.startsWith("https://"), question.id);
    assert.ok(question.courseSources.length > 0, question.id);
    const answers = getQuestionAnswers(question);
    for (const answer of answers) {
      assert.ok(!answer.indicator, answer.id);
      for (const wording of [answer.answer, ...(answer.acceptedAnswers ?? [])]) {
        const match = findMatchingAnswer(answers, new Set(), normalizeAnswer(wording));
        assert.equal(match?.id, answer.id, `${answer.id}: ${wording}`);
      }
    }
    const recalled = new Set();
    for (const answer of [...answers].reverse()) {
      const wording = answer.acceptedAnswers?.[0] ?? answer.answer;
      assert.equal(findMatchingAnswer(answers, recalled, normalizeAnswer(wording))?.id, answer.id);
      recalled.add(answer.id);
      assert.equal(findMatchingAnswer(answers, recalled, normalizeAnswer(wording)), null);
    }
    assert.equal(recalled.size, answers.length);
    for (const wrong of ["", "something else", "not required", "date", "county", "money"]) {
      assert.equal(findMatchingAnswer(answers, new Set(), normalizeAnswer(wrong)), null, `${question.id}: ${wrong}`);
    }
  }
});

test("a saved list run preserves existing Overview scores and resumes into the new class", () => {
  const original = courseCatalog.find((course) => course.id === OVERVIEW_COURSE_ID)
    .subjects.flatMap((subject) => subject.questions).find((question) => question.id === "fl-crimpro-warrants");
  const question = overviewListsCourse.subjects[0].questions[0];
  const originalIds = getQuestionAnswers(original).map((answer) => answer.id);
  let progressMap = saveRun({ progressMap: {}, question: original, targetIds: originalIds,
    guessedIds: new Set([originalIds[0]]), closed: true, now: 100 });
  const originalProgress = structuredClone(progressMap[original.id]);
  const targetIds = getQuestionAnswers(question).map((answer) => answer.id);
  progressMap = saveRun({ progressMap, question, targetIds, guessedIds: new Set([targetIds.at(-1)]), now: 200 });
  assert.deepEqual(progressMap[original.id], originalProgress);
  assert.deepEqual(savedRunFor(question, progressMap[question.id])?.guessedIds, [targetIds.at(-1)]);
  const resumed = latestResumableRun(courseCatalog, progressMap);
  assert.equal(resumed.course.id, OVERVIEW_LISTS_COURSE_ID);
  assert.equal(resumed.question.id, question.id);
  progressMap = saveRun({ progressMap, question, targetIds, guessedIds: new Set([targetIds.at(-1)]), closed: true, now: 300 });
  progressMap = saveRun({ progressMap, question, targetIds: targetIds.slice(0, -1),
    guessedIds: new Set(targetIds.slice(0, -1)), practice: true, closed: true, now: 400 });
  assert.equal(progressMap[question.id].bestScore, 1);
  assert.equal(progressMap[question.id].practiceAttempts, 1);
  assert.deepEqual(progressMap[original.id], originalProgress);
});
