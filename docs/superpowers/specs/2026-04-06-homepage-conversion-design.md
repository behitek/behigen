# Homepage Conversion Design

## Goal

Improve homepage conversion quality by increasing the number of visitors who progress from the homepage into a product decision and then message on Zalo with enough trust to complete a purchase.

This homepage should not optimize for generic traffic depth. It should optimize for a purchase path:

1. trust the seller
2. understand the offer
3. select a plausible product
4. move to Zalo as the final purchase handoff

## Business Context

The main objection is not product discovery. The main objection is seller trust.

Current traffic includes users referred from `luyencode.net`, which is already operated by the same person/team. That creates an available trust asset the homepage does not currently use strongly enough.

The strongest approved risk-reversal promise is:

- for Google products only, buyers can use first, confirm the product works, then pay

This promise must not be shown for non-Google products.

The homepage should keep the current four featured products visible. Among them, `google-ai-pro-2tb-family-member` should be visually marked as the bestseller.

## Recommended Approach

Use a trust-first, Google-led but balanced homepage.

This approach keeps the current catalog shape but changes the order and framing of information so the homepage behaves like a short pre-sell page instead of a general content hub.

Why this approach:

- it addresses the real objection directly
- it uses a credible trust source already available in the business
- it keeps all featured products visible instead of narrowing the store too aggressively
- it gives Google products a stronger conversion bridge without falsely extending the same promise to all products

Alternatives considered and rejected:

- catalog-first refresh only: too weak against the trust objection
- quiz-first funnel: adds friction before the purchase handoff and does not solve seller-risk concern well enough

## Homepage Messaging Strategy

The homepage should communicate four ideas in order:

1. `Behigen` is run by the same person/team behind `luyencode.net`
2. Google products support a low-risk flow: use first, confirm, then pay
3. prices are public and the handoff process is clear
4. Zalo is the final coordination and checkout step, not a vague inbox detour

This means the top of the homepage should stop leading with a generic “AI accounts at good prices” message alone. It should lead with identity trust and purchase safety.

## Hero Redesign

The hero should be rewritten to prioritize trust before product breadth.

Required content:

- a short identity signal tied to `luyencode.net`
- a headline that positions the store as a practical, lower-risk place to buy AI accounts
- supporting copy that explicitly says Google products can be confirmed before payment
- a primary CTA that still drives users into the store
- a secondary CTA that explains the purchase flow instead of simply sending users to browse tools

The current quiz CTA is useful, but on the homepage it should become secondary to purchase trust. If kept near the hero, it should be framed as help for choosing the right package, not as the main action.

## Trust Strip

Add a compact proof row directly below the hero with three short trust claims:

- same operator/team as `luyencode.net`
- Google products: use first, confirm, then pay
- public pricing, clear handoff, and warranty shown on each product

This strip should be scannable in a few seconds and should work on mobile without becoming visually noisy.

## Featured Products Section

Keep the current four featured products on the homepage.

Update the section so it supports conversion more directly:

- visually mark `google-ai-pro-2tb-family-member` as `Best seller`
- give that card slightly stronger visual emphasis than the other three cards
- on Google product cards, show a small trust note indicating the approved low-risk flow
- on non-Google product cards, keep trust language general and do not reuse the delayed-payment promise

The goal is to help users pick a safe default quickly, not to overwhelm them with too many options.

## Support Cards Beneath Featured Products

The current support section is useful structurally but too generic in content.

Replace or rewrite those cards so they answer objections:

- how `use first, then pay` works for Google products
- how account delivery and handoff work
- what warranty/support exists after delivery

These cards should reduce the fear of getting scammed or receiving the wrong account.

## Zalo Handoff Strategy

The homepage should treat Zalo as the last mile of purchase, not just a contact method.

CTA copy should be more transactional and concrete. The surrounding copy should explain that Zalo is where the buyer:

- confirms the package
- confirms delivery type
- confirms inventory or setup timing
- completes the order

For Google products, nearby copy may also mention that payment happens after confirmation that the product works.

## Content Prioritization

The homepage currently includes blog, FAQ, and tools sections. Those sections are useful, but they are secondary to purchase conversion.

Design guidance:

- keep FAQ because it supports trust
- keep blog and tools lower on the page so they do not compete with the primary purchase path
- do not add new exploratory sections above the featured products

The homepage should feel like a short purchase-oriented narrative, not a portal with equal-weight destinations.

## Data and Component Implications

This should remain a light structural change rather than a major architecture change.

Likely touched surfaces during implementation:

- `src/pages/index.astro`
- `src/components/store/ProductCard.astro`

To avoid hardcoded homepage exceptions, product content should support small optional merchandising fields where needed, such as:

- `badge`
- `trustNote`
- `featuredEmphasis`

These fields should remain optional so existing products continue to render without schema churn beyond the new additions.

Business rules should stay simple:

- Google trust-note content may be shown only on Google products that qualify for the approved flow
- bestseller treatment should be data-driven, not slug-checked inside the component if avoidable

## Risks and Guardrails

Primary risk: overpromising.

The design must avoid implying:

- delayed payment for non-Google products
- management rights on products that are family-member variants
- universal safety guarantees beyond what the seller is actually willing to support

All trust messaging must stay precise enough that the homepage increases confidence without creating support disputes later.

## Testing Strategy

Implementation should include focused checks for:

- optional product schema fields render safely when absent
- bestseller badge appears only on the intended product
- Google-specific trust note appears only on approved Google products
- homepage mobile layout still reads clearly at the hero, product cards, and support cards
- primary purchase CTA remains visually stronger than blog/tools navigation

Manual review should verify that the updated homepage makes the purchase path clearer in this order:

1. trust seller
2. choose product
3. message on Zalo

## Non-Goals

This design does not include:

- changing the full site information architecture
- adding a checkout system
- expanding the delayed-payment promise to all products
- introducing generic testimonials without credible proof assets
- redesigning the blog or tools pages

## Expected Outcome

If implemented well, the homepage should produce better-qualified Zalo leads and more completed purchases by reducing seller-risk anxiety earlier in the session.

The intended effect is not more clicks everywhere. The intended effect is a cleaner path from referral trust to product confidence to purchase conversation.
