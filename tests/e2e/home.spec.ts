import { expect, test } from '@playwright/test';

test('homepage shows the AI account store headline', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Behigen/i);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Mua tài khoản AI với giá công khai và quy trình chốt đơn rõ ràng'
  );
});

test('homepage shows featured products, group pricing, and only Zalo contact', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /Gói nổi bật/i })
  ).toBeVisible();
  await expect(page.getByRole('link', { name: /Zalo/i }).first()).toHaveAttribute(
    'href',
    /\/go\/zalo$/
  );
  await expect(page.getByRole('link', { name: /Telegram/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Messenger/i })).toHaveCount(0);
  await expect(page.getByText(/Mua 2 giảm 10%, mua 3-4 giảm 20%, mua 5\+ giảm 30%/i)).toBeVisible();
  await expect(page.getByText(/Đi kèm hướng dẫn sử dụng hiệu quả/i).first()).toBeVisible();
  await expect(page.getByText(/Cùng người vận hành luyencode\.net/i)).toHaveCount(0);
  await expect(page.getByText(/Dùng trước, xác nhận rồi thanh toán/i)).toBeVisible();
  await expect(
    page.locator('article').filter({ hasText: 'Google AI Pro (5TB)' }).getByText(/Best seller/i)
  ).toBeVisible();
  await expect(
    page
      .locator('article')
      .filter({ hasText: 'ChatGPT Plus' })
      .getByText(/dùng trước, xác nhận/i)
  ).toHaveCount(0);
});

test('homepage CTA leads to the store', async ({ page }) => {
  await page.goto('/');
  await page
    .getByRole('link', { name: /Xem cửa hàng/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/store$/);
});

test('homepage promotes both practical tools and labs', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /Công cụ thực dụng và LLM Lab/i })
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Chọn gói AI phù hợp/i })
  ).toHaveAttribute('href', /\/tools\/ai-package-quiz$/);
});
