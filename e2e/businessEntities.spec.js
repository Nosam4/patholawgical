import { test, expect } from "@playwright/test";
import { courseCatalog } from "../src/courseData.js";
import { getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "../src/quizLogic.js";
import { OVERVIEW_COURSE_ID, getOverviewSubjects } from "../src/overviewReview.js";

const overview = courseCatalog.find((course) => course.id === OVERVIEW_COURSE_ID);
const subjectId = "florida-business-entities";
const questions = overview.subjects.find((subject) => subject.id === subjectId).questions;
const identityQuestion = questions.find((question) => question.id === "fl-be-corporate-identity");

async function openBusinessEntities(page, level = "core") {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption(OVERVIEW_COURSE_ID);
  await page.getByLabel("Select review depth", { exact: true }).selectOption(level);
  await page.getByLabel("Select subject", { exact: true }).selectOption(subjectId);
}

test("Business Entities is available at each review depth and saves an answered blank", async ({ page }) => {
  await openBusinessEntities(page);
  for (const level of ["core", "standard", "comprehensive"]) {
    await page.getByLabel("Select review depth", { exact: true }).selectOption(level);
    const expected = getOverviewSubjects(overview, level)
      .find((subject) => subject.id === subjectId).questions;
    await expect(page.getByLabel("Select question", { exact: true }).locator("option"))
      .toHaveText(expected.map((question) => question.title));
  }

  await page.getByLabel("Select review depth", { exact: true }).selectOption("core");
  await page.getByLabel("Select question", { exact: true }).selectOption(identityQuestion.id);
  const answers = getQuestionAnswers(identityQuestion);
  await page.locator('[data-answer-id="fl-be-identity-separate"] button').click();
  await page.getByRole("textbox").fill("separate entity");
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${answers.length}`);
  await expect(page.locator('[data-answer-id="fl-be-identity-separate"] .answer-value'))
    .toHaveText("Separate legal entity");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.getByLabel("Select subject", { exact: true })).toHaveValue(subjectId);
  await expect(page.getByLabel("Select question", { exact: true })).toHaveValue(identityQuestion.id);
  await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${answers.length}`);
});

test("another corporate answer cannot fill the selected entity-identity blank", async ({ page }) => {
  await openBusinessEntities(page);
  await page.getByLabel("Select question", { exact: true }).selectOption(identityQuestion.id);
  const answers = getQuestionAnswers(identityQuestion);
  const target = answers.find((answer) => answer.id === "fl-be-identity-separate");
  const other = answers.find((answer) => !isAnswerMatch(target, normalizeAnswer(answer.answer)));
  expect(other).toBeTruthy();
  await page.locator(`[data-answer-id="${target.id}"] button`).click();
  await page.getByRole("textbox").fill(other.answer);
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText(`Filled 0 of ${answers.length}`);
  await expect(page.getByRole("textbox")).toHaveValue(other.answer);
  await page.getByRole("textbox").fill(target.answer);
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${answers.length}`);
});

for (const width of [1280, 390]) {
  test(`every Business Entities drill reveals with readable source context at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await openBusinessEntities(page, "comprehensive");
    for (const question of questions) {
      await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
      await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
      const rows = question.columns.flatMap((column) => column.answers);
      await expect(page.locator(".answer-value")).toHaveText(rows.map((answer) => answer.answer));
      await expect(page.getByRole("link", { name: question.sourceLabel, exact: true }))
        .toHaveAttribute("href", question.sourceUrl);
      await page.locator(".course-sources summary").click();
      await expect(page.locator(".course-sources li")).toHaveText(question.courseSources);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), question.id).toBe(true);
      const overflow = await page.locator(".answer-slot").evaluateAll((slots) =>
        slots.filter((slot) => slot.scrollWidth > slot.clientWidth + 1).map((slot) => slot.textContent),
      );
      expect(overflow, question.id).toEqual([]);
    }
  });
}
