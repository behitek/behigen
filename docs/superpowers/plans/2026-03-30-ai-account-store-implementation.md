# AI Account Store Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a conversion-first Astro website for selling AI accounts, with store pages, product detail pages, blog, tools, FAQs, and chat-based purchase CTAs.

**Architecture:** Start from a fresh Astro + Tailwind static site, then layer in structured content collections for products, blog, FAQ, and tools. Reuse the good parts of `behivest`'s shape and testing approach, but switch the core user journey to `homepage -> store -> product detail -> Zalo/Telegram/Messenger`.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS, Astro Content Collections, MDX, Vitest, Playwright, ESLint, Prettier

---

## Scope Notes

- This plan assumes the current directory is the target project root.
- The current workspace is not a git repository. If execution happens here, initialize git before the first commit step.
- Keep the implementation static-first. Only add client-side JavaScript for theme toggle, mobile navigation, tools, and chat CTA helpers.

## File Structure

### Create

- `package.json`
- `.env.example`
- `package-lock.json`
- `astro.config.mjs`
- `tsconfig.json`
- `tailwind.config.mjs`
- `vitest.config.ts`
- `playwright.config.ts`
- `eslint.config.js`
- `.gitignore`
- `public/favicon.svg`
- `public/logo.svg`
- `public/og-image.svg`
- `public/robots.txt`
- `src/env.d.ts`
- `src/styles/global.css`
- `src/content/config.ts`
- `src/content/products/google-ai-ultra-30tb-share.json`
- `src/content/products/google-premium-5tb-family-owner.json`
- `src/content/products/google-ai-pro-2tb-family-owner.json`
- `src/content/products/google-ai-pro-2tb-family-member.json`
- `src/content/products/chatgpt-plus-personal-renewal.json`
- `src/content/products/chatgpt-plus-personal-new-account.json`
- `src/content/blog/chon-goi-ai-cho-sinh-vien-it.mdx`
- `src/content/blog/chatgpt-plus-hay-google-ai-pro-cho-dev.mdx`
- `src/content/blog/cach-dung-ai-de-hoc-code-thong-minh-hon.mdx`
- `src/content/faq/mua-va-ban-giao.json`
- `src/content/faq/bao-hanh-va-gia-han.json`
- `src/content/faq/account-share-vs-chinh-chu.json`
- `src/content/faq/rieng-tu-va-an-toan.json`
- `src/content/faq/chon-goi-phu-hop.json`
- `src/content/tools/ai-package-quiz.json`
- `src/content/tools/monthly-ai-budget.json`
- `src/content/tools/package-value-comparison.json`
- `src/layouts/Layout.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/SEO.astro`
- `src/components/ThemeToggle.astro`
- `src/components/store/ProductCard.astro`
- `src/components/store/ProductCTA.astro`
- `src/components/store/ProductHighlights.astro`
- `src/components/store/ProductComparisonTable.astro`
- `src/components/content/FAQPreview.astro`
- `src/components/content/PostCard.astro`
- `src/components/tools/ToolCard.astro`
- `src/utils/seo.ts`
- `src/utils/products.ts`
- `src/utils/contact.ts`
- `src/utils/tools.ts`
- `src/types/product.ts`
- `src/pages/index.astro`
- `src/pages/store/index.astro`
- `src/pages/store/[slug].astro`
- `src/pages/blog/index.astro`
- `src/pages/blog/[...slug].astro`
- `src/pages/tools/index.astro`
- `src/pages/tools/[slug].astro`
- `src/pages/faq.astro`
- `src/pages/contact.astro`
- `tests/unit/seo.test.ts`
- `tests/unit/products.test.ts`
- `tests/unit/contact.test.ts`
- `tests/unit/tools.test.ts`
- `tests/e2e/home.spec.ts`
- `tests/e2e/store.spec.ts`
- `tests/e2e/product-detail.spec.ts`
- `tests/e2e/content-paths.spec.ts`
- `README.md`

### Modify

- `products.md`
  Keep as source notes only; do not use it at runtime after the normalized product collection exists.

## Task 1: Bootstrap The Astro Project

**Files:**

- Create: `package.json`
- Create: `.env.example`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `tailwind.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `eslint.config.js`
- Create: `.gitignore`
- Create: `src/env.d.ts`
- Create: `src/styles/global.css`
- Create: `src/pages/index.astro`
- Test: `tests/e2e/home.spec.ts`

- [ ] **Step 1: Create the project config and scripts**

```json
{
  "name": "behigen",
  "type": "module",
  "version": "1.0.0",
  "description": "AI account store for developers and IT students",
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "lint": "eslint . --ext .js,.ts,.astro",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "astro": "astro"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.4",
    "@astrojs/mdx": "^3.1.9",
    "@astrojs/sitemap": "^3.2.1",
    "@astrojs/tailwind": "^5.1.2",
    "astro": "^4.16.18",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.2"
  },
  "devDependencies": {
    "@playwright/test": "^1.49.1",
    "@tailwindcss/typography": "^0.5.15",
    "@types/node": "^22.10.5",
    "@typescript-eslint/eslint-plugin": "^8.19.1",
    "@typescript-eslint/parser": "^8.19.1",
    "eslint": "^9.17.0",
    "eslint-plugin-astro": "1.4.0",
    "prettier": "^3.4.2",
    "prettier-plugin-astro": "^0.14.1",
    "prettier-plugin-tailwindcss": "^0.6.9",
    "vitest": "^2.1.8"
  }
}
```

```env
PUBLIC_ZALO_URL=
PUBLIC_TELEGRAM_URL=
PUBLIC_MESSENGER_URL=
```

```js
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const BASE_URL_PROD = "/behigen/";
const isDev = process.argv.includes("dev");
const BASE_URL = isDev ? "/" : BASE_URL_PROD;

