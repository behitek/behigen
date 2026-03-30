import { expect, test } from '@playwright/test';

test('tools index shows both practical and lab sections', async ({ page }) => {
  await page.goto('/tools');

  await expect(page.getByRole('heading', { name: 'Công cụ thực dụng', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'LLM Lab', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: /Chọn gói AI phù hợp/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Token hoạt động như thế nào/i })).toBeVisible();
});

test('ai package quiz returns a concrete recommendation', async ({ page }) => {
  await page.goto('/tools/ai-package-quiz');

  await page.getByLabel('Nhu cầu chính').selectOption('google');
  await page.getByLabel('Bạn nghiêng về').selectOption('balanced');
  await page.getByLabel('Có cần tự quản lý family không?').selectOption('yes');
  await page.getByRole('button', { name: 'Xem gợi ý' }).click();

  await expect(page.getByRole('heading', { name: /Google AI Pro 2TB quản lý gia đình/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Xem sản phẩm/i })).toHaveAttribute(
    'href',
    /\/store\/google-ai-pro-2tb-family-owner$/
  );
});

test('token lab page shows a guided simulation shell', async ({ page }) => {
  await page.goto('/tools/token-hoat-dong-nhu-the-nao');

  await expect(page.getByRole('heading', { name: /Token hoạt động như thế nào/i })).toBeVisible();
  await expect(page.getByText(/mô phỏng để hiểu cơ chế/i)).toBeVisible();
  await expect(page.getByText(/Bước 1/i)).toBeVisible();
});
