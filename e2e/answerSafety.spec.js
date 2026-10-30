import { test, expect } from "@playwright/test";

test("repeated warranty answers fill only the selected clue", async ({ page }) => {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption("sales-and-leases-fall-2026");
  await page.getByLabel("Select subject", { exact: true }).selectOption("sales-leases");
  await page.getByLabel("Select question", { exact: true }).selectOption("sales-lease-warranties");

  const word = page.locator('[data-answer-id="sales-lease-warranties-word"]');
  await word.getByRole("button").click();
  await expect(word.getByRole("textbox")).toHaveAccessibleDescription(/Merchantability disclaimer must name/);
  await word.getByRole("textbox").fill("written and conspicuous");
  await word.getByRole("textbox").press("Enter");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 7");
  await expect(page.getByRole("status")).toHaveText("No match for this blank yet.");

  const pending = ["asis", "fitness", "form"];
  for (const [index, id] of pending.entries()) {
    const row = page.locator(`[data-answer-id="sales-lease-warranties-${id}"]`);
    await row.getByRole("button").click();
    await row.getByRole("textbox").fill("a conspicuous writing");
    await row.getByRole("textbox").press("Enter");
    await expect(row).toHaveClass(/correct/);
    await expect(row.locator(".answer-value")).toHaveText("written and conspicuous");
    await expect(page.locator(".completion-indicator")).toHaveText(`Filled ${index + 1} of 7`);
    for (const remaining of pending.slice(index + 1)) {
      await expect(page.locator(`[data-answer-id="sales-lease-warranties-${remaining}"]`)).not.toHaveClass(/correct/);
    }
  }
  await expect(word).not.toHaveClass(/correct/);
});

test("percentage answers reject contradictory comparison operators", async ({ page }) => {
  await page.goto("./");
  await page.getByLabel("Select class", { exact: true }).selectOption("overview-of-florida-law-fall-2026");
  await page.getByLabel("Select review depth", { exact: true }).selectOption("comprehensive");
  await page.getByLabel("Select subject", { exact: true }).selectOption("florida-business-entities");
  await page.getByLabel("Select question", { exact: true }).selectOption("fl-be-federal-securities");
  const row = page.locator('[data-answer-id="fl-be-short-swing-owner"]');
  await row.getByRole("button").click();
  for (const guess of ["<10%", "≤10%", "-10%"] ) {
    await row.getByRole("textbox").fill(guess);
    await row.getByRole("textbox").press("Enter");
    await expect(row).not.toHaveClass(/correct/);
    await expect(page.getByRole("status")).toHaveText("No match for this blank yet.");
  }
  await row.getByRole("textbox").fill("10%");
  await row.getByRole("textbox").press("Enter");
  await expect(row).toHaveClass(/correct/);
});
