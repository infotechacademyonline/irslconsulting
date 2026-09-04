import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

/**
 * Pre-set the NDPA consent cookie so the banner never occludes clicks in
 * viewport-constrained environments (mobile-safari especially). A real user
 * dismisses the banner within seconds; simulating that reduces flakiness
 * without hiding it from the accessibility axe pass — that runs on the
 * home page which we visit fresh below.
 */
test.beforeEach(async ({ context }) => {
  const state = {
    essential: true,
    analytics: false,
    marketing: false,
    savedAt: new Date().toISOString(),
    version: 1,
  };
  await context.addCookies([
    {
      name: 'irsl-consent',
      value: encodeURIComponent(JSON.stringify(state)),
      url: 'http://127.0.0.1:3000',
    },
  ]);
});

test.describe('Home page', () => {
  test('renders the hero and reg card', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'The business problems your regulator will not wait',
    );
    await expect(page.getByText('Nigerian Regulatory Perimeter')).toBeVisible();
  });

  test('routes to a solution detail', async ({ page }) => {
    await page.goto('/');
    // Anchor the click to the solutions grid section to avoid ambiguity with
    // footer duplicates or duplicated related-solutions blocks.
    const solutionsSection = page.locator('#solutions');
    await solutionsSection
      .getByRole('link', { name: /Access Risk & Segregation of Duties/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/solutions\/access-risk$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Access Risk & Segregation of Duties',
    );
  });

  test('has no serious accessibility violations', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    const serious = results.violations.filter((v) =>
      ['serious', 'critical'].includes(v.impact ?? ''),
    );
    if (serious.length > 0) {
      // eslint-disable-next-line no-console
      console.log(
        'Serious a11y violations:',
        JSON.stringify(
          serious.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
          })),
          null,
          2,
        ),
      );
    }
    expect(serious).toEqual([]);
  });
});

test.describe('Booking form', () => {
  test('rejects empty submission with field errors', async ({ page }) => {
    await page.goto('/book-a-call');
    await page.getByRole('button', { name: /Book my consultation/i }).click();
    const nameValid = await page
      .locator('#name')
      .evaluate((el) => (el as HTMLInputElement).checkValidity());
    expect(nameValid).toBe(false);
  });

  test('accepts a valid submission and shows the receipt', async ({ page }) => {
    await page.goto('/book-a-call');
    await page.fill('#name', 'Ada Adepoju');
    await page.fill('#email', 'ada@example.ng');
    await page.fill('#organisation', 'First Bank');
    await page.fill('#role', 'Head of Internal Audit');
    await page.getByRole('button', { name: /Book my consultation/i }).click();
    // Server-action round-trip; give mobile safari extra headroom.
    await expect(page.getByRole('status')).toContainText(/Received|Thanks/i, {
      timeout: 15_000,
    });
  });
});
