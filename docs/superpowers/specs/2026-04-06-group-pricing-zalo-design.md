# Group Pricing And Zalo-Only Contact Design

Date: 2026-04-06
Repo: `/home/hieu/workspaces/behitek/behigen`

## Goal

Adjust storefront pricing so listed prices are no longer break-even, introduce site-wide group-buy pricing that rewards buying multiple accounts, and simplify contact to Zalo only.

The new pricing model must satisfy this business constraint:

- Current displayed prices are treated as cost basis.
- New listed prices are the single-account public prices.
- Group discounts apply to all products.
- Even at the deepest discount tier of `30%`, profit should remain around `20,000 VND` per account sold.

## Confirmed Decisions

- Pricing changes apply to all products in the store.
- Current `price` values in product content are treated as cost basis for the pricing redesign.
- Discount policy:
  - `1 account`: `0%`
  - `2 accounts`: `10%`
  - `3-4 accounts`: `20%`
  - `5+ accounts`: `30%`
- The group-pricing experience must appear across the site:
  - homepage
  - store listing
  - product detail pages
- Telegram and Messenger are removed. Zalo is the only contact channel left.

## Pricing Strategy

The recommended model is shared tiered volume pricing across the entire site.

Why this approach:

- It supports the marketing message that buying in a group is cheaper.
- It keeps the pricing rule consistent across all products.
- It avoids duplicating product variants for each quantity tier.
- It allows the site to show immediate savings without hiding prices behind chat.

This is a fixed discount-tier model, not per-product custom discount tables.

## New Public Prices

The minimum safe public price is derived from:

`listed_price * 70% >= cost_basis + 20,000`

Equivalent:

`listed_price >= (cost_basis + 20,000) / 0.7`

Recommended listed prices are rounded to clean selling numbers:

| Product slug | Current price / cost basis | Minimum safe listed price | Recommended new listed price |
| --- | ---: | ---: | ---: |
| `chatgpt-plus-personal-new-account` | `80,000` | `142,858` | `150,000` |
| `chatgpt-plus-personal-renewal` | `120,000` | `200,000` | `200,000` |
| `google-ai-pro-2tb-family-member` | `100,000` | `171,429` | `180,000` |
| `google-ai-pro-2tb-family-owner` | `400,000` | `600,000` | `600,000` |
| `google-ai-ultra-30tb-share` | `2,100,000` | `3,028,572` | `3,050,000` |

Expected floor profit at the `30%` tier:

- `150,000 -> 105,000`: profit `25,000`
- `200,000 -> 140,000`: profit `20,000`
- `180,000 -> 126,000`: profit `26,000`
- `600,000 -> 420,000`: profit `20,000`
- `3,050,000 -> 2,135,000`: profit `35,000`

## User Experience

### Homepage

Homepage should still lead with a clear store CTA and a single Zalo CTA.

Group-buy pricing should also appear on the homepage in two ways:

- a compact promotional block explaining the quantity tiers
- dynamic price messaging attached to featured product cards

Homepage is not the deepest comparison view. It should communicate:

- buying more accounts reduces the per-account price
- discounts are transparent
- Zalo is the path to close the order

### Store Listing

The store page should have a shared quantity selector near the top of the listing.

Behavior:

- user selects desired account count once
- all product cards update to the selected quantity context
- each card shows:
  - listed single-account price
  - discounted per-account price for the selected quantity
  - discount badge
  - total payment for the selected quantity as a secondary line

This shared selector is preferred over one selector per card because it reduces noise and improves side-by-side comparison.

### Product Detail

The product detail page is the most complete pricing surface.

The pricing area should show:

- listed single-account price
- quantity selector
- applied discount tier
- discounted unit price
- total price for selected quantity
- amount saved compared with buying at listed single-account price
- short marketing copy such as "Mua nhom cang re"

The purchase CTA should remain close to this block so the user can act right after seeing the pricing result.

## Contact Simplification

The site currently exposes multiple contact channels. That will be reduced to Zalo only.

Required outcomes:

- remove Telegram and Messenger from homepage, contact page, and product CTA blocks
- remove unused multi-channel wording from supporting copy
- keep `/go/[channel]` for backward-compatible linking, but only support the `zalo` channel
- user-facing copy should consistently direct buyers to Zalo

The new contact tone should be direct:

- choose product
- choose quantity
- message Zalo to confirm availability and close the order

## Data Model

### Product content

`price` in `src/content/products/*.json` remains the canonical product price field, but its meaning changes to:

- public listed price for buying `1` account

No group-specific prices are stored in product content.

### Shared discount configuration

Discount tiers should live in code as shared configuration used across all surfaces.

Recommended shape:

- quantity thresholds
- discount rate
- helper functions to resolve tier from quantity

This keeps policy centralized and avoids drift.

## Pricing Logic

The site needs shared calculations for:

- discount rate by quantity
- discounted unit price
- total price
- savings relative to listed single-account pricing

Rules:

- quantity `1` uses no discount
- quantity `2` uses `10%`
- quantity `3` and `4` use `20%`
- quantity `>= 5` uses `30%`
- quantities beyond `5` remain capped at the `30%` tier

The no-JS fallback should still render the listed single-account price and static discount tier messaging.

## Component Boundaries

Recommended implementation boundaries:

- shared pricing utility for all discount calculations and money formatting
- reusable quantity selector / pricing display component
- compact and full display modes depending on page context

Expected usage:

- homepage: compact promotional version
- store listing: shared page-level selector plus compact card display
- product detail: full pricing block

This avoids repeating pricing math inside Astro pages and makes future pricing-policy changes safer.

## Error Handling And Fallbacks

The UI should constrain quantity selection rather than depend on free-text entry.

Expected safeguards:

- quantity control only allows valid positive integers
- if client-side hydration is delayed, server-rendered content still shows listed single-account pricing
- if quantity exceeds the named tiers, the highest tier still applies

No advanced validation or custom user input parsing is required for this iteration.

## Copy Direction

Preferred short messages:

- `Mua 2 giam 10%`
- `Mua 3-4 giam 20%`
- `Mua 5+ giam 30%`
- `Gia moi account giam khi mua nhom`
- `Nhan Zalo de chot don`

Copy should stay short and transactional, not policy-heavy.

## SEO And Content Impact

SEO titles and descriptions only need updates where they contain hardcoded old prices or multi-channel contact language.

Product content updates required:

- change each `price` to the new listed price
- adjust tagline or descriptive copy only where old pricing language becomes misleading

No content-model expansion is required unless later phases need per-product promotional overrides.

## Testing Strategy

Minimum verification scope:

- unit tests for pricing utilities at quantities `1, 2, 3, 4, 5, 10`
- build verification with `npm run build`

Recommended additional coverage:

- interaction test that changing quantity updates visible price outputs
- regression check that contact surfaces only show Zalo

## Out Of Scope

This design does not include:

- separate enterprise pricing
- product-specific discount exceptions
- coupon codes
- manual admin pricing tools
- checkout or payment-flow automation

## Rollout Notes

Implementation should preserve the existing transparent-pricing positioning of the site.

The main messaging shift is:

- listed prices are clear
- volume discounts are visible
- Zalo is the only contact path

This should improve both margin protection and perceived deal value without introducing a heavy pricing system.
