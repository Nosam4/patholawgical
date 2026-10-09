import assert from "node:assert/strict";
import { test } from "node:test";
import { freRule803Question } from "./freRemainingQuestions.js";
import { getColumnMnemonicClues, getQuestionAnswers, questionHasMnemonic } from "./quizLogic.js";
import { latestResumableRun, missedAnswerIds, questionRevision, saveRun, savedRunFor } from "./studyProgress.js";

// The original subsection order and official headings are the saved-progress contract.
const originalExceptions = [
  ["present-sense", "Present Sense Impression"],
  ["excited-utterance", "Excited Utterance"],
  ["then-existing", "Then-Existing Mental, Emotional, or Physical Condition"],
  ["medical", "Statement Made for Medical Diagnosis or Treatment"],
  ["recorded-recollection", "Recorded Recollection"],
  ["regular-activity", "Records of a Regularly Conducted Activity"],
  ["absence-regular", "Absence of a Record of a Regularly Conducted Activity"],
  ["public-records", "Public Records"],
  ["vital-statistics", "Public Records of Vital Statistics"],
  ["absence-public", "Absence of a Public Record"],
  ["religious-records", "Records of Religious Organizations Concerning Personal or Family History"],
  ["ceremony-certificates", "Certificates of Marriage, Baptism, and Similar Ceremonies"],
  ["family-records", "Family Records"],
  ["property-records", "Records of Documents That Affect an Interest in Property"],
  ["property-statements", "Statements in Documents That Affect an Interest in Property"],
  ["ancient-documents", "Statements in Ancient Documents"],
  ["market-reports", "Market Reports and Similar Commercial Publications"],
  ["learned-treatises", "Statements in Learned Treatises, Periodicals, or Pamphlets"],
  ["personal-reputation", "Reputation Concerning Personal or Family History"],
  ["boundary-reputation", "Reputation Concerning Boundaries or General History"],
  ["character-reputation", "Reputation Concerning Character"],
  ["conviction-judgment", "Judgment of a Previous Conviction"],
  ["history-judgment", "Judgments Involving Personal, Family, or General History, or a Boundary"],
];
const originalAnswers = originalExceptions.map(([suffix, answer], index) => ({
  id: `rule-803-${suffix}`, answer, indicator: `(${index + 1})`,
}));
const originalIds = originalAnswers.map((answer) => answer.id);
const legacyRevision = JSON.stringify(originalAnswers.map(({ id, answer }) => [id, answer]));
const missedIds = ["rule-803-medical", "rule-803-history-judgment"];

function legacyEntry(overrides = {}) {
  return {
    revision: legacyRevision,
    attempts: 3,
    bestScore: 12,
    lastScore: 2,
    lastTotal: 23,
    lastAttempted: "2026-10-08",
    practiceAttempts: 2,
    missedIds,
    run: {
      targetIds: originalIds,
      guessedIds: ["rule-803-present-sense", "rule-803-excited-utterance"],
      practice: false,
      closed: false,
      updatedAt: 1000,
    },
    ...overrides,
  };
}

test("Rule 803 keeps all original answer IDs, official headings, and subsection clues", () => {
  assert.equal(freRule803Question.id, "fre-rule-803-hearsay-exceptions");
  const actual = getQuestionAnswers(freRule803Question);
  assert.equal(actual.length, 23);
  assert.deepEqual(
    [...actual].sort((a, b) => Number(a.indicator.slice(1, -1)) - Number(b.indicator.slice(1, -1)))
      .map(({ id, answer, indicator }) => ({ id, answer, indicator })),
    originalAnswers,
  );
  assert.equal(new Set(actual.map((answer) => answer.id)).size, 23);
  assert.deepEqual(freRule803Question.progressAnswerOrder, originalIds);
});

test("Rule 803 maps the selected PERMS BAR, CRAFT RRR, and VAMPS JJ sequences to their exceptions", () => {
  assert.deepEqual(freRule803Question.columns.map(({ id, title, mnemonic, answers }) => ({
    id, title, mnemonic, subsections: answers.map((answer) => answer.indicator),
  })), [
    {
      id: "perms-bar", title: "PERMS + BAR", mnemonic: "PERMS BAR",
      subsections: ["(1)", "(2)", "(5)", "(4)", "(3)", "(6)", "(7)", "(14)"],
    },
    {
      id: "craft-reputations", title: "CRAFT + 3 Reputations", mnemonic: "CRAFT RRR",
      subsections: ["(12)", "(11)", "(16)", "(13)", "(18)", "(19)", "(20)", "(21)"],
    },
    {
      id: "vamps-judgments", title: "VAMPS + 2 Judgments", mnemonic: "VAMPS JJ",
      subsections: ["(9)", "(10)", "(17)", "(8)", "(15)", "(22)", "(23)"],
    },
  ]);
  assert.equal(questionHasMnemonic(freRule803Question), true);
  assert.deepEqual(freRule803Question.columns.map(getColumnMnemonicClues), [
    ["P", "E", "R", "M", "S", "B", "A", "R"],
    ["C", "R", "A", "F", "T", "R", "R", "R"],
    ["V", "A", "M", "P", "S", "J", "J"],
  ]);
  assert.deepEqual(freRule803Question.columns.map((column) => getColumnMnemonicClues(column).length), [8, 8, 7]);
  assert.deepEqual(freRule803Question.columns.map((column) => column.answers.length), [8, 8, 7]);
});