export default defineConfig({
  site: "https://behitek.com",
  base: BASE_URL,
  vite: {
    resolve: {
      alias: {
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@content": fileURLToPath(new URL("./src/content", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
        "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
});
```

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@content/*": ["src/content/*"],
      "@layouts/*": ["src/layouts/*"],
      "@styles/*": ["src/styles/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

```ts
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ZALO_URL: string;
  readonly PUBLIC_TELEGRAM_URL: string;
  readonly PUBLIC_MESSENGER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

- [ ] **Step 2: Install dependencies and verify the toolchain is available**

Run: `npm install`

Expected:

- `package-lock.json` is created
- `node_modules` exists
- no missing peer dependency errors block `astro`, `vitest`, or `playwright`

- [ ] **Step 3: Write the first failing home-page smoke test**

```ts
import { expect, test } from "@playwright/test";

test("homepage shows the AI account store headline", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/AI Account Store/i);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Tài khoản AI giá tốt cho dev và sinh viên IT",
  );
});
```

Run: `npm run test:e2e -- tests/e2e/home.spec.ts`

Expected: FAIL because the project does not yet render the expected homepage title and content.

- [ ] **Step 4: Create the minimal Astro shell and landing page**

```astro
---
const pageTitle = 'AI Account Store';
const pageDescription =
  'Mua tài khoản AI giá tốt cho dev và sinh viên IT.';
---

<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
  </head>
  <body>
    <main>
      <h1>Tài khoản AI giá tốt cho dev và sinh viên IT</h1>
      <p>Mua đúng gói cần dùng, xem giá rõ ràng, liên hệ nhanh qua chat.</p>
    </main>
  </body>
</html>
```

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-white text-slate-950;
  }
}
```

- [ ] **Step 5: Verify the minimal project works, then commit**

Run:

- `npm run build`
- `npm run test:e2e -- tests/e2e/home.spec.ts`

Expected:

- `astro check` passes
- static build succeeds
- home smoke test passes

```bash
git init
git add package.json package-lock.json .env.example astro.config.mjs tsconfig.json tailwind.config.mjs vitest.config.ts playwright.config.ts eslint.config.js .gitignore src/env.d.ts src/styles/global.css src/pages/index.astro tests/e2e/home.spec.ts
git commit -m "chore: bootstrap astro storefront project"
```

## Task 2: Define Content Collections And Normalize Product Data

**Files:**

- Create: `src/content/config.ts`
- Create: `src/types/product.ts`
- Create: `src/content/products/google-ai-ultra-30tb-share.json`
- Create: `src/content/products/google-premium-5tb-family-owner.json`
- Create: `src/content/products/google-ai-pro-2tb-family-owner.json`
- Create: `src/content/products/google-ai-pro-2tb-family-member.json`
- Create: `src/content/products/chatgpt-plus-personal-renewal.json`
- Create: `src/content/products/chatgpt-plus-personal-new-account.json`
- Create: `src/utils/products.ts`
- Test: `tests/unit/products.test.ts`

- [ ] **Step 1: Write failing unit tests for product normalization and filtering**

```ts
import { describe, expect, it } from "vitest";
import {
  formatPriceLabel,
  groupProductsByCategory,
  buildProductSummary,
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
```

Run: `npm run test -- tests/unit/products.test.ts`

Expected: FAIL because `src/utils/products.ts` and the product model do not exist yet.

- [ ] **Step 2: Create the collections schema and product type**

```ts
import { defineCollection, z } from "astro:content";

const product = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    category: z.enum(["google", "chatgpt"]),
    name: z.string(),
    variant: z.string(),
    tagline: z.string(),
    price: z.number().int().positive(),
    billingTerm: z.string(),
    warranty: z.string(),
    deliveryType: z.string(),
    featured: z.boolean().default(false),
    highlights: z.array(z.string()).min(2),
    details: z.array(z.string()).min(1),
    suitableFor: z.array(z.string()).min(1),
    notSuitableFor: z.array(z.string()).min(1),
    purchaseNotes: z.array(z.string()).min(1),
    faqs: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
    seoTitle: z.string(),
    seoDescription: z.string(),
  }),
});

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string(),
    featured: z.boolean().default(false),
    relatedProducts: z.array(z.string()).default([]),
  }),
});

const faq = defineCollection({
  type: "data",
  schema: z.object({
    group: z.string(),
    description: z.string(),
    groupSlug: z.string(),
    order: z.number(),
    items: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    ),
  }),
});

const tool = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    relatedProducts: z.array(z.string()).default([]),
    relatedPosts: z.array(z.string()).default([]),
  }),
});

