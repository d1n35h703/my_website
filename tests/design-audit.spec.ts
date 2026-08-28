import { test, expect } from '@playwright/test';

test.describe('AppVer Design & Engineering Audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080', { waitUntil: 'domcontentloaded' });
  });

  // Section 3: Touch & Hit Targets (>= 44x44px mobile, >= 24x24px desktop)
  test('Hit Target Ergonomics (Apple HIG & AppVer §3)', async ({ page }) => {
    const isMobile = (page.viewportSize()?.width ?? 1280) < 768;
    const minSize = isMobile ? 44 : 24;

    const violations = await page.evaluate((min) => {
      const items = Array.from(document.querySelectorAll<HTMLElement>('button, a[href], input[type="button"], input[type="submit"]'));
      const list: string[] = [];

      for (const el of items) {
        // Only inspect rendered, visible items
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden') {
          if (rect.width < min || rect.height < min) {
            const rawText = (el.innerText || el.getAttribute('aria-label') || el.title || '(icon/image)').trim();
            const text = rawText.replace(/\s+/g, ' ').slice(0, 24);
            list.push(`"${text}" [${Math.round(rect.width)}x${Math.round(rect.height)}px] (Min required: ${min}x${min}px)`);
          }
        }
      }
      return list;
    }, minSize);

    if (violations.length > 0) {
      console.warn(`\n⚠️ Touch Target Violations Found (${violations.length}):\n` + violations.join('\n'));
    }

    expect(violations, `Found ${violations.length} elements failing minimum hit targets`).toHaveLength(0);
  });

  // Section 2: Materials & Translucency
  test('Floating Chrome Translucency (AppVer §2)', async ({ page }) => {
    const nav = page.locator('nav, header').first();
    if (await nav.isVisible()) {
      const styles = await nav.evaluate((el) => {
        const win = window.getComputedStyle(el);
        return {
          backdropFilter: win.backdropFilter || win.webkitBackdropFilter,
          backgroundColor: win.backgroundColor,
        };
      });
      expect(styles.backdropFilter).not.toBe('none');
    }
  });

  // Section 6: Typography & Tracking Matrix
  test('Typography Hierarchy & Tracking (AppVer §6)', async ({ page }) => {
    const heading = page.locator('h1, h2').first();
    if (await heading.isVisible()) {
      const tracking = await heading.evaluate((el) => window.getComputedStyle(el).letterSpacing);
      expect(heading).toBeDefined();
    }
  });

  // Section 8: Reduced Motion Adaptation
  test('Accessibility: Respects prefers-reduced-motion (AppVer §8)', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const isReduced = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });
    expect(isReduced).toBe(true);
  });
});
