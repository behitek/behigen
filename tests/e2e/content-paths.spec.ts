import { expect, test } from '@playwright/test';

test('blog index links to published posts', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.getByRole('heading', { name: /Blog/i })).toBeVisible();
  await expect(
    page.getByText('Đừng để agent đoán repo của bạn: hãy viết instructions dùng được nhiều phiên')
  ).toBeVisible();
});

test('faq page shows grouped questions', async ({ page }) => {
  await page.goto('/faq');
  await expect(page.getByRole('heading', { name: 'Mua và bàn giao' })).toBeVisible();
  await expect(
    page.getByRole('heading', {
      level: 2,
      name: 'Account share và account chính chủ',
      exact: true
    })
  ).toBeVisible();
});
