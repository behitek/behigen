# Helpful Blog Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current blog seeds with five helpful Vietnamese resource posts and update the blog UI to show source thumbnails and external-source metadata.

**Architecture:** Keep the existing Astro blog collection and routes, add a few optional metadata fields, then refresh the card/detail rendering to emphasize curated external resources. Store the new resource summaries as MDX content so the current blog pipeline continues to work without new routing logic.

**Tech Stack:** Astro, Astro Content Collections, MDX, Tailwind CSS, Playwright

---

### Task 1: Extend blog metadata and UI bindings

**Files:**

- Modify: `src/content/config.ts`
- Modify: `src/components/content/PostCard.astro`
- Modify: `src/pages/blog/[...slug].astro`
- Modify: `src/pages/blog/index.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add optional source and thumbnail fields to the blog schema**
- [ ] **Step 2: Update post cards to render the thumbnail, source label, and richer resource-style card layout**
- [ ] **Step 3: Update the blog detail page to render hero thumbnail and source CTA**
- [ ] **Step 4: Refresh blog index/homepage copy so it matches the new helpful-resource positioning**

### Task 2: Replace seeded content with five helpful posts

**Files:**

- Delete: `src/content/blog/chon-goi-ai-cho-sinh-vien-it.mdx`
- Delete: `src/content/blog/chatgpt-plus-hay-google-ai-pro-cho-dev.mdx`
- Delete: `src/content/blog/cach-dung-ai-de-hoc-code-thong-minh-hon.mdx`
- Create: `src/content/blog/xay-skill-cho-claude-tu-tai-lieu-anthropic.mdx`
- Create: `src/content/blog/dung-superpowers-de-lam-viec-voi-skill-bai-ban-hon.mdx`
- Create: `src/content/blog/dung-rules-va-workflows-de-vibe-code-bot-hon.mdx`
- Create: `src/content/blog/tuy-bien-codex-dung-cach-voi-customization.mdx`
- Create: `src/content/blog/viet-agents-md-de-codex-hieu-repo-cua-ban.mdx`

- [ ] **Step 1: Write frontmatter for each post with title, description, source metadata, and remote thumbnail URL**
- [ ] **Step 2: Write Vietnamese MDX content that explains why the source matters and how to apply it**

### Task 3: Update verification

**Files:**

- Modify: `tests/e2e/content-paths.spec.ts`

- [ ] **Step 1: Replace the old blog title assertion with a new one from the refreshed content**
- [ ] **Step 2: Run `npm run build`**
- [ ] **Step 3: Run the blog e2e check if the local environment supports it**