export const collections = { product, blog, faq, tool };
```

```ts
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
```

- [ ] **Step 3: Add the normalized product JSON entries**

```json
{
  "slug": "google-ai-pro-2tb-family-owner",
  "category": "google",
  "name": "Google AI Pro (2TB)",
  "variant": "Quản lý gia đình",
  "tagline": "Gói cân bằng nhất cho dev cần Gemini, storage và quyền quản lý family.",
  "price": 400000,
  "billingTerm": "12 tháng",
  "warranty": "12 tháng",
  "deliveryType": "Account chính chủ, quản lý gia đình",
  "featured": true,
  "highlights": [
    "Gemini AI Pro 3 và Antigravity Pro",
    "2TB Google Drive và Photos",
    "Veo 3, Flow, Google Studio 1K credit",
    "Full quyền quản lý Family"
  ],
  "details": [
    "Share dung lượng cho tối đa 5 thành viên",
    "Phù hợp cho người dùng cần AI lẫn lưu trữ",
    "Giá công khai và bảo hành rõ ràng"
  ],
  "suitableFor": [
    "Sinh viên IT cần gói dùng dài hạn",
    "Junior dev cần vừa AI vừa Google storage"
  ],
  "notSuitableFor": [
    "Người chỉ cần dùng AI ngắn hạn 1 tháng",
    "Người không cần hệ Google Drive"
  ],
  "purchaseNotes": [
    "Liên hệ trước để xác nhận tồn kho",
    "Bàn giao qua chat sau khi chốt đơn"
  ],
  "faqs": [
    {
      "question": "Gói này có share cho người khác được không?",
      "answer": "Có, vì đây là gói quản lý gia đình với full quyền family."
    }
  ],
  "seoTitle": "Google AI Pro 2TB gia đình chính chủ cho dev và sinh viên IT",
  "seoDescription": "Gemini AI Pro, 2TB Drive, full quyền Family, bảo hành 12 tháng."
}
```

Repeat the same normalized shape for the other five products using the exact data already approved in `products.md`.

- [ ] **Step 4: Implement the helper functions**

```ts
import type { ProductEntry } from "../types/product";

