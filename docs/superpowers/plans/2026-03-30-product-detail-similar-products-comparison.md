# Product Detail Similar Products Comparison Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the product detail page show a clearer same-category comparison section with the current product distinguished from alternative products.

**Architecture:** Keep comparison scope in `src/pages/store/[slug].astro` and improve the presentation through `ProductComparisonTable.astro`. The route will pass both the current product and same-category alternatives into the component, and Playwright will verify that the section is visible and navigable.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS, Playwright

---

## File Structure

### Modify

- `src/pages/store/[slug].astro`
- `src/components/store/ProductComparisonTable.astro`
- `tests/e2e/product-detail.spec.ts`

## Task 1: Refine Same-Category Comparison Data

**Files:**

- Modify: `src/pages/store/[slug].astro`

- [ ] **Step 1: Prepare same-category alternatives without duplicating the current product**

Update `src/pages/store/[slug].astro` so it derives:

- `comparisonAlternatives`: same-category products excluding `product.slug`
- `currentProduct`: the current page product

Keep the existing category-only comparison scope.

- [ ] **Step 2: Pass the current product and alternatives into the comparison component**

Replace the current comparison component call with props that explicitly separate the current product from alternatives.

- [ ] **Step 3: Build the app to verify the route still compiles**

Run: `npm run build`

Expected:

- Astro build passes
- product detail routes still generate successfully

## Task 2: Redesign The Comparison Section

**Files:**

- Modify: `src/components/store/ProductComparisonTable.astro`

- [ ] **Step 1: Replace the generic title with a stronger comparison section**

Update the component to render:

- section title: `So sánh các gói cùng nhóm`
- short supporting copy explaining the section compares similar products in the same category

- [ ] **Step 2: Add a highlighted summary block for the current product**

Render a visual summary for the current product with:

- name
- price
- thời gian
- bảo hành
- hình thức

Use a clear label such as `Gói hiện tại`.

- [ ] **Step 3: Render alternative same-category rows with a detail CTA**

Render a table for alternative products with columns:

- Gói
- Giá
- Thời gian
- Bảo hành
- Hình thức
- Xem chi tiết

Each alternative row must link to its own product detail page.

- [ ] **Step 4: Add a clean empty state for categories with no alternatives**

If there are no alternative same-category products, show the current-product summary and a short message indicating there is no other product in the same group to compare yet.

- [ ] **Step 5: Verify the page still builds cleanly**

Run: `npm run build`

Expected:

- updated comparison section renders without Astro errors
- static product detail pages still build

## Task 3: Add Regression Coverage For The Comparison Section

**Files:**

- Modify: `tests/e2e/product-detail.spec.ts`

- [ ] **Step 1: Extend the product-detail E2E coverage**

Update `tests/e2e/product-detail.spec.ts` to assert that a product detail page shows:

- the heading `So sánh các gói cùng nhóm`
- at least one same-category alternative product for a category with multiple products
- a detail link inside the comparison section

- [ ] **Step 2: Run the product-detail focused browser test**

Run: `npm run test:e2e -- tests/e2e/product-detail.spec.ts`

Expected:

- product detail comparison assertions pass

- [ ] **Step 3: Run final verification**

Run:

- `npm run test:e2e -- tests/e2e/product-detail.spec.ts`
- `npm run build`
- `npm run lint`

Expected:

- Playwright product detail tests pass
- production build succeeds
- lint passes

## Self-Review

### Spec Coverage

- clearer same-category comparison section: covered by Task 2
- current product visually distinguished: covered by Task 2
- alternative products easy to scan and navigate: covered by Task 2 and Task 3
- empty-state behavior: covered by Task 2

### Placeholder Scan

- No TODO/TBD placeholders remain
- Files, UI responsibilities, and verification commands are explicit

### Type Consistency

- `src/pages/store/[slug].astro` owns the comparison data selection
- `ProductComparisonTable.astro` remains a presentational component fed by explicit props
