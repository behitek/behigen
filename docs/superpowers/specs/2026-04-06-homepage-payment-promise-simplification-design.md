# Homepage Payment Promise Simplification Design

## Goal

Simplify the homepage trust messaging so the payment-confidence promise appears once at the page level instead of repeating inside each featured product card.

## Approved Changes

1. Remove the payment-confidence message from inside individual product cards.
2. Keep the message only in the homepage outer messaging.
3. Replace the Google-specific wording with a general statement:
   `Dùng trước, xác nhận rồi thanh toán`
4. Remove unused `trustNote` product metadata if it is no longer rendered anywhere.

## Rendering Rules

- The homepage trust strip should use the generic statement without the `Google products:` prefix.
- Hero or nearby supporting copy should not frame the promise as Google-only.
- Product cards on the homepage should keep the `Best seller` sticker treatment, but should no longer render the green trust-note block.

## Scope

Likely implementation files:

- `src/pages/index.astro`
- `src/components/store/ProductCard.astro`
- `src/content/config.ts`
- `src/types/product.ts`
- `src/content/products/google-ai-pro-2tb-family-member.json`
- `src/content/products/google-ai-pro-2tb-family-owner.json`
- `src/content/products/google-ai-ultra-30tb-share.json`
- `tests/e2e/home.spec.ts`

## Risks And Guardrails

- Do not leave mixed wording where the trust strip is generic but product cards still imply a special-case flow.
- Do not remove the homepage-level promise entirely.
- Do not affect the corner-sticker layout while removing the old per-card trust block.
