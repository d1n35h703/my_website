import { test, expect } from "@playwright/test";

test("Ubuntu settings allows adding custom apps", async ({ page }) => {
  await page.goto("http://localhost:8080", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Login to Ubuntu
  const inlogButton = page.getByRole("button", { name: "inlog" });
  await inlogButton.scrollIntoViewIfNeeded();
  await inlogButton.click();
  await page.waitForTimeout(6000);

  const inputs = page.locator('input[inputmode="numeric"]');
  if ((await inputs.count()) === 6) {
    const code = "284639";
    for (let i = 0; i < 6; i++) {
      await inputs.nth(i).fill(code[i]);
    }
    await page.waitForTimeout(1500);
  }

  // Should be on Ubuntu desktop
  await expect(page.locator("text=Activities")).toBeVisible({ timeout: 5000 });

  // Open Settings app
  const settingsBtn = page.locator('button[aria-label="Open Settings"]');
  await settingsBtn.click();
  await page.waitForTimeout(500);

  // Check settings content is visible
  await expect(page.locator("text=portfolio-os 24.04 LTS")).toBeVisible({ timeout: 5000 });
  await expect(page.locator("text=Add Custom App")).toBeVisible({ timeout: 5000 });

  // Fill in custom app form
  const nameInput = page.locator('input[placeholder="App name"]');
  const urlInput = page.locator('input[placeholder="https://example.com"]');

  await nameInput.fill("My Dashboard");
  await urlInput.fill("https://dashboard.example.com");

  // Click Add App button
  const addBtn = page.locator('button:has-text("Add App")');
  await addBtn.click();
  await page.waitForTimeout(500);

  // Check the app was added
  await expect(page.locator("text=My Dashboard")).toBeVisible({ timeout: 5000 });
  await expect(page.locator("text=https://dashboard.example.com")).toBeVisible({ timeout: 5000 });

  await page.screenshot({ path: "test-results/07-settings-custom-app.png", fullPage: false });
});
