# Product Detail Similar Products Comparison Design

## Overview

This update strengthens the comparison experience on the product detail page so users can clearly compare the current product with other products in the same category.

The current product page already computes same-category products and renders a comparison table, but the section is generic and easy to miss. The refresh should make the section more useful for decision-making without changing the overall page architecture.

## Goals

- Make the similar-products comparison section easier to notice on the product detail page
- Keep comparisons scoped to the same category only
- Make it obvious which product is the current product and which rows are alternatives
- Improve the usefulness of the comparison block for moving between similar packages

## Non-Goals

- No cross-category comparison
- No changes to normalized product content
- No major redesign of the entire product detail page
- No client-side filtering or sorting UI in this pass

## Proposed Approach

Keep the current same-category data selection logic in `src/pages/store/[slug].astro`, but improve presentation and interaction.

### Comparison Framing

- Rename the section from a generic label to something more explicit such as `So sánh các gói cùng nhóm`
- Add a short sentence explaining that these are similar products in the same category

### Current Product Emphasis

- Show a compact highlighted summary card for the current product above the table
- The summary should include name, price, duration, warranty, and delivery type
- This prevents users from losing track of what they are currently viewing

### Alternative Rows

- Show alternative products from the same category in the comparison table
- Add a dedicated CTA or detail link per alternative row
- Use a clearer column set:
  - Gói
  - Giá
  - Thời gian
  - Bảo hành
  - Hình thức
  - Xem chi tiết

If desired for clarity, the current product may still appear in the table with a `Gói hiện tại` marker, but the preferred option is:

- highlight current product separately
- show only alternative same-category products in the table

This reduces duplication and makes the choices clearer.

## Component Boundaries

### `src/pages/store/[slug].astro`

Responsibilities:

- prepare the current product summary data
- build a list of same-category alternatives excluding the current product slug
- pass both current product and alternatives into the comparison component

### `src/components/store/ProductComparisonTable.astro`

Responsibilities:

- render the updated comparison section title and supporting copy
- render a highlighted current-product summary block
- render the alternatives table with per-row links

This component remains focused on display logic only.

## Empty-State Handling

If a category only contains one product:

- keep the section visible
- show the current product summary
- replace the table with a short empty-state message such as:
  - `Hiện chưa có gói khác trong cùng nhóm để so sánh.`

This avoids layout gaps and keeps the page behavior consistent.

## Testing

Update product-detail E2E coverage to verify:

- the comparison section heading is visible
- at least one same-category alternative product is visible for a product in a multi-product category
- an alternative row has a detail link

No new unit tests are required unless comparison formatting logic is extracted into a helper.

## Acceptance Criteria

- Product detail pages clearly show a same-category comparison section
- The current product is visually distinguished from alternatives
- Alternative products in the same category are easy to scan and navigate to
- The page still works correctly if no alternative same-category products exist
