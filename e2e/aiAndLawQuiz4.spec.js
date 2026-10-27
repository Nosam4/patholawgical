import { test, expect } from "@playwright/test";
import { aiAndLawQuiz4Subject } from "../src/aiAndLawQuiz4.js";
import { aiAndLawQuiz4PatentQuestions } from "../src/aiAndLawQuiz4Patents.js";
import { aiAndLawQuiz4IPQuestions } from "../src/aiAndLawQuiz4IP.js";
import { aiAndLawWeeks8And9Questions } from "../src/aiAndLawWeeks8And9.js";
import { getQuestionAnswers, normalizeAnswer } from "../src/quizLogic.js";

const courseId = "ai-and-law-fall-2026";
const subjectId = "quiz-4";
const decks = [
  { name: "patenting", questions: aiAndLawQuiz4PatentQuestions, fileId: "2508080" },
  { name: "IP launch", questions: aiAndLawQuiz4IPQuestions, fileId: "2508082" },
];

async function openQuiz4(page) {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption(courseId);
  await page.getByLabel("Select subject", { exact: true }).selectOption(subjectId);
}

async function submitAnswer(page, answer, guess = answer.answer) {
  const row = page.locator(`[data-answer-id="${answer.id}"]`);
  if (await row.getByRole("button").count()) await row.getByRole("button").click();
  await row.getByRole("textbox").fill(guess);
  await row.getByRole("textbox").press("Enter");
  await expect(row.locator(".answer-value")).toHaveText(answer.answer);
}

for (const { name, questions, fileId } of decks) {
  test(`Quiz #4 ${name} accepts aliases, resumes, and completes missed practice independently of Weeks 8–9`, async ({ page }) => {
    const question = questions.find((item) => getQuestionAnswers(item).length > 1
      && getQuestionAnswers(item).some((answer) => answer.acceptedAnswers?.some((alias) =>
        normalizeAnswer(alias) !== normalizeAnswer(answer.answer))));
    expect(question).toBeDefined();
    const answers = getQuestionAnswers(question);
    const answer = answers.find((item) => item.acceptedAnswers?.some((alias) =>
      normalizeAnswer(alias) !== normalizeAnswer(item.answer)));
    const alias = answer.acceptedAnswers.find((item) => normalizeAnswer(item) !== normalizeAnswer(answer.answer));
    const previousQuestion = aiAndLawWeeks8And9Questions[0];
    const previousAnswers = getQuestionAnswers(previousQuestion);

    await openQuiz4(page);
    await expect(page.getByLabel("Select subject", { exact: true }).locator("option:checked")).toHaveText("Quiz #4");
    await page.getByLabel("Select subject", { exact: true }).selectOption("week-8-9-intellectual-property");
    await page.getByLabel("Select question", { exact: true }).selectOption(previousQuestion.id);
    await submitAnswer(page, previousAnswers[0]);
    await page.getByLabel("Select subject", { exact: true }).selectOption(subjectId);
    await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
    await expect(page.locator(".completion-indicator")).toHaveText(`Filled 0 of ${answers.length}`);
    await expect(page.locator(".source-line > a")).toHaveAttribute("href", question.sourceUrl);
    expect(question.sourceUrl).toContain(`/files/${fileId}`);
    await page.locator(".course-sources summary").click();
    for (const reference of question.courseSources) {
      await expect(page.locator(".course-sources")).toContainText(reference);
    }

    await submitAnswer(page, answer, alias);
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
    for (const missedAnswer of answers.filter((item) => item.id !== answer.id)) {
      await submitAnswer(page, missedAnswer);
    }
    await expect(page.locator(".completion-indicator")).toHaveText(`Practice: ${answers.length - 1} of ${answers.length - 1}`);
    await expect(page.locator(".study-summary")).toContainText(`Best: 1/${answers.length}`);
    await expect(page.locator(".study-summary")).toContainText("Practice attempts: 1");
    await page.reload();
    await page.getByLabel("Select class", { exact: true }).selectOption(courseId);
    await page.getByLabel("Select subject", { exact: true }).selectOption(subjectId);
    await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
    await expect(page.locator(".study-summary")).toContainText(`Best: 1/${answers.length}`);
    await expect(page.getByRole("button", { name: /Practice missed answers/ })).toHaveCount(0);

    await page.getByLabel("Select subject", { exact: true }).selectOption("week-8-9-intellectual-property");
    await page.getByLabel("Select question", { exact: true }).selectOption(previousQuestion.id);
    await expect(page.locator(".completion-indicator")).toHaveText(`Filled 1 of ${previousAnswers.length}`);
  });
}

for (const width of [1280, 390]) {
  test(`all Quiz #4 drills and source notes fit at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 844 });
    await openQuiz4(page);

    for (const question of aiAndLawQuiz4Subject.questions) {
      await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
      const answers = getQuestionAnswers(question);
      await expect(page.locator(".completion-indicator")).toHaveText(`Filled 0 of ${answers.length}`);
      await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
      await page.locator(".course-sources").evaluate((node) => { node.open = true; });
      await expect(page.locator(".answer-value")).toHaveCount(answers.length);
      await expect(page.locator(".source-line > a")).toHaveAttribute("href", question.sourceUrl);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), question.id).toBe(true);
      const clipped = await page.locator(".answer-value, .answer-explanation, .answer-indicator, .course-sources li").evaluateAll((nodes) =>
        nodes.filter((node) => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1)
          .map((node) => node.textContent));
      expect(clipped, question.id).toEqual([]);
    }

    await page.screenshot({ path: testInfo.outputPath(`ai-quiz4-${width}.png`), fullPage: true });
  });
}
