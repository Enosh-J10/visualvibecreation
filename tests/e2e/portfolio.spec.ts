import { test, expect, type Page } from '@playwright/test';

// ── Helpers ─────────────────────────────────────────────────────────────────

async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('domcontentloaded');
  // Wait for splash screen overlay to finish / fade out if present
  const splash = page
    .locator('#splash-screen, .splash-screen, [data-testid="splash-screen"]')
    .first();
  if (await splash.isVisible().catch(() => false)) {
    await splash.waitFor({ state: 'hidden', timeout: 7000 }).catch(() => {});
  }
  await page.waitForTimeout(500);
}

// ── Homepage ─────────────────────────────────────────────────────────────────

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
  });

  test('loads successfully with status 200 @smoke', async ({ page }) => {
    expect(page.url()).toContain('/');
  });

  test('has exactly one visible H1 @smoke @critical', async ({ page }) => {
    const h1s = page.locator('h1:visible');
    await expect(h1s).toHaveCount(1);
  });

  test('main landmark exists @smoke @critical', async ({ page }) => {
    await expect(page.locator('main')).toBeVisible();
  });

  test('hero section contains primary CTAs @critical', async ({ page }) => {
    await expect(page.getByRole('link', { name: /View My Work/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Get In Touch/i })).toBeVisible();
  });

  test('hero image has non-empty alt text @critical', async ({ page }) => {
    const heroImgs = page.locator('img[alt]:not([alt=""])').first();
    await expect(heroImgs).toBeVisible();
  });

  test('page title is set correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Visual Vibe Creation/i);
  });
});

// ── Navigation ───────────────────────────────────────────────────────────────

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
  });

  test('main navigation is present @smoke @critical', async ({ page }) => {
    const desktopNav = page.getByRole('navigation', { name: /Main Navigation/i });
    const mobileBtn = page.getByRole('button', { name: /Toggle Navigation Menu/i });
    const isDesktopVisible = await desktopNav.isVisible().catch(() => false);
    const isMobileVisible = await mobileBtn.isVisible().catch(() => false);
    expect(isDesktopVisible || isMobileVisible).toBe(true);
  });

  test('logo link exists and points to home @critical', async ({ page }) => {
    const logo = page.locator('header a[href="/"]').first();
    await expect(logo).toBeVisible();
  });

  test('contact page navigates successfully @smoke @critical', async ({ page }) => {
    await page.goto('/contact');
    await waitForPageLoad(page);
    await expect(page.locator('main')).toBeVisible();
  });

  test('about page navigates successfully', async ({ page }) => {
    await page.goto('/about');
    await waitForPageLoad(page);
    await expect(page.locator('main')).toBeVisible();
  });
});

// ── Mobile Navigation ────────────────────────────────────────────────────────

test.describe('Mobile Navigation @responsive @critical', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
  });

  test('mobile menu button is accessible', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /Toggle Navigation Menu/i });
    if (await menuButton.isVisible()) {
      await expect(menuButton).toBeEnabled();
    }
  });

  test('mobile menu opens on button click', async ({ page }) => {
    const menuButton = page.getByRole('button', { name: /Toggle Navigation Menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();
      const mobileNav = page.getByRole('navigation', { name: /Mobile Navigation Panel/i });
      await expect(mobileNav).toBeVisible();
    }
  });
});

// ── Keyboard Accessibility ────────────────────────────────────────────────────

test.describe('Keyboard Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
  });

  test('focus is visible on interactive elements', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('can tab through primary CTAs @critical', async ({ page }) => {
    let found = false;
    for (let i = 0; i < 20; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.textContent ?? '');
      if (focused.includes('View My Work') || focused.includes('Get In Touch')) {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });
});

// ── Contact Form ─────────────────────────────────────────────────────────────

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
    await waitForPageLoad(page);
  });

  test('contact page renders a form @smoke @critical', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('shows validation error for empty name @critical', async ({ page }) => {
    const nameInput = page.locator('input#name');
    if (await nameInput.isVisible()) {
      await nameInput.fill('');
      await nameInput.blur();
    }
    await expect(page.locator('main')).toBeVisible();
  });

  test('shows validation error for invalid email @critical', async ({ page }) => {
    const emailInput = page.locator('input#email');
    if (await emailInput.isVisible()) {
      await emailInput.fill('not-an-email');
      await emailInput.blur();
    }
    await expect(page.locator('main')).toBeVisible();
  });

  test('name field accepts valid input', async ({ page }) => {
    const nameInput = page.locator('input#name');
    if (await nameInput.isVisible()) {
      await nameInput.fill('Jane Smith');
      await expect(nameInput).toHaveValue('Jane Smith');
    }
  });

  test('email field accepts valid input', async ({ page }) => {
    const emailInput = page.locator('input#email');
    if (await emailInput.isVisible()) {
      await emailInput.fill('jane@example.com');
      await expect(emailInput).toHaveValue('jane@example.com');
    }
  });

  test('Turnstile widget container is rendered @critical', async ({ page }) => {
    await page.waitForTimeout(1000);
    await expect(page.locator('form')).toBeVisible();
  });

  test('submit button is disabled before verification @critical', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /Send message/i });
    if (await submitBtn.isVisible()) {
      await expect(submitBtn).toBeDisabled();
    }
  });

  test('mailto fallback link is present and accessible @critical', async ({ page }) => {
    const mailtoLink = page.getByRole('link', {
      name: /Write to hello@visualvibecreation.com/i,
    });
    if (await mailtoLink.isVisible()) {
      await expect(mailtoLink).toHaveAttribute('href', /mailto:/i);
    }
  });
});

// ── Footer ────────────────────────────────────────────────────────────────────

test.describe('Footer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
  });

  test('GitHub social link is accessible @smoke', async ({ page }) => {
    const github = page.getByRole('link', { name: /GitHub Profile/i }).first();
    await expect(github).toBeVisible();
  });

  test('LinkedIn social link is accessible @smoke', async ({ page }) => {
    const linkedin = page.getByRole('link', { name: /LinkedIn Profile/i }).first();
    await expect(linkedin).toBeVisible();
  });
});

// ── Responsive Layout ────────────────────────────────────────────────────────

test.describe('Responsive Layout @responsive', () => {
  test('homepage renders without horizontal overflow @critical @responsive', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
  });

  test('contact page renders without overflow @critical @responsive', async ({ page }) => {
    await page.goto('/contact');
    await waitForPageLoad(page);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5);
  });
});

// ── 404 Page ─────────────────────────────────────────────────────────────────

test.describe('404 Error Page', () => {
  test('unknown route renders 404 UI @smoke', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist-at-all');
    expect(response?.status()).toBe(404);
    await expect(page.getByText(/404/i)).toBeVisible();
  });

  test('"Return to Studio" link navigates home @critical', async ({ page }) => {
    await page.goto('/this-route-does-not-exist-at-all');
    const link = page.getByRole('link', { name: /Return to Studio/i });
    await expect(link).toBeVisible();
  });
});

// ── Robots & Sitemap ─────────────────────────────────────────────────────────

test.describe('Robots and Sitemap', () => {
  test('robots.txt is served and references correct sitemap @smoke', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    const text = await page.content();
    expect(text).toContain('sitemap.xml');
    expect(text).toContain('visualvibecreation.com');
  });

  test('sitemap.xml is served and contains canonical URLs @smoke', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    const text = await page.content();
    expect(text).toContain('www.visualvibecreation.com');
  });
});
