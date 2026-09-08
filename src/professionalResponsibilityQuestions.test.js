import assert from "node:assert/strict";
import { test } from "node:test";
import { courseCatalog } from "./courseData.js";
import { getQuestionAnswers, getQuestionAnswerCount } from "./quizLogic.js";
import { buildArrows } from "./flowchartRouting.js";
import { segmentCrossesNode } from "./obstacleRouting.js";
import { professionalResponsibilitySources } from "./professionalResponsibilitySources.js";

const professionalResponsibility = courseCatalog.find(
  (course) => course.id === "professional-responsibility-mpre",
);

function allQuestions() {
  return professionalResponsibility.subjects.flatMap((subject) => subject.questions);
}

function findQuestion(id) {
  return allQuestions().find((question) => question.id === id);
}

test("Professional Responsibility is organized into the ten planned subjects", () => {
  assert.equal(professionalResponsibility.title, "Professional Responsibility");
  assert.equal(professionalResponsibility.term, "MPRE");
  assert.deepEqual(
    professionalResponsibility.subjects.map((subject) => subject.id),
    [
      "pr-fundamentals",
      "pr-conflicts",
      "pr-special-client-relationships",
      "pr-counselor",
      "pr-advocate",
      "pr-third-persons",
      "pr-firms",
      "pr-public-service",
      "pr-legal-services",
      "pr-integrity",
    ],
  );
});

test("every Professional Responsibility question is playable and sourced", () => {
  assert.ok(allQuestions().length >= 50);

  for (const question of allQuestions()) {
    assert.ok(["flowchart", "sporcle-grid"].includes(question.type));
    assert.ok(getQuestionAnswerCount(question) > 0, question.id);
    assert.match(question.sourceUrl, /^https:\/\/www\.americanbar\.org\//);
    assert.equal(question.sourceLabel, "ABA Model Rules of Professional Conduct");

    if (question.type === "flowchart") {
      assert.ok(getQuestionAnswerCount(question) <= 15, question.id);
    }
  }
});

test("Professional Responsibility question and answer ids are globally unique", () => {
  const questions = allQuestions();
  const questionIds = questions.map((question) => question.id);
  const answerIds = questions.flatMap((question) =>
    getQuestionAnswers(question).map((answer) => answer.id),
  );

  assert.equal(new Set(questionIds).size, questionIds.length);
  assert.equal(new Set(answerIds).size, answerIds.length);
});

test("every Professional Responsibility flowchart arrow resolves to an existing node", () => {
  for (const question of allQuestions().filter((item) => item.type === "flowchart")) {
    const nodeIds = new Set(question.nodes.map((node) => node.id));

    for (const arrow of question.arrows) {
      assert.ok(arrow.fromPoint || nodeIds.has(arrow.from), `${question.id}: ${arrow.from}`);
      assert.ok(arrow.toPoint || nodeIds.has(arrow.to), `${question.id}: ${arrow.to}`);
    }
  }
});

test("corrected Canva labels and subsection numbers are preserved", () => {
  const rule17 = findQuestion("pr-rule-1-7");
  const rule118 = findQuestion("pr-rule-1-18");
  const rule35 = findQuestion("pr-rule-3-5");
  const rule84 = findQuestion("pr-rule-8-4");
  const rule84Answers = getQuestionAnswers(rule84);

  assert.equal(rule17.title, "Rule 1.7: Conflict of Interest: Current Clients");
  assert.equal(rule118.title, "Rule 1.18: Duties to Prospective Client");
  assert.ok(
    getQuestionAnswers(rule35).some((answer) =>
      answer.answer.includes("conduct intended to disrupt a tribunal"),
    ),
  );
  assert.ok(
    rule84Answers.some(
      (answer) => answer.indicator === "Rule 8.4(g)" && answer.answer.includes("harassment"),
    ),
  );
  assert.ok(
    rule84Answers.some(
      (answer) => answer.indicator === "Rule 8.4(f)" && answer.answer.includes("judge"),
    ),
  );
});

test("unrelated Canva artifacts and known transcription errors are absent", () => {
  const combinedText = allQuestions()
    .flatMap((question) => [
      question.title,
      question.prompt,
      ...getQuestionAnswers(question).flatMap((answer) => [
        answer.answer,
        ...(answer.acceptedAnswers ?? []),
      ]),
    ])
    .join(" ");

  assert.doesNotMatch(combinedText, /547\(c\)/i);
  assert.doesNotMatch(combinedText, /representaed|proceedures/i);
});

test("operative rules link directly to their own ABA rule page", () => {
  const exceptions = new Set(["pr-rule-1-7-1-18", "pr-rule-2-2", "pr-rule-7-4", "pr-rule-7-5"]);
  for (const question of allQuestions()) {
    if (exceptions.has(question.id)) continue;
    const number = question.title.match(/^Rule (\d+\.\d+)/)[1];
    assert.equal(question.sourceUrl, professionalResponsibilitySources[number]);
    assert.ok(question.sourceUrl.replaceAll("-", "_").includes(`rule_${number.replace(".", "_")}_`), question.id);
    assert.ok(!question.sourceUrl.includes("table_of_contents"), question.id);
  }
});

test("former-firm conflicts retain every conjunctive condition", () => {
  const branch = findQuestion("pr-rule-1-9").nodes.find((node) => node.id.endsWith("-material-info"));
  for (const condition of ["same or substantially related", "materially adverse", "material protected information"]) {
    assert.ok(branch.answer.includes(condition), condition);
  }
  assert.ok(!branch.acceptedAnswers.includes("material protected information"));
});

test("withdrawal requires substantial failure and warning, with tribunal control on both branches", () => {
  const question = findQuestion("pr-rule-1-16");
  const obligation = question.nodes.find((node) => node.id.endsWith("-burden") && !node.id.endsWith("-financial-burden"));
  assert.match(obligation.answer, /substantial failure/);
  assert.match(obligation.answer, /reasonable warning/);
  for (const branch of ["mandatory", "permissive"]) {
    assert.ok(question.arrows.some((arrow) => arrow.from === `pr-1-16-${branch}` && arrow.to === "pr-1-16-tribunal"));
  }
});

test("PR charts keep every box within the canvas and route every connector outside boxes", () => {
  for (const question of allQuestions().filter((q) => q.type === "flowchart")) {
    for (const node of question.nodes) {
      assert.ok(node.x >= 0 && node.y >= 0 && node.x + node.width <= question.width
        && node.y + node.height <= question.height, `${question.id}: ${node.id}`);
    }
    const arrows = buildArrows(question);
    assert.equal(arrows.length, question.arrows.length);
    for (const arrow of arrows) {
      const values = arrow.path.match(/-?[\d.]+/g).map(Number);
      const points = [];
      for (let i = 0; i < values.length; i += 2) points.push({ x: values[i], y: values[i + 1] });
      for (let i = 1; i < points.length; i++) for (const node of question.nodes) {
        assert.equal(segmentCrossesNode(points[i - 1], points[i], node), false, `${arrow.id} crosses ${node.id}`);
      }
    }
  }
});
