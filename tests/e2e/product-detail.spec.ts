import { expect, test } from '@playwright/test';

test('product detail page shows pricing and internal contact links', async ({ page }) => {
  await page.goto('/store/google-ai-pro-2tb-family-owner');

  await expect(page.getByRole('img', { name: /google product badge/i })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Google AI Pro (2TB)');
  await expect(page.getByText('12 tháng').first()).toBeVisible();
  await expect(page.getByRole('heading', { name: /So sánh các gói cùng nhóm/i })).toBeVisible();
  await expect(page.getByRole('columnheader', { name: /Tiêu chí/i })).toBeVisible();
  await expect(page.getByText('Gói hiện tại')).toBeVisible();
  await expect(page.locator('a[href*="google-ai-pro-2tb-family-member"]').first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Zalo/i }).first()).toHaveAttribute('href', /\/go\/zalo$/);
  await expect(page.getByRole('link', { name: /Zalo/i }).first()).toContainText(/Khuyên dùng/i);
});

test('product detail links keep all three contact channels visible on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/store/chatgpt-plus-personal-renewal');

  await expect(page.getByRole('link', { name: /Zalo/i }).first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Telegram/i }).first()).toHaveAttribute(
    'href',
    /\/go\/telegram$/
  );
  await expect(page.getByRole('link', { name: /Messenger/i }).first()).toHaveAttribute(
    'href',
    /\/go\/messenger$/
  );
});

test('product detail keeps practical tools but does not surface labs as product-related tools', async ({
  page
}) => {
  await page.goto('/store/google-ai-pro-2tb-family-owner');

  await expect(page.getByRole('heading', { name: /Công cụ liên quan/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Chọn gói AI phù hợp/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Token hoạt động như thế nào/i })).toHaveCount(0);
});
