import { test, expect } from "@playwright/test";
import { PROGRESS_ENTRY_PREFIX } from "../src/progressStore.js";

async function submit(page, id, guess) {
  const row = page.locator(`[data-answer-id="${id}"]`);
  const button = row.getByRole("button");
  if (await button.count()) await button.click();
  await row.getByRole("textbox").fill(guess);
  await row.getByRole("textbox").press("Enter");
  await expect(page.locator(".save-state")).toHaveText("Progress saved in this browser.");
}

test("two already-open tabs preserve different drills and completed history after reload", async ({ page, context }) => {
  const other = await context.newPage();
  await Promise.all([page.goto("./"), other.goto("./")]);
  await other.getByLabel("Select question", { exact: true }).selectOption("pr-rule-1-3");
  await Promise.all([
    submit(page, "pr-1-1-1-1", "knowledge"),
    submit(other, "pr-1-3-1-1", "diligence"),
  ]);
  await submit(other, "pr-1-3-1-2", "promptness");
  await submit(page, "pr-1-1-1-2", "skill");
  await Promise.all([page.reload(), other.reload()]);
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 2 of 4");
  await expect(page.locator(".answer-value")).toHaveText(["legal knowledge", "legal skill"]);
  await other.getByLabel("Select question", { exact: true }).selectOption("pr-rule-1-3");
  await expect(other.locator(".study-summary")).toContainText("Full attempts: 1 · Best: 2/2");
});

test("shared runs merge different answers and count simultaneous completion once", async ({ page, context }) => {
  await page.goto("./");
  await submit(page, "pr-1-1-1-1", "knowledge");
  const other = await context.newPage();
  await other.goto("./");
  await other.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await Promise.all([
    submit(page, "pr-1-1-1-2", "skill"),
    submit(other, "pr-1-1-1-3", "thoroughness"),
  ]);
  await Promise.all([page.reload(), other.reload()]);
  await Promise.all([page, other].map(async (tab) => {
    await tab.getByRole("button", { name: "Resume saved run", exact: true }).click();
    await expect(tab.locator(".completion-indicator")).toHaveText("Filled 3 of 4");
  }));
  await Promise.all([
    submit(page, "pr-1-1-1-4", "preparation"),
    submit(other, "pr-1-1-1-4", "preparation"),
  ]);
  await Promise.all([page.reload(), other.reload()]);
  for (const tab of [page, other]) {
    await expect(tab.locator(".study-summary")).toContainText("Full attempts: 1 · Best: 4/4");
    await expect(tab.getByRole("button", { name: "Resume saved run", exact: true })).toHaveCount(0);
  }
});

test("a stale tab cannot overwrite Start Fresh in another tab", async ({ page, context }) => {
  await page.goto("./");
  await submit(page, "pr-1-1-1-1", "knowledge");
  const other = await context.newPage();
  await other.goto("./");
  await other.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await page.getByRole("button", { name: "Start Fresh", exact: true }).click();
  await expect(page.locator(".save-state")).toHaveText("Progress saved in this browser.");
  await submit(other, "pr-1-1-1-2", "skill");
  await expect(other.getByRole("status")).toHaveText("Another tab changed this drill. Its latest saved run is now shown.");
  await expect(other.locator(".completion-indicator")).toHaveText("Filled 0 of 4");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 0 of 4");
  await expect(page.locator(".study-summary")).toContainText("Full attempts: 0");
});

test("unavailable safe coordination warns and keeps the session usable in memory", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "locks", { value: undefined }));
  await page.goto("./");
  const row = page.locator('[data-answer-id="pr-1-1-1-1"]');
  await row.getByRole("button").click();
  await row.getByRole("textbox").fill("knowledge");
  await row.getByRole("textbox").press("Enter");
  await expect(page.getByRole("alert")).toContainText("Progress could not be saved safely");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 4");
  await page.getByLabel("Select question", { exact: true }).selectOption("pr-rule-1-3");
  await page.getByLabel("Select question", { exact: true }).selectOption("pr-rule-1-1");
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 4");
});

test("an accepted answer survives immediate reload while another tab holds the save lock", async ({ page, context }) => {
  const blocker = await context.newPage();
  await Promise.all([page.goto("./"), blocker.goto("./")]);
  await blocker.evaluate(async (lockName) => {
    let acquired;
    const ready = new Promise((resolve) => { acquired = resolve; });
    window.heldProgressLock = navigator.locks.request(lockName, () => {
      acquired();
      return new Promise((resolve) => { window.releaseProgressLock = resolve; });
    });
    await ready;
  }, `${PROGRESS_ENTRY_PREFIX}pr-rule-1-1`);

  try {
    const row = page.locator('[data-answer-id="pr-1-1-1-1"]');
    await row.getByRole("button").click();
    await row.getByRole("textbox").fill("knowledge");
    await row.getByRole("textbox").press("Enter");
    await expect(page.locator(".save-state")).toHaveText("Saving progress…");
    await page.reload();
    await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
    await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 4");
  } finally {
    await blocker.evaluate(() => window.releaseProgressLock());
  }
  await submit(page, "pr-1-1-1-2", "skill");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 2 of 4");
});
