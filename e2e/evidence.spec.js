import { test, expect } from "@playwright/test";
import { courseCatalog } from "../src/courseData.js";
import { evidenceAidsAndSummariesQuestion, evidenceWitnessFoundationsQuestion } from "../src/evidenceFoundationQuestions.js";
import { evidenceCaseSubject } from "../src/evidenceCaseQuestions.js";
import { getQuestionAnswers, STORAGE_KEY } from "../src/quizLogic.js";
import { saveRun } from "../src/studyProgress.js";

const evidenceCourse = courseCatalog.find(course => course.id === "evidence-fall-2026");

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
  await hillmon.getByRole("textbox").click();
  await page.locator("input:focus").fill("Hillman");
  await page.locator("input:focus").press("Enter");
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
  await majority.getByRole("textbox").click();
  await page.locator("input:focus").fill("yes");
  await page.locator("input:focus").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 4");
  await expect(page.locator(".answer-explanation")).toHaveCount(0);
  await page.locator("input:focus").fill("no");
  await page.locator("input:focus").press("Enter");
  await expect(majority.locator(".answer-explanation")).toContainText("Five rejected");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 4");
});

test("Evidence menus and resume omit retired midterm material", async ({ page }) => {
  const retired = { id: "evidence-cases-identify-midterm", type: "sporcle-grid", columns: [{ answers: [
    { id: "evidence-cases-identify-midterm-old-chief", answer: "Old Chief" },
    { id: "evidence-cases-identify-midterm-daubert", answer: "Daubert" },
    { id: "evidence-cases-identify-midterm-huddleston", answer: "Huddleston" },
  ] }] };
  const progress = saveRun({ progressMap: {}, question: retired,
    targetIds: getQuestionAnswers(retired).map(answer => answer.id),
    guessedIds: new Set(["evidence-cases-identify-midterm-old-chief"]), now: 10000 });
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), { key: STORAGE_KEY, value: progress });
  await evidence(page, "evidence-basic-analysis");
  await expect(page.getByRole("button", { name: "Resume saved run", exact: true })).toHaveCount(0);
  const subjects = page.getByLabel("Select subject", { exact: true });
  expect((await subjects.locator("option").allTextContents()).join(" ")).not.toMatch(/midterm/i);
  await expect(subjects.locator('option[value="evidence-slide-applications"]')).toHaveCount(0);
  for (const subject of evidenceCourse.subjects) {
    await subjects.selectOption(subject.id);
    const questions = page.getByLabel("Select question", { exact: true });
    expect((await questions.locator("option").allTextContents()).join(" ")).not.toMatch(/midterm/i);
    await expect(questions.locator('option[value="evidence-cases-identify-midterm"]')).toHaveCount(0);
    await expect(questions.locator('option[value="evidence-analysis-full"]')).toHaveCount(0);
  }
});

for (const width of [1280, 390]) {
  test(`retained Evidence foundations, cases, and source notes fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await evidence(page, "privileges-and-witnesses");
    for (const subject of [
      { id: "privileges-and-witnesses", questions: [evidenceWitnessFoundationsQuestion] },
      { id: "authentication-and-contents", questions: [evidenceAidsAndSummariesQuestion] },
      evidenceCaseSubject,
    ]) {
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
