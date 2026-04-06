import { expect, test } from '@playwright/test';

test('store lists both Google and ChatGPT products and exposes group pricing controls', async ({
  page
}) => {
  await page.goto('/store');

  await expect(page.getByText('Google AI Pro (5TB)').first()).toBeVisible();
  await expect(page.getByText('ChatGPT Plus (Personal)').first()).toBeVisible();
  await expect(
    page.getByRole('img', { name: /google product badge/i }).first()
  ).toBeVisible();
  await expect(page.getByText('Thời gian sử dụng').first()).toBeVisible();
  await expect(page.getByText('Bảo hành').first()).toBeVisible();
  await expect(page.getByText('Dùng riêng').first()).toBeVisible();
  await expect(
    page.getByRole('spinbutton', { name: /Số lượng account/i })
  ).toBeVisible();
});

test('store updates visible prices when quantity changes', async ({ page }) => {
  await page.goto('/store');

  await page.getByRole('spinbutton', { name: /Số lượng account/i }).fill('5');

  await expect(page.getByText(/Đang so sánh giá cho 5 account/i)).toBeVisible();
  await expect(page.getByText('105K').first()).toBeVisible();
  await expect(page.getByText(/Tiết kiệm 225K/i).first()).toBeVisible();
});
