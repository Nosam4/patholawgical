import { test, expect } from "@playwright/test";
import { aiAndLawWeeks8And9Questions } from "../src/aiAndLawWeeks8And9.js";
import { getQuestionAnswers } from "../src/quizLogic.js";

const subjectId = "week-8-9-intellectual-property";

async function openIntellectualProperty(page) {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption("ai-and-law-fall-2026");
  await page.getByLabel("Select subject", { exact: true }).selectOption(subjectId);
}

test("Weeks 8–9 accepts an alias, preserves progress, and practices missed answers", async ({ page }) => {
  const question = aiAndLawWeeks8And9Questions.find((item) => item.id === "ai-weeks8-9-ip-toolkit");
  const answers = getQuestionAnswers(question);
  const patent = answers.find((answer) => answer.answer === "Patent");
  expect(patent).toBeDefined();

  await openIntellectualProperty(page);
  await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
  await expect(page.locator(".source-line > a")).toHaveAttribute("href", question.sourceUrl);
  await page.locator(".course-sources summary").click();
  for (const reference of question.courseSources) {
    await expect(page.locator(".course-sources")).toContainText(reference);
  }

  const patentRow = page.locator(`[data-answer-id="${patent.id}"]`);
  await patentRow.getByRole("button").click();
  await patentRow.getByRole("textbox").fill("patents");
  await patentRow.getByRole("textbox").press("Enter");
  await expect(patentRow.locator(".answer-value")).toHaveText("Patent");
  await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${answers.length}`);

  await page.reload();
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.getByLabel("Select subject", { exact: true })).toHaveValue(subjectId);
  await expect(page.getByLabel("Select question", { exact: true })).toHaveValue(question.id);
  await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${answers.length}`);

  await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
  await expect(page.locator(".answer-value")).toHaveCount(answers.length);
  await page.getByRole("button", { name: `Practice missed answers (${answers.length - 1})`, exact: true }).click();
  await expect(page.locator(".completion-indicator")).toHaveText(`Practice: 0 of ${answers.length - 1}`);
  await expect(patentRow.locator(".answer-value")).toHaveText("Patent");
  await expect(page.locator(".study-summary")).toContainText(`Best: 1/${answers.length}`);
});

for (const width of [1280, 390]) {
  test(`all Weeks 8–9 drills and source notes fit at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 844 });
    await openIntellectualProperty(page);

    for (const question of aiAndLawWeeks8And9Questions) {
      await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
      await expect(page.locator(".completion-indicator")).toHaveText(`Filled 0 of ${getQuestionAnswers(question).length}`);
      await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
      await page.locator(".course-sources").evaluate((node) => { node.open = true; });
      await expect(page.locator(".answer-value")).toHaveCount(question.columns.flatMap((column) => column.answers).length);
      if (question.sourceUrl) {
        await expect(page.locator(".source-line > a")).toHaveAttribute("href", question.sourceUrl);
      }

      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), question.id).toBe(true);
      const clipped = await page.locator(".answer-value, .answer-explanation, .answer-indicator, .course-sources li").evaluateAll((nodes) =>
        nodes.filter((node) => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1)
          .map((node) => node.textContent));
      expect(clipped, question.id).toEqual([]);
    }

    await page.screenshot({ path: testInfo.outputPath(`ai-intellectual-property-${width}.png`), fullPage: true });
  });
}
