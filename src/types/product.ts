export interface ProductEntry {
  slug: string;
  category: "google" | "chatgpt";
  name: string;
  variant: string;
  tagline: string;
  price: number;
  billingTerm: string;
  warranty: string;
  deliveryType: string;
  featured: boolean;
  highlights: string[];
  details: string[];
  suitableFor: string[];
  notSuitableFor: string[];
  purchaseNotes: string[];
  faqs: Array<{ question: string; answer: string }>;
  seoTitle: string;
  seoDescription: string;
}
