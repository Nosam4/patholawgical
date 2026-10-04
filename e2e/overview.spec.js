import { test, expect } from "@playwright/test";
import { courseCatalog } from "../src/courseData.js";
import { getQuestionAnswers } from "../src/quizLogic.js";
import { OVERVIEW_COURSE_ID, getOverviewSubjects } from "../src/overviewReview.js";

const overview = courseCatalog.find((course) => course.id === OVERVIEW_COURSE_ID);
const timelineSubject = "florida-civil-procedure-timelines";
const numbersQuestion = "fl-civpro-numbers-to-know";
const reviewSelect = (page) => page.getByLabel("Select review depth", { exact: true });
const classSelect = (page) => page.getByLabel("Select class", { exact: true });
const subjectSelect = (page) => page.getByLabel("Select subject", { exact: true });
const questionSelect = (page) => page.getByLabel("Select question", { exact: true });

async function optionValues(select) {
  return select.locator("option").evaluateAll((options) => options.map((option) => option.value));
}

async function openOverview(page) {
  await page.goto("./");
  await classSelect(page).selectOption(OVERVIEW_COURSE_ID);
}

async function answerFirstBlank(page, questionId) {
  const question = overview.subjects.flatMap((subject) => subject.questions)
    .find((item) => item.id === questionId);
  const answers = getQuestionAnswers(question);
  await page.locator(`[data-answer-id="${answers[0].id}"]`).getByRole("button").click();
  await page.getByRole("textbox").fill(answers[0].answer);
  await page.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${answers.length}`);
  return answers.length;
}

test("Overview defaults to Core and exposes three cumulative review depths", async ({ page }) => {
  await openOverview(page);
  await expect(reviewSelect(page)).toHaveValue("core");
  await expect(reviewSelect(page).locator("option")).toHaveText(["Core", "Standard", "Comprehensive"]);
  const counts = {};
  const questionIds = {};
  for (const level of ["core", "standard", "comprehensive"]) {
    await reviewSelect(page).selectOption(level);
    const subjects = getOverviewSubjects(overview, level);
    expect(await optionValues(subjectSelect(page))).toEqual(subjects.map((subject) => subject.id));
    questionIds[level] = [];
    for (const subject of subjects) {
      await subjectSelect(page).selectOption(subject.id);
      const ids = await optionValues(questionSelect(page));
      expect(ids, `${level}: ${subject.id}`).toEqual(subject.questions.map((question) => question.id));
      questionIds[level].push(...ids);
    }
    counts[level] = questionIds[level].length;
  }
  expect(counts).toEqual({ core: 27, standard: 45, comprehensive: 77 });
  expect(questionIds.standard).toEqual(expect.arrayContaining(questionIds.core));
  expect(questionIds.comprehensive).toEqual(expect.arrayContaining(questionIds.standard));
  expect(questionIds.comprehensive).toEqual(overview.subjects.flatMap((subject) => subject.questions.map((question) => question.id)));
});

test("review depth is scoped to Overview and leaves every other class available", async ({ page }) => {
  await openOverview(page);
  await reviewSelect(page).selectOption("core");
  for (const course of courseCatalog.filter((item) => item.id !== OVERVIEW_COURSE_ID)) {
    await classSelect(page).selectOption(course.id);
    await expect(reviewSelect(page)).toHaveCount(0);
    expect(await optionValues(subjectSelect(page))).toEqual(course.subjects.map((subject) => subject.id));
    expect(await optionValues(questionSelect(page))).toEqual(course.subjects[0].questions.map((question) => question.id));
  }
  await classSelect(page).selectOption(OVERVIEW_COURSE_ID);
  await expect(reviewSelect(page)).toHaveValue("core");
});

test("changing review depth preserves an included drill's answers and unfinished entry", async ({ page }) => {
  await openOverview(page);
  await subjectSelect(page).selectOption(timelineSubject);
  await expect(questionSelect(page)).toHaveValue(numbersQuestion);
  await answerFirstBlank(page, numbersQuestion);
  await page.getByRole("textbox").fill("unfinished entry");
  for (const level of ["standard", "comprehensive", "core"]) {
    await reviewSelect(page).selectOption(level);
    await expect(subjectSelect(page)).toHaveValue(timelineSubject);
    await expect(questionSelect(page)).toHaveValue(numbersQuestion);
    await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 23");
    await expect(page.getByRole("textbox")).toHaveValue("unfinished entry");
  }
});

for (const [level, questionId] of [
  ["standard", "fl-civpro-timelines-service"],
  ["comprehensive", "fl-civpro-timelines-period-6-months"],
]) {
  test(`a hidden ${level} drill resumes with its answers after class changes and reload`, async ({ page }) => {
    await openOverview(page);
    await reviewSelect(page).selectOption("comprehensive");
    await subjectSelect(page).selectOption(timelineSubject);
    await questionSelect(page).selectOption(questionId);
    const total = await answerFirstBlank(page, questionId);

    await reviewSelect(page).selectOption("core");
    await expect(subjectSelect(page)).toHaveValue(timelineSubject);
    await expect(questionSelect(page)).toHaveValue(numbersQuestion);
    await expect(questionSelect(page).locator(`option[value="${questionId}"]`)).toHaveCount(0);
    await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 23");
    await classSelect(page).selectOption("professional-responsibility-mpre");
    await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
    await expect(classSelect(page)).toHaveValue(OVERVIEW_COURSE_ID);
    await expect(reviewSelect(page)).toHaveValue(level);
    await expect(subjectSelect(page)).toHaveValue(timelineSubject);
    await expect(questionSelect(page)).toHaveValue(questionId);
    await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${total}`);

    await reviewSelect(page).selectOption("core");
    await page.reload();
    await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
    await expect(reviewSelect(page)).toHaveValue(level);
    await expect(questionSelect(page)).toHaveValue(questionId);
    await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${total}`);

    // Resuming a narrower drill must not reduce an already broader selection.
    await reviewSelect(page).selectOption("comprehensive");
    await classSelect(page).selectOption("professional-responsibility-mpre");
    await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
    await expect(reviewSelect(page)).toHaveValue("comprehensive");
    await expect(questionSelect(page)).toHaveValue(questionId);
    await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${total}`);
  });
}

test("Overview's depth control and filtered drills fit a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openOverview(page);
  for (const level of ["core", "standard", "comprehensive"]) {
    await reviewSelect(page).selectOption(level);
    await expect(reviewSelect(page)).toBeVisible();
    for (const subject of getOverviewSubjects(overview, level)) {
      await subjectSelect(page).selectOption(subject.id);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${level}: ${subject.id}`).toBe(true);
      const controlsFit = await page.locator("select").evaluateAll((selects) => selects.every((select) => {
        const bounds = select.getBoundingClientRect();
        return bounds.left >= 0 && bounds.right <= innerWidth;
      }));
      expect(controlsFit, `${level}: ${subject.id}`).toBe(true);
    }
  }
});