export function formatPriceLabel(price: number): string {
  return `${Math.round(price / 1000)}K`;
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
```

- [ ] **Step 5: Run tests and commit the content model**

Run:

- `npm run test -- tests/unit/products.test.ts`
- `npm run build`

Expected:

- product helper tests pass
- content collections validate
- all six product JSON entries load cleanly

```bash
git add src/content/config.ts src/types/product.ts src/content/products src/utils/products.ts tests/unit/products.test.ts
git commit -m "feat: add structured product collection"
```

## Task 3: Build Shared Layout, Navigation, SEO, And Contact Utilities

**Files:**

- Create: `src/layouts/Layout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/components/SEO.astro`
- Create: `src/components/ThemeToggle.astro`
- Create: `src/utils/seo.ts`
- Create: `src/utils/contact.ts`
- Create: `tests/unit/seo.test.ts`
- Create: `tests/unit/contact.test.ts`

- [ ] **Step 1: Write failing unit tests for SEO URLs and contact message links**

```ts
import { describe, expect, it } from "vitest";
import { buildAbsoluteUrl } from "../../src/utils/seo";
import { buildContactHref, buildContactMessage } from "../../src/utils/contact";

describe("seo helpers", () => {
  it("builds an absolute URL for site-relative images", () => {
    expect(
      buildAbsoluteUrl({
        pathOrUrl: "/og-image.svg",
        basePath: "/behigen/",
        site: "https://behitek.com",
      }),
    ).toBe("https://behitek.com/behigen/og-image.svg");
  });
});

describe("contact helpers", () => {
  it("builds a product-aware message", () => {
    expect(buildContactMessage("Google AI Pro (2TB)")).toContain(
      "Google AI Pro (2TB)",
    );
  });

  it("creates a Telegram deep link with an encoded message", () => {
    expect(
      buildContactHref({
        baseUrl: "https://t.me/behitek",
        channel: "telegram",
        productName: "ChatGPT Plus (Personal)",
      }),
    ).toContain("https://t.me/");
  });
});
```

Run: `npm run test -- tests/unit/seo.test.ts tests/unit/contact.test.ts`

Expected: FAIL because the shared helpers do not exist yet.

- [ ] **Step 2: Implement the shared helper functions**

```ts
export function normalizePathWithBase({
  path,
  basePath,
}: {
  path: string;
  basePath: string;
}): string {
  if (/^https?:\/\//.test(path)) return path;
  if (basePath === "/" || path.startsWith(basePath)) return path;
  return `${basePath.replace(/\/$/, "")}${path}`;
}

export function buildAbsoluteUrl({
  pathOrUrl,
  basePath,
  site,
}: {
  pathOrUrl: string;
  basePath: string;
  site: string | URL;
}): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return new URL(
    normalizePathWithBase({ path: pathOrUrl, basePath }),
    site,
  ).toString();
}
```

```ts
export type ContactChannel = "zalo" | "telegram" | "messenger";

export function buildContactMessage(productName: string): string {
  return `Chào bạn, mình muốn mua gói ${productName}. Bạn tư vấn giúp mình cách mua và bàn giao nhé.`;
}

export function buildContactHref({
  baseUrl,
  channel,
  productName,
}: {
  baseUrl: string;
  channel: ContactChannel;
  productName: string;
}): string {
  const message = encodeURIComponent(buildContactMessage(productName));

  if (channel === "telegram") return `${baseUrl}?text=${message}`;
  if (channel === "messenger") return `${baseUrl}?ref=${message}`;
  return `${baseUrl}?text=${message}`;
}
```

- [ ] **Step 3: Create the shared layout, SEO component, header, and footer**

```astro
---
import Header from '@components/Header.astro';
import Footer from '@components/Footer.astro';
import SEO from '@components/SEO.astro';
import '@/styles/global.css';

interface Props {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
}

const { title, description, image, canonical } = Astro.props;
---

<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <SEO title={title} description={description} image={image} canonical={canonical} />
  </head>
  <body>
    <Header />
    <main class="min-h-screen">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

```astro
---
const currentPath = Astro.url.pathname;
const isStore = currentPath.startsWith('/store') || currentPath.startsWith(`${import.meta.env.BASE_URL}store`);
---

<header class="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
  <nav class="container mx-auto flex items-center justify-between px-4 py-4">
    <a href={import.meta.env.BASE_URL} class="font-black tracking-tight text-slate-950">Behigen</a>
    <div class="hidden items-center gap-6 md:flex">
      <a href={`${import.meta.env.BASE_URL}store`} class={isStore ? 'text-cyan-700' : 'text-slate-700'}>Cửa hàng</a>
      <a href={`${import.meta.env.BASE_URL}blog`} class="text-slate-700">Blog</a>
      <a href={`${import.meta.env.BASE_URL}tools`} class="text-slate-700">Công cụ</a>
      <a href={`${import.meta.env.BASE_URL}faq`} class="text-slate-700">FAQ</a>
      <a href={`${import.meta.env.BASE_URL}contact`} class="text-slate-700">Liên hệ</a>
    </div>
  </nav>
</header>
```

- [ ] **Step 4: Update the homepage to use the shared layout**

```astro
---
import Layout from '@layouts/Layout.astro';
---

<Layout
  title="AI Account Store"
  description="Tài khoản AI giá tốt cho dev và sinh viên IT."
>
  <section class="container mx-auto px-4 py-16">
    <p class="inline-flex rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
      Gửi tới độc giả từ luyencode.net
    </p>
    <h1 class="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950">
      Tài khoản AI giá tốt cho dev và sinh viên IT
    </h1>
  </section>
</Layout>
```

- [ ] **Step 5: Run tests, build, then commit**

Run:

- `npm run test -- tests/unit/seo.test.ts tests/unit/contact.test.ts`
- `npm run test:e2e -- tests/e2e/home.spec.ts`
- `npm run build`

Expected:

- URL helpers pass
- contact link helpers pass
- homepage still renders with the shared layout

```bash
git add src/layouts/Layout.astro src/components/Header.astro src/components/Footer.astro src/components/SEO.astro src/components/ThemeToggle.astro src/utils/seo.ts src/utils/contact.ts src/pages/index.astro tests/unit/seo.test.ts tests/unit/contact.test.ts
git commit -m "feat: add shared shell seo and contact helpers"
```

## Task 4: Build Homepage Conversion Sections And Store Listing

**Files:**

- Create: `src/components/store/ProductCard.astro`
- Create: `src/components/store/ProductHighlights.astro`
- Create: `src/components/content/FAQPreview.astro`
- Create: `src/components/content/PostCard.astro`
- Create: `src/components/tools/ToolCard.astro`
- Create: `src/pages/store/index.astro`
- Modify: `src/pages/index.astro`
- Test: `tests/e2e/home.spec.ts`
- Test: `tests/e2e/store.spec.ts`

- [ ] **Step 1: Expand the failing E2E coverage for homepage and store discovery**

```ts
import { expect, test } from "@playwright/test";

test("homepage shows featured products and contact choices", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Gói nổi bật/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Zalo/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Telegram/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Messenger/i })).toBeVisible();
});

test("store lists both Google and ChatGPT products", async ({ page }) => {
  await page.goto("/store");

  await expect(page.getByText("Google AI Pro (2TB)")).toBeVisible();
  await expect(page.getByText("ChatGPT Plus (Personal)")).toBeVisible();
});
```

Run: `npm run test:e2e -- tests/e2e/home.spec.ts tests/e2e/store.spec.ts`

Expected: FAIL because the new sections and store route do not exist yet.

- [ ] **Step 2: Create reusable cards for products, blog posts, FAQ, and tools**

```astro
---
import { formatPriceLabel } from '@utils/products';
const { product } = Astro.props;
---

<article class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
  <div class="flex items-start justify-between gap-4">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700">
        {product.category}
      </p>
      <h3 class="mt-2 text-xl font-bold text-slate-950">{product.name}</h3>
      <p class="mt-2 text-sm text-slate-600">{product.variant}</p>
    </div>
    <div class="text-right">
      <div class="text-2xl font-black text-slate-950">{formatPriceLabel(product.price)}</div>
      <div class="text-sm text-slate-500">{product.billingTerm}</div>
    </div>
  </div>
  <ul class="mt-4 space-y-2 text-sm text-slate-600">
    {product.highlights.slice(0, 3).map((item: string) => <li>• {item}</li>)}
  </ul>
  <a href={`${import.meta.env.BASE_URL}store/${product.slug}`} class="mt-6 inline-flex rounded-full bg-cyan-600 px-5 py-3 font-semibold text-white">
    Xem chi tiết
  </a>
</article>
```

- [ ] **Step 3: Implement the store listing page using the product collection**

```astro
---
import { getCollection } from 'astro:content';
import Layout from '@layouts/Layout.astro';
import ProductCard from '@components/store/ProductCard.astro';

const products = await getCollection('product');
const sortedProducts = products.sort((a, b) => a.data.price - b.data.price);
---

<Layout
  title="Cửa hàng tài khoản AI"
  description="Danh sách tài khoản AI giá tốt cho dev và sinh viên IT."
>
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-black tracking-tight text-slate-950">Cửa hàng</h1>
    <div class="mt-10 grid gap-6 lg:grid-cols-2">
      {sortedProducts.map((product) => <ProductCard product={product.data} />)}
    </div>
  </section>
</Layout>
```

- [ ] **Step 4: Replace the minimal homepage with the approved conversion-first structure**

```astro
---
import { getCollection } from 'astro:content';
import Layout from '@layouts/Layout.astro';
import ProductCard from '@components/store/ProductCard.astro';
import { buildContactHref } from '@utils/contact';

const allProducts = await getCollection('product');
const featuredProducts = allProducts.filter((entry) => entry.data.featured).slice(0, 4);
const zaloHref = buildContactHref({
  baseUrl: import.meta.env.PUBLIC_ZALO_URL,
  channel: 'zalo',
  productName: 'một gói phù hợp',
});
const telegramHref = buildContactHref({
  baseUrl: import.meta.env.PUBLIC_TELEGRAM_URL,
  channel: 'telegram',
  productName: 'một gói phù hợp',
});
const messengerHref = buildContactHref({
  baseUrl: import.meta.env.PUBLIC_MESSENGER_URL,
  channel: 'messenger',
  productName: 'một gói phù hợp',
});
---

<Layout
  title="AI Account Store"
  description="Tài khoản AI giá tốt cho dev và sinh viên IT, có giá rõ ràng và liên hệ nhanh qua chat."
>
  <section class="relative overflow-hidden bg-[linear-gradient(135deg,_#ecfeff_0%,_#ffffff_55%,_#f8fafc_100%)] py-20">
    <div class="container mx-auto px-4">
      <p class="inline-flex rounded-full border border-cyan-200 bg-white px-4 py-2 text-sm font-semibold text-cyan-700">
        Gửi tới độc giả từ luyencode.net
      </p>
      <h1 class="mt-6 max-w-5xl text-5xl font-black tracking-tight text-slate-950">
        Tài khoản AI giá tốt cho dev và sinh viên IT
      </h1>
      <p class="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
        Xem giá rõ ràng, chọn đúng gói cần dùng, rồi liên hệ qua Zalo, Telegram hoặc Messenger để chốt nhanh.
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <a href={`${import.meta.env.BASE_URL}store`} class="rounded-full bg-cyan-600 px-6 py-3 font-semibold text-white">Xem cửa hàng</a>
        <a href={`${import.meta.env.BASE_URL}tools/ai-package-quiz`} class="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-900">Xem gói phù hợp</a>
      </div>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href={zaloHref}>Zalo</a>
        <a href={telegramHref}>Telegram</a>
        <a href={messengerHref}>Messenger</a>
      </div>
    </div>
  </section>

  <section class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-black tracking-tight text-slate-950">Gói nổi bật</h2>
    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      {featuredProducts.map((product) => <ProductCard product={product.data} />)}
    </div>
  </section>
</Layout>
```

- [ ] **Step 5: Run the discovery tests, then commit**

Run:

- `npm run test:e2e -- tests/e2e/home.spec.ts tests/e2e/store.spec.ts`
- `npm run build`

Expected:

- homepage shows the hero, featured products, and chat CTAs
- store page lists all products

```bash
git add src/components/store/ProductCard.astro src/components/store/ProductHighlights.astro src/components/content/FAQPreview.astro src/components/content/PostCard.astro src/components/tools/ToolCard.astro src/pages/index.astro src/pages/store/index.astro tests/e2e/home.spec.ts tests/e2e/store.spec.ts
git commit -m "feat: add conversion homepage and store listing"
```

## Task 5: Build Product Detail Pages And Product-Specific Chat CTAs

**Files:**

- Create: `src/components/store/ProductCTA.astro`
- Create: `src/components/store/ProductComparisonTable.astro`
- Create: `src/pages/store/[slug].astro`
- Test: `tests/e2e/product-detail.spec.ts`

- [ ] **Step 1: Write the failing product-detail E2E test**

```ts
import { expect, test } from "@playwright/test";

test("product detail page shows pricing and contact links", async ({
  page,
}) => {
  await page.goto("/store/google-ai-pro-2tb-family-owner");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Google AI Pro (2TB)",
  );
  await expect(page.getByText("12 tháng")).toBeVisible();
  await expect(page.getByRole("link", { name: /Zalo/i })).toHaveAttribute(
    "href",
    /Google%20AI%20Pro/,
  );
});
```

Run: `npm run test:e2e -- tests/e2e/product-detail.spec.ts`

Expected: FAIL because the dynamic product route does not exist yet.

- [ ] **Step 2: Create the reusable chat CTA block**

```astro
---
import { buildContactHref } from '@utils/contact';
const { productName } = Astro.props;
const zaloHref = buildContactHref({
  baseUrl: import.meta.env.PUBLIC_ZALO_URL,
  channel: 'zalo',
  productName,
});
const telegramHref = buildContactHref({
  baseUrl: import.meta.env.PUBLIC_TELEGRAM_URL,
  channel: 'telegram',
  productName,
});
const messengerHref = buildContactHref({
  baseUrl: import.meta.env.PUBLIC_MESSENGER_URL,
  channel: 'messenger',
  productName,
});
---

<div class="rounded-3xl border border-cyan-200 bg-cyan-50 p-6">
  <p class="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-700">
    Liên hệ mua nhanh
  </p>
  <h2 class="mt-3 text-2xl font-black text-slate-950">
    Chọn kênh chat bạn đang dùng
  </h2>
  <div class="mt-6 grid gap-3 sm:grid-cols-3">
    <a href={zaloHref} class="rounded-2xl bg-white px-4 py-3 text-center font-semibold text-slate-900">Zalo</a>
    <a href={telegramHref} class="rounded-2xl bg-white px-4 py-3 text-center font-semibold text-slate-900">Telegram</a>
    <a href={messengerHref} class="rounded-2xl bg-white px-4 py-3 text-center font-semibold text-slate-900">Messenger</a>
  </div>
</div>
```

- [ ] **Step 3: Implement the dynamic product page**

```astro
---
import { getCollection } from 'astro:content';
import Layout from '@layouts/Layout.astro';
import ProductCTA from '@components/store/ProductCTA.astro';
import { formatPriceLabel } from '@utils/products';

export async function getStaticPaths() {
  const products = await getCollection('product');
  return products.map((product) => ({
    params: { slug: product.data.slug },
    props: { product: product.data },
  }));
}

const { product } = Astro.props;
---

<Layout title={product.seoTitle} description={product.seoDescription}>
  <section class="container mx-auto px-4 py-16">
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700">
          {product.category}
        </p>
        <h1 class="mt-4 text-4xl font-black tracking-tight text-slate-950">{product.name}</h1>
        <p class="mt-4 max-w-3xl text-lg text-slate-600">{product.tagline}</p>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-slate-200 p-4">
            <div class="text-sm text-slate-500">Giá</div>
            <div class="text-3xl font-black text-slate-950">{formatPriceLabel(product.price)}</div>
          </div>
          <div class="rounded-2xl border border-slate-200 p-4">
            <div class="text-sm text-slate-500">Thời hạn</div>
            <div class="text-2xl font-bold text-slate-950">{product.billingTerm}</div>
          </div>
        </div>
        <ul class="mt-8 space-y-3 text-slate-700">
          {product.details.map((item: string) => <li>• {item}</li>)}
        </ul>
      </div>
      <div>
        <ProductCTA productName={product.name} />
      </div>
    </div>
  </section>
</Layout>
```

- [ ] **Step 4: Add the remaining required sections from the spec**

```astro
<section class="container mx-auto px-4 pb-16">
  <div class="grid gap-8 lg:grid-cols-2">
    <div class="rounded-3xl border border-slate-200 p-6">
      <h2 class="text-2xl font-black text-slate-950">Phù hợp nếu</h2>
      <ul class="mt-4 space-y-2 text-slate-700">
        {product.suitableFor.map((item: string) => <li>• {item}</li>)}
      </ul>
    </div>
    <div class="rounded-3xl border border-rose-200 bg-rose-50 p-6">
      <h2 class="text-2xl font-black text-slate-950">Không phù hợp nếu</h2>
      <ul class="mt-4 space-y-2 text-slate-700">
        {product.notSuitableFor.map((item: string) => <li>• {item}</li>)}
      </ul>
    </div>
  </div>
</section>
```

Make sure the page also renders:

- purchase notes
- product FAQ block
- related blog post links
- related tool links
- a sticky mobile CTA area if the viewport is small

- [ ] **Step 5: Verify the core conversion route and commit**

Run:

- `npm run test:e2e -- tests/e2e/product-detail.spec.ts`
- `npm run build`

Expected:

- dynamic store paths are generated
- product detail pages render the required data
- product-aware chat links include encoded product names

```bash
git add src/components/store/ProductCTA.astro src/components/store/ProductComparisonTable.astro src/pages/store/[slug].astro tests/e2e/product-detail.spec.ts
git commit -m "feat: add product detail conversion pages"
```

## Task 6: Add Blog, FAQ, And Contact Hubs

**Files:**

- Create: `src/content/blog/chon-goi-ai-cho-sinh-vien-it.mdx`
- Create: `src/content/blog/chatgpt-plus-hay-google-ai-pro-cho-dev.mdx`
- Create: `src/content/blog/cach-dung-ai-de-hoc-code-thong-minh-hon.mdx`
- Create: `src/content/faq/mua-va-ban-giao.json`
- Create: `src/content/faq/bao-hanh-va-gia-han.json`
- Create: `src/content/faq/account-share-vs-chinh-chu.json`
- Create: `src/content/faq/rieng-tu-va-an-toan.json`
- Create: `src/content/faq/chon-goi-phu-hop.json`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[...slug].astro`
- Create: `src/pages/faq.astro`
- Create: `src/pages/contact.astro`
- Test: `tests/e2e/content-paths.spec.ts`

- [ ] **Step 1: Write the failing content-paths E2E coverage**

```ts
import { expect, test } from "@playwright/test";

test("blog index links to published posts", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: /Blog/i })).toBeVisible();
  await expect(page.getByText("Chọn gói AI cho sinh viên IT")).toBeVisible();
});

