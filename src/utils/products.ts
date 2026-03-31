import type { ProductEntry } from "../types/product";

export function formatPriceLabel(price: number): string {
  return `${Math.round(price / 1000)}K`;
}

export function getProductLogoPath(category: string): string {
  const baseUrl = import.meta.env.BASE_URL ?? "/";
  if (category === "google") return `${baseUrl}brands/google.svg`;
  return `${baseUrl}brands/openai.svg`;
}

export function groupProductsByCategory<T extends { category: string }>(
  products: T[],
): Record<string, T[]> {
  return products.reduce<Record<string, T[]>>((acc, product) => {
    const list = acc[product.category] ?? [];
    list.push(product);
    acc[product.category] = list;
    return acc;
  }, {});
}

export function buildProductSummary(
  product: Pick<
    ProductEntry,
    "price" | "billingTerm" | "warranty" | "deliveryType"
  >,
): string {
  return `${formatPriceLabel(product.price)} • ${product.billingTerm} • ${product.warranty} • ${product.deliveryType}`;
}
