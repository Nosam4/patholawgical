import { test, expect } from "@playwright/test";
import { evidenceSlidesSubject } from "../src/evidenceSlideQuestions.js";
import { evidenceCaseSubject } from "../src/evidenceCaseQuestions.js";

async function evidence(page, subject) {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption("evidence-fall-2026");
  await page.getByLabel("Select subject", { exact: true }).selectOption(subject);
}

test("case recall accepts source spelling, hides explanations, resumes, and practices misses", async ({ page }) => {
  await evidence(page, "evidence-master-cases");
  await page.getByLabel("Select question", { exact: true }).selectOption("evidence-cases-identify-all");
  await expect(page.locator(".answer-explanation")).toHaveCount(0);
  const hillmon = page.locator('[data-answer-id="evidence-cases-identify-all-hillmon"]');
  await hillmon.getByRole("button").click();
  await page.getByRole("textbox").fill("Hillman");
  await page.getByRole("textbox").press("Enter");
  await expect(hillmon.locator(".answer-value")).toHaveText("Hillmon");
  await expect(hillmon.locator(".answer-explanation")).toContainText("145 U.S. 285");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 13");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run" }).click();
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 13");
  await page.getByRole("button", { name: "Reveal Missed Answers" }).click();
  await expect(page.locator(".answer-explanation")).toHaveCount(13);
  await page.getByRole("button", { name: "Practice missed answers (12)", exact: true }).click();
  await expect(page.locator(".completion-indicator")).toHaveText("Practice: 0 of 12");
  await expect(hillmon.locator(".answer-explanation")).toBeVisible();
  await expect(page.locator(".study-summary")).toContainText("Best: 1/13");
});

test("yes/no responses are graded only against the selected factual question", async ({ page }) => {
  await evidence(page, "evidence-master-cases");
  await page.getByLabel("Select question", { exact: true }).selectOption("evidence-case-williams");
  const majority = page.locator('[data-answer-id="evidence-case-williams-majority"]');
  await majority.getByRole("button").click();
  await page.getByRole("textbox").fill("yes");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 4");
  await expect(page.locator(".answer-explanation")).toHaveCount(0);
  await page.getByRole("textbox").fill("no");
  await page.getByRole("textbox").press("Enter");
  await expect(majority.locator(".answer-explanation")).toContainText("Five rejected");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 4");
});

for (const width of [1280, 390]) {
  test(`new Evidence drills and source notes fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await evidence(page, evidenceSlidesSubject.id);
    for (const subject of [evidenceSlidesSubject, evidenceCaseSubject]) {
      await page.getByLabel("Select subject", { exact: true }).selectOption(subject.id);
      for (const question of subject.questions) {
        await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
        await page.getByRole("button", { name: "Reveal Missed Answers" }).click();
        await page.locator(".course-sources").evaluate(node => { node.open = true; });
        await expect(page.locator(".answer-value")).toHaveCount(question.columns.flatMap(c => c.answers).length);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), question.id).toBe(true);
        const clipped = await page.locator(".answer-value, .answer-explanation, .answer-indicator").evaluateAll(nodes => nodes.filter(node => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1).map(node => node.textContent));
        expect(clipped, question.id).toEqual([]);
      }
    }
    await page.getByLabel("Select question", { exact: true }).selectOption("evidence-case-williams");
    // Reloading a revealed drill intentionally starts an unanswered run; reveal it for the visual artifact.
    const reveal = page.getByRole("button", { name: "Reveal Missed Answers" });
    if (await reveal.isEnabled()) await reveal.click();
    await page.screenshot({ path: `/tmp/rulepath-evidence-audit/cases-${width}.png`, fullPage: true });
  });
}
