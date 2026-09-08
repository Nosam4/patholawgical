import { test, expect } from "@playwright/test";
import { professionalResponsibilitySubjects } from "../src/professionalResponsibilityQuestions.js";

test("resume after reload; practice misses without inflating the best score", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Blank answer 1 for Required for Competence", exact: true }).click();
  await page.getByRole("textbox").fill("knowledge");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 4");
  await page.getByLabel("Select subject", { exact: true }).selectOption("pr-conflicts");
  await page.getByLabel("Select subject", { exact: true }).selectOption("pr-fundamentals");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 4");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run" }).click();
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 4");
  await page.getByRole("button", { name: "Reveal Missed Answers" }).click();
  await expect(page.locator(".study-summary")).toContainText("Full attempts: 1 · Best: 1/4");
  await expect(page.getByRole("button", { name: "Reveal Missed Answers" })).toBeDisabled();
  await page.getByRole("button", { name: "Practice missed answers (3)", exact: true }).click();
  await expect(page.locator(".completion-indicator")).toHaveText("Practice: 0 of 3");
  await expect(page.locator(".answer-value")).toHaveText("legal knowledge");
  await page.getByRole("button", { name: "Blank answer 2 for Required for Competence", exact: true }).click();
  for (const answer of ["skill", "thoroughness", "preparation"]) {
    await page.getByRole("textbox").fill(answer);
    await page.getByRole("textbox").press("Enter");
  }
  await expect(page.locator(".completion-indicator")).toHaveText("Practice: 3 of 3");
  await expect(page.locator(".study-summary")).toContainText("Full attempts: 1 · Best: 1/4");
  await expect(page.locator(".study-summary")).toContainText("Practice attempts: 1");
  await page.reload();
  await expect(page.locator(".study-summary")).toContainText("Best: 1/4");
  await expect(page.getByRole("button", { name: /Practice missed answers/ })).toHaveCount(0);
});

test("Tab and Shift+Tab navigate unanswered blanks just like the arrow keys", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Blank answer 1 for Required for Competence", exact: true }).click();
  await page.getByRole("textbox").press("ArrowDown");
  await expect(page.getByRole("textbox", { name: "Answer 2 for Required for Competence", exact: true })).toBeFocused();
  await page.getByRole("textbox").press("ArrowUp");
  const firstAnswer = page.getByRole("textbox", { name: "Answer 1 for Required for Competence", exact: true });
  await expect(firstAnswer).toBeFocused();
  await firstAnswer.press("Tab");
  await expect(page.getByRole("textbox", { name: "Answer 2 for Required for Competence", exact: true })).toBeFocused();
  await page.getByRole("textbox").press("Shift+Tab");
  await expect(firstAnswer).toBeFocused();
  await firstAnswer.press("Shift+Tab");
  await expect(page.getByRole("textbox", { name: "Answer 4 for Required for Competence", exact: true })).toBeFocused();
  await page.getByRole("textbox").press("Tab");
  await expect(firstAnswer).toBeFocused();
  await firstAnswer.fill("knowledge");
  await firstAnswer.press("Enter");
  await page.getByRole("textbox").press("Shift+Tab");
  await expect(page.getByRole("textbox", { name: "Answer 4 for Required for Competence", exact: true })).toBeFocused();
  await page.getByRole("textbox").press("Tab");
  await expect(page.getByRole("textbox", { name: "Answer 2 for Required for Competence", exact: true })).toBeFocused();
});

for (const width of [1280, 390]) {
  test(`all PR flowcharts keep revealed text inside nodes at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("./");
    for (const subject of professionalResponsibilitySubjects) {
      const questions = subject.questions.filter((question) => question.type === "flowchart");
      if (!questions.length) continue;
      await page.getByLabel("Select subject", { exact: true }).selectOption(subject.id);
      for (const question of questions) {
        await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
        await page.getByRole("button", { name: "Reveal Missed Answers" }).click();
        const overflow = await page.locator(".flow-node").evaluateAll((nodes) => nodes.flatMap((node) => {
          const box = node.getBoundingClientRect();
          return [...node.children].filter((child) => {
            const text = child.getBoundingClientRect();
            return text.top < box.top || text.bottom > box.bottom || text.left < box.left || text.right > box.right;
          }).map((child) => child.textContent);
        }));
        expect(overflow, question.id).toEqual([]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), question.id).toBe(true);
      }
    }
  });
}
