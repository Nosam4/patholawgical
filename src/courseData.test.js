import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import {
  findMatchingAnswer,
  getQuestionAnswerCount,
  normalizeAnswer,
} from "./quizLogic.js";

function findEvidenceQuestion(questionId) {
  const evidence = courseCatalog.find((course) => course.id === "evidence-fall-2026");
  return evidence.subjects
    .flatMap((subject) => subject.questions)
    .find((question) => question.id === questionId);
}

function findEvidenceSubject(subjectId) {
  const evidence = courseCatalog.find((course) => course.id === "evidence-fall-2026");
  return evidence.subjects.find((subject) => subject.id === subjectId);
}

function findAiAndLawQuestion(questionId) {
  const aiAndLaw = courseCatalog.find((course) => course.id === "ai-and-law-fall-2026");
  return aiAndLaw.subjects
    .flatMap((subject) => subject.questions)
    .find((question) => question.id === questionId);
}

function findFloridaLawQuestion(questionId) {
  const floridaLaw = courseCatalog.find(
    (course) => course.id === "overview-of-florida-law-fall-2026",
  );
  return floridaLaw.subjects
    .flatMap((subject) => subject.questions)
    .find((question) => question.id === questionId);
}

function findFloridaLawSubject(subjectId) {
  const floridaLaw = courseCatalog.find(
    (course) => course.id === "overview-of-florida-law-fall-2026",
  );
  return floridaLaw.subjects.find((subject) => subject.id === subjectId);
}

function findTrialAdvocacyQuestion(questionId) {
  const trialAdvocacy = courseCatalog.find(
    (course) => course.id === "trial-advocacy-fall-2026",
  );
  return trialAdvocacy.subjects
    .flatMap((subject) => subject.questions)
    .find((question) => question.id === questionId);
}

function findSalesAndLeasesSubject(subjectId) {
  const salesAndLeases = courseCatalog.find(
    (course) => course.id === "sales-and-leases-fall-2026",
  );
  return salesAndLeases.subjects.find((subject) => subject.id === subjectId);
}

test("courseCatalog provides class, subject, and question choices", () => {
  assert.ok(courseCatalog.length >= 1);

  for (const course of courseCatalog) {
    assert.ok(course.id);
    assert.ok(course.title);
    assert.ok(course.term);
    assert.ok(course.subjects.length >= 1);

    for (const subject of course.subjects) {
      assert.ok(subject.id);
      assert.ok(subject.title);
      assert.ok(subject.questions.length >= 1);
    }
  }
});

test("Sales & Leases includes the three hybrid-transaction flowcharts", () => {
  const hybridTransactions = findSalesAndLeasesSubject("hybrid-transactions");

  assert.deepEqual(
    hybridTransactions.questions.map((question) => question.id),
    [
      "sales-predominant-purpose-test",
      "sales-gravamen-of-the-action",
      "sales-2022-ucc-amendments",
    ],
  );
  assert.ok(
    hybridTransactions.questions.every(
      (question) => question.type === "flowchart" && getQuestionAnswerCount(question) > 0,
    ),
  );
});

test("Evidence includes the FRE Rule 1101 sporcle-style question", () => {
  const question = findEvidenceQuestion("fre-rule-1101-applicability");
  const casesColumn = question.columns.find((column) => column.id === "cases-and-proceedings");

  assert.equal(question.type, "sporcle-grid");
  assert.equal(getQuestionAnswerCount(question), 16);
  assert.ok(casesColumn.answers.some((answer) => answer.id === "criminal-cases"));
  assert.ok(casesColumn.answers.some((answer) => answer.id === "contempt-proceedings"));
});

test("Rule 1101 courts column accepts district court as a lenient alias", () => {
  const question = findEvidenceQuestion("fre-rule-1101-applicability");
  const courtsColumn = question.columns.find((column) => column.id === "courts-and-judges");
  const match = findMatchingAnswer(
    courtsColumn.answers,
    new Set(),
    normalizeAnswer("district court"),
  );

  assert.equal(match.id, "us-district-courts");
});

