import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import { floridaTrustsQuestions, floridaTrustsLevels } from "./floridaTrustsQuestions.js";
import { floridaWillsQuestions, floridaWillsLevels } from "./floridaWillsQuestions.js";
import { getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "./quizLogic.js";
import { OVERVIEW_COURSE_ID, getOverviewSubjects } from "./overviewReview.js";

const overview = courseCatalog.find((course) => course.id === OVERVIEW_COURSE_ID);
const curricula = [
  ["florida-trusts", floridaTrustsQuestions, floridaTrustsLevels, "FL.Kramer.Trusts.pdf", "fl-trusts-"],
  ["florida-wills", floridaWillsQuestions, floridaWillsLevels, "FL.Kramer.Wills.pdf", "fl-wills-"],
];

for (const [subjectId, questions, levels, file, prefix] of curricula) {
  test(`${subjectId} integrates all source-backed drills at explicit cumulative review depths`, () => {
    assert.equal(overview.subjects.find((subject) => subject.id === subjectId).questions, questions);
    assert.deepEqual(Object.keys(levels).sort(), questions.map((question) => question.id).sort());
    const selections = ["core", "standard", "comprehensive"].map((level) =>
      getOverviewSubjects(overview, level).find((subject) => subject.id === subjectId).questions,
    );
    assert.ok(selections[0].length > 0);
    assert.ok(selections[0].length < selections[1].length);
    assert.ok(selections[1].length < selections[2].length);
    assert.deepEqual(selections[2], questions);
    for (const question of questions) {
      assert.ok(question.id.startsWith(prefix), question.id);
      assert.equal(question.type, "sporcle-grid");
      assert.equal(question.answerMatching, "active");
      assert.equal(question.clueLayout, "above");
      assert.equal(question.answerLayout, "stacked");
      assert.ok(question.title.trim() && question.prompt.trim());
      assert.match(question.sourceUrl, /^https:\/\/www\.flsenate\.gov\/Laws\/Statutes\/2026\/\d+\.\d+$/);
      assert.ok(question.courseSources.some((source) => source.startsWith(file) && /PDF pp?\. \d/.test(source)), question.id);
      assert.ok(question.courseSources.some((source) => /Official reference:/.test(source)), question.id);
      assert.ok(question.courseSources.every((source) => typeof source === "string" && source.trim()));
    }
  });

  test(`${subjectId} has unique targets and scoreable canonical answers and aliases`, () => {
    const catalog = courseCatalog.flatMap((course) => course.subjects.flatMap((subject) => subject.questions));
    const catalogIds = catalog.flatMap((question) => [question.id, ...getQuestionAnswers(question).map((answer) => answer.id)]);
    for (const question of questions) {
      assert.equal(catalogIds.filter((id) => id === question.id).length, 1, question.id);
      assert.ok(getQuestionAnswers(question).length > 0);
      for (const answer of getQuestionAnswers(question)) {
        assert.equal(catalogIds.filter((id) => id === answer.id).length, 1, answer.id);
        assert.ok(answer.id.startsWith(prefix) && answer.indicator.trim(), answer.id);
        for (const text of [answer.answer, ...answer.acceptedAnswers]) {
          assert.ok(typeof text === "string" && text.trim(), answer.id);
          assert.ok(isAnswerMatch(answer, normalizeAnswer(text)), `${answer.id}: ${text}`);
        }
      }
    }
  });
}

const trustAnswers = new Map(floridaTrustsQuestions.flatMap(getQuestionAnswers).map((answer) => [answer.id, answer]));
function trustAccepts(id, guess) {
  const answer = trustAnswers.get(`fl-trusts-${id}`);
  assert.ok(answer, id);
  return isAnswerMatch(answer, normalizeAnswer(guess));
}

test("trust doctrines distinguish cotrustee majorities, beneficiary status, and protected distributions", () => {
  assert.ok(trustAccepts("cotrustees-vote", "majority vote"));
  assert.ok(!trustAccepts("cotrustees-vote", "unanimous"));
  assert.ok(trustAccepts("trustee-office-second", "qualified beneficiaries"));
  assert.ok(!trustAccepts("trustee-office-second", "any beneficiaries"));
  assert.ok(trustAccepts("creditor-exceptions-remedy", "distributions"));
  assert.ok(!trustAccepts("creditor-exceptions-remedy", "all trust principal"));
  assert.ok(trustAccepts("creation-merger", "no"));
  assert.ok(!trustAccepts("creation-merger", "yes"));
  assert.ok(trustAccepts("future-interests-relative", "no"));
  assert.ok(!trustAccepts("future-interests-relative", "yes"));
  assert.ok(trustAccepts("future-interests-outright-relative", "grandparent"));
  assert.ok(trustAccepts("future-interests-survivorship", "yes"));
});

test("pour-over devises, durability, and short limitation periods preserve their qualifications", () => {
  assert.ok(trustAccepts("substitutes-probate", "no"));
  assert.ok(!trustAccepts("substitutes-probate", "yes"));
  assert.ok(trustAccepts("agency-termination-death", "no"));
  assert.ok(trustAccepts("agency-termination-later", "no"));
  assert.ok(trustAccepts("power-of-attorney-acknowledge", "notary public"));
  assert.ok(trustAccepts("limitations-short", "six months"));
  assert.ok(!trustAccepts("limitations-short", "180 days"));
  assert.ok(trustAccepts("limitations-notice", "limitation notice"));
  assert.ok(!trustAccepts("limitations-notice", "accounting"));
  assert.ok(trustAccepts("perpetuities-new", "1000 years"));
  assert.ok(!trustAccepts("perpetuities-new", "360 years"));
});

const willAnswers = new Map(floridaWillsQuestions.flatMap(getQuestionAnswers).map((answer) => [answer.id, answer]));
function willAccepts(id, guess) {
  const answer = willAnswers.get(`fl-wills-${id}`);
  assert.ok(answer, id);
  return isAnswerMatch(answer, normalizeAnswer(guess));
}

test("elective-share and creditor deadlines use opposite comparisons and preserve protected family rights", () => {
  assert.ok(willAccepts("elective-share-earlier", "earlier"));
  assert.ok(!willAccepts("elective-share-earlier", "later"));
  assert.ok(willAccepts("creditor-deadlines-comparison", "later"));
  assert.ok(!willAccepts("creditor-deadlines-comparison", "earlier"));
  assert.ok(willAccepts("elective-share-homestead", "no"));
  assert.ok(willAccepts("elective-share-base", "no"));
  assert.ok(willAccepts("elective-share-notice", "six months"));
  assert.ok(!willAccepts("elective-share-notice", "180 days"));
});

test("will execution, undue influence, and probate qualifications reject misleading course shorthand", () => {
  assert.ok(willAccepts("capacity-and-witnesses-interested", "no"));
  assert.ok(willAccepts("forms-holograph", "no"));
  assert.ok(willAccepts("forms-attested", "yes"));
  assert.ok(willAccepts("contests-procurement", "active procurement"));
  assert.ok(!willAccepts("contests-procurement", "weakened mentality"));
  assert.ok(willAccepts("contests-burden", "proof"));
  assert.ok(!willAccepts("contests-burden", "production"));
  assert.ok(willAccepts("administration-nonresident", "yes"));
  assert.ok(willAccepts("administration-venue", "domicile"));
  assert.ok(!willAccepts("administration-venue", "residence"));
  assert.ok(willAccepts("nonprobate-probate-needed", "no"));
});
