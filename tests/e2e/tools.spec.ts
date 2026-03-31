import { expect, test } from "@playwright/test";

test("tools index shows both practical and lab sections", async ({ page }) => {
  await page.goto("/tools");

  await expect(
    page.getByRole("heading", { name: "Công cụ thực dụng", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "LLM Lab", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Chọn gói AI phù hợp/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Token hoạt động như thế nào/i }),
  ).toBeVisible();
});

test("ai package quiz returns a concrete recommendation", async ({ page }) => {
  await page.goto("/tools/ai-package-quiz");

  await page.getByLabel(/Mục tiêu chính của bạn là gì/i).selectOption("google");
  await page
    .getByLabel(/storage \/ Drive \/ family của Google/i)
    .selectOption("yes");
  await page
    .getByLabel(/Nếu dùng Google, bạn nghiêng về mức nào/i)
    .selectOption("balanced");
  await page
    .getByLabel(/Bạn có cần tự quản lý family không/i)
    .selectOption("yes");
  await page.getByRole("button", { name: "Xem gợi ý" }).click();

  await expect(
    page.getByRole("heading", { name: /Google AI Pro 2TB quản lý gia đình/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Google AI Pro 2TB quản lý family/i }),
  ).toHaveAttribute("href", /\/store\/google-ai-pro-2tb-family-owner$/);
});

test("ai package quiz recommends both packages when coding and storage are both needed", async ({
  page,
}) => {
  await page.goto("/tools/ai-package-quiz");

  await page.getByLabel(/Mục tiêu chính của bạn là gì/i).selectOption("coding");
  await page
    .getByLabel(/storage \/ Drive \/ family của Google/i)
    .selectOption("yes");
  await page
    .getByLabel(/Nếu dùng Google, bạn nghiêng về mức nào/i)
    .selectOption("balanced");
  await page
    .getByLabel(/Bạn có cần tự quản lý family không/i)
    .selectOption("no");
  await page
    .getByLabel(/Bạn đã có tài khoản ChatGPT cần gia hạn chưa/i)
    .selectOption("yes");
  await page.getByRole("button", { name: "Xem gợi ý" }).click();

  await expect(page.getByText(/Khuyên mua 2 gói/i)).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /tách ra 2 gói/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /ChatGPT Plus gia hạn/i }),
  ).toHaveAttribute("href", /\/store\/chatgpt-plus-personal-renewal$/);
  await expect(
    page.getByRole("link", { name: /Google AI Pro 2TB tham gia/i }),
  ).toHaveAttribute("href", /\/store\/google-ai-pro-2tb-family-member$/);
});

test("token lab page shows a guided simulation shell", async ({ page }) => {
  await page.goto("/tools/token-hoat-dong-nhu-the-nao");

  await expect(
    page.getByRole("heading", { name: /Token hoạt động như thế nào/i }),
  ).toBeVisible();
  await expect(page.getByText(/mô phỏng để hiểu cơ chế/i)).toBeVisible();
  await expect(page.getByText(/Bước 1/i)).toBeVisible();
});
