import { expect, test } from "@playwright/test";

test("homepage shows the AI account store headline", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Behigen/i);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Tài khoản AI giá tốt cho dev và sinh viên IT",
  );
});

test("homepage shows featured products and contact choices", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Gói nổi bật/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Zalo/i }).first(),
  ).toHaveAttribute("href", /\/go\/zalo$/);
  await expect(page.getByRole("link", { name: /Zalo/i }).first()).toContainText(
    /Khuyên dùng/i,
  );
  await expect(
    page.getByRole("link", { name: /Telegram/i }).first(),
  ).toHaveAttribute("href", /\/go\/telegram$/);
  await expect(
    page.getByRole("link", { name: /Messenger/i }).first(),
  ).toHaveAttribute("href", /\/go\/messenger$/);
});

test("homepage CTA leads to the store", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", { name: /Xem cửa hàng/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/store$/);
});

test("homepage promotes both practical tools and labs", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Công cụ thực dụng và LLM Lab/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Xem gói phù hợp/i }),
  ).toHaveAttribute("href", /\/tools\/ai-package-quiz$/);
});
