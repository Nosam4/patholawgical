import { test, expect } from "@playwright/test";
import { evidenceHearsayQuestions, evidenceHearsaySubject } from "../src/evidenceHearsayQuestions.js";
import { getQuestionAnswers } from "../src/quizLogic.js";

const recorded = evidenceHearsayQuestions.find((question) => question.id === "evidence-hearsay-803-5");
const answers = getQuestionAnswers(recorded);

async function openHearsay(page, id = recorded.id) {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption("evidence-fall-2026");
  await page.getByLabel("Select subject", { exact: true }).selectOption(evidenceHearsaySubject.id);
  await page.getByLabel("Select question", { exact: true }).selectOption(id);
}

async function submit(page, text) {
  const input = page.getByRole("textbox", { name: "List answer", exact: true });
  await input.fill(text);
  await input.press("Enter");
}

test("six-element recall hides targets, accepts unordered answers, and resumes missed-answer practice", async ({ page }) => {
  await openHearsay(page);
  await expect(page.locator(".list-item-blank")).toHaveCount(6);
  await expect(page.locator(".list-item-answer, .list-item-explanation, .list-explanation")).toHaveCount(0);
  await submit(page, "hearsay");
  await expect(page.locator(".completion-indicator")).toHaveText("Recalled 0 of 6");
  await submit(page, answers.at(-1).acceptedAnswers[0] ?? answers.at(-1).answer);
  await expect(page.locator(".completion-indicator")).toHaveText("Recalled 1 of 6");
  await expect(page.locator(".list-item-answer")).toHaveText([answers.at(-1).answer]);
  await submit(page, answers.at(-1).answer);
  await expect(page.locator(".completion-indicator")).toHaveText("Recalled 1 of 6");
  await expect(page.getByRole("status")).toContainText("already recalled");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.getByLabel("Select question", { exact: true })).toHaveValue(recorded.id);
  await expect(page.locator(".completion-indicator")).toHaveText("Recalled 1 of 6");
  await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
  await expect(page.locator(".list-item-answer")).toHaveText(answers.map((answer) => answer.answer));
  await expect(page.locator(".list-explanation")).toContainText("exhibit");
  await page.getByRole("button", { name: "Practice missed answers (5)", exact: true }).click();
  await expect(page.locator(".list-item-status").filter({ hasText: /^Previously recalled$/ })).toHaveCount(1);
  for (const answer of [...answers.slice(0, -1)].reverse()) await submit(page, answer.acceptedAnswers[0] ?? answer.answer);
  await expect(page.locator(".completion-indicator")).toHaveText("Practice: Recalled 5 of 5");
  await expect(page.locator(".study-summary")).toContainText("Best: 1/6");
  await expect(page.locator(".study-summary")).toContainText("Practice attempts: 1");
});

for (const width of [1280, 390]) {
  test(`all hearsay element drills reveal without clipping at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await openHearsay(page);
    for (const question of evidenceHearsayQuestions) {
      await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
      await expect(page.locator(".list-item-answer, .answer-value")).toHaveCount(0);
      await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
      await expect(page.locator(question.recallMode === "list" ? ".list-item-answer" : ".answer-value"))
        .toHaveText(getQuestionAnswers(question).map((answer) => answer.answer));
      await page.locator(".course-sources").evaluate((node) => { node.open = true; });
      await expect(page.locator(".course-sources")).toContainText(question.courseSources[0]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), question.id).toBe(true);
      const clipped = await page.locator(".list-item-content, .answer-value, .answer-explanation, .answer-indicator")
        .evaluateAll((nodes) => nodes.filter((node) => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1).map((node) => node.textContent));
      expect(clipped, question.id).toEqual([]);
    }
  });
}
