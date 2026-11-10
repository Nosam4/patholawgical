import assert from "node:assert/strict";
import { test } from "node:test";
import {
  floridaEvidenceDistinctionsQuestions as questions,
  floridaEvidenceDistinctionsLevels as levels,
} from "./floridaEvidenceDistinctionsQuestions.js";
import { getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "./quizLogic.js";

const question = (id) => {
  const entry = questions.find((item) => item.id === `fl-evid-dist-${id}`);
  assert.ok(entry, `Missing drill ${id}`);
  return entry;
};
const entries = new Map(questions.flatMap(getQuestionAnswers).map((entry) => [entry.id, entry]));
const accepts = (id, guess) => {
  const entry = entries.get(`fl-evid-dist-${id}`);
  assert.ok(entry, `Missing answer ${id}`);
  return isAnswerMatch(entry, normalizeAnswer(guess));
};
const notes = (id) => question(id).courseSources.join(" ");

test("Florida distinctions has explicit cumulative coverage for every drill", () => {
  assert.equal(questions.length, 33);
  assert.equal(entries.size, 189);
  assert.deepEqual(Object.keys(levels).sort(), questions.map((item) => item.id).sort());
  const rank = { core: 0, standard: 1, comprehensive: 2 };
  const subsets = Object.keys(rank).map((depth) => questions.filter((item) => rank[levels[item.id]] <= rank[depth]));
  assert.deepEqual(subsets.map((items) => items.length), [15, 28, 33]);
  assert.ok(subsets[0].every((item) => subsets[1].includes(item)));
  assert.ok(subsets[1].every((item) => subsets[2].includes(item)));
  for (const id of ["character", "convictions", "medical-statements", "constitutional-limits"]) {
    assert.equal(levels[question(id).id], "core");
  }
});

test("all drills retain source-page references and selected-blank matching", () => {
  for (const item of questions) {
    assert.equal(item.type, "sporcle-grid", item.id);
    assert.equal(item.answerMatching, "active", item.id);
    assert.equal(item.clueLayout, "above", item.id);
    assert.equal(item.answerLayout, "stacked", item.id);
    assert.match(item.sourceUrl, /^https:\/\/www\.flsenate\.gov\/Laws\/Statutes\/2026\/\d+\.\d+$/);
    assert.ok(item.title.trim() && item.prompt.trim(), item.id);
    assert.ok(item.courseSources.some((source) => /FL\.Rose\.EvidDist\.pdf — PDF pp\. \d/.test(source)), item.id);
    assert.ok(item.courseSources.some((source) => source.startsWith("Legal reference:")), item.id);
    assert.ok(item.courseSources.every((source) => typeof source === "string" && source.trim()), item.id);
  }
});

test("semantic IDs are unique and every canonical answer and accepted alias scores", () => {
  assert.equal(new Set(questions.map((item) => item.id)).size, questions.length);
  const answers = questions.flatMap(getQuestionAnswers);
  assert.equal(new Set(answers.map((entry) => entry.id)).size, answers.length);
  for (const item of questions) {
    assert.equal(new Set(item.columns.map((entry) => entry.id)).size, item.columns.length, item.id);
    for (const entry of getQuestionAnswers(item)) {
      assert.match(entry.id, /^fl-evid-dist-/);
      assert.ok(entry.indicator.trim() && entry.answer.trim(), entry.id);
      for (const text of [entry.answer, ...entry.acceptedAnswers]) {
        assert.ok(isAnswerMatch(entry, normalizeAnswer(text)), `${entry.id}: ${text}`);
      }
    }
  }
});

test("Florida character and conviction answers reject the federal alternatives", () => {
  assert.ok(accepts("character-method", "reputation evidence"));
  assert.ok(!accepts("character-method", "opinion"));
  assert.ok(accepts("character-victim", "no"));
  assert.ok(!accepts("character-victim", "yes"));
  assert.ok(accepts("convictions-fixed", "no"));
  assert.ok(accepts("convictions-juvenile", "no"));
  assert.ok(accepts("convictions-pardon", "no"));
  assert.ok(!accepts("convictions-pardon", "yes"));
  assert.ok(!accepts("convictions-felony", "10 years"));
});

test("medical third-party foundations preserve both statutory requirements", () => {
  assert.ok(accepts("medical-responsibility", "legally responsible"));
  assert.ok(!accepts("medical-responsibility", "morally responsible"));
  assert.ok(accepts("medical-conjunction", "both"));
  assert.ok(accepts("medical-conjunction", "and"));
  assert.ok(!accepts("medical-conjunction", "or"));
  assert.ok(accepts("medical-communication", "communicate"));
  assert.match(notes("medical-statements"), /editorial correction from 'or' to 'and/);
});

test("current victim exceptions do not substitute adult testimony for unavailability", () => {
  assert.ok(accepts("victim-statements-age", "17"));
  assert.ok(!accepts("victim-statements-age", "16"));
  assert.ok(accepts("victim-statements-adult", "unavailable"));
  assert.ok(!accepts("victim-statements-adult", "testifies"));
  assert.ok(accepts("victim-statements-corroboration", "corroborate"));
  assert.match(notes("victim-statements"), /requires unavailability and corroboration/);
  assert.ok(accepts("victim-statements-notice", "ten days"));
  assert.ok(!accepts("victim-statements-notice", "ten business days"));
});

test("outdated lecture comparisons are qualified rather than encoded as false targets", () => {
  assert.match(notes("prior-statements"), /FRE 613\(b\).*before extrinsic admission/);
  assert.match(notes("recorded-recollection"), /Polite.*substantively the same/);
  assert.match(notes("recorded-recollection"), /signature or corroborating circumstances alone cannot replace/);
  assert.ok(accepts("recollection-accuracy", "accuracy"));
  assert.ok(!accepts("recollection-accuracy", "signature"));
  assert.ok(accepts("health-general", "no"));
  assert.match(notes("health-privileges"), /common-law physician-privilege description is inaccurate/);
  assert.match(notes("other-acts"), /not limited to sexual battery alone/);
});

test("duplicate, corpus-delicti, and constitutional safeguards remain distinct", () => {
  assert.match(notes("duplicates"), /excludes a security agreement or lease/);
  assert.match(notes("duplicates"), /not an absolute prohibition/);
  assert.ok(accepts("corpus-record", "memorialized"));
  assert.ok(accepts("corpus-burden", "preponderance"));
  assert.ok(!accepts("corpus-burden", "clear and convincing evidence"));
  assert.match(notes("corpus-delicti"), /not an automatic sexual-case waiver/);
  assert.ok(accepts("constitutional-exception", "no"));
  assert.ok(accepts("constitutional-residual", "no"));
  assert.ok(!accepts("constitutional-residual", "yes"));
  assert.ok(accepts("video-age", "18"));
  assert.ok(!accepts("video-age", "17"));
});