test("Evidence includes the syllabus-listed FRE rule names question", () => {
  const question = findEvidenceQuestion("fre-rule-names-from-syllabus");
  const relevanceColumn = question.columns.find((column) => column.id === "relevance-and-policy");
  const generalColumn = question.columns.find((column) => column.id === "general-provisions");
  const hearsayColumn = question.columns.find((column) => column.id === "opinions-and-hearsay");
  const rule101 = generalColumn.answers.find((answer) => answer.indicator === "Rule 101");
  const rule102 = generalColumn.answers.find((answer) => answer.indicator === "Rule 102");
  const rule1101 = generalColumn.answers.find((answer) => answer.indicator === "Rule 1101");
  const rule403 = relevanceColumn.answers.find((answer) => answer.indicator === "Rule 403");
  const rule804 = hearsayColumn.answers.find((answer) => answer.indicator === "Rule 804");

  assert.equal(question.type, "sporcle-grid");
  assert.equal(getQuestionAnswerCount(question), 50);
  assert.equal(rule101.answer, "Scope; Definitions");
  assert.equal(rule102.answer, "Purpose");
  assert.equal(rule1101.answer, "Applicability of the Rules");
  assert.equal(
    rule403.answer,
    "Excluding Relevant Evidence for Prejudice, Confusion, Waste of Time, or Other Reasons",
  );
  assert.equal(
    rule804.answer,
    "Exceptions to the Rule Against Hearsay - When the Declarant Is Unavailable as a Witness",
  );
});

test("Rule 403 includes the five factors that influence judges", () => {
  const question = findEvidenceQuestion("fre-rule-403-balancing");
  const factors = question.columns.find(
    (column) => column.id === "factors-influence-judges",
  );

  assert.equal(factors.title, "Judicial Factors");
  assert.equal(factors.answers.length, 5);
  assert.equal(getQuestionAnswerCount(question), 14);
  assert.deepEqual(
    factors.answers.map((item) => item.id),
    [
      "rule-403-emotions-irrational-prejudice",
      "rule-403-jury-overvalue",
      "rule-403-connection-to-elements",
      "rule-403-less-prejudicial-alternatives",
      "rule-403-redaction",
    ],
  );
});

test("Rule 403 dangers follow the UCMNUW mnemonic", () => {
  const question = findEvidenceQuestion("fre-rule-403-balancing");
  const dangers = question.columns.find((column) => column.id === "dangers");

  assert.equal(dangers.mnemonic, "UCMNUW");
  assert.deepEqual(
    dangers.answers.map((item) => item.answer),
    [
      "unfair prejudice",
      "confusing the issues",
      "misleading the jury",
      "needlessly presenting cumulative evidence",
      "undue delay",
      "wasting time",
    ],
  );
});

test("Rule 405 identifies the judge's role on cross-examination", () => {
  const question = findEvidenceQuestion("fre-rule-405-proving-character");
  const methods = question.columns.find(
    (column) => column.id === "reputation-opinion",
  );
  const cross = methods.answers.find(
    (item) => item.id === "rule-405-cross-specific-acts",
  );

  assert.equal(
    cross.answer,
    "judge may allow inquiry into relevant specific instances of conduct",
  );
});

test("Evidence includes rule and form objection cadence drills", () => {
  const objections = findEvidenceSubject("objections");
  const cannedRules = findEvidenceQuestion("fre-canned-objections");
  const ruleCadences = findEvidenceQuestion("fre-objection-response-cadences");
  const cannedForms = findEvidenceQuestion("form-canned-objections");
  const formCadences = findEvidenceQuestion("form-objection-response-cadences");
  const canned403 = cannedRules.columns
    .flatMap((column) => column.answers)
    .find((item) => item.indicator === "Rule 403");
  const rule403 = ruleCadences.columns
    .flatMap((column) => column.answers)
    .find((item) => item.indicator === "Rule 403");

  assert.deepEqual(
    objections.questions.map((question) => question.id),
    [
      "fre-canned-objections",
      "fre-objection-response-cadences",
      "form-canned-objections",
      "form-objection-response-cadences",
    ],
  );
  assert.ok(canned403.answer.startsWith("Objection, Rule 403."));
  assert.ok(canned403.answer.includes("probative value is substantially outweighed"));
  assert.equal(rule403.answer, "Your Honor, this evidence is relevant because . . .");
  assert.equal(getQuestionAnswerCount(cannedRules), 20);
  assert.equal(getQuestionAnswerCount(ruleCadences), 20);
  assert.equal(getQuestionAnswerCount(cannedForms), 13);
  assert.equal(getQuestionAnswerCount(formCadences), 13);
});

