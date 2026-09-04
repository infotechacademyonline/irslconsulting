import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

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
    await page.getByRole('link', { name: /Access Risk & Segregation of Duties/i }).first().click();
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
    expect(serious).toEqual([]);
  });
});

test.describe('Booking form', () => {
  test('rejects empty submission with field errors', async ({ page }) => {
    await page.goto('/book-a-call');
    await page.getByRole('button', { name: /Book my consultation/i }).click();
    // The browser's own required-field validation will block submission; verify the
    // required inputs are marked invalid.
    const nameValid = await page.locator('#name').evaluate((el) => (el as HTMLInputElement).checkValidity());
    expect(nameValid).toBe(false);
  });

  test('accepts a valid submission and shows the receipt', async ({ page }) => {
    await page.goto('/book-a-call');
    await page.fill('#name', 'Ada Adepoju');
    await page.fill('#email', 'ada@example.ng');
    await page.fill('#organisation', 'First Bank');
    await page.fill('#role', 'Head of Internal Audit');
    // sector, challenge, model, platform all default via <select>
    await page.getByRole('button', { name: /Book my consultation/i }).click();
    await expect(page.getByRole('status')).toContainText(/Received|Thanks/i);
  });
});
