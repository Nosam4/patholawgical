import { test, expect } from "@playwright/test";
import { floridaCivilProcedureTimelineQuestions as questions } from "../src/floridaCivilProcedureTimelines.js";
import { getQuestionAnswers } from "../src/quizLogic.js";

async function openTimelines(page) {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption("overview-of-florida-law-fall-2026");
  await page.getByLabel("Select subject", { exact: true }).selectOption("florida-civil-procedure-timelines");
}

test("professor core opens first and distinguishes current summary-judgment clocks", async ({ page }) => {
  await openTimelines(page);
  const selector = page.getByLabel("Select question", { exact: true });
  await expect(selector).toHaveValue("fl-civpro-numbers-to-know");
  await expect(selector.locator("option").nth(1)).toHaveAttribute("value", "fl-civpro-timelines-mixed");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 23");
  await page.getByText("Course material", { exact: true }).click();
  await expect(page.locator(".course-sources")).toContainText("20 days prior to summary judgement hearing");
  const response = page.locator('[data-answer-id="fl-civpro-numbers-to-know-summary-response"]');
  await response.getByRole("button").click();
  await page.getByRole("textbox").fill("20 days");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 23");
  await page.getByRole("textbox").fill("forty days");
  await page.getByRole("textbox").press("Enter");
  await expect(response.locator(".answer-value")).toHaveText("40 days");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run" }).click();
  await expect(selector).toHaveValue("fl-civpro-numbers-to-know");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 23");
  await page.getByRole("button", { name: "Reveal Missed Answers" }).click();
  await page.getByRole("button", { name: "Practice missed answers (22)", exact: true }).click();
  await expect(page.locator(".completion-indicator")).toHaveText("Practice: 0 of 22");
  await expect(response.locator(".answer-value")).toHaveText("40 days");
});

test("timeline answers score only the selected clock and resume in the timeline section", async ({ page }) => {
  await openTimelines(page);
  await page.getByLabel("Select question", { exact: true }).selectOption("fl-civpro-timelines-service");
  const selectedRow = page.locator('[data-answer-id="fl-civpro-timelines-service-waiver-us"]');
  await selectedRow.getByRole("button").click();
  await page.getByRole("textbox").fill("30 days");
  await page.getByRole("textbox").press("Enter");
  // 30 days is a valid answer elsewhere in this column, but not for this blank.
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 6");
  await expect(page.locator(".answer-value")).toHaveCount(0);
  await expect(selectedRow.getByRole("textbox")).toBeFocused();
  await page.getByRole("textbox").fill("twenty days");
  await page.getByRole("textbox").press("Enter");
  await expect(selectedRow.locator(".answer-value")).toHaveText("20 days");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run" }).click();
  await expect(page.getByLabel("Select subject", { exact: true })).toHaveValue("florida-civil-procedure-timelines");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 6");

  await page.getByLabel("Select question", { exact: true }).selectOption("fl-civpro-timelines-period-6-months");
  await page.locator(".blank-answer").first().click();
  await page.getByRole("textbox").fill("6 months");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 2");
  await page.getByRole("textbox").fill("earliest complex trial");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 2");
  await page.getByRole("button", { name: "Reveal Missed Answers" }).click();
  await page.getByRole("button", { name: "Practice missed answers (1)", exact: true }).click();
  await page.locator(".blank-answer").click();
  await page.getByRole("textbox").fill("small claims inactivity");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Practice: 1 of 1");
  await expect(page.locator(".study-summary")).toContainText("Best: 1/2");
});

for (const width of [1280, 390]) {
  test(`all timeline drills reveal and fit at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 844 });
    await openTimelines(page);
    for (const question of questions) {
      await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
      await page.getByRole("button", { name: "Reveal Missed Answers" }).click();
      await expect(page.locator(".answer-value")).toHaveCount(getQuestionAnswers(question).length);
      const overflow = await page.locator(".answer-indicator, .answer-slot").evaluateAll((elements) =>
        elements.filter((element) => element.scrollWidth > element.clientWidth + 1).map((element) => element.textContent));
      expect(overflow, question.id).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), question.id).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