test("faq page shows grouped questions", async ({ page }) => {
  await page.goto("/faq");
  await expect(page.getByText("Mua và bàn giao")).toBeVisible();
  await expect(
    page.getByText(/Account share và account chính chủ/i),
  ).toBeVisible();
});
```

Run: `npm run test:e2e -- tests/e2e/content-paths.spec.ts`

Expected: FAIL because the content hubs do not exist yet.

- [ ] **Step 2: Seed the first three blog posts and five FAQ groups**

```mdx
---
title: Chọn gói AI nào cho sinh viên IT?
description: So sánh nhanh các gói AI phổ biến cho người học code và mới đi làm.
pubDate: 2026-03-30
tags:
  - ai
  - sinh-vien-it
category: huong-dan-mua
featured: true
relatedProducts:
  - chatgpt-plus-personal-renewal
  - google-ai-pro-2tb-family-member
---

Nếu bạn đang học code và cần một gói AI để hỏi bài, debug, viết nháp tài liệu và tóm tắt kiến thức, bạn không nên mua theo kiểu “gói mạnh nhất là tốt nhất”.
```

```json
{
  "group": "Mua và bàn giao",
  "description": "Những điều người mua cần biết trước khi chốt đơn.",
  "groupSlug": "mua-va-ban-giao",
  "order": 1,
  "items": [
    {
      "question": "Sau khi liên hệ thì quy trình mua diễn ra như thế nào?",
      "answer": "Bạn chọn sản phẩm, nhắn qua kênh chat phù hợp, được xác nhận tình trạng gói, rồi nhận hướng dẫn mua và bàn giao."
    }
  ]
}
```

Add four more FAQ JSON files following the same shape:

- `bao-hanh-va-gia-han.json`
- `account-share-vs-chinh-chu.json`
- `rieng-tu-va-an-toan.json`
- `chon-goi-phu-hop.json`

- [ ] **Step 3: Build the blog index and blog detail routes**

```astro
---
import { getCollection } from 'astro:content';
import Layout from '@layouts/Layout.astro';
import PostCard from '@components/content/PostCard.astro';

