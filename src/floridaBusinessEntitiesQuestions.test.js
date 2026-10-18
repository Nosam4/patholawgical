import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import {
  floridaBusinessEntitiesQuestions as questions,
  floridaBusinessEntitiesLevels,
} from "./floridaBusinessEntitiesQuestions.js";
import { getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "./quizLogic.js";
import {
  OVERVIEW_COURSE_ID,
  OVERVIEW_REVIEW_LEVELS,
  getOverviewQuestionLevel,
  getOverviewSubjects,
} from "./overviewReview.js";

const overview = courseCatalog.find((course) => course.id === OVERVIEW_COURSE_ID);
const subjectId = "florida-business-entities";
const answersById = new Map(questions.flatMap(getQuestionAnswers).map((answer) => [answer.id, answer]));
const answer = (id) => {
  const entry = answersById.get(`fl-be-${id}`);
  assert.ok(entry, `Missing recall target: ${id}`);
  return entry;
};
const accepts = (id, guess) => isAnswerMatch(answer(id), normalizeAnswer(guess));

test("Business Entities integrates corporations, partnerships, and LLCs at every review depth", () => {
  assert.equal(overview.subjects.find((subject) => subject.id === subjectId).questions, questions);
  assert.deepEqual(Object.keys(floridaBusinessEntitiesLevels).sort(), questions.map((question) => question.id).sort());
  const subsets = OVERVIEW_REVIEW_LEVELS.map(({ id }) =>
    getOverviewSubjects(overview, id).find((subject) => subject.id === subjectId).questions,
  );
  for (const subset of subsets) {
    assert.ok(subset.length > 0);
    assert.ok(subset.some((question) => question.id === "fl-be-corporate-identity"));
    assert.ok(subset.some((question) => question.id.startsWith("fl-be-gp-")));
    assert.ok(subset.some((question) => question.id.startsWith("fl-be-llc-")));
  }
  assert.ok(subsets[0].length < subsets[1].length);
  assert.ok(subsets[1].length < subsets[2].length);
  assert.deepEqual(subsets[2], questions);
  for (const question of questions) {
    assert.equal(getOverviewQuestionLevel(question.id), floridaBusinessEntitiesLevels[question.id]);
  }
});

test("Business Entities drills identify course PDF pages and Florida or federal legal references", () => {
  for (const question of questions) {
    assert.match(question.id, /^fl-be-/);
    assert.equal(question.type, "sporcle-grid", question.id);
    assert.equal(question.answerMatching, "active", question.id);
    assert.equal(question.clueLayout, "above", question.id);
    assert.equal(question.answerLayout, "stacked", question.id);
    assert.ok(question.title.trim() && question.prompt.trim(), question.id);
    if (question.id === "fl-be-federal-securities") {
      assert.match(question.sourceUrl, /^https:\/\/www\.law\.cornell\.edu\/cfr\/text\//);
      assert.match(question.sourceLabel, /Federal securities law/, question.id);
    } else {
      assert.match(question.sourceUrl, /^https:\/\/www\.flsenate\.gov\/Laws\/Statutes\/2026\/\d+\.\d+$/);
      assert.match(question.sourceLabel, /Florida Statutes/, question.id);
    }
    assert.ok(question.courseSources.every((reference) => typeof reference === "string" && reference.trim()), question.id);
    assert.ok(question.courseSources.some((reference) => /\.pdf.*PDF pp?\. \d/.test(reference)), question.id);
    assert.ok(question.courseSources.some((reference) => /reference:/.test(reference)), question.id);
    assert.ok(question.columns.length > 0 && question.columns.every((column) => column.id && column.title && column.answers.length), question.id);
  }
});

test("every canonical answer and alias scores in its selected blank without colliding with existing curriculum IDs", () => {
  const catalogQuestions = courseCatalog.flatMap((course) => course.subjects.flatMap((subject) => subject.questions));
  const questionIds = catalogQuestions.map((question) => question.id);
  const answerIds = catalogQuestions.flatMap(getQuestionAnswers).map((answer) => answer.id);
  for (const question of questions) {
    assert.equal(questionIds.filter((id) => id === question.id).length, 1, question.id);
    for (const entry of getQuestionAnswers(question)) {
      assert.equal(answerIds.filter((id) => id === entry.id).length, 1, entry.id);
      assert.match(entry.id, /^fl-be-/);
      assert.ok(entry.indicator?.trim(), entry.id);
      assert.ok(Array.isArray(entry.acceptedAnswers), entry.id);
      for (const text of [entry.answer, ...entry.acceptedAnswers]) {
        assert.ok(typeof text === "string" && text.trim(), entry.id);
        assert.ok(isAnswerMatch(entry, normalizeAnswer(text)), `${entry.id}: ${text}`);
      }
    }
  }
});

test("corporate documents, promoter release, and direct claims retain their distinct legal answers", () => {
  assert.ok(accepts("formation-document", "articles of incorporation"));
  assert.ok(!accepts("formation-document", "articles of organization"));
  assert.ok(!accepts("llc-formation-documents-filing", "articles of incorporation"));
  assert.ok(!accepts("llc-formation-documents-agreement", "bylaws"));
  assert.ok(accepts("promoters-adoption", "adoption"));
  assert.ok(!accepts("promoters-adoption", "ratification"));
  assert.ok(!accepts("promoters-release", "adoption"));
  assert.ok(accepts("promoters-release", "novation"));
  assert.ok(!accepts("claims-direct", "derivative action"));
  assert.ok(!accepts("claims-derivative", "direct action"));
  assert.ok(!accepts("llc-transfer-actions-direct", "derivative action"));
  assert.ok(!accepts("llc-transfer-actions-derivative", "direct action"));
});

test("Florida partnership and LLC votes distinguish headcount, economic interest, and unanimous consent", () => {
  assert.ok(accepts("gp-management-votes-ordinary", "majority of partners"));
  assert.ok(!accepts("gp-management-votes-ordinary", "majority in interest"));
  assert.ok(accepts("gp-management-votes-extraordinary", "all partners"));
  assert.ok(!accepts("gp-management-votes-extraordinary", "majority"));
  assert.ok(accepts("llc-voting-members-outside", "majority in interest"));
  assert.ok(!accepts("llc-voting-members-outside", "all members"));
  assert.ok(!accepts("llc-voting-members-weight", "equal"));
  assert.ok(!accepts("llc-voting-managers-nomeeting", "majority"));
  assert.ok(!accepts("llc-voting-members-amend", "majority in interest"));
});

test("status shields, economic transfers, and departure do not imply broader immunity or membership", () => {
  for (const id of [
    "special-partnerships-shields-own",
    "special-partnerships-shields-control",
    "lp-operation-members-agency",
    "lp-operation-members-fiduciary",
    "gp-property-economic-management",
    "llc-transfer-economic-management",
    "llc-agency-agents-passive",
    "llc-departure-effects-buyout",
    "gp-dissociation-timing-old",
  ]) {
    assert.ok(accepts(id, "no"), id);
    assert.ok(!accepts(id, "yes"), id);
  }
  assert.ok(accepts("llc-departure-power-wrongful", "wrongful"));
  assert.ok(!accepts("llc-departure-power-wrongful", "rightful"));
  assert.ok(!accepts("special-partnerships-filings-llp", "certificate of limited partnership"));
  assert.ok(!accepts("special-partnerships-filings-lp", "statement of qualification"));
});

test("timing aliases preserve business days, calendar months, and Florida's one-year dissociation tail", () => {
  assert.ok(accepts("inspection-notice", "five business days"));
  assert.ok(!accepts("inspection-notice", "5 days"));
  assert.ok(accepts("subscriptions-period", "six months"));
  assert.ok(!accepts("subscriptions-period", "180 days"));
  assert.ok(accepts("gp-dissociation-timing-tail", "one year"));
  assert.ok(!accepts("gp-dissociation-timing-tail", "two years"));
  assert.ok(!accepts("gp-dissociation-timing-demand", "90 days"));
  assert.ok(!accepts("sh-meetings-minimum", "60 days"));
});
