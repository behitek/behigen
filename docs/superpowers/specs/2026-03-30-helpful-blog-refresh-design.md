# Helpful Blog Refresh Design

## Goal

Replace the current lightweight promotional blog entries with genuinely useful Vietnamese resource posts based on five provided external sources, and make those posts visually clearer by showing internet-sourced thumbnails and source context.

## Scope

- Keep the existing Astro content collection and blog routes.
- Replace the seeded blog content with five new MDX posts:
  - Anthropic PDF on building skills
  - `obra/superpowers`
  - Google Antigravity rules/workflows docs
  - OpenAI Codex customization docs
  - OpenAI Codex `AGENTS.md` guide
- Extend blog metadata so each post can store:
  - external source URL
  - source label
  - thumbnail URL
- Update blog cards and blog detail pages to surface the new metadata.

## Approach

Use the smallest safe change:

1. Extend the `blog` collection schema with optional `sourceUrl`, `sourceLabel`, and `thumbnail`.
2. Replace the existing three MDX files with five Vietnamese resource-style posts that summarize why each source is useful and what readers should apply.
3. Use remote thumbnail URLs generated from the source pages so the site can display internet-derived previews without adding local asset management.
4. Update card and detail layouts so the blog reads like a curated learning/resource section rather than a short sales-support section.

## UX Changes

- Blog cards should show:
  - a thumbnail
  - category
  - source label
  - title, description, date
- Blog detail pages should show:
  - the thumbnail as a hero image
  - source label and publication date
  - a direct CTA to open the original source
- Blog index and homepage copy should shift from “buying guidance” language toward “helpful docs, workflows, and prompt-engineering resources.”

## Risks

- Remote thumbnails depend on third-party availability.
- The Google Antigravity page exposes limited scrapeable text, so its Vietnamese summary will stay high-level and URL-faithful instead of over-claiming undocumented details.

## Verification

- `npm run build`
- Update the existing blog e2e assertion to match one of the new titles.
