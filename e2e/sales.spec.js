import { test, expect } from "@playwright/test";
import { salesAndLeasesSubjects } from "../src/salesAndLeasesQuestions.js";
import { getQuestionAnswers } from "../src/quizLogic.js";

async function openSales(page) {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption("sales-and-leases-fall-2026");
}

test("Sales drill accepts an alias in the selected blank and resumes after reload", async ({ page }) => {
  await openSales(page);
  await page.getByLabel("Select subject", { exact: true }).selectOption("sales-formation");
  await page.getByLabel("Select question", { exact: true }).selectOption("sales-firm-offers");
  const row = page.locator('[data-answer-id="sales-firm-offers-cap"]');
  await row.getByRole("button").click();
  await row.getByRole("textbox").fill("3 months");
  await row.getByRole("textbox").press("Enter");
  await expect(row).toHaveClass(/correct/);
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 7");
  await page.locator(".course-sources summary").click();
  await expect(page.locator(".course-sources")).toContainText("Finished Sales and Leases Outline");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run" }).click();
  await expect(page.getByLabel("Select question", { exact: true })).toHaveValue("sales-firm-offers");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 7");
});

for (const width of [1280, 390]) {
  test(`every new Sales drill renders and reveals cleanly at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 844 });
    await openSales(page);
    for (const subject of salesAndLeasesSubjects) {
      await page.getByLabel("Select subject", { exact: true }).selectOption(subject.id);
      for (const question of subject.questions) {
        await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
        const count = getQuestionAnswers(question).length;
        await expect(page.locator(".completion-indicator")).toHaveText(`Filled 0 of ${count}`);
        await page.getByRole("button", { name: "Reveal Missed Answers" }).click();
        await expect(page.locator(".source-line a")).toHaveAttribute("href", question.sourceUrl);
        if (question.type === "flowchart") {
          await expect(page.locator(".node-answer")).toHaveCount(question.nodes.length);
          const overflow = await page.locator(".flow-node").evaluateAll((nodes) => nodes.flatMap((node) => {
            const box = node.getBoundingClientRect();
            return [...node.children].filter((child) => {
              const text = child.getBoundingClientRect();
              return text.top < box.top || text.bottom > box.bottom || text.left < box.left || text.right > box.right;
            }).map((child) => child.textContent);
          }));
          expect(overflow, question.id).toEqual([]);
          await page.locator(".flowchart-stage").screenshot({ path: testInfo.outputPath(`${question.id}-${width}.png`) });
        } else {
          await expect(page.locator(".answer-value")).toHaveCount(count);
          const clipped = await page.locator(".answer-indicator, .answer-value").evaluateAll((nodes) =>
            nodes.filter((node) => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1).map((node) => node.textContent));
          expect(clipped, question.id).toEqual([]);
          if (question.id === "sales-warranty-application") {
            await page.screenshot({ path: testInfo.outputPath(`sales-warranties-${width}.png`), fullPage: true });
          }
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), question.id).toBe(true);
      }
    }
  });
}
