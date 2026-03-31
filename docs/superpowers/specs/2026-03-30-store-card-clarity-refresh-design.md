# Store Card Clarity Refresh Design

## Overview

This update improves the store listing cards in `src/pages/store/index.astro` so users can identify package duration and warranty faster, immediately understand that the products are for personal use rather than shared with strangers, and visually distinguish Google vs ChatGPT packages through downloaded local brand assets.

The change is intentionally scoped to the store listing experience first. It should not redesign the entire storefront or alter product pricing, routing, or content structure.

## Goals

- Make `Thời gian sử dụng` and `Bảo hành` easier to scan than the current plain text presentation
- Emphasize on every store card that the package is for private use, not a shared public account
- Add a representative local logo for each product card using downloaded assets in `public/`
- Preserve the current conversion flow and card density on desktop and mobile

## Non-Goals

- No change to product pricing or normalized product content
- No move to third-party hotlinked images
- No full homepage redesign in this pass
- No change to dynamic product page structure unless needed for card prop compatibility

## Proposed Approach

Use the existing `ProductCard.astro` component as the main change surface and keep `src/pages/store/index.astro` structurally stable.

### Card Header

- Add a downloaded local brand logo near the product title
- Keep category label, product name, variant, and price visible at the top
- Preserve current CTA position so the interaction pattern does not shift

### Metadata Presentation

Replace the current low-emphasis billing text with a small metadata cluster:

- icon + `Thời gian sử dụng`
- icon + `Bảo hành`
- optionally keep `Hình thức` as a secondary line if spacing remains clean

These should be rendered as compact chips or mini-panels rather than a single summary sentence. The goal is faster recognition, especially on mobile.

### Private-Use Emphasis

Each card should contain a clearly visible trust callout such as:

- badge: `Dùng riêng`
- supporting copy: `Tài khoản bàn giao để bạn dùng cá nhân, không phải dạng dùng chung với người lạ.`

This statement should sit above the CTA, not hidden in fine print.

## Data And Asset Handling

To avoid hardcoding image paths in templates, add a lightweight product-to-logo mapping helper in the app code. The mapping should resolve each product category or slug to a local asset path under `public/`.

Initial assets:

- Google logo asset for Google products
- ChatGPT / OpenAI logo asset for ChatGPT products

If exact per-product logos are unnecessary, category-level logos are acceptable and preferred for maintainability.

## Component Boundaries

### `src/components/store/ProductCard.astro`

Primary responsibility:

- render logo
- render improved metadata chips with icons
- render private-use badge/copy

### `src/utils/products.ts` or a new focused helper

Primary responsibility:

- map product category or slug to a local logo path
- optionally expose display metadata if that keeps the component simpler

### `src/pages/store/index.astro`

Should remain mostly unchanged and continue passing normalized product data into `ProductCard`.

## Visual Direction

- Keep the existing bright, clean storefront aesthetic
- Use small inline SVG icons or equivalent lightweight icons for duration and warranty
- Use a stronger border/background treatment for the `Dùng riêng` callout so it reads as a trust signal, not body copy
- Avoid making the cards taller than necessary; prioritize scanability over decoration

## Testing

Add or update E2E coverage for the store page so it verifies:

- product cards render a logo image
- duration and warranty text remain visible
- the private-use message or badge is present on store cards

No new unit logic is required unless a dedicated logo helper is introduced.

## Risks And Decisions

- Downloaded logos should be stored locally to prevent broken rendering from remote sources
- Category-level logos are the right default unless the user later asks for unique logos per SKU
- The private-use copy must not contradict any product that is described as `tham gia gia đình`; the message should emphasize personal/private usage rather than “exclusive ownership of the underlying subscription”

## Acceptance Criteria

- Store cards display a representative local logo
- Duration and warranty are visually separated and easier to recognize than before
- Every card clearly signals personal/private usage rather than a public shared account
- Store page remains responsive and existing CTA behavior is unchanged
