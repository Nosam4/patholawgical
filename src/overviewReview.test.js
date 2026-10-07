import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import {
  OVERVIEW_COURSE_ID,
  OVERVIEW_QUESTION_LEVELS,
  OVERVIEW_REVIEW_LEVELS,
  getOverviewQuestionLevel,
  getOverviewSubjects,
} from "./overviewReview.js";
import { getQuestionAnswerCount } from "./quizLogic.js";

const overview = courseCatalog.find((course) => course.id === OVERVIEW_COURSE_ID);
const allQuestions = overview.subjects.flatMap((subject) => subject.questions);
const questionIds = (subjects) => subjects.flatMap((subject) =>
  subject.questions.map((question) => question.id),
);

test("every Overview drill has an explicit, valid minimum review level", () => {
  const catalogIds = allQuestions.map((question) => question.id).sort();
  assert.deepEqual(Object.keys(OVERVIEW_QUESTION_LEVELS).sort(), catalogIds);
  assert.equal(new Set(catalogIds).size, catalogIds.length);
  assert.equal(catalogIds.length, 110);

  const levels = OVERVIEW_REVIEW_LEVELS.map((level) => level.id);
  assert.deepEqual(levels, ["core", "standard", "comprehensive"]);
  for (const level of Object.values(OVERVIEW_QUESTION_LEVELS)) {
    assert.ok(levels.includes(level));
  }
});

test("Core and Standard are nested selections with all five subjects available", () => {
  const [core, standard, comprehensive] = OVERVIEW_REVIEW_LEVELS.map(({ id }) =>
    getOverviewSubjects(overview, id),
  );
  for (const subjects of [core, standard, comprehensive]) {
    assert.deepEqual(
      subjects.map((subject) => subject.id),
      overview.subjects.map((subject) => subject.id),
    );
    assert.ok(subjects.every((subject) => subject.questions.length > 0));
  }

  const coreIds = questionIds(core);
  const standardIds = questionIds(standard);
  const comprehensiveIds = questionIds(comprehensive);
  assert.ok(coreIds.length < standardIds.length);
  assert.ok(standardIds.length < comprehensiveIds.length);
  assert.ok(coreIds.every((id) => standardIds.includes(id)));
  assert.ok(standardIds.every((id) => comprehensiveIds.includes(id)));

  const countAnswers = (subjects) => subjects.flatMap((subject) => subject.questions)
    .reduce((total, question) => total + getQuestionAnswerCount(question), 0);
  assert.ok(countAnswers(core) < countAnswers(comprehensive) / 2);
});

test("Comprehensive preserves every catalog drill in its existing order", () => {
  assert.deepEqual(getOverviewSubjects(overview, "comprehensive"), overview.subjects);
});

test("filtering preserves whole question objects, metadata, IDs, and source order", () => {
  const before = structuredClone(overview);
  for (const { id } of OVERVIEW_REVIEW_LEVELS) {
    const subjects = getOverviewSubjects(overview, id);
    for (const [index, subject] of subjects.entries()) {
      const original = overview.subjects[index];
      const { questions, ...metadata } = subject;
      const { questions: originalQuestions, ...originalMetadata } = original;
      assert.notEqual(subject, original);
      assert.deepEqual(metadata, originalMetadata);
      assert.notEqual(questions, originalQuestions);
      assert.deepEqual(
        questions.map((question) => question.id),
        originalQuestions.filter((question) => questions.includes(question))
          .map((question) => question.id),
      );
      for (const question of questions) {
        assert.equal(question, originalQuestions.find((item) => item.id === question.id));
      }
    }
  }
  assert.deepEqual(overview, before);
});

test("Core retains the foundational context and focused Numbers to Know drill", () => {
  const coreIds = new Set(questionIds(getOverviewSubjects(overview)));
  for (const id of [
    "ucc-3-is-the-note-cash",
    "ucc-3-no-unauthorized-undertakings",
    "ucc-3-holder-in-due-course",
    "ucc-3-defenses",
    "ucc-9-pmsi-creation-and-perfection",
    "ucc-9-priority-hierarchy",
    "fl-civpro-numbers-to-know",
    "fl-civpro-timelines-clock-rules",
  ]) {
    assert.ok(coreIds.has(id));
  }
  assert.equal(getOverviewQuestionLevel("fl-civpro-timelines-service"), "standard");
  assert.equal(getOverviewQuestionLevel("fl-civpro-class-actions"), "comprehensive");
  assert.equal(getOverviewQuestionLevel("fl-civpro-timelines-mixed"), "comprehensive");
  assert.ok(allQuestions.filter((question) => question.id.startsWith("fl-civpro-timelines-period-"))
    .every((question) => getOverviewQuestionLevel(question.id) === "comprehensive"));
});

test("unclassified drills remain available only in Comprehensive", () => {
  const newQuestion = { id: "new-overview-drill", title: "A future drill" };
  const expandedCourse = {
    ...overview,
    subjects: [{
      ...overview.subjects[0],
      questions: [...overview.subjects[0].questions, newQuestion],
    }],
  };
  assert.equal(getOverviewQuestionLevel(newQuestion.id), "comprehensive");
  assert.equal(getOverviewQuestionLevel("toString"), "comprehensive");
  for (const level of ["core", "standard"]) {
    assert.ok(!getOverviewSubjects(expandedCourse, level)[0].questions.includes(newQuestion));
  }
  assert.equal(getOverviewSubjects(expandedCourse, "comprehensive")[0].questions.at(-1), newQuestion);
});

test("other courses are returned untouched, missing courses are empty, and invalid levels use Core", () => {
  for (const course of courseCatalog.filter((item) => item.id !== OVERVIEW_COURSE_ID)) {
    for (const { id } of OVERVIEW_REVIEW_LEVELS) {
      assert.equal(getOverviewSubjects(course, id), course.subjects);
    }
  }
  assert.deepEqual(getOverviewSubjects(null), []);
  assert.deepEqual(getOverviewSubjects(undefined), []);
  assert.deepEqual(getOverviewSubjects(overview, "invalid"), getOverviewSubjects(overview, "core"));
});
