import { describe, expect, it } from "vitest";
import {
  buildProductSummary,
  formatPriceLabel,
  getProductLogoPath,
  groupProductsByCategory,
} from "../../src/utils/products";

describe("products helpers", () => {
  it("formats thousands into Vietnamese K labels", () => {
    expect(formatPriceLabel(400000)).toBe("400K");
    expect(formatPriceLabel(2100000)).toBe("2100K");
  });

  it("groups products by category slug", () => {
    const grouped = groupProductsByCategory([
      { category: "google", slug: "a" },
      { category: "chatgpt", slug: "b" },
      { category: "google", slug: "c" },
    ]);

    expect(grouped.google).toHaveLength(2);
    expect(grouped.chatgpt).toHaveLength(1);
  });

  it("builds product logo paths from the Astro base URL", () => {
    expect(getProductLogoPath("google")).toBe("/brands/google.svg");
    expect(getProductLogoPath("chatgpt")).toBe("/brands/openai.svg");
  });

  it("builds a compact summary for product cards", () => {
    expect(
      buildProductSummary({
        price: 100000,
        billingTerm: "12 tháng",
        warranty: "12 tháng",
        deliveryType: "Account chính chủ, tham gia gia đình",
      }),
    ).toContain("100K");
  });
});