test("Evidence organizes all 50 syllabus rules into individual Sporcle questions", () => {
  const evidence = courseCatalog.find((course) => course.id === "evidence-fall-2026");
  const syllabusSubjectIds = new Set([
    "general-provisions",
    "relevance-and-policy-exclusions",
    "privileges-and-witnesses",
    "opinions-and-hearsay",
    "authentication-and-contents",
  ]);
  const substantiveSubjects = evidence.subjects.filter(
    (subject) => syllabusSubjectIds.has(subject.id),
  );
  const questions = substantiveSubjects.flatMap((subject) => subject.questions);
  const ruleNumbers = questions.map((question) => question.title.match(/^FRE Rule (\d+):/)?.[1]);

  assert.deepEqual(
    evidence.subjects.map((subject) => subject.id),
    [
      "rule-names",
      "general-provisions",
      "relevance-and-policy-exclusions",
      "privileges-and-witnesses",
      "opinions-and-hearsay",
      "authentication-and-contents",
      "objections",
    ],
  );
  assert.deepEqual(ruleNumbers, [
    "101", "102", "103", "104", "105", "106", "1101",
    "401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415",
    "501", "601", "602", "607", "608", "609", "610", "611", "612", "613", "615",
    "701", "702", "703", "705", "801", "802", "803", "804", "805", "806", "807",
    "901", "902", "1001", "1002", "1003", "1004",
  ]);
  assert.equal(questions.length, 50);
  assert.ok(questions.every((question) => question.type === "sporcle-grid"));
  assert.ok(questions.every((question) => getQuestionAnswerCount(question) > 0));
  assert.ok(questions.every((question) => question.sourceUrl));
});

test("remaining FRE trainers include the current high-value rule details", () => {
  const rule702 = findEvidenceQuestion("fre-rule-702-expert-testimony");
  const rule613 = findEvidenceQuestion("fre-rule-613-prior-statements");
  const rule803 = findEvidenceQuestion("fre-rule-803-hearsay-exceptions");
  const rule902 = findEvidenceQuestion("fre-rule-902-self-authentication");

  assert.equal(getQuestionAnswerCount(rule803), 23);
  assert.equal(getQuestionAnswerCount(rule902), 14);
  assert.ok(
    rule702.columns
      .flatMap((column) => column.answers)
      .some((item) => item.answer.includes("more likely than not")),
  );
  assert.ok(
    rule613.columns
      .flatMap((column) => column.answers)
      .some((item) => item.answer.startsWith("only after the witness")),
  );
});

test("Rule 404 other-act purposes follow the LIMPOKAPI mnemonic", () => {
  const question = findEvidenceQuestion("fre-rule-404-character-and-other-acts");
  const purposes = question.columns.find(
    (column) => column.id === "other-act-purposes",
  );

  assert.equal(purposes.title, "Other-Act Purposes");
  assert.equal(purposes.mnemonic, "LIMPOKAPI");
  assert.deepEqual(
    purposes.answers.map((item) => item.indicator),
    ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  );
  assert.deepEqual(
    purposes.answers.map((item) => item.answer),
    [
      "lack of accident",
      "intent",
      "motive",
      "preparation",
      "opportunity",
      "knowledge",
      "absence of mistake",
      "plan",
      "identity",
    ],
  );
});

test("all FRE answer ids are unique across the Evidence course", () => {
  const evidence = courseCatalog.find((course) => course.id === "evidence-fall-2026");
  const answerIds = evidence.subjects
    .flatMap((subject) => subject.questions)
    .flatMap((question) => question.columns)
    .flatMap((column) => column.answers)
    .map((item) => item.id);

  assert.equal(new Set(answerIds).size, answerIds.length);
});

test("AI and the Law includes Turing's nine arguments as a Sporcle question", () => {
  const question = findAiAndLawQuestion("turing-nine-arguments-against-machine-thinking");
  const allAnswers = question.columns.flatMap((column) => column.answers);

  assert.equal(question.type, "sporcle-grid");
  assert.equal(getQuestionAnswerCount(question), 9);
  assert.deepEqual(
    allAnswers.map((item) => item.answer),
    [
      "Theological",
      "Heads in Sand",
      "Consciousness",
      "Mathematical",
      "Continuity Argument",
      "Lady Lovelace",
      "Informal Behavior",
      "Various Disabilities",
      "ESP Argument",
    ],
  );

  assert.deepEqual(
    question.columns.map((column) => column.mnemonic),
    ["THC", "MC", "LIVE"],
  );

  const espMatch = findMatchingAnswer(
    question.columns[2].answers,
    new Set(),
    normalizeAnswer("extrasensory perception"),
  );
  assert.equal(espMatch.id, "turing-argument-esp");
});

