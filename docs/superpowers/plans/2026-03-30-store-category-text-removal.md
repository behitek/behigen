# Store Category Text Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove visible category text from the store homepage and product detail page while keeping brand identification through existing logos and product names.

**Architecture:** Limit the change to the current Astro presentation layer. Remove the category label from `ProductCard.astro`, remove the homepage section heading row in `src/pages/store/index.astro`, and remove the detail-page category badge in `src/pages/store/[slug].astro` without changing data loading or routing.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS

---

## File Structure

### Modify

- `src/components/store/ProductCard.astro`
- `src/pages/store/index.astro`
- `src/pages/store/[slug].astro`

## Task 1: Remove Visible Category Text From The Store Listing

**Files:**

- Modify: `src/components/store/ProductCard.astro`
- Modify: `src/pages/store/index.astro`

- [ ] **Step 1: Remove the per-card category label**

Delete the visible `{product.category}` text node from `src/components/store/ProductCard.astro` and keep the logo image, title, price, and metadata layout intact.

- [ ] **Step 2: Remove the homepage category heading row**

Delete the visible category heading block from `src/pages/store/index.astro` so each grouped section renders only the product grid, and remove any now-unused category label mapping.

- [ ] **Step 3: Verify homepage markup still reads cleanly**

Run: `sed -n '1,220p' src/components/store/ProductCard.astro`

Expected:

- no visible category paragraph remains in the card header
- logo image still renders before the product title

Run: `sed -n '1,220p' src/pages/store/index.astro`

Expected:

- no category heading text remains
- each section still renders a product grid cleanly

## Task 2: Remove Visible Category Text From The Product Detail Header

**Files:**

- Modify: `src/pages/store/[slug].astro`

- [ ] **Step 1: Remove the detail-page category badge**

Delete the visible `{product.category}` paragraph above the `<h1>` in `src/pages/store/[slug].astro`.

- [ ] **Step 2: Tighten the title spacing if needed**

Adjust the top margin on the `<h1>` only if removing the badge leaves awkward empty space.

- [ ] **Step 3: Verify the page still builds**

Run: `npm run build`

Expected:

- Astro type checks pass
- Astro build succeeds with the updated store homepage and detail markup

## Self-Review

### Spec Coverage

- Homepage card category text removal: covered by Task 1
- Homepage section category heading removal: covered by Task 1
- Detail-page category badge removal: covered by Task 2

### Placeholder Scan

- No TODO/TBD placeholders remain
- Files and verification commands are explicit for this scoped UI cleanup

### Type Consistency

- The change stays in Astro templates only
- No content schema or utility API changes are required
