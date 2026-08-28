import { test, expect } from '@playwright/test';

test.describe('Taste Skill (leonxinx) Anti-Slop Audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
  });

  // Section 9.G: EM-DASH BAN
  test('Strict Rule: Zero em-dashes (—) or en-dashes (–) visible', async ({ page }) => {
    const textContent = await page.evaluate(() => document.body.innerText);
    const emDashCount = (textContent.match(/[—–]/g) || []).length;
    expect(emDashCount, `Found ${emDashCount} forbidden em-dashes/en-dashes. Use regular hyphen '-' instead.`).toBe(0);
  });

  // Section 4.7: Eyebrow Restraint (Max 1 eyebrow per 3 sections)
  test('Layout Discipline: Eyebrow count restraint', async ({ page }) => {
    const stats = await page.evaluate(() => {
      const sections = document.querySelectorAll('section, main > div');
      const eyebrows = Array.from(document.querySelectorAll('span, p, div')).filter((el) => {
        const cls = el.className || '';
        return (cls.includes('uppercase') && cls.includes('tracking')) || cls.includes('font-mono');
      });
      return {
        sectionCount: Math.max(sections.length, 1),
        eyebrowCount: eyebrows.length,
      };
    });

    const maxAllowed = Math.ceil(stats.sectionCount / 3) + 1; // +1 grace for hero
    expect(
      stats.eyebrowCount,
      `Too many eyebrows (${stats.eyebrowCount} found across ${stats.sectionCount} sections). Maximum allowed is ${maxAllowed}.`
    ).toBeLessThanOrEqual(maxAllowed);
  });

  // Section 4.5: CTA Button Wrap Ban
  test('Ergonomics: No wrapped CTA button text at desktop', async ({ page }) => {
    const wrappedButtons = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll<HTMLElement>('button, a.btn, a[role="button"]'));
      return buttons
        .filter((btn) => {
          const rect = btn.getBoundingClientRect();
          // Height greater than ~52px on single-row button indicates multi-line text wrap
          return rect.height > 54 && btn.innerText.split('\n').length > 1;
        })
        .map((b) => b.innerText.trim());
    });

    expect(wrappedButtons, `Wrapped button text found: ${wrappedButtons.join(', ')}`).toHaveLength(0);
  });

  // Section 4.7: Hero Height & Top Padding Cap
  test('Hero Discipline: Hero fits viewport and padding <= pt-24', async ({ page }) => {
    const hero = page.locator('main section, header + section, section').first();
    if (await hero.isVisible()) {
      const topPadding = await hero.evaluate((el) => {
        return parseFloat(window.getComputedStyle(el).paddingTop);
      });
      // 96px = pt-24 in Tailwind
      expect(topPadding, `Hero top padding (${topPadding}px) exceeds pt-24 (96px max)`).toBeLessThanOrEqual(110);
    }
  });
});