test("Overview of Florida Law includes the UCC 3 negotiable-note checklist", () => {
  const question = findFloridaLawQuestion("ucc-3-is-the-note-cash");
  const answers = question.columns.flatMap((column) => column.answers);

  assert.equal(question.type, "sporcle-grid");
  assert.equal(getQuestionAnswerCount(question), 6);
  assert.equal(question.columns[0].mnemonic, "USFPOS");
  assert.deepEqual(
    answers.map((item) => item.indicator),
    ["1", "2", "3", "4", "5", "6"],
  );
  assert.deepEqual(
    answers.map((item) => item.answer),
    [
      "Unconditional",
      "Signed promise or order to pay",
      "Fixed amount of money (with or without interest)",
      "Payable to order or bearer",
      "Payable on demand or at a definite time",
      "No unauthorized undertaking or instruction by the party ordering payment",
    ],
  );

  const noOtherUndertaking = findMatchingAnswer(
    answers,
    new Set(),
    normalizeAnswer("no other undertaking or instruction"),
  );
  assert.equal(noOtherUndertaking.id, "ucc-3-no-unauthorized-undertakings");
});

test("Overview of Florida Law includes nine additional commercial-paper drills", () => {
  const ucc3 = findFloridaLawSubject("ucc-3");

  assert.deepEqual(
    ucc3.questions.slice(1).map((question) => question.id),
    [
      "ucc-3-no-unauthorized-undertakings",
      "ucc-3-commercial-paper-issues",
      "ucc-3-instruments-and-parties",
      "ucc-3-negotiation",
      "ucc-3-holder-in-due-course",
      "ucc-3-defenses",
      "ucc-3-liability-sequence",
      "ucc-3-indorser-liability",
      "ucc-3-transfer-warranties",
    ],
  );

  assert.deepEqual(
    ucc3.questions.slice(1).map(getQuestionAnswerCount),
    [5, 5, 7, 6, 9, 13, 8, 4, 5],
  );
});

test("the permitted-terms drill distinguishes authorized undertakings from other terms", () => {
  const question = findFloridaLawQuestion("ucc-3-no-unauthorized-undertakings");

  assert.deepEqual(
    question.columns.map((column) => column.title),
    ["Authorized Undertakings", "Other Permitted Terms"],
  );
  assert.deepEqual(
    question.columns.map((column) => column.answers.length),
    [3, 2],
  );
});

test("commercial-paper drills accept common outline shorthand", () => {
  const hdcQuestion = findFloridaLawQuestion("ucc-3-holder-in-due-course");
  const hdcAnswers = hdcQuestion.columns.flatMap((column) => column.answers);
  const shelterMatch = findMatchingAnswer(
    hdcAnswers,
    new Set(),
    normalizeAnswer("shelter rule"),
  );

  const warrantiesQuestion = findFloridaLawQuestion("ucc-3-transfer-warranties");
  const warrantyAnswers = warrantiesQuestion.columns.flatMap((column) => column.answers);
  const signaturesMatch = findMatchingAnswer(
    warrantyAnswers,
    new Set(),
    normalizeAnswer("genuine signatures"),
  );

  assert.equal(shelterMatch.id, "ucc3-hdc-shelter-rule");
  assert.equal(signaturesMatch.id, "ucc3-warranty-signatures");
});

test("Overview of Florida Law includes seven secured-transactions drills", () => {
  const securedTransactions = findFloridaLawSubject("ucc-9-secured-transactions");

  assert.deepEqual(
    securedTransactions.questions.map((question) => question.id),
    [
      "ucc-9-analysis-order",
      "ucc-9-collateral-types",
      "ucc-9-attachment-requirements",
      "ucc-9-methods-of-perfection",
      "ucc-9-pmsi-creation-and-perfection",
      "ucc-9-priority-hierarchy",
      "ucc-9-default-remedies",
    ],
  );

  const questionCounts = securedTransactions.questions.map(getQuestionAnswerCount);
  assert.deepEqual(questionCounts, [5, 5, 4, 8, 5, 5, 5]);
});

test("secured-transactions drills accept common outline shorthand", () => {
  const pmsiQuestion = findFloridaLawQuestion("ucc-9-pmsi-creation-and-perfection");
  const pmsiAnswers = pmsiQuestion.columns.flatMap((column) => column.answers);
  const inventoryMatch = findMatchingAnswer(
    pmsiAnswers,
    new Set(),
    normalizeAnswer("no grace period"),
  );

  const defaultQuestion = findFloridaLawQuestion("ucc-9-default-remedies");
  const defaultAnswers = defaultQuestion.columns.flatMap((column) => column.answers);
  const repossessionMatch = findMatchingAnswer(
    defaultAnswers,
    new Set(),
    normalizeAnswer("self help repossession without breach of peace"),
  );

  assert.equal(inventoryMatch.id, "ucc9-pmsi-inventory");
  assert.equal(repossessionMatch.id, "ucc9-default-repossess");
});

