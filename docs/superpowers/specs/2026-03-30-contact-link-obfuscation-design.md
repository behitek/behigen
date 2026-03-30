# Contact Link Obfuscation Design

## Overview

This document defines how the site should expose Zalo, Telegram, and Facebook Messenger contact actions without rendering the real chat URLs directly in the HTML.

The goal is to reduce automated spam from crawlers that scan static markup for chat links, while keeping the user-facing contact flow fast and predictable on a JavaScript-enabled site.

## Goals

- Replace placeholder contact URLs with the real Behitek chat destinations
- Keep the real external URLs out of server-rendered HTML
- Preserve prefilled contact messages for generic contact and product-specific CTAs
- Make Zalo the recommended contact channel in site copy and UI treatment
- Reuse one shared mechanism across homepage, contact page, and product CTAs

## Non-Goals

- No no-JavaScript fallback for opening chat apps directly
- No server-side redirect endpoint or API route
- No attempt to provide cryptographic secrecy; the goal is crawler resistance, not strong secrecy

## Real Contact Targets

- Zalo: `https://zalo.me/g/csrribk24f1y5x5xlimh`
- Telegram: `https://t.me/hieunv11`
- Facebook Messenger: `http://m.me/realbehitek/`

These exact destinations should be used by the redirect layer, but they must not appear in rendered HTML attributes or visible copy.

## Recommended Approach

Use internal redirect routes for every public contact action.

Instead of linking directly to external chat URLs, the site should generate internal links such as:

- `/go/zalo?m=<encoded message>`
- `/go/telegram?m=<encoded message>`
- `/go/messenger?m=<encoded message>`

Each internal route should render a lightweight Astro page with a small inline client-side script. That script reconstructs the true external target from obfuscated string parts, attaches the prefilled message using channel-specific query parameters, and redirects immediately in the browser.

This keeps the real contact URLs out of anchor tags and page HTML while preserving normal navigation and analytics-friendly internal links.

## Channel Behavior

### Zalo

- Use the real group link as the destination base
- Treat Zalo as the recommended contact channel in copy and ordering
- Continue appending the prefilled message using the existing `?text=` pattern already used by the site

### Telegram

- Use `https://t.me/hieunv11` as the destination base
- Append the prefilled message with `?text=...`

### Facebook Messenger

- Use `http://m.me/realbehitek/` as the destination base
- Preserve the current behavior of passing the prefilled message through `?ref=...`
- The public-facing label should be updated from “Messenger” to “Facebook” only if needed for clarity in copy; otherwise the UI may continue using “Messenger”

## Shared Helper Changes

`src/utils/contact.ts` should remain the single source of truth for contact-link generation.

Required changes:

- Replace fallback external URLs with stable internal route generation
- Keep the canonical channel list as `zalo`, `telegram`, and `messenger`
- Keep the existing message builder for product-aware prefills
- Return internal redirect URLs from `buildContactHref(...)` instead of direct external destinations

The helper should continue to hide channel-specific message parameter differences from calling components.

## Redirect Route Design

Add a dynamic route under `src/pages/go/[channel].astro`.

Responsibilities:

- Validate the requested channel against the supported list
- Read the encoded message from the query string
- Render minimal UI explaining that the site is opening the selected contact channel
- Include a JavaScript redirect script that:
  - reconstructs the destination from string fragments
  - applies the message query parameter for the current channel
  - redirects with `window.location.replace(...)`
- Show a manual continue link or button populated by the same script in case the automatic redirect is delayed or blocked

If the channel is invalid, the page should return a 404.

## UI Copy and Prioritization

Zalo should become the primary recommendation everywhere contact options are shown.

Expected UI updates:

- Put Zalo first in every contact action group
- Add “Khuyên dùng” or equivalent recommendation copy to the Zalo action where the layout supports it
- Adjust nearby text so users understand Zalo is the fastest/default contact path
- Keep Telegram and Messenger/Facebook available as secondary options

The visual change should stay within the current site style rather than introducing a new contact design language.

## HTML Exposure Constraint

After implementation, the homepage, contact page, and product CTA markup must only expose internal `/go/...` URLs. The real Zalo, Telegram, and Facebook destinations must not appear in:

- anchor `href` attributes
- rendered visible copy
- server-side serialized JSON or inline data attributes

The only place these destinations may exist is inside the redirect page’s client-side script, assembled from obfuscated fragments rather than stored as one literal URL string.

## Testing

At minimum, verify:

- `buildContactHref(...)` returns internal `/go/...` links
- Product-specific messages remain encoded correctly for each channel
- Invalid `/go/[channel]` requests do not redirect
- Zalo is rendered first and marked as recommended on contact-heavy pages
- Production build output no longer contains the real external chat URLs in page HTML for homepage/contact/store CTA pages

## Risks and Tradeoffs

- This approach deters simple crawlers but does not stop a determined scraper that executes JavaScript
- Client-side redirect pages add one extra navigation step, though it should be nearly invisible for normal users
- If message parameter support differs by platform, the redirect script must preserve the current channel-specific query pattern

## Success Criteria

The change is successful when:

- Users can still click contact buttons and land in the correct chat app with the prefilled message
- Zalo is visually and textually positioned as the recommended channel
- The real chat URLs are absent from normal rendered page HTML
- All contact surfaces in the site use the same centralized redirect mechanism
