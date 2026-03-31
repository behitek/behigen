# AI Account Store Website Design

## Overview

This document defines the product and content design for a website modeled after `behivest`, but focused on selling AI accounts to students, junior developers, and early-career IT workers.

The site should feel trustworthy, practical, and conversion-oriented. Its primary purpose is to help users quickly identify the right AI account package, understand what they are buying, and contact the seller through their preferred messaging channel.

## Goals

- Sell AI account packages quickly with low friction
- Make product pricing, duration, account type, and warranty explicit
- Support trust-building with blog content, FAQs, and useful tools
- Serve traffic coming from `luyencode.net`
- Keep the experience optimized for mobile because contact actions will often happen in chat apps

## Non-Goals

- No on-site checkout or payment gateway in the first version
- No user accounts, cart, or order history
- No large marketplace-style catalog or vendor system
- No broad general-audience positioning; the main audience remains devs and IT students

## Target Audience

Primary audience:

- Students learning programming
- Freshers and junior developers
- Early-career IT workers who want affordable AI tools for study and work

Audience traits:

- Price-sensitive
- Familiar with chat apps
- Wants practical recommendations, not marketing fluff
- Prefers clear packaging and visible pricing over “inbox for price”

## Positioning

Primary positioning:

- A store for affordable AI accounts for developers and IT students

Supporting positioning:

- A curated place that also teaches users how to pick and use AI tools effectively

Tone:

- Direct
- Transparent
- Technical but accessible
- Conversion-oriented without sounding spammy

## Information Architecture

Primary sections:

- `/`
- `/store`
- `/store/[slug]`
- `/blog`
- `/blog/[...slug]`
- `/tools`
- `/tools/[slug]`
- `/faq`
- `/contact`

Optional supporting route:

- `/for-luyencode` if a dedicated landing page becomes useful for traffic segmentation

Navigation priorities:

- Store
- Tools
- Blog
- FAQ
- Contact

Global primary actions:

- View products
- Find the right package
- Contact via Zalo
- Contact via Telegram
- Contact via Messenger

## Conversion Flow

Primary conversion flow:

1. User lands on homepage or a content page
2. User navigates to store or a product page
3. User opens a product detail page
4. User reads package details and support terms
5. User chooses one of three chat channels
6. The chosen chat opens with a prefilled message containing the product name

Secondary conversion flows:

- Blog post -> related product -> product detail -> chat CTA
- Tool result -> suggested products -> product detail -> chat CTA
- FAQ -> store or direct product link -> chat CTA

The site must avoid dead ends. Every major page should include a clear path back to store or product detail pages.

## Homepage Design

The homepage should be store-first and conversion-first, while still carrying enough educational depth to feel credible.

### Hero

Purpose:

- Explain the value proposition immediately
- Make the audience feel the page is for them
- Present the main actions without delay

Hero content:

- Headline focused on buying AI accounts at clear prices for devs and IT students
- Supporting copy emphasizing practical value for study and work
- CTA to view the store
- CTA to find the right package
- Equal-weight contact options for Zalo, Telegram, and Messenger

### Featured Products

Show 4 to 6 products at the top of the homepage.

Each card should include:

- Product name
- 2 to 4 practical highlights
- Price
- Duration
- Warranty
- CTA to view details

Initial featured candidates from `products.md`:

- Google AI Pro 2TB family owner
- Google AI Pro 2TB family member
- Google Premium 5TB
- Google AI Ultra 30TB
- ChatGPT Plus personal renewal
- ChatGPT Plus personal new account

### Why Buy Here

This section should focus on concrete trust signals:

- Clear pricing
- Clear account form
- Warranty shown per package
- Practical support through familiar chat apps
- Packages relevant to dev and student workflows

### How It Works

The purchase flow should be expressed in three steps:

1. Pick a package
2. Review details and terms
3. Contact through the preferred chat channel for purchase and handoff

### Find Your Fit

This section helps undecided users narrow down choices fast.

Examples:

- Need general AI chat and coding assistance -> ChatGPT Plus
- Need Google AI plus storage -> Google AI Pro or Google Premium
- Need the highest Google tier -> Google AI Ultra

This section can link to tools and store filters.

### Trust Layer

Homepage trust modules:

- Short FAQ block
- Latest helpful blog posts
- Featured tools

These sections exist to reduce hesitation, not to distract users from the purchase path.

### Final CTA

End the page with a strong conversion block:

- One short closing line
- Three equal-weight chat actions
- Optional “view store again” action

## Store Design

### Store Listing Page

The store page should prioritize scanability over decorative presentation.

Capabilities:

- List all available products
- Group or filter by category
- Highlight featured products
- Expose price, duration, warranty, and account form immediately

Initial product categories:

- Google
- ChatGPT

Future categories can be added without changing page architecture.

Suggested list card structure:

- Product name
- Category badge
- Price
- Duration
- Warranty
- Account form
- Top highlights
- CTA to view details

### Product Detail Page

This is the core conversion page.

Required sections:

- Product title and short summary
- Pricing, duration, warranty, and account form
- Highlights
- Detailed feature breakdown
- Suitable for
- Not suitable for
- Purchase notes and handoff expectations
- Product FAQ
- Related blog posts
- Related tools
- Chat CTA block with Zalo, Telegram, Messenger

The CTA block should stay visually prominent and may also appear as a sticky mobile action area.

## Blog Design

The blog should support three outcomes:

- Increase search visibility
- Build trust with the target audience
- Help users choose the right package

Content themes:

