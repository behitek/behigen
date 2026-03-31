import { expect, test } from "@playwright/test";

test("store lists both Google and ChatGPT products", async ({ page }) => {
  await page.goto("/store");

  await expect(page.getByText("Google AI Pro (2TB)").first()).toBeVisible();
  await expect(page.getByText("ChatGPT Plus (Personal)").first()).toBeVisible();
  await expect(
    page.getByRole("img", { name: /google product badge/i }).first(),
  ).toBeVisible();
  await expect(page.getByText("Thời gian sử dụng").first()).toBeVisible();
  await expect(page.getByText("Bảo hành").first()).toBeVisible();
  await expect(page.getByText("Dùng riêng").first()).toBeVisible();
});
