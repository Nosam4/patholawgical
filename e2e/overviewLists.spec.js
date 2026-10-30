import { test, expect } from "@playwright/test";
import { OVERVIEW_LISTS_COURSE_ID, overviewListsCourse } from "../src/overviewLists.js";
import { getQuestionAnswers } from "../src/quizLogic.js";

const firstSubject = overviewListsCourse.subjects[0];
const firstList = firstSubject.questions[0];
const answers = getQuestionAnswers(firstList);

async function openLists(page) {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption(OVERVIEW_LISTS_COURSE_ID);
}

async function submit(page, answer) {
  await page.getByRole("textbox", { name: "List answer", exact: true }).fill(answer);
  await page.getByRole("textbox", { name: "List answer", exact: true }).press("Enter");
}

test("list recall accepts arbitrary order, rejects vague entries, and never scores duplicates", async ({ page }) => {
  await openLists(page);
  const input = page.getByRole("textbox", { name: "List answer", exact: true });
  await expect(input).toBeFocused();
  await expect(page.getByLabel("Select review depth", { exact: true })).toHaveCount(0);
  await expect(page.locator(".list-item-blank")).toHaveCount(answers.length);
  await expect(page.locator(".answer-indicator, .list-item-explanation, .list-explanation")).toHaveCount(0);
  await expect(page.locator(".list-item-mnemonic")).toHaveCount(0);
  await page.getByRole("button", { name: "Show Mnemonic", exact: true }).click();
  await expect(page.locator(".list-item-mnemonic")).toHaveText([..."SCANND"]);
  await expect(page.locator(".list-item-answer")).toHaveCount(0);
  await page.getByRole("button", { name: "Hide Mnemonic", exact: true }).click();
  await expect(page.locator(".list-item-mnemonic")).toHaveCount(0);
  await submit(page, "county");
  await expect(page.locator(".completion-indicator")).toHaveText(`Recalled 0 of ${answers.length}`);
  await expect(page.getByRole("status")).toContainText("No match");
  const reversed = [...answers].reverse();
  await submit(page, reversed[0].acceptedAnswers?.[0] ?? reversed[0].answer);
  await expect(page.locator(".completion-indicator")).toHaveText(`Recalled 1 of ${answers.length}`);
  await expect(input).toBeFocused();
  await submit(page, reversed[0].answer);
  await expect(page.locator(".completion-indicator")).toHaveText(`Recalled 1 of ${answers.length}`);
  await expect(page.getByRole("status")).toContainText("already recalled");
  for (const answer of reversed.slice(1)) await submit(page, answer.acceptedAnswers?.[0] ?? answer.answer);
  await expect(page.locator(".completion-indicator")).toHaveText(`Recalled ${answers.length} of ${answers.length}`);
  await expect(page.locator(".list-item-answer")).toHaveText(answers.map((answer) => answer.answer));
  await expect(input).toBeDisabled();
  await expect(page.locator(".study-summary")).toContainText(`Full attempts: 1 · Best: ${answers.length}/${answers.length}`);
});

test("the curated count is visible only for the limited list bank", async ({ page }) => {
  await openLists(page);
  await expect(page.locator(".list-bank-description")).toHaveText(
    "13 focused lists across 5 subjects. Limited to 15 to keep review manageable.",
  );
  await page.getByLabel("Select subject", { exact: true }).selectOption("florida-business-entities");
  await expect(page.getByLabel("Select question", { exact: true }).locator("option")).toHaveCount(2);
  await page.getByLabel("Select class", { exact: true }).selectOption("overview-of-florida-law-fall-2026");
  await expect(page.locator(".list-bank-description")).toHaveCount(0);
  await expect(page.getByLabel("Select review depth", { exact: true })).toBeVisible();
});

