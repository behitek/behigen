import type { ProductEntry } from '../types/product';

export interface GroupDiscountTier {
  minQuantity: number;
  discountRate: number;
  label: string;
}

export interface GroupPricingSummary {
  quantity: number;
  discountRate: number;
  tierLabel: string;
  unitPrice: number;
  totalPrice: number;
  savings: number;
}

export const GROUP_DISCOUNT_TIERS: GroupDiscountTier[] = [
  {
    minQuantity: 5,
    discountRate: 0.3,
    label: 'Nhóm 5+ giảm 30%'
  },
  {
    minQuantity: 3,
    discountRate: 0.2,
    label: 'Nhóm 3-4 giảm 20%'
  },
  {
    minQuantity: 2,
    discountRate: 0.1,
    label: 'Nhóm 2 giảm 10%'
  },
  {
    minQuantity: 1,
    discountRate: 0,
    label: 'Mua lẻ 1 account'
  }
];

export function formatPriceLabel(price: number): string {
  return `${Math.round(price / 1000)}K`;
}

export function formatDiscountLabel(discountRate: number): string {
  return discountRate > 0 ? `Giảm ${Math.round(discountRate * 100)}%` : 'Mua lẻ';
}

export function sanitizeQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.max(1, Math.floor(quantity));
}

export function getGroupDiscountTier(quantity: number): GroupDiscountTier {
  const safeQuantity = sanitizeQuantity(quantity);

  return (
    GROUP_DISCOUNT_TIERS.find((tier) => safeQuantity >= tier.minQuantity) ??
    GROUP_DISCOUNT_TIERS[GROUP_DISCOUNT_TIERS.length - 1]
  );
}

export function getGroupDiscountRate(quantity: number): number {
  return getGroupDiscountTier(quantity).discountRate;
}

export function calculateGroupPricing(price: number, quantity: number): GroupPricingSummary {
  const safeQuantity = sanitizeQuantity(quantity);
  const tier = getGroupDiscountTier(safeQuantity);
  const unitPrice = Math.round(price * (1 - tier.discountRate));
  const totalPrice = unitPrice * safeQuantity;

  return {
    quantity: safeQuantity,
    discountRate: tier.discountRate,
    tierLabel: tier.label,
    unitPrice,
    totalPrice,
    savings: price * safeQuantity - totalPrice
  };
}

export function getProductLogoPath(category: string): string {
  const baseUrl = import.meta.env.BASE_URL ?? '/';

  if (category === 'google') return `${baseUrl}brands/google.svg`;
  return `${baseUrl}brands/openai.svg`;
}

export function groupProductsByCategory<T extends { category: string }>(
  products: T[]
): Record<string, T[]> {
  return products.reduce<Record<string, T[]>>((acc, product) => {
    const list = acc[product.category] ?? [];
    list.push(product);
    acc[product.category] = list;
    return acc;
  }, {});
}

export function buildProductSummary(
  product: Pick<ProductEntry, 'price' | 'billingTerm' | 'warranty' | 'deliveryType'>
): string {
  return `${formatPriceLabel(product.price)} • ${product.billingTerm} • ${product.warranty} • ${product.deliveryType}`;
}