test("mnemonic regrouping preserves the exact legacy signature and unfinished run history", () => {
  assert.equal(questionRevision(freRule803Question), legacyRevision);
  const entry = legacyEntry();
  assert.deepEqual(savedRunFor(freRule803Question, entry), {
    targetIds: originalIds, guessedIds: entry.run.guessedIds, practice: false,
  });
  assert.deepEqual(missedAnswerIds(freRule803Question, entry), missedIds);
  const catalog = [{ id: "evidence", subjects: [{ id: "hearsay", questions: [freRule803Question] }] }];
  assert.equal(latestResumableRun(catalog, { [freRule803Question.id]: entry }).question.id, freRule803Question.id);

  const guesses = new Set([...entry.run.guessedIds, "rule-803-recorded-recollection"]);
  const map = saveRun({
    progressMap: { [freRule803Question.id]: entry }, question: freRule803Question,
    targetIds: originalIds, guessedIds: guesses, now: 2000,
  });
  const updated = map[freRule803Question.id];
  assert.equal(updated.revision, legacyRevision);
  assert.equal(updated.attempts, 3);
  assert.equal(updated.bestScore, 12);
  assert.equal(updated.lastScore, 2);
  assert.equal(updated.practiceAttempts, 2);
  assert.equal(updated.lastAttempted, "2026-10-08");
  assert.deepEqual(updated.missedIds, missedIds);
  assert.deepEqual(savedRunFor(freRule803Question, updated).guessedIds, [...guesses]);
});

test("legacy missed-answer practice resumes and finishes without inflating full-drill scores", () => {
  const entry = legacyEntry({ run: {
    targetIds: missedIds, guessedIds: [missedIds[0]], practice: true, closed: false, updatedAt: 1000,
  } });
  assert.deepEqual(savedRunFor(freRule803Question, entry), {
    targetIds: missedIds, guessedIds: [missedIds[0]], practice: true,
  });
  const map = saveRun({
    progressMap: { [freRule803Question.id]: entry }, question: freRule803Question,
    targetIds: missedIds, guessedIds: new Set(missedIds), practice: true, closed: true,
  });
  const updated = map[freRule803Question.id];
  assert.equal(updated.attempts, 3);
  assert.equal(updated.bestScore, 12);
  assert.equal(updated.practiceAttempts, 3);
  assert.deepEqual(missedAnswerIds(freRule803Question, updated), []);
  assert.equal(savedRunFor(freRule803Question, updated), null);
});

for (const [description, change] of [
  ["an edited official heading", (question) => { question.columns[0].answers[0].answer += " corrected"; }],
  ["a new recall target", (question) => { question.columns[0].answers.push({ id: "rule-803-new", answer: "New target" }); }],
  ["a removed recall target", (question) => { question.columns[0].answers.pop(); }],
  ["a target becoming context", (question) => { question.columns[0].answers[0].quiz = false; }],
]) {
  test(`stable progress order still invalidates ${description}`, () => {
    const question = structuredClone(freRule803Question);
    change(question);
    const entry = legacyEntry();
    assert.notEqual(questionRevision(question), legacyRevision);
    assert.equal(savedRunFor(question, entry), null);
    assert.deepEqual(missedAnswerIds(question, entry), []);
    const map = saveRun({
      progressMap: { [question.id]: entry }, question,
      targetIds: getQuestionAnswers(question).map((answer) => answer.id), guessedIds: new Set(),
    });
    assert.equal(map[question.id].attempts, undefined);
    assert.equal(map[question.id].bestScore, undefined);
    assert.equal(map[question.id].practiceAttempts, undefined);
  });
}

test("questions without a stable progress order keep their existing revision behavior", () => {
  const question = { id: "other", type: "flowchart", nodes: originalAnswers.slice(0, 2) };
  const reordered = { ...question, nodes: [...question.nodes].reverse() };
  assert.equal(questionRevision(question), JSON.stringify(question.nodes.map(({ id, answer }) => [id, answer])));
  assert.notEqual(questionRevision(reordered), questionRevision(question));
});
