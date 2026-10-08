import { test, expect } from "@playwright/test";
import { courseCatalog } from "../src/courseData.js";
import { getQuestionAnswers } from "../src/quizLogic.js";

const prCourse = courseCatalog.find((course) => course.id === "professional-responsibility-mpre");
const fundamentals = prCourse.subjects.find((subject) => subject.id === "pr-fundamentals");
const competence = fundamentals.questions.find((question) => question.id === "pr-rule-1-1");
const diligence = fundamentals.questions.find((question) => question.id === "pr-rule-1-3");
const salesCourse = courseCatalog.find((course) => course.id === "sales-and-leases-fall-2026");
const hybrid = salesCourse.subjects.find((subject) => subject.id === "hybrid-transactions");
const gravamen = hybrid.questions.find((question) => question.id === "sales-gravamen-of-the-action");

async function chooseQuestion(page, course, subject, question) {
  await page.getByLabel("Select class", { exact: true }).selectOption(course.id);
  await page.getByLabel("Select subject", { exact: true }).selectOption(subject.id);
  await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
}

async function fillGridAnswer(page, answer) {
  const row = page.locator(`.answer-row[data-answer-id="${answer.id}"]`);
  if (await row.getByRole("button").count()) await row.getByRole("button").click();
  await row.getByRole("textbox").fill(answer.answer);
  await row.getByRole("textbox").press("Enter");
}

async function completeGrid(page, question, answers = getQuestionAnswers(question)) {
  for (const answer of answers) await fillGridAnswer(page, answer);
}

async function expectConfetti(page) {
  const overlay = page.locator(".completion-confetti");
  await expect(overlay).toHaveCount(1);
  await expect(overlay).toBeVisible();
  expect(await page.locator(".completion-confetti-piece").count()).toBeGreaterThan(0);
  expect(await overlay.evaluate((element) => {
    const style = getComputedStyle(element);
    const box = element.getBoundingClientRect();
    return {
      position: style.position,
      pointerEvents: style.pointerEvents,
      left: box.left,
      top: box.top,
    };
  })).toMatchObject({ position: "fixed", pointerEvents: "none", left: 0, top: 0 });
  const box = await overlay.boundingBox();
  expect(box.width).toBe(page.viewportSize().width);
  expect(box.height).toBe(page.viewportSize().height);
}

for (const width of [1280, 390]) {
  test(`grid celebrates the final answer after resume and falls across the viewport at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("./");
    const answers = getQuestionAnswers(competence);
    await completeGrid(page, competence, answers.slice(0, -1));
    await expect(page.locator(".completion-indicator")).toHaveText("Filled 3 of 4");
    await expect(page.locator(".completion-confetti")).toHaveCount(0);

    await page.getByLabel("Select question", { exact: true }).selectOption(diligence.id);
    await page.getByLabel("Select question", { exact: true }).selectOption(competence.id);
    await expect(page.locator(".completion-confetti")).toHaveCount(0);
    await page.reload();
    await page.getByRole("button", { name: "Resume saved run" }).click();
    await expect(page.locator(".completion-indicator")).toHaveText("Filled 3 of 4");
    await expect(page.locator(".completion-confetti")).toHaveCount(0);

    await fillGridAnswer(page, answers.at(-1));
    await expect(page.locator(".completion-indicator")).toHaveText("Filled 4 of 4");
    await expectConfetti(page);
    await expect.poll(() => page.locator(".completion-confetti-piece").evaluateAll((pieces) =>
      pieces.some((piece) => {
        const box = piece.getBoundingClientRect();
        return box.top > 0 && box.top < window.innerHeight;
      }))).toBe(true);
    await page.waitForTimeout(600);
    await page.screenshot({ path: testInfo.outputPath(`completion-${width}.png`) });
    await expect(page.getByRole("button", { name: "Reveal Missed Answers" })).toBeDisabled();
    await expect(page.locator(".completion-confetti")).toHaveCount(0, { timeout: 6000 });
    await page.getByRole("button", { name: "Show Mnemonic" }).click();
    await expect(page.locator(".completion-confetti")).toHaveCount(0);
  });
}

test("fresh runs can celebrate again and switching questions dismisses active confetti", async ({ page }) => {
  await page.goto("./");
  await chooseQuestion(page, prCourse, fundamentals, diligence);
  await completeGrid(page, diligence);
  await expectConfetti(page);

  await page.getByRole("button", { name: "Start Fresh", exact: true }).click();
  await expect(page.locator(".completion-confetti")).toHaveCount(0);
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 2");
  await completeGrid(page, diligence);
  await expectConfetti(page);

  await page.getByLabel("Select question", { exact: true }).selectOption(competence.id);
  await expect(page.locator(".completion-confetti")).toHaveCount(0);
});

test("revealing blanks does not celebrate; completing missed-answer practice does", async ({ page }) => {
  await page.goto("./");
  const answers = getQuestionAnswers(competence);
  await fillGridAnswer(page, answers[0]);
  await page.getByRole("button", { name: "Reveal Missed Answers" }).click();
  await expect(page.locator(".answer-value")).toHaveCount(answers.length);
  await expect(page.locator(".completion-confetti")).toHaveCount(0);

  await page.getByRole("button", { name: "Practice missed answers (3)", exact: true }).click();
  await completeGrid(page, competence, answers.slice(1, -1));
  await expect(page.locator(".completion-confetti")).toHaveCount(0);
  await fillGridAnswer(page, answers.at(-1));
  await expect(page.locator(".completion-indicator")).toHaveText("Practice: 3 of 3");
  await expectConfetti(page);
  await expect(page.locator(".study-summary")).toContainText("Full attempts: 1 · Best: 1/4");
});

test("flowcharts celebrate only when the final recall target is filled", async ({ page }) => {
  await page.goto("./");
  await chooseQuestion(page, salesCourse, hybrid, gravamen);
  const answers = getQuestionAnswers(gravamen);
  const input = page.getByRole("textbox", { name: "Type a rule phrase", exact: true });
  for (const answer of answers.slice(0, -1)) {
    await input.fill(answer.answer);
    await input.press("Enter");
    await expect(page.locator(".completion-confetti")).toHaveCount(0);
  }
  await input.fill(answers.at(-1).answer);
  await input.press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText(`Filled ${answers.length} of ${answers.length}`);
  await expectConfetti(page);
  await expect(input).toBeDisabled();
});

test("reduced motion hides the celebration while completion remains available", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await chooseQuestion(page, prCourse, fundamentals, diligence);
  await completeGrid(page, diligence);
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 2 of 2");
  await expect(page.locator(".completion-confetti")).toBeHidden();
  await expect(page.locator("#messageText")).toHaveText("Complete. All blanks filled.");
});
