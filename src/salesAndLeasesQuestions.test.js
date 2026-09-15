import assert from "node:assert/strict";
import { test } from "node:test";
import { salesAndLeasesSubjects } from "./salesAndLeasesQuestions.js";
import { courseCatalog } from "./courseData.js";
import { getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "./quizLogic.js";
import { buildArrows } from "./flowchartRouting.js";
import { segmentCrossesNode } from "./obstacleRouting.js";

const questions = salesAndLeasesSubjects.flatMap((subject) => subject.questions);
const question = (id) => questions.find((item) => item.id === `sales-${id}`);
const answer = (id, row) => getQuestionAnswers(question(id)).find((item) => item.id === `sales-${id}-${row}`);
const accepts = (id, row, guess) => isAnswerMatch(answer(id, row), normalizeAnswer(guess));

test("Sales curriculum is integrated with all eight outline sections and existing hybrid drills", () => {
  const course = courseCatalog.find((item) => item.id === "sales-and-leases-fall-2026");
  assert.equal(salesAndLeasesSubjects.length, 8);
  for (const subject of salesAndLeasesSubjects) {
    assert.equal(course.subjects.find((item) => item.id === subject.id), subject);
    assert.ok(subject.questions.length >= 4, subject.title);
  }
  assert.equal(course.subjects.find((item) => item.id === "hybrid-transactions").questions.length, 3);
  const ids = course.subjects.flatMap((item) => item.questions).map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("new Sales content has unique ids, usable clues, sources, and scoreable canonical answers", () => {
  const allIds = new Set();
  for (const q of questions) {
    assert.ok(q.sourceUrl.startsWith("https://"), q.id);
    assert.ok(q.courseSources.length && q.courseSources.every(Boolean), q.id);
    assert.ok(q.prompt.trim(), q.id);
    const answers = getQuestionAnswers(q);
    assert.ok(answers.length >= 4 && answers.length <= 12, q.id);
    for (const item of answers) {
      assert.ok(!allIds.has(item.id), item.id);
      allIds.add(item.id);
      assert.ok(item.indicator || item.clue, item.id);
      for (const text of [item.answer, ...item.acceptedAnswers]) {
        assert.ok(text.trim(), item.id);
        assert.ok(isAnswerMatch(item, normalizeAnswer(text)), `${item.id}: ${text}`);
      }
    }
  }
});

test("answer aliases preserve the legal distinctions students are being tested on", () => {
  assert.ok(accepts("firm-offers", "cap", "3 months"));
  assert.ok(!accepts("firm-offers", "cap", "90 days")); // calendar months are not invariably 90 days
  assert.ok(accepts("agreement-hierarchy", "performance", "COP"));
  assert.ok(!accepts("agreement-hierarchy", "performance", "COD"));
  assert.ok(accepts("voidable-title", "protected", "good faith buyer for value"));
  assert.ok(!accepts("voidable-title", "protected", "good faith buyer"));
  assert.ok(!accepts("entrustment", "buyer", "good faith purchaser for value"));
  assert.ok(accepts("lease-bright-line", "obligation", "nonterminable by lessee"));
  assert.ok(!accepts("lease-bright-line", "obligation", "terminable by lessee"));
  assert.ok(accepts("finance-promises", "scope", "nonconsumer finance lease"));
  assert.ok(!accepts("finance-promises", "scope", "consumer finance lease"));
  assert.ok(!accepts("full-warranty", "duration", "yes"));
  assert.ok(!accepts("breach-risk", "buyer-insurance", "seller"));
  assert.ok(!accepts("breach-risk", "seller-insurance", "buyer"));
});

test("clarifications retain material qualifications missing from shorthand notes", () => {
  assert.match(answer("additional-terms", "confirmation").answer, /existing agreement/);
  assert.match(answer("formation", "intent").answer, /contract/);
  assert.match(question("conduct-forms").prompt, /jurisdiction-dependent/);
  assert.match(question("bailee-risk").prompt, /not the complete/);
  assert.match(answer("bailee-risk", "seller").answer, /seller/);
  assert.match(question("limitations").prompt, /not a universal state/);
  assert.match(question("revocation").prompt, /reasonable-assumption-of-cure/);
  assert.match(question("buyer-remedies").prompt, /does not categorically bar expectation damages/);
  assert.match(answer("privity-alternatives", "c-limit").answer, /personal injury/);
  assert.match(question("hill-gateway").prompt, /not treat Hill as a universal rule/);
});

test("new flowcharts are connected and their arrows do not cross nodes or leave the canvas", () => {
  for (const q of questions.filter((item) => item.type === "flowchart")) {
    const nodeIds = new Set(q.nodes.map((item) => item.id));
    const reached = new Set([q.nodes[0].id]);
    for (let i = 0; i < q.nodes.length; i++) {
      for (const arrow of q.arrows) {
        assert.ok(nodeIds.has(arrow.from) && nodeIds.has(arrow.to), q.id);
        if (reached.has(arrow.from)) reached.add(arrow.to);
      }
    }
    assert.equal(reached.size, nodeIds.size, q.id);
    for (const node of q.nodes) {
      assert.ok(node.x >= 0 && node.y >= 0, node.id);
      assert.ok(node.x + node.width <= q.width && node.y + node.height <= q.height, node.id);
    }
    const rendered = buildArrows(q);
    assert.equal(rendered.length, q.arrows.length);
    for (const arrow of rendered) {
      const coordinates = arrow.path.match(/-?\d+(?:\.\d+)?/g).map(Number);
      const points = [];
      for (let i = 0; i < coordinates.length; i += 2) points.push({ x: coordinates[i], y: coordinates[i + 1] });
      for (const point of points) assert.ok(point.x >= 0 && point.x <= q.width && point.y >= 0 && point.y <= q.height, arrow.id);
      for (let i = 1; i < points.length; i++) {
        for (const node of q.nodes) assert.ok(!segmentCrossesNode(points[i - 1], points[i], node), `${arrow.id} crosses ${node.id}`);
      }
    }
  }
});
