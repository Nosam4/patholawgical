import { test, expect } from "@playwright/test";

async function drillIds(page) {
  return page.locator("#questionSelect option").evaluateAll((options) => options.map((option) => option.value));
}

async function coverSet(page, initialIds = []) {
  const question = page.getByLabel("Select question", { exact: true });
  const ids = await drillIds(page);
  const seen = new Set(initialIds);
  let previous = await question.inputValue();
  for (let index = seen.size; index < ids.length; index += 1) {
    await page.getByRole("button", { name: "Randomize", exact: true }).click();
    const selected = await question.inputValue();
    expect(selected).not.toBe(previous);
    expect(seen.has(selected)).toBe(false);
    seen.add(selected);
    previous = selected;
  }
  expect([...seen].sort()).toEqual([...ids].sort());
}

test("random practice covers the subject before repeating, including a full second cycle", async ({ page }) => {
  await page.goto("./");
  const initial = await page.getByLabel("Select question", { exact: true }).inputValue();
  await coverSet(page, [initial]);
  await coverSet(page);
  await expect(page.getByLabel("Select class", { exact: true })).toHaveValue("professional-responsibility-mpre");
  await expect(page.getByLabel("Select subject", { exact: true })).toHaveValue("pr-fundamentals");
  await expect(page.locator(".study-summary")).toContainText("Full attempts: 0");
});

test("randomizing preserves a partial run and restores it when returning", async ({ page }) => {
  await page.goto("./");
  const question = page.getByLabel("Select question", { exact: true });
  const initial = await question.inputValue();
  await page.getByRole("button", { name: "Blank answer 1 for Required for Competence", exact: true }).click();
  await page.getByRole("textbox").fill("knowledge");
  await page.getByRole("textbox").press("Enter");
  await page.getByRole("button", { name: "Randomize", exact: true }).click();
  await expect(question).not.toHaveValue(initial);
  await question.selectOption(initial);
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 4");
  await expect(page.getByRole("status")).toHaveText("Rule 1.1: Competence. Saved run resumed.");
  await expect(page.locator(".study-summary")).toContainText("Full attempts: 0");
  await page.reload();
  await page.getByRole("button", { name: "Resume saved run", exact: true }).click();
  await expect(page.locator(".completion-indicator")).toHaveText("Filled 1 of 4");
});

test("random practice respects Overview depth and keeps separate subject sets", async ({ page }) => {
  await page.goto("./");
  const question = page.getByLabel("Select question", { exact: true });
  const initial = await question.inputValue();
  await page.getByRole("button", { name: "Randomize", exact: true }).click();
  const firstRandom = await question.inputValue();
  await page.getByLabel("Select class", { exact: true }).selectOption("overview-of-florida-law-fall-2026");
  const coreIds = await drillIds(page);
  await coverSet(page, [await question.inputValue()]);
  await expect(page.locator("#randomizeDescription")).toContainText("at core depth");
  await page.getByLabel("Select review depth", { exact: true }).selectOption("comprehensive");
  expect((await drillIds(page)).length).toBeGreaterThan(coreIds.length);
  await coverSet(page, [await question.inputValue()]);
  await page.getByLabel("Select review depth", { exact: true }).selectOption("core");
  await coverSet(page);
  await page.getByLabel("Select class", { exact: true }).selectOption("professional-responsibility-mpre");
  await coverSet(page, [initial, firstRandom]);
});

for (const width of [1280, 390]) {
  test(`randomize remains usable and explains single-drill subjects at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("./");
    const randomize = page.getByRole("button", { name: "Randomize", exact: true });
    await expect(randomize).toBeEnabled();
    await randomize.click();
    const title = await page.locator(".quiz-heading h2").innerText();
    await expect(page.getByRole("status")).toHaveText(`Random drill: ${title}.`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByLabel("Select class", { exact: true }).selectOption("civil-procedure-fall-2026");
    await expect(randomize).toBeDisabled();
    await expect(page.locator("#randomizeDescription")).toHaveText("Only one drill in this subject.");
  });
}
