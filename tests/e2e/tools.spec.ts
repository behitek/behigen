import { expect, test } from '@playwright/test';

test('tools index shows both practical and lab sections', async ({ page }) => {
  await page.goto('/tools');

  await expect(page.getByRole('heading', { name: 'Công cụ thực dụng', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'LLM Lab', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Chọn gói AI phù hợp/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Token hoạt động như thế nào/i })).toBeVisible();
});
