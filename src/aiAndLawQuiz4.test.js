import assert from "node:assert/strict";
import { test } from "node:test";
import { aiAndLawQuiz4Subject } from "./aiAndLawQuiz4.js";
import { aiAndLawQuiz4PatentQuestions } from "./aiAndLawQuiz4Patents.js";
import { aiAndLawQuiz4IPQuestions } from "./aiAndLawQuiz4IP.js";
import { aiAndLawWeeks8And9Questions } from "./aiAndLawWeeks8And9.js";
import { courseCatalog } from "./courseData.js";
import { findMatchingAnswer, getQuestionAnswers, normalizeAnswer } from "./quizLogic.js";
import { latestResumableRun, missedAnswerIds, saveRun, savedRunFor } from "./studyProgress.js";

const decks = [
  { questions: aiAndLawQuiz4PatentQuestions, prefix: "ai-quiz4-patent-", fileId: "2508080" },
  { questions: aiAndLawQuiz4IPQuestions, prefix: "ai-quiz4-ip-", fileId: "2508082" },
];

test("Quiz #4 is a separate AI and the Law subject containing both assigned decks", () => {
  const course = courseCatalog.find((item) => item.id === "ai-and-law-fall-2026");
  assert.ok(course);
  const subject = course.subjects.find((item) => item.id === "quiz-4");
  assert.equal(subject, aiAndLawQuiz4Subject);
  assert.equal(subject.title, "Quiz #4");
  assert.deepEqual(subject.questions, decks.flatMap((deck) => deck.questions));
  assert.ok(decks.every((deck) => deck.questions.length > 0));
  assert.ok(course.subjects.some((item) => item.id === "week-8-9-intellectual-property"));

  const otherQuestions = courseCatalog.flatMap((item) => item.subjects)
    .filter((item) => item !== subject).flatMap((item) => item.questions);
  const questionIds = new Set(otherQuestions.map((question) => question.id));
  const answerIds = new Set(otherQuestions.flatMap(getQuestionAnswers).map((answer) => answer.id));
  for (const { questions, prefix } of decks) {
    for (const question of questions) {
      assert.ok(question.id.startsWith(prefix), question.id);
      assert.ok(!questionIds.has(question.id), question.id);
      questionIds.add(question.id);
      for (const answer of getQuestionAnswers(question)) {
        assert.ok(answer.id.startsWith(prefix), answer.id);
        assert.ok(!answerIds.has(answer.id), answer.id);
        answerIds.add(answer.id);
      }
    }
  }
});

test("each Quiz #4 drill points to its assigned deck and identifies the supporting pages or slides", () => {
  for (const { questions, fileId } of decks) {
    for (const question of questions) {
      assert.equal(question.type, "sporcle-grid", question.id);
      assert.equal(question.clueLayout, "above", question.id);
      assert.ok(question.title?.trim(), question.id);
      assert.ok(question.prompt?.trim(), question.id);
      const sourceUrl = new URL(question.sourceUrl);
      assert.equal(sourceUrl.protocol, "https:");
      assert.equal(sourceUrl.hostname, "stetson.instructure.com");
      assert.match(sourceUrl.pathname, new RegExp(`/files/${fileId}(?:/|$)`), question.id);
      assert.ok(question.sourceLabel?.trim(), question.id);
      assert.ok(question.courseSources?.some((source) => /\b(?:slides?|pages?|pp?\.?)\s*\d/i.test(source)), question.id);
      assert.ok(getQuestionAnswers(question).length > 0, question.id);
      for (const answer of getQuestionAnswers(question)) {
        assert.ok(answer.answer?.trim(), answer.id);
        assert.ok(answer.indicator?.trim(), answer.id);
      }
    }
  }
});

test("Quiz #4 canonical answers and aliases select the intended blank in their matching scope", () => {
  for (const { questions } of decks) {
    let distinctAliases = 0;
    for (const question of questions) {
      for (const column of question.columns) {
        for (const answer of column.answers.filter((item) => item.quiz !== false)) {
          for (const guess of [answer.answer, ...(answer.acceptedAnswers ?? [])]) {
            assert.ok(normalizeAnswer(guess), `${answer.id}: empty alias`);
            const candidates = question.answerMatching === "active" ? [answer]
              : column.answers.filter((item) => item.quiz !== false);
            const match = findMatchingAnswer(candidates, new Set(), normalizeAnswer(guess));
            assert.equal(match?.id, answer.id, `${question.id}: ${guess}`);
            if (normalizeAnswer(guess) !== normalizeAnswer(answer.answer)) distinctAliases += 1;
          }
        }
      }
    }
    assert.ok(distinctAliases > 0, "Each deck should accept useful alternative phrasing");
  }
});

test("Quiz #4 progress resumes and practices misses independently of Weeks 8–9", () => {
  const previousQuestion = aiAndLawWeeks8And9Questions[0];
  const previousTargets = getQuestionAnswers(previousQuestion).map((answer) => answer.id);
  const oldMap = saveRun({ progressMap: {}, question: previousQuestion, targetIds: previousTargets,
    guessedIds: new Set([previousTargets[0]]), now: 100 });

  for (const { questions } of decks) {
    const question = questions.find((item) => getQuestionAnswers(item).length > 1);
    assert.ok(question, "Each deck needs a drill with multiple recall targets");
    const targetIds = getQuestionAnswers(question).map((answer) => answer.id);
    assert.equal(savedRunFor(question, oldMap[question.id]), null);

    let map = saveRun({ progressMap: oldMap, question, targetIds,
      guessedIds: new Set([targetIds[0]]), now: 200 });
    assert.deepEqual(savedRunFor(question, map[question.id]), {
      targetIds, guessedIds: [targetIds[0]], practice: false,
    });
    const resumed = latestResumableRun(courseCatalog, map);
    assert.equal(resumed.course.id, "ai-and-law-fall-2026");
    assert.equal(resumed.subject.id, "quiz-4");
    assert.equal(resumed.question.id, question.id);

    map = saveRun({ progressMap: map, question, targetIds,
      guessedIds: new Set([targetIds[0]]), closed: true, now: 300 });
    assert.equal(savedRunFor(question, map[question.id]), null);
    assert.equal(map[question.id].bestScore, 1);
    const missedIds = missedAnswerIds(question, map[question.id]);
    assert.deepEqual(missedIds, targetIds.slice(1));

    map = saveRun({ progressMap: map, question, targetIds: missedIds,
      guessedIds: new Set(missedIds), practice: true, closed: true, now: 400 });
    assert.deepEqual(missedAnswerIds(question, map[question.id]), []);
    assert.equal(map[question.id].bestScore, 1);
    assert.equal(map[question.id].attempts, 1);
    assert.equal(map[question.id].practiceAttempts, 1);

    map = saveRun({ progressMap: map, question, targetIds,
      guessedIds: new Set(targetIds), closed: true, now: 500 });
    assert.equal(map[question.id].bestScore, targetIds.length);
    assert.equal(savedRunFor(question, map[question.id]), null);
    assert.deepEqual(map[previousQuestion.id], oldMap[previousQuestion.id]);
  }
});
