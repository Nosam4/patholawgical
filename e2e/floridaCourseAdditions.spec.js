import { test, expect } from "@playwright/test";
import { courseCatalog } from "../src/courseData.js";
import { getQuestionAnswers, isAnswerMatch, normalizeAnswer } from "../src/quizLogic.js";
import { OVERVIEW_COURSE_ID, getOverviewSubjects } from "../src/overviewReview.js";

const overview = courseCatalog.find((course) => course.id === OVERVIEW_COURSE_ID);
const subjectIds = ["florida-trusts", "florida-wills", "florida-evidence-distinctions"];

async function openSubject(page, subjectId, level = "core") {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption(OVERVIEW_COURSE_ID);
  await page.getByLabel("Select review depth", { exact: true }).selectOption(level);
  await page.getByLabel("Select subject", { exact: true }).selectOption(subjectId);
}

for (const subjectId of subjectIds) {
  const subject = overview.subjects.find((entry) => entry.id === subjectId);

  test(`${subjectId} supports review depths, selected-blank scoring, and saved progress`, async ({ page }) => {
    await openSubject(page, subjectId);
    for (const level of ["core", "standard", "comprehensive"]) {
      await page.getByLabel("Select review depth", { exact: true }).selectOption(level);
      const expected = getOverviewSubjects(overview, level).find((entry) => entry.id === subjectId);
      await expect(page.getByLabel("Select question", { exact: true }).locator("option"))
        .toHaveText(expected.questions.map((question) => question.title));
    }
    await page.getByLabel("Select review depth", { exact: true }).selectOption("core");
    const question = getOverviewSubjects(overview, "core").find((entry) => entry.id === subjectId).questions[0];
    await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
    const answers = getQuestionAnswers(question);
    const target = answers[0];
    const other = answers.find((entry) => !isAnswerMatch(target, normalizeAnswer(entry.answer)));
    expect(other).toBeTruthy();
    const input = page.locator(`[data-answer-id="${target.id}"] input`);
    await input.fill(other.answer);
    await input.press("Enter");
    await expect(page.locator(".completion-indicator")).toHaveText(`Filled 0 of ${answers.length}`);
    await input.fill(target.answer);
    await input.press("Enter");
    await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${answers.length}`);
    await page.reload();
    await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
    await expect(page.getByLabel("Select subject", { exact: true })).toHaveValue(subjectId);
    await expect(page.getByLabel("Select question", { exact: true })).toHaveValue(question.id);
    await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${answers.length}`);
    await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
    await page.getByRole("button", { name: `Practice missed answers (${answers.length - 1})`, exact: true }).click();
    await expect(page.locator(".completion-indicator")).toHaveText(`Practice: 0 of ${answers.length - 1}`);
  });

  for (const width of [1280, 390]) {
    test(`${subjectId} reveals every drill and source panel at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 844 });
      await openSubject(page, subjectId, "comprehensive");
      for (const question of subject.questions) {
        await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
        await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
        await expect(page.locator(".answer-value")).toHaveText(getQuestionAnswers(question).map((entry) => entry.answer));
        await expect(page.getByRole("link", { name: question.sourceLabel, exact: true }))
          .toHaveAttribute("href", question.sourceUrl);
        await page.locator(".course-sources summary").click();
        await expect(page.locator(".course-sources li")).toHaveText(question.courseSources);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), question.id).toBe(true);
        const overflow = await page.locator(".answer-slot").evaluateAll((slots) =>
          slots.filter((slot) => slot.scrollWidth > slot.clientWidth + 1).map((slot) => slot.textContent),
        );
        expect(overflow, question.id).toEqual([]);
        if (question === subject.questions[0]) {
          await page.screenshot({ path: testInfo.outputPath("revealed.png"), fullPage: true });
        }
      }
    });
  }
}
