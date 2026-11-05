import { test, expect } from "@playwright/test";
import { professionalResponsibilitySubjects } from "../src/professionalResponsibilityQuestions.js";

test("resume after reload; practice misses without inflating the best score", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("textbox", { name: "Answer 1 for Required for Competence", exact: true }).click();
  await page.locator("input:focus").fill("knowledge");
  await page.locator("input:focus").press("Enter");
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
  await page.getByRole("textbox", { name: "Answer 2 for Required for Competence", exact: true }).click();
  for (const answer of ["skill", "thoroughness", "preparation"]) {
    await page.locator("input:focus").fill(answer);
    await page.locator("input:focus").press("Enter");
  }
  await expect(page.locator(".completion-indicator")).toHaveText("Practice: 3 of 3");
  await expect(page.locator(".study-summary")).toContainText("Full attempts: 1 · Best: 1/4");
  await expect(page.locator(".study-summary")).toContainText("Practice attempts: 1");
  await page.reload();
  await expect(page.locator(".study-summary")).toContainText("Best: 1/4");
  await expect(page.getByRole("button", { name: /Practice missed answers/ })).toHaveCount(0);
});

test("Tab opens every answer for typing and preserves independent drafts through all navigation", async ({ page }) => {
  await page.goto("./");
  const answer = (number) => page.getByRole("textbox", { name: `Answer ${number} for Required for Competence`, exact: true });
  await expect(page.locator(".answer-slot input")).toHaveCount(4);
  await answer(1).click();
  await answer(1).fill("first unfinished draft");
  await answer(1).press("Tab");
  await expect(answer(2)).toBeFocused();
  await page.keyboard.type("second unfinished draft");
  await expect(answer(2)).toHaveValue("second unfinished draft");
  await answer(2).press("Shift+Tab");
  await expect(answer(1)).toBeFocused();
  await expect(answer(1)).toHaveValue("first unfinished draft");

  await answer(1).press("ArrowDown");
  await expect(answer(2)).toBeFocused();
  await expect(answer(2)).toHaveValue("second unfinished draft");
  await answer(4).click();
  await answer(4).fill("fourth unfinished draft");
  await answer(4).press("ArrowDown");
  await expect(answer(1)).toBeFocused();
  await expect(answer(1)).toHaveValue("first unfinished draft");
  await answer(1).press("ArrowUp");
  await expect(answer(4)).toBeFocused();
  await expect(answer(4)).toHaveValue("fourth unfinished draft");
  await answer(2).click();
  await expect(answer(2)).toHaveValue("second unfinished draft");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 4");

  await answer(1).click();
  await answer(1).press("Shift+Tab");
  const source = page.getByRole("link", { name: "ABA Model Rules of Professional Conduct", exact: true });
  await expect(source).toBeFocused();
  await source.press("Shift+Tab");
  await page.getByRole("button", { name: "Show Mnemonic", exact: true }).press("Shift+Tab");
  await page.getByRole("button", { name: "Start Fresh", exact: true }).press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Reveal Missed Answers", exact: true })).toBeFocused();

  await answer(4).click();
  await answer(4).press("Tab");
  const back = page.getByRole("button", { name: "Back to study controls", exact: true });
  await expect(back).toBeFocused();
  await back.press("Shift+Tab");
  await expect(answer(4)).toBeFocused();
  await expect(answer(4)).toHaveValue("fourth unfinished draft");
  await answer(4).press("Escape");
  await expect(page.getByLabel("Select class", { exact: true })).toBeFocused();
});

test("Tab and arrows skip solved answers and practice context while Enter advances to the next blank", async ({ page }) => {
  await page.goto("./");
  const answer = (number) => page.getByRole("textbox", { name: `Answer ${number} for Required for Competence`, exact: true });
  await answer(1).fill("knowledge");
  await answer(1).press("Enter");
  await expect(answer(1)).toHaveCount(0);
  await expect(answer(2)).toBeFocused();
  await answer(2).fill("saved second draft");
  await answer(2).press("Tab");
  await expect(answer(3)).toBeFocused();
  await page.keyboard.type("thoroughness");
  await answer(3).press("Enter");
  await expect(answer(4)).toBeFocused();
  await answer(4).press("ArrowDown");
  await expect(answer(2)).toBeFocused();
  await expect(answer(2)).toHaveValue("saved second draft");
  await answer(2).press("ArrowUp");
  await expect(answer(4)).toBeFocused();
  await answer(4).press("Shift+Tab");
  await expect(answer(2)).toBeFocused();
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 2 of 4");

  await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
  await page.getByRole("button", { name: "Practice missed answers (2)", exact: true }).click();
  await expect(page.locator(".answer-slot input")).toHaveCount(2);
  await expect(answer(1)).toHaveCount(0);
  await expect(answer(3)).toHaveCount(0);
  await expect(answer(2)).toHaveValue("");
  await answer(2).click();
  await answer(2).press("Tab");
  await expect(answer(4)).toBeFocused();
  await answer(4).press("Shift+Tab");
  await expect(answer(2)).toBeFocused();
  await answer(2).fill("skill");
  await answer(2).press("Enter");
  await expect(answer(4)).toBeFocused();
  await expect(answer(2)).toHaveCount(0);
  await page.keyboard.type("preparation");
  await answer(4).press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Practice: 2 of 2");
});

test("Start Fresh and changing drills clear unfinished grid drafts", async ({ page }) => {
  await page.goto("./");
  const first = page.getByRole("textbox", { name: "Answer 1 for Required for Competence", exact: true });
  const second = page.getByRole("textbox", { name: "Answer 2 for Required for Competence", exact: true });
  await first.fill("first old draft");
  await second.fill("second old draft");
  await page.getByRole("button", { name: "Start Fresh", exact: true }).click();
  await expect(first).toHaveValue("");
  await expect(second).toHaveValue("");
  await first.fill("draft before switching drills");
  const question = page.getByLabel("Select question", { exact: true });
  await question.selectOption("pr-rule-1-3");
  await expect(page.locator(".answer-slot input")).toHaveCount(2);
  await expect(page.locator(".answer-slot input").first()).toHaveValue("");
  await question.selectOption("pr-rule-1-1");
  await expect(first).toHaveValue("");
  await expect(second).toHaveValue("");
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
