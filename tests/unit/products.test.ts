import { describe, expect, it } from 'vitest';
import {
  buildProductSummary,
  calculateGroupPricing,
  formatPriceLabel,
  getGroupDiscountRate,
  getProductLogoPath,
  groupProductsByCategory
} from '../../src/utils/products';

describe('products helpers', () => {
  it('formats thousands into Vietnamese K labels', () => {
    expect(formatPriceLabel(400000)).toBe('400K');
    expect(formatPriceLabel(2100000)).toBe('2100K');
  });

  it('groups products by category slug', () => {
    const grouped = groupProductsByCategory([
      { category: 'google', slug: 'a' },
      { category: 'chatgpt', slug: 'b' },
      { category: 'google', slug: 'c' }
    ]);

    expect(grouped.google).toHaveLength(2);
    expect(grouped.chatgpt).toHaveLength(1);
  });

  it('builds product logo paths from the Astro base URL', () => {
    expect(getProductLogoPath('google')).toBe('/brands/google.svg');
    expect(getProductLogoPath('chatgpt')).toBe('/brands/openai.svg');
  });

  it('builds a compact summary for product cards', () => {
    expect(
      buildProductSummary({
        price: 100000,
        billingTerm: '12 tháng',
        warranty: '12 tháng',
        deliveryType: 'Account chính chủ, tham gia gia đình'
      })
    ).toContain('100K');
  });

  it('returns expected discount tiers for supported quantities', () => {
    expect(getGroupDiscountRate(1)).toBe(0);
    expect(getGroupDiscountRate(2)).toBe(0.1);
    expect(getGroupDiscountRate(3)).toBe(0.2);
    expect(getGroupDiscountRate(4)).toBe(0.2);
    expect(getGroupDiscountRate(5)).toBe(0.3);
    expect(getGroupDiscountRate(10)).toBe(0.3);
  });

  it('calculates discounted unit price, total, and savings', () => {
    expect(calculateGroupPricing(180000, 5)).toEqual({
      quantity: 5,
      discountRate: 0.3,
      tierLabel: 'Nhóm 5+ giảm 30%',
      unitPrice: 126000,
      totalPrice: 630000,
      savings: 270000
    });
  });
});
