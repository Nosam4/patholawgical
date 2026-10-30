import { test, expect } from "@playwright/test";
import { courseCatalog } from "../src/courseData.js";

const civil = courseCatalog.find((course) => course.id === "civil-procedure-fall-2026");
const dismissal = civil.subjects[0].questions[0];

for (const width of [1280, 390]) {
  test(`flowchart text view exposes only visible answers and stays synchronized at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("./");
    await page.getByLabel("Select class", { exact: true }).selectOption(civil.id);
    await page.locator(".flowchart-text-view summary").click();
    const textView = page.getByRole("region", { name: `${dismissal.title} text view`, exact: true });
    await expect(textView).toBeVisible();
    await expect(textView.getByText("Unanswered blank", { exact: true })).toHaveCount(6);
    const snapshot = await textView.ariaSnapshot();
    for (const node of dismissal.nodes) {
      await expect(textView.getByText(node.answer, { exact: true })).toHaveCount(0);
      expect(snapshot).not.toContain(node.answer);
    }
    await expect(textView.locator(".flowchart-text-branches")).toContainText("Step 2 — No: continue to Step 3.");
    await expect(textView.locator(".flowchart-text-branches")).toContainText("Step 2 — Yes: continue to Step 4.");
    const nextStep = textView.locator(".flowchart-text-branches").getByRole("link", { name: "Step 3", exact: true }).first();
    await nextStep.click();
    await expect(textView.locator("[data-node-id='first_dismissal_effect']")).toBeFocused();

    const input = page.getByRole("textbox", { name: "Type a rule phrase", exact: true });
    await input.fill(dismissal.nodes[0].answer);
    await input.press("Enter");
    const recalled = textView.locator(`[data-node-id="${dismissal.nodes[0].id}"]`);
    await expect(recalled).toContainText(dismissal.nodes[0].answer);
    await expect(recalled.locator(".flowchart-text-status")).toHaveText("Recalled");
    await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
    await expect(textView.getByText("Unanswered blank", { exact: true })).toHaveCount(0);
    const revealedSnapshot = await textView.ariaSnapshot();
    for (const node of dismissal.nodes) expect(revealedSnapshot).toContain(node.answer);
    await expect(textView.locator(".flowchart-text-status", { hasText: "Missed" })).toHaveCount(5);

    await page.getByRole("button", { name: "Practice missed answers (5)", exact: true }).click();
    await expect(recalled).toContainText(dismissal.nodes[0].answer);
    await expect(recalled.locator(".flowchart-text-status")).toHaveText("Previously recalled");
    await expect(textView.getByText("Unanswered blank", { exact: true })).toHaveCount(5);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test("flowchart text view includes static context and keeps unrecalled targets hidden", async ({ page }) => {
  await page.goto("./");
  await page.getByLabel("Select subject", { exact: true }).selectOption("pr-conflicts");
  await page.getByLabel("Select question", { exact: true }).selectOption("pr-rule-1-7");
  await page.locator(".flowchart-text-view summary").click();
  const textView = page.locator(".flowchart-text-content");
  await expect(textView.getByText("Proposed or continuing representation", { exact: true })).toBeVisible();
  await expect(textView.getByText("Context", { exact: true })).toHaveCount(1);
  await expect(textView.getByText("Unanswered blank", { exact: true })).toHaveCount(9);
  await expect(textView.getByText("representation is directly adverse to another current client", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Reveal Missed Answers", exact: true }).click();
  await expect(textView.getByText("representation is directly adverse to another current client", { exact: true })).toBeVisible();
});