test("list resume and missed practice preserve earned scores and existing Overview progress", async ({ page }) => {
  await openLists(page);
  await submit(page, answers.at(-1).answer);
  await page.getByLabel("Select class", { exact: true }).selectOption("overview-of-florida-law-fall-2026");
  await expect(page.getByLabel("Select review depth", { exact: true })).toBeVisible();
  await expect(page.locator(".completion-indicator")).toContainText("Filled 0");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.getByLabel("Select class", { exact: true })).toHaveValue(OVERVIEW_LISTS_COURSE_ID);
  await expect(page.locator(".completion-indicator")).toHaveText(`Recalled 1 of ${answers.length}`);
  await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
  await expect(page.locator(".list-item-status").filter({ hasText: /^Missed$/ })).toHaveCount(answers.length - 1);
  await expect(page.locator(".study-summary")).toContainText(`Full attempts: 1 · Best: 1/${answers.length}`);
  await expect(page.locator(".list-explanation")).toBeVisible();
  await page.getByRole("button", { name: `Practice missed answers (${answers.length - 1})`, exact: true }).click();
  await expect(page.locator(".list-item-status").filter({ hasText: /^Previously recalled$/ })).toHaveCount(1);
  for (const answer of [...answers.slice(0, -1)].reverse()) await submit(page, answer.answer);
  await expect(page.locator(".completion-indicator")).toHaveText(`Practice: Recalled ${answers.length - 1} of ${answers.length - 1}`);
  await expect(page.locator(".study-summary")).toContainText(`Full attempts: 1 · Best: 1/${answers.length}`);
  await expect(page.locator(".study-summary")).toContainText("Practice attempts: 1");
  await page.getByRole("button", { name: "Start Fresh", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "List answer", exact: true })).toBeEnabled();
  await expect(page.locator(".list-item-blank")).toHaveCount(answers.length);
});

test("CANT hints stay aligned through unordered recall, resume, and missed practice", async ({ page }) => {
  await openLists(page);
  await page.getByLabel("Select subject", { exact: true }).selectOption("florida-civil-procedure");
  await page.getByLabel("Select question", { exact: true }).selectOption("fl-lists-class-prerequisites");
  await page.getByRole("button", { name: "Show Mnemonic", exact: true }).click();
  await expect(page.locator(".list-item-mnemonic")).toHaveText([..."CANT"]);
  await expect(page.locator(".list-item-answer")).toHaveCount(0);
  await submit(page, "typicality");
  const typicality = page.locator('[data-answer-id="fl-lists-class-prerequisites-typicality"]');
  await expect(typicality.locator(".list-item-mnemonic")).toHaveText("T");
  await expect(page.locator(".completion-indicator")).toHaveText("Recalled 1 of 4");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.getByLabel("Select question", { exact: true })).toHaveValue("fl-lists-class-prerequisites");
  await expect(page.locator(".completion-indicator")).toHaveText("Recalled 1 of 4");
  await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
  await expect(page.locator(".list-item-answer")).toHaveText([
    "Commonality", "Adequacy of representation", "Numerosity", "Typicality",
  ]);
  await page.getByRole("button", { name: "Practice missed answers (3)", exact: true }).click();
  await page.getByRole("button", { name: "Show Mnemonic", exact: true }).click();
  await expect(page.locator(".list-item-mnemonic")).toHaveText([..."CANT"]);
  await expect(typicality.locator(".list-item-status")).toHaveText("Previously recalled");
  for (const answer of ["numerosity", "adequacy", "commonality"]) await submit(page, answer);
  await expect(page.locator(".completion-indicator")).toHaveText("Practice: Recalled 3 of 3");
  await expect(page.locator(".study-summary")).toContainText("Full attempts: 1 · Best: 1/4");
  await expect(page.locator(".study-summary")).toContainText("Practice attempts: 1");
});

for (const width of [1280, 390]) {
  test(`every pilot list reveals in source order with readable context at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await openLists(page);
    for (const subject of overviewListsCourse.subjects) {
      await page.getByLabel("Select subject", { exact: true }).selectOption(subject.id);
      for (const question of subject.questions) {
        await page.getByLabel("Select question", { exact: true }).selectOption(question.id);
        await expect(page.locator(".list-item-answer")).toHaveCount(0);
        await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
        await expect(page.locator(".list-item-answer")).toHaveText(getQuestionAnswers(question).map((answer) => answer.answer));
        await page.locator(".course-sources summary").click();
        await expect(page.locator(".course-sources")).toContainText(question.courseSources[0]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), question.id).toBe(true);
        const overflow = await page.locator(".list-item-content").evaluateAll((items) => items
          .filter((item) => item.scrollWidth > item.clientWidth + 1).map((item) => item.textContent));
        expect(overflow, question.id).toEqual([]);
      }
    }
  });
}