test("AI and the Law includes the five views of consciousness", () => {
  const question = findAiAndLawQuestion("consciousness-five-views");
  const allAnswers = question.columns.flatMap((column) => column.answers);

  assert.equal(question.type, "sporcle-grid");
  assert.equal(getQuestionAnswerCount(question), 5);
  assert.deepEqual(
    allAnswers.map((item) => item.answer),
    [
      "Dualism",
      "Physicalism",
      "Functionalism",
      "Higher-Order Theories",
      "The Hard Problem",
    ],
  );

  const hardProblemMatch = findMatchingAnswer(
    question.columns[2].answers,
    new Set(),
    normalizeAnswer("Chalmers hard problem"),
  );
  assert.equal(hardProblemMatch.id, "consciousness-hard-problem");
});

test("AI and the Law includes the Week 2 AI history timeline", () => {
  const aiAndLaw = courseCatalog.find((course) => course.id === "ai-and-law-fall-2026");
  const weekTwo = aiAndLaw.subjects.find((subject) => subject.id === "week-2-ai-history");
  const question = findAiAndLawQuestion("ai-history-1943-2022");
  const answers = question.columns.flatMap((column) => column.answers);

  assert.equal(weekTwo.title, "Week 2: AI History");
  assert.deepEqual(weekTwo.questions.map((item) => item.id), ["ai-history-1943-2022"]);
  assert.equal(question.type, "sporcle-grid");
  assert.equal(getQuestionAnswerCount(question), 19);
  assert.deepEqual(
    answers.map((item) => item.indicator),
    [
      "1943",
      "1946",
      "1950",
      "1956",
      "1958",
      "1960",
      "1965",
      "1966",
      "1969",
      "1970s",
      "1980s",
      "1986",
      "1990s",
      "1997",
      "2006",
      "2010",
      "2011",
      "2012",
      "2022",
    ],
  );
  assert.deepEqual(
    answers.map((item) => item.answer),
    [
      "First neural-network model",
      "ENIAC completed",
      "Turing: Computing Machinery and Intelligence",
      "AI coined; Dartmouth Conference",
      "Perceptron",
      "ADALINE",
      "Multilayer models",
      "ELIZA",
      "Perceptrons; XOR limitation",
      "First AI winter",
      "Expert-systems resurgence",
      "Backpropagation",
      "Second AI winter",
      "Deep Blue defeats Kasparov",
      "Deep-learning advances; ImageNet begins",
      "ImageNet Challenge launches",
      "Watson wins Jeopardy!",
      "AlexNet wins ImageNet",
      "ChatGPT released (GPT-3.5)",
    ],
  );

  const chatGptMatch = findMatchingAnswer(
    answers,
    new Set(),
    normalizeAnswer("OpenAI releases ChatGPT"),
  );
  assert.equal(chatGptMatch.id, "ai-history-2022-chatgpt");
});

test("Trial Advocacy drills opening-statement structure in order", () => {
  const question = findTrialAdvocacyQuestion("opening-statements-structure");
  const structure = question.columns[0];

  assert.equal(question.title, "Structure");
  assert.equal(question.type, "sporcle-grid");
  assert.equal(structure.mnemonic, "TSRIRFC");
  assert.deepEqual(
    structure.answers.map((item) => item.answer),
    [
      "Theme",
      "Short, Compelling Story",
      "Repeat the Theme",
      "Introduction Paragraph",
      "Roadmap Paragraph",
      "Follow the Roadmap",
      "Concluding Paragraph",
    ],
  );
});

test("Trial Advocacy drills introduction-paragraph sentence openings in order", () => {
  const question = findTrialAdvocacyQuestion(
    "opening-statements-introduction-paragraph",
  );

  assert.equal(question.title, "Introduction Paragraph");
  assert.equal(question.type, "sporcle-grid");
  assert.deepEqual(
    question.columns[0].answers.map((item) => item.answer),
    [
      "Members of the Jury",
      "As the prosecution",
      "At the end of trial",
      "Shot the victim with a gun",
      "Intended to kill",
      "Acted with Premeditation",
      "caused the victim's death",
      "So, let's talk about",
    ],
  );
});