- Which AI package fits which user type
- How students and junior devs use AI in study and work
- Comparisons between popular AI subscriptions
- Practical workflows with ChatGPT, Gemini, and related tools
- Budget-conscious recommendations for learning and productivity

Every blog post should be able to link back to one or more relevant products.

## Tools Design

Tools should be useful, lightweight, and directly related to choosing or using AI products.

Candidate tools:

- AI package recommendation quiz
- Monthly AI budget planner
- Compare package value by use case
- Student productivity stack selector
- Storage and AI usage fit checker

Tool results should avoid pretending to be exact. They should recommend 2 to 3 suitable options and explain why.

Each tool page should include:

- Inputs
- Result summary
- Recommended products
- Link to related blog posts
- Contact CTA

## FAQ Design

The FAQ page should mirror the role of `behivest`: reduce buying friction through structured answers.

Suggested FAQ groups:

- Buying and handoff
- Warranty and renewal
- Shared family vs owner account
- Privacy and safety expectations
- Choosing the right package

FAQ answers should remain specific and practical. The site should not hide important limitations or caveats.

## Contact Design

The contact model is chat-first.

Primary channels:

- Zalo
- Telegram
- Facebook Messenger

Rules:

- All three channels appear with equal priority
- Product pages should prefill a product-aware message template
- If one channel fails or is unavailable, the other two remain visible

Example prefilled message shape:

- “Chào bạn, mình muốn mua gói Google AI Pro 2TB. Bạn tư vấn giúp mình cách mua và bàn giao nhé.”

## Content Model

The site should use structured content rather than hardcoded product blocks in page templates.

### Product Model

Recommended fields:

- `slug`
- `category`
- `name`
- `variant`
- `tagline`
- `price`
- `billingTerm`
- `warranty`
- `deliveryType`
- `highlights`
- `details`
- `suitableFor`
- `notSuitableFor`
- `purchaseNotes`
- `faqs`
- `ctaMessageTemplate`
- `featured`
- `seoTitle`
- `seoDescription`

Initial normalized products:

- `google-ai-ultra-30tb-share`
- `google-premium-5tb-family-owner`
- `google-ai-pro-2tb-family-owner`
- `google-ai-pro-2tb-family-member`
- `chatgpt-plus-personal-renewal`
- `chatgpt-plus-personal-new-account`

### Blog Model

Recommended fields:

- `title`
- `description`
- `pubDate`
- `updatedDate`
- `tags`
- `category`
- `featured`
- `relatedProducts`

### FAQ Model

Recommended structure:

- Separate files by topic group
- Ordered group metadata
- Question-answer items per group

### Tool Model

Recommended fields:

- `slug`
- `title`
- `description`
- `inputs`
- `resultCopy`
- `relatedProducts`
- `relatedPosts`

## Design Direction

The design should preserve the clarity and structure quality seen in `behivest`, while shifting the tone from educational finance to productized AI commerce.

Visual direction:

- Bright, clean background
- Technical and trustworthy feel
- Strong information hierarchy
- Clear cards and CTA components
- Mobile-first contact actions

Stylistic guardrails:

- Avoid fake marketplace visuals
- Avoid aggressive sale-banner language
- Avoid making the site feel like a generic reseller page

The design should feel like a curated technical storefront, not a coupon site.

## Data Flow

High-level content flow:

1. Structured product content powers store list and detail pages
2. Blog posts and tools reference products through explicit relationships
3. FAQ content remains standalone but links users back to the buying flow
4. Chat CTA templates use product data to generate product-specific contact links

This structure keeps the site easy to scale as new packages, posts, and tools are added.

## Error Handling And Edge Cases

The design must handle common operational cases cleanly.

Cases:

- Product temporarily unavailable -> keep the page but switch CTA copy to availability inquiry
- User is unsure what to buy -> route them to fit guidance and recommendation tools
- Chat deep link fails -> keep all three channels accessible and visible
- Tool result is uncertain -> return ranked suggestions instead of a single definitive answer
- Traffic enters through blog or tools -> always surface related product actions

## SEO Strategy

The SEO model should follow a cluster approach similar to `behivest`.

Primary search intent areas:

- Buy ChatGPT Plus
- Buy Google AI Pro
- Buy Google Premium
- AI accounts for students and developers
- Which AI package should I buy
- Compare AI subscriptions

SEO requirements:

- Strong homepage metadata
- Structured product metadata
- Search-oriented blog titles and descriptions
- Internal linking between content and product pages
- Clear canonical handling
- Social sharing images

## Testing Strategy

Minimum test coverage for the first version:

- Unit tests for metadata helpers, product formatting, and tool logic
- E2E tests for the main purchase path
- Manual mobile verification for chat CTA behavior
- Broken-link and navigation checks

Critical end-to-end flows:

1. Homepage -> store -> product detail -> chat CTA
2. Blog post -> related product -> chat CTA
3. Tool result -> recommended product -> chat CTA
4. FAQ -> store or product -> chat CTA

## Success Criteria

The first release is successful if:

- Users can identify suitable packages quickly
- Product terms are understandable without asking basic clarifying questions first
- The path from landing to chat contact feels fast and obvious
- Blog, FAQ, and tools increase trust without weakening store conversion
- The site remains easy to extend with new products and content

## Implementation Notes

The implementation should reuse the strengths of the `behivest` stack and patterns where appropriate:

- Astro-based content architecture
- Structured collections for blog and FAQ
- Reusable layout and SEO components
- Lightweight client-side behavior only where needed

The build should remain content-driven and static-first, with minimal client-side JavaScript beyond tool logic and contact interactions.
