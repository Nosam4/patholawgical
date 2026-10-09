import { test, expect } from "@playwright/test";
import { courseCatalog } from "../src/courseData.js";
import { freRule803Question } from "../src/freRemainingQuestions.js";
import { getQuestionAnswers } from "../src/quizLogic.js";

const course = courseCatalog.find((item) => item.id === "evidence-fall-2026");
const subject = course.subjects.find((item) => item.questions.some((question) => question.id === freRule803Question.id));
const groups = [
  { title: "PERMS + BAR", rules: [1, 2, 5, 4, 3, 6, 7, 14], letters: "PERMSBAR" },
  { title: "CRAFT + 3 Reputations", rules: [12, 11, 16, 13, 18, 19, 20, 21], letters: "CRAFTRRR" },
  { title: "VAMPS + 2 Judgments", rules: [9, 10, 17, 8, 15, 22, 23], letters: "VAMPSJJ" },
];
const officialNames = [
  "Present Sense Impression",
  "Excited Utterance",
  "Then-Existing Mental, Emotional, or Physical Condition",
  "Statement Made for Medical Diagnosis or Treatment",
  "Recorded Recollection",
  "Records of a Regularly Conducted Activity",
  "Absence of a Record of a Regularly Conducted Activity",
  "Public Records",
  "Public Records of Vital Statistics",
  "Absence of a Public Record",
  "Records of Religious Organizations Concerning Personal or Family History",
  "Certificates of Marriage, Baptism, and Similar Ceremonies",
  "Family Records",
  "Records of Documents That Affect an Interest in Property",
  "Statements in Documents That Affect an Interest in Property",
  "Statements in Ancient Documents",
  "Market Reports and Similar Commercial Publications",
  "Statements in Learned Treatises, Periodicals, or Pamphlets",
  "Reputation Concerning Personal or Family History",
  "Reputation Concerning Boundaries or General History",
  "Reputation Concerning Character",
  "Judgment of a Previous Conviction",
  "Judgments Involving Personal, Family, or General History, or a Boundary",
];
const answersByRule = new Map(getQuestionAnswers(freRule803Question).map((answer) => [Number(answer.indicator.replace(/[()]/g, "")), answer]));

function rowFor(page, rule) {
  return page.locator(`.answer-row[data-answer-id="${answersByRule.get(rule).id}"]`);
}

async function openRule803(page) {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption(course.id);
  await page.getByLabel("Select subject", { exact: true }).selectOption(subject.id);
  await page.getByLabel("Select question", { exact: true }).selectOption(freRule803Question.id);
}

async function submitRule(page, rule, guess = officialNames[rule - 1]) {
  const row = rowFor(page, rule);
  const blank = row.getByRole("button");
  if (await blank.count()) await blank.click();
  const input = row.getByRole("textbox");
  await input.fill(guess);
  await input.press("Enter");
  await expect(row.locator(".answer-value")).toHaveText(officialNames[rule - 1]);
  await expect(row).toHaveClass(/correct/);
}

for (const width of [1280, 390]) {
  test(`Rule 803 mnemonic columns preserve all exceptions and fit at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await openRule803(page);
    const columns = page.locator(".sporcle-column");
    await expect(columns).toHaveCount(3);
    await expect(columns.locator("h3")).toHaveText(groups.map((group) => group.title));
    await expect(page.locator(".answer-row")).toHaveCount(23);
    await expect(page.locator(".mnemonic-clue")).toHaveCount(0);
    await expect(page.locator(".answer-value")).toHaveCount(0);
    for (const [index, group] of groups.entries()) {
      await expect(columns.nth(index).locator(".answer-indicator > span")).toHaveText(group.rules.map((rule) => `(${rule})`));
    }

    await page.getByRole("button", { name: "Show Mnemonic", exact: true }).click();
    await expect(page.getByRole("button", { name: "Hide Mnemonic", exact: true })).toHaveAttribute("aria-pressed", "true");
    for (const [index, group] of groups.entries()) {
      await expect(columns.nth(index).locator(".mnemonic-clue")).toHaveText([...group.letters]);
    }
    await page.getByRole("button", { name: "Hide Mnemonic", exact: true }).click();
    await expect(page.locator(".mnemonic-clue")).toHaveCount(0);
    await page.getByRole("button", { name: "Show Mnemonic", exact: true }).click();
    await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
    for (const [index, group] of groups.entries()) {
      await expect(columns.nth(index).locator(".answer-value")).toHaveText(group.rules.map((rule) => officialNames[rule - 1]));
    }
    await expect(page.locator(".completion-confetti")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const clipped = await page.locator(".answer-value, .answer-indicator, .mnemonic-clue, .sporcle-column h3").evaluateAll((nodes) => nodes.filter((node) => node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1).map((node) => node.textContent));
    expect(clipped).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath(`rule-803-mnemonics-${width}.png`), fullPage: true });
  });
}

test("Rule 803 accepts existing aliases and navigates across the new columns before resuming", async ({ page }) => {
  await openRule803(page);
  await submitRule(page, 6, "business records");
  await expect(rowFor(page, 7).getByRole("textbox")).toBeFocused();

  await rowFor(page, 14).getByRole("button").click();
  await rowFor(page, 14).getByRole("textbox").press("Tab");
  await expect(rowFor(page, 12).getByRole("textbox")).toBeFocused();
  await rowFor(page, 12).getByRole("textbox").press("Shift+Tab");
  await expect(rowFor(page, 14).getByRole("textbox")).toBeFocused();
  await rowFor(page, 14).getByRole("textbox").press("ArrowDown");
  await expect(rowFor(page, 12).getByRole("textbox")).toBeFocused();
  await submitRule(page, 12, "marriage and baptism certificates");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 2 of 23");

  await page.reload();
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.getByLabel("Select question", { exact: true })).toHaveValue(freRule803Question.id);
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 2 of 23");
  await expect(rowFor(page, 6).locator(".answer-value")).toHaveText(officialNames[5]);
  await expect(rowFor(page, 12).locator(".answer-value")).toHaveText(officialNames[11]);
  await expect(page.locator(".completion-confetti")).toHaveCount(0);
});

test("finishing all 23 Rule 803 exceptions celebrates only the final correct answer", async ({ page }) => {
  await openRule803(page);
  const ruleOrder = groups.flatMap((group) => group.rules);
  for (const rule of ruleOrder.slice(0, -1)) {
    await submitRule(page, rule);
    await expect(page.locator(".completion-confetti")).toHaveCount(0);
  }
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 22 of 23");
  await submitRule(page, ruleOrder.at(-1));
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 23 of 23");
  await expect(page.locator(".completion-confetti")).toBeVisible();
  expect(await page.locator(".completion-confetti-piece").count()).toBeGreaterThan(0);
  await expect(page.getByRole("button", { name: "Reveal Missed Answers", exact: true })).toBeDisabled();
  await expect(page.locator("#messageText")).toHaveText("Complete. All blanks filled.");
});
