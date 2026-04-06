# Homepage Copy And Badge Adjustment Design

## Goal

Adjust the homepage trust messaging and featured-product merchandising without changing the broader conversion flow.

## Approved Changes

1. Remove the `luyencode.net` reference from the homepage hero and trust strip.
2. Replace that message with `Đi kèm hướng dẫn sử dụng hiệu quả`.
3. Keep the existing trust-first homepage structure otherwise intact.
4. Change the `Best seller` treatment on the featured Google AI Pro member card from an inline label to a corner sticker.
5. The sticker must not push the product title or other card content downward.

## Rendering Rules

### Homepage copy

- Replace the small hero pill text with `Đi kèm hướng dẫn sử dụng hiệu quả`.
- Replace the first trust-strip item with `Đi kèm hướng dẫn sử dụng hiệu quả`.
- Remove the body-copy mention of `luyencode.net` so the hero messaging stays internally consistent.

### Bestseller sticker

- Keep the badge only on the product already marked with `badge: "Best seller"`.
- Render the badge as an absolute overlay in a card corner.
- Preserve current card spacing so the title starts in the same vertical position as before.
- The sticker should look intentional and readable, but should not block product information or interfere with hover/focus behavior.

## Scope

Likely implementation files:

- `src/pages/index.astro`
- `src/components/store/ProductCard.astro`

## Risks And Guardrails

- Do not leave mixed messaging where `luyencode.net` still appears in the hero area after the new phrase is introduced.
- Do not move the card title lower by rendering the sticker inline above the content.
- Do not expand the badge treatment to the store page unless the current home-only merchandising rules already allow it.
