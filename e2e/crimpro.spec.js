import { test, expect } from "@playwright/test";
import { floridaCriminalProcedureQuestions as questions } from "../src/floridaCriminalProcedureQuestions.js";
import { courseCatalog } from "../src/courseData.js";
import { getQuestionAnswers } from "../src/quizLogic.js";
import { OVERVIEW_COURSE_ID, getOverviewSubjects } from "../src/overviewReview.js";

const overview = courseCatalog.find((course) => course.id === OVERVIEW_COURSE_ID);
const subjectId = "florida-criminal-procedure";

async function openCrimPro(page, level = "core") {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption(OVERVIEW_COURSE_ID);
  await page.getByLabel("Select review depth", { exact: true }).selectOption(level);
  await page.getByLabel("Select subject", { exact: true }).selectOption(subjectId);
}

test("Criminal Procedure is available at each review depth and saves an answered blank", async ({ page }) => {
  await openCrimPro(page);
  for (const level of ["core", "standard", "comprehensive"]) {
    await page.getByLabel("Select review depth", { exact: true }).selectOption(level);
    const expected = getOverviewSubjects(overview, level)
      .find((subject) => subject.id === subjectId).questions;
    await expect(page.getByLabel("Select question", { exact: true }).locator("option"))
      .toHaveText(expected.map((question) => question.title));
  }

  await page.getByLabel("Select review depth", { exact: true }).selectOption("core");
  const questionId = await page.getByLabel("Select question", { exact: true }).inputValue();
  const question = questions.find((item) => item.id === questionId);
  const answers = getQuestionAnswers(question);
  await page.locator(`[data-answer-id="${answers[0].id}"] button`).click();
  await page.getByRole("textbox").fill(answers[0].acceptedAnswers?.[0] ?? answers[0].answer);
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${answers.length}`);
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.getByLabel("Select subject", { exact: true })).toHaveValue(subjectId);
  await expect(page.getByLabel("Select question", { exact: true })).toHaveValue(questionId);
  await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${answers.length}`);
});

test("a felony deadline does not fill the selected misdemeanor deadline", async ({ page }) => {
  await openCrimPro(page);
  await page.getByLabel("Select question", { exact: true }).selectOption("fl-crimpro-speedy-default");
  await page.locator('[data-answer-id="fl-crimpro-ordinary-speedy-misdemeanor"] button').click();
  await page.getByRole("textbox").fill("175 days");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 6");
  await expect(page.getByRole("textbox")).toHaveValue("175 days");
  await page.getByRole("textbox").fill("90");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 6");
  await expect(page.locator('[data-answer-id="fl-crimpro-ordinary-speedy-felony"] input')).toBeFocused();
});

for (const width of [1280, 390]) {
  test(`every Criminal Procedure drill reveals with readable source context at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await openCrimPro(page, "comprehensive");
    for (const question of questions) {
      await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
      await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
      const rows = question.columns.flatMap((column) => column.answers);
      await expect(page.locator(".answer-value")).toHaveText(rows.map((answer) => answer.answer));
      await page.locator(".course-sources summary").click();
      await expect(page.locator(".course-sources")).toContainText(".pdf");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), question.id).toBe(true);
      const overflow = await page.locator(".answer-slot").evaluateAll((slots) =>
        slots.filter((slot) => slot.scrollWidth > slot.clientWidth + 1).map((slot) => slot.textContent),
      );
      expect(overflow, question.id).toEqual([]);
    }
  });
}
