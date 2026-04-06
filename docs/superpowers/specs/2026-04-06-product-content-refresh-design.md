# Product Content Refresh Design

Date: 2026-04-06
Repo: `/home/hieu/workspaces/behitek/behigen`

## Goal

Refresh all store product content so each listing reflects the current underlying product offering instead of stale or unsupported claims.

The work should improve trust and reduce confusion by making each product page align with the current official plan naming, included features, storage tier, and product positioning where those details can be verified on the web.

## Confirmed Decisions

- Scope includes all product files in `src/content/products/`.
- Refresh all factual fields, not just short descriptions.
- Official provider sources are the preferred source of truth.
- Reputable secondary sources may be used only when official pages do not clearly state a detail needed to rewrite the content.
- The request to show an original/reference price was dropped.

## Current Product Inventory

The current refresh scope covers these files:

- `src/content/products/chatgpt-plus-personal-new-account.json`
- `src/content/products/chatgpt-plus-personal-renewal.json`
- `src/content/products/google-ai-pro-2tb-family-member.json`
- `src/content/products/google-ai-pro-2tb-family-owner.json`
- `src/content/products/google-ai-ultra-30tb-share.json`

## Recommended Approach

Use a source-backed content refresh inside the existing product JSON files.

Why this approach:

- It fixes stale product facts without introducing a new content model.
- It keeps the storefront rendering code mostly unchanged.
- It matches the current repo structure, where product content is stored directly in JSON under `src/content/products/`.
- It avoids coupling visible site copy to undocumented assumptions or reseller shorthand.

Alternatives considered but not recommended for this task:

- expanding the schema with per-product source metadata
- creating a separate research dataset and generating product JSON from it

Both add maintenance overhead without being required for this refresh.

## Source Strategy

### Source priority

For each product, gather current information in this order:

1. Official provider product and pricing pages
2. Official help center, plan comparison, or announcement pages
3. Reputable secondary sources only when official materials are incomplete or unclear

### Allowed claim types

Preferred claims:

- official plan name
- included AI capabilities or plan tier
- storage amount if applicable
- billing cadence if explicitly stated
- plan positioning and intended use case if clearly stated by the provider

Claims to avoid unless directly verified:

- temporary or marketing-only feature names with unclear availability
- features that differ by geography, rollout state, or account cohort unless that limitation is explicit
- speculative comparisons against competing plans

### Handling ambiguity

If the official source contradicts the current product copy, the official source wins.

If official sources are still ambiguous after review:

- use a reputable secondary source if it resolves the ambiguity clearly
- otherwise remove the unsupported claim instead of rewriting it confidently

## Content Rewrite Rules

### Field scope

The refresh should review and update these fields in every product record:

- `name`
- `variant`
- `tagline`
- `highlights`
- `details`
- `suitableFor`
- `notSuitableFor`
- `purchaseNotes`
- `faqs`
- `seoTitle`
- `seoDescription`

Structured product facts should also be corrected when outdated, including:

- plan naming
- storage amount
- billing term wording
- other provider-facing facts embedded in the current content

### Provider facts vs local offer facts

Each product record should distinguish between:

- provider facts: what the underlying product or plan officially is
- local offer facts: how this store delivers access to that plan

Provider facts should drive `name`, `highlights`, `details`, and most FAQ answers.

Local offer facts should remain in fields such as:

- `price`
- `warranty`
- `deliveryType`
- the reseller-style meaning of variants like `Gia hạn chính chủ`, `Cấp tài khoản mới`, `Quản lý gia đình`, and `Tham gia gia đình`

The rewrite should layer local offer wording on top of verified provider facts rather than mixing them together.

### Slugs and routing

Keep existing `slug` values unless a slug is so misleading that leaving it in place would make the route inaccurate.

The default assumption for this refresh is:

- update visible content
- keep routes stable

### Copy direction

Copy should be concrete and durable.

Preferred style:

- specific plan names over generic labels
- verified inclusions over vague performance claims
- plain-language suitability guidance tied to real use cases

Avoid:

- unverifiable superlatives
- padded benefit lists
- stale feature nicknames that may no longer be official

## Product-Specific Interpretation Rules

### ChatGPT products

Treat the underlying official plan as the provider fact, and the store-specific delivery format as the variant.

Examples of store-specific delivery framing:

- new account
- renewal on the buyer's own account

The rewrite should explain the delivery difference clearly without implying the official plan itself is different.

### Google family products

Treat the underlying Google plan tier as the provider fact, and `family owner` / `family member` as the store delivery model.

The rewrite should make clear:

- which official Google plan the customer is effectively receiving
- whether the buyer gets management rights or only member access
- whether the current storage number and plan naming still match the official product reality

If current file names or visible labels use outdated storage or plan names, content should be corrected even if the slug remains unchanged.

## Data Model And Code Impact

The current product schema already supports a full factual rewrite.

Expected implementation impact:

- primary edits in `src/content/products/*.json`
- no schema expansion required for this task
- no UI changes required unless a discovered factual correction exposes a structural mismatch in the current model

Because the original-price requirement was removed, this task should not require adding pricing comparison fields or changing storefront presentation logic.

## Verification Strategy

### Research verification

Before editing each product file, confirm at minimum:

- official current plan name
- included core features
- storage amount where relevant
- billing term or subscription framing where relevant
- whether any current claims are stale, unofficial, or unsupported

### Build verification

After content edits:

- run `npm run build`

This should catch schema or rendering issues caused by content changes.

### Escalation rule

If research shows that a current product offering no longer maps cleanly to a valid underlying official plan, do not force a misleading rewrite.

Instead, flag that product explicitly during implementation so the user can decide whether to:

- keep it with limited wording
- rename/reposition it
- remove it from the store

## Out Of Scope

This design does not include:

- adding visible source citations to the storefront
- adding original/reference price fields
- changing pricing strategy
- redesigning the store UI
- introducing a new product CMS workflow

## Implementation Notes

The implementation plan should break the work into:

1. product-by-product web research
2. structured content refresh
3. build verification
4. summary of any products that remain ambiguous or risky after research
