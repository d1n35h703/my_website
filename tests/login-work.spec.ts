import { test, expect } from "@playwright/test";

test("Portfolio loads and inlog button works", async ({ page }) => {
  await page.goto("http://localhost:8080", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Portfolio should load directly (no login gate)
  const hero = page.locator("text=DEFEND WITH");
  await expect(hero).toBeVisible({ timeout: 10000 });
  await page.screenshot({ path: "test-results/01-portfolio-loads.png", fullPage: true });

  // Scroll to footer and find inlog button
  const inlogButton = page.getByRole("button", { name: "inlog" });
  await inlogButton.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: "test-results/02-footer-inlog.png", fullPage: false });

  // Click inlog button
  await inlogButton.click();
  await page.waitForTimeout(1000);

  // Login screen should appear
  const loginTerminal = page.locator("text=portfolio-os — login");
  await expect(loginTerminal).toBeVisible({ timeout: 10000 });
  await page.screenshot({ path: "test-results/03-login-screen.png", fullPage: true });

  // Wait for TOTP input to appear
  await page.waitForTimeout(3000);
  const inputs = page.locator('input[inputmode="numeric"]');
  await expect(inputs.first()).toBeVisible({ timeout: 10000 });

  // Enter TOTP code
  const code = "284639";
  for (let i = 0; i < 6; i++) {
    await inputs.nth(i).fill(code[i]);
  }

  // Should switch to Ubuntu desktop
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "test-results/04-ubuntu-desktop.png", fullPage: true });

  // Ubuntu desktop should be visible
  const activities = page.locator("text=Activities");
  await expect(activities).toBeVisible({ timeout: 5000 });
});

test("Work section shows all 6 projects", async ({ page }) => {
  await page.goto("http://localhost:8080", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // Check Work heading
  const workHeading = page.locator("h2:has-text('Work')").first();
  await workHeading.scrollIntoViewIfNeeded();
  await expect(workHeading).toBeVisible({ timeout: 10000 });

  // Check all 6 project names appear
  for (const name of [
    "SentinelAI",
    "VulnHawk",
    "CloudShield",
    "PacketProbe",
    "RiskMatrix",
    "AlertForge",
  ]) {
    const project = page.getByRole("button", { name: new RegExp(name) }).first();
    await expect(project).toBeVisible({ timeout: 5000 });
  }

  await page.screenshot({ path: "test-results/05-work-section.png", fullPage: true });
});

test("Project detail page renders", async ({ page }) => {
  await page.goto("http://localhost:8080/work/sentinelai-ids", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const title = page.locator("h1:has-text('SentinelAI')");
  await expect(title).toBeVisible({ timeout: 10000 });

  const back = page.getByRole("link", { name: "Back" });
  await expect(back).toBeVisible({ timeout: 5000 });

  await page.screenshot({ path: "test-results/06-project-detail.png", fullPage: true });
});