const posts = (await getCollection('blog')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
---

<Layout title="Blog AI cho dev và sinh viên IT" description="Bài viết giúp chọn và dùng AI thực tế hơn.">
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-black tracking-tight text-slate-950">Blog</h1>
    <div class="mt-10 grid gap-6 lg:grid-cols-3">
      {posts.map((post) => <PostCard post={post} />)}
    </div>
  </section>
</Layout>
```

- [ ] **Step 4: Build the FAQ and contact pages**

```astro
---
import { getCollection } from 'astro:content';
import Layout from '@layouts/Layout.astro';

const groups = (await getCollection('faq')).sort((a, b) => a.data.order - b.data.order);
---

<Layout title="FAQ mua tài khoản AI" description="Câu hỏi thường gặp về mua, bảo hành, account share và account chính chủ.">
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-black tracking-tight text-slate-950">FAQ</h1>
    <div class="mt-10 space-y-8">
      {groups.map((group) => (
        <section class="rounded-3xl border border-slate-200 p-6">
          <h2 class="text-2xl font-black text-slate-950">{group.data.group}</h2>
          <div class="mt-4 space-y-4">
            {group.data.items.map((item) => (
              <article>
                <h3 class="font-bold text-slate-950">{item.question}</h3>
                <p class="mt-2 text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  </section>
</Layout>
```

```astro
---
import Layout from '@layouts/Layout.astro';
import { buildContactHref } from '@utils/contact';

const zaloHref = buildContactHref({
  baseUrl: import.meta.env.PUBLIC_ZALO_URL,
  channel: 'zalo',
  productName: 'một gói phù hợp',
});
const telegramHref = buildContactHref({
  baseUrl: import.meta.env.PUBLIC_TELEGRAM_URL,
  channel: 'telegram',
  productName: 'một gói phù hợp',
});
const messengerHref = buildContactHref({
  baseUrl: import.meta.env.PUBLIC_MESSENGER_URL,
  channel: 'messenger',
  productName: 'một gói phù hợp',
});
---

<Layout title="Liên hệ mua tài khoản AI" description="Liên hệ qua Zalo, Telegram hoặc Messenger để được tư vấn và chốt gói phù hợp.">
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-black tracking-tight text-slate-950">Liên hệ</h1>
    <div class="mt-8 grid gap-4 sm:grid-cols-3">
      <a href={zaloHref}>Zalo</a>
      <a href={telegramHref}>Telegram</a>
      <a href={messengerHref}>Messenger</a>
    </div>
  </section>
</Layout>
```

- [ ] **Step 5: Run the content navigation checks and commit**

Run:

- `npm run test:e2e -- tests/e2e/content-paths.spec.ts`
- `npm run build`

Expected:

- blog listing renders seeded posts
- FAQ page renders grouped sections
- contact page exposes the three chat channels

```bash
git add src/content/blog src/content/faq src/pages/blog src/pages/faq.astro src/pages/contact.astro tests/e2e/content-paths.spec.ts
git commit -m "feat: add blog faq and contact hubs"
```

## Task 7: Build Tool Content And Recommendation Logic

**Files:**

- Create: `src/content/tools/ai-package-quiz.json`
- Create: `src/content/tools/monthly-ai-budget.json`
- Create: `src/content/tools/package-value-comparison.json`
- Create: `src/utils/tools.ts`
- Create: `src/pages/tools/index.astro`
- Create: `src/pages/tools/[slug].astro`
- Create: `tests/unit/tools.test.ts`

- [ ] **Step 1: Write failing unit tests for recommendation logic**

```ts
import { describe, expect, it } from "vitest";
import { recommendProductsForProfile } from "../../src/utils/tools";

describe("recommendProductsForProfile", () => {
  it("suggests the low-cost chatgpt package for students with small budgets", () => {
    const result = recommendProductsForProfile({
      budget: 200000,
      needsStorage: false,
      needsFamilyControl: false,
    });

    expect(result[0]).toBe("chatgpt-plus-personal-new-account");
  });

  it("suggests google ai pro when storage and google ecosystem matter", () => {
    const result = recommendProductsForProfile({
      budget: 500000,
      needsStorage: true,
      needsFamilyControl: true,
    });

    expect(result).toContain("google-ai-pro-2tb-family-owner");
  });
});
```

Run: `npm run test -- tests/unit/tools.test.ts`

Expected: FAIL because the recommendation helper does not exist yet.

- [ ] **Step 2: Add the tool metadata entries**

```json
{
  "slug": "ai-package-quiz",
  "title": "Chọn gói AI phù hợp",
  "description": "Tool gợi ý 2-3 gói AI phù hợp theo ngân sách và nhu cầu dùng thực tế.",
  "featured": true,
  "relatedProducts": [
    "chatgpt-plus-personal-new-account",
    "google-ai-pro-2tb-family-owner"
  ],
  "relatedPosts": ["chon-goi-ai-cho-sinh-vien-it"]
}
```

Repeat the same pattern for:

- `monthly-ai-budget.json`
- `package-value-comparison.json`

- [ ] **Step 3: Implement the recommendation helper**

```ts
interface RecommendationInput {
  budget: number;
  needsStorage: boolean;
  needsFamilyControl: boolean;
}

export function recommendProductsForProfile(
  input: RecommendationInput,
): string[] {
  if (!input.needsStorage && input.budget <= 200000) {
    return [
      "chatgpt-plus-personal-new-account",
      "chatgpt-plus-personal-renewal",
    ];
  }

  if (input.needsStorage && input.needsFamilyControl) {
    return [
      "google-ai-pro-2tb-family-owner",
      "google-premium-5tb-family-owner",
    ];
  }

  return ["google-ai-pro-2tb-family-member", "chatgpt-plus-personal-renewal"];
}
```

- [ ] **Step 4: Build the tools hub and dynamic tool page**

```astro
---
import { getCollection } from 'astro:content';
import Layout from '@layouts/Layout.astro';
import ToolCard from '@components/tools/ToolCard.astro';

const tools = await getCollection('tool');
---

<Layout title="Công cụ chọn gói AI" description="Các công cụ hỗ trợ chọn và so sánh gói AI phù hợp.">
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-black tracking-tight text-slate-950">Công cụ</h1>
    <div class="mt-10 grid gap-6 lg:grid-cols-3">
      {tools.map((tool) => <ToolCard tool={tool.data} />)}
    </div>
  </section>
</Layout>
```

```astro
---
import { getCollection } from 'astro:content';
import Layout from '@layouts/Layout.astro';

export async function getStaticPaths() {
  const tools = await getCollection('tool');
  return tools.map((tool) => ({
    params: { slug: tool.data.slug },
    props: { tool: tool.data },
  }));
}

const { tool } = Astro.props;
---

<Layout title={tool.title} description={tool.description}>
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-black tracking-tight text-slate-950">{tool.title}</h1>
    <p class="mt-4 max-w-3xl text-lg text-slate-600">{tool.description}</p>
  </section>
</Layout>
```

- [ ] **Step 5: Run the tool tests and commit**

Run:

- `npm run test -- tests/unit/tools.test.ts`
- `npm run build`

Expected:

- recommendation helper tests pass
- tool collection routes build successfully

```bash
git add src/content/tools src/utils/tools.ts src/pages/tools tests/unit/tools.test.ts
git commit -m "feat: add tool content and recommendation engine"
```

## Task 8: Finish SEO Assets, Regression Coverage, And Documentation

**Files:**

- Create: `public/favicon.svg`
- Create: `public/logo.svg`
- Create: `public/og-image.svg`
- Create: `public/robots.txt`
- Create: `README.md`
- Modify: `tests/e2e/home.spec.ts`
- Modify: `tests/e2e/store.spec.ts`
- Modify: `tests/e2e/product-detail.spec.ts`
- Modify: `tests/e2e/content-paths.spec.ts`

- [ ] **Step 1: Add final regression checks for the core flows**

```ts
test("homepage CTA leads to the store", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Xem cửa hàng/i }).click();
  await expect(page).toHaveURL(/\/store$/);
});

test("product detail links keep all three contact channels visible on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/store/chatgpt-plus-personal-renewal");

  await expect(page.getByRole("link", { name: /Zalo/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Telegram/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Messenger/i })).toBeVisible();
});
```

Run: `npm run test:e2e -- tests/e2e/home.spec.ts tests/e2e/store.spec.ts tests/e2e/product-detail.spec.ts tests/e2e/content-paths.spec.ts`

Expected: FAIL until the final assets and navigation polish are in place.

- [ ] **Step 2: Add the public assets and robots policy**

```txt
User-agent: *
Allow: /

Sitemap: https://behitek.com/behigen/sitemap-index.xml
```

Use simple vector placeholders for `logo.svg`, `favicon.svg`, and `og-image.svg` first. Keep the mark technical, clean, and readable at small sizes.

- [ ] **Step 3: Polish metadata and footer copy**

```astro
<meta name="theme-color" content="#0891b2" />
<meta property="og:locale" content="vi_VN" />
<meta property="twitter:card" content="summary_large_image" />
```

```astro
<p class="mt-4 text-sm text-slate-600">
  Cửa hàng tài khoản AI giá tốt cho dev và sinh viên IT, có blog, tools và FAQ để giúp bạn mua đúng gói cần dùng.
</p>
```

Make sure every top-level page has:

- a unique title
- a unique description
- a canonical URL
- a visible path back to store or contact

- [ ] **Step 4: Add a short README for local development and content editing**

```md
# Behigen

## Local development

- `npm install`
- `npm run dev`
- `npm run test`
- `npm run test:e2e`

## Content editing

- Products live in `src/content/products`
- Blog posts live in `src/content/blog`
- FAQ groups live in `src/content/faq`
- Tool configs live in `src/content/tools`
```

- [ ] **Step 5: Run the full verification suite and commit**

Run:

- `npm run test`
- `npm run test:e2e`
- `npm run build`
- `npm run lint`

Expected:

- all unit tests pass
- all Playwright flows pass
- production build succeeds
- lint passes without warnings that would block CI

```bash
git add public README.md tests/e2e/home.spec.ts tests/e2e/store.spec.ts tests/e2e/product-detail.spec.ts tests/e2e/content-paths.spec.ts src/components/Footer.astro src/components/SEO.astro
git commit -m "feat: finish storefront polish and regression coverage"
```

## Self-Review

### Spec Coverage

- Homepage conversion-first structure: covered by Task 4
- Store listing and product detail pages: covered by Tasks 4 and 5
- Chat-first buying flow with 3 equal channels: covered by Tasks 3 and 5
- Blog, FAQ, contact hubs: covered by Task 6
- Tool pages and recommendation support: covered by Task 7
- SEO, trust, and regression coverage: covered by Task 8

No approved spec area is left without a task.

### Placeholder Scan

- No `TODO`, `TBD`, or “implement later” placeholders remain.
- The three chat base URLs are handled as explicit public environment variables: `PUBLIC_ZALO_URL`, `PUBLIC_TELEGRAM_URL`, and `PUBLIC_MESSENGER_URL`.

### Type Consistency

- Product collection slug/category/price fields match helper signatures in `src/utils/products.ts`
- Contact helper signatures match component usage in `ProductCTA.astro` and homepage CTA links
- Tool recommendation output is a list of product slugs that can be resolved against the product collection
