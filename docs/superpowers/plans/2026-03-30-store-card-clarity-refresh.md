# Store Card Clarity Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the store listing cards so duration and warranty are easier to recognize, private-use positioning is explicit, and each product shows a representative local logo.

**Architecture:** Keep the store page route stable and concentrate the UI change inside `ProductCard.astro`, backed by a small helper for local logo paths. Add downloaded brand assets under `public/`, then verify the new card semantics with Playwright on `/store`.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS, Playwright

---

## File Structure

### Create

- `public/brands/google.svg`
- `public/brands/openai.svg`

### Modify

- `src/utils/products.ts`
- `src/components/store/ProductCard.astro`
- `tests/e2e/store.spec.ts`

## Task 1: Add Local Brand Assets

**Files:**

- Create: `public/brands/google.svg`
- Create: `public/brands/openai.svg`

- [ ] **Step 1: Add a local Google logo asset**

Create `public/brands/google.svg` with a lightweight local SVG suitable for small card display.

- [ ] **Step 2: Add a local OpenAI/ChatGPT logo asset**

Create `public/brands/openai.svg` with a lightweight local SVG suitable for small card display.

- [ ] **Step 3: Verify assets are in the expected public path**

Run: `rg --files public/brands`

Expected:

- `public/brands/google.svg`
- `public/brands/openai.svg`

## Task 2: Add Store Card Logo Mapping And Clearer Metadata UI

**Files:**

- Modify: `src/utils/products.ts`
- Modify: `src/components/store/ProductCard.astro`

- [ ] **Step 1: Add a helper for local product logos**

Update `src/utils/products.ts` to export a category-based local logo helper:

```ts
export function getProductLogoPath(category: string): string {
  if (category === "google") return "/brands/google.svg";
  return "/brands/openai.svg";
}
```

- [ ] **Step 2: Replace the compact summary line with clearer metadata chips**

Update `src/components/store/ProductCard.astro` to:

- render the logo near the category/title block
- show `Thời gian sử dụng` with an inline icon
- show `Bảo hành` with an inline icon
- keep price prominent
- move away from the current single summary sentence for these fields

- [ ] **Step 3: Add a private-use trust callout on every card**

Inside `src/components/store/ProductCard.astro`, add:

- a visible badge such as `Dùng riêng`
- short supporting copy that clarifies the account is delivered for personal use and is not a public shared account with strangers

Use wording that does not imply exclusive subscription ownership for family-member style packages.

- [ ] **Step 4: Keep the card responsive and CTA unchanged**

Ensure the existing `Xem chi tiết` link remains in place and the card stays readable in the current `/store` two-column layout.

- [ ] **Step 5: Build and verify the Astro app still succeeds**

Run: `npm run build`

Expected:

- Astro build passes
- store route still renders successfully

## Task 3: Add Regression Coverage For The Store Card Refresh

**Files:**

- Modify: `tests/e2e/store.spec.ts`

- [ ] **Step 1: Extend the store E2E coverage**

Update `tests/e2e/store.spec.ts` to assert that `/store` shows:

- a product logo image on a card
- visible `Thời gian sử dụng`
- visible `Bảo hành`
- visible private-use message or `Dùng riêng` badge

- [ ] **Step 2: Run the store-focused browser check**

Run: `npm run test:e2e -- tests/e2e/store.spec.ts`

Expected:

- store card assertions pass in Playwright

- [ ] **Step 3: Run final verification**

Run:

- `npm run test:e2e -- tests/e2e/store.spec.ts`
- `npm run build`
- `npm run lint`

Expected:

- Playwright store tests pass
- production build succeeds
- lint passes

## Self-Review

### Spec Coverage

- Local logos: covered by Task 1 and Task 2
- Easier recognition for duration and warranty: covered by Task 2
- Private-use emphasis on every card: covered by Task 2

### Placeholder Scan

- No TODO/TBD placeholders remain
- Files and commands are explicit for the scoped change

### Type Consistency

- `getProductLogoPath(category: string)` matches the current product card inputs
- No content model changes are required for this refresh
