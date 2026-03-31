# Local Blog Thumbnails Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace remote blog thumbnail URLs with locally served image files downloaded from open-source image sites.

**Architecture:** Keep the existing Astro blog rendering intact, loosen the content schema to allow local thumbnail paths, store downloaded assets under `public/blog/`, and update each blog frontmatter to point at the local path.

**Tech Stack:** Astro content collections, public static assets, local image files from open-source providers

---

### Task 1: Inspect schema and render assumptions

**Files:**

- Modify: `src/content/config.ts`
- Reference: `src/components/content/PostCard.astro`, `src/pages/blog/[...slug].astro`

- [ ] Confirm current schema only allows absolute URLs for thumbnails.
- [ ] Confirm blog pages can render static files from `public/` without code changes beyond schema.

### Task 2: Source and download five blog thumbnails

**Files:**

- Create: `public/blog/*`

- [ ] Find five relevant landscape images from open-source sources suitable for the five blog topics.
- [ ] Download and save them with stable filenames under `public/blog/`.

### Task 3: Wire local thumbnails into content

**Files:**

- Modify: `src/content/blog/*.mdx`
- Modify: `src/content/config.ts`

- [ ] Change the `thumbnail` schema to accept local string paths.
- [ ] Update all five blog frontmatters to use local thumbnail paths.

### Task 4: Validate buildability

**Files:**

- Verify: `src/content/blog/*.mdx`, `public/blog/*`

- [ ] Run `npm run build` and fix any schema or rendering issues.
