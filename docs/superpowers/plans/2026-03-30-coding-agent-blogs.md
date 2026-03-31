# Coding Agent Blogs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all existing blog posts with five new beginner-friendly Vietnamese posts about coding-agent best practices, researched from official/current web sources and cited at the end of each article.

**Architecture:** Keep the existing Astro content collection and route structure unchanged. Replace only `src/content/blog/*.mdx` entries with new slugs, consistent frontmatter, rewritten Markdown content, and a references section per post.

**Tech Stack:** Astro content collections, MDX, markdown frontmatter, official web documentation as research sources

---

### Task 1: Audit current blog structure and rendering

**Files:**

- Modify: `src/content/blog/*.mdx`
- Reference: `src/content/config.ts`, `src/pages/blog/index.astro`, `src/pages/blog/[...slug].astro`

- [ ] Confirm blog collection schema and route expectations match new content format.
- [ ] Confirm existing blog files can be removed without changing route code.

### Task 2: Research current official guidance

**Files:**

- Create: research notes in working memory only

- [ ] Gather official or primary-source references covering prompt clarity, project context, rules/workflows, verification, and safe task delegation for coding agents.
- [ ] Group the sources into five beginner-friendly article topics with minimal overlap.

### Task 3: Replace blog content set

**Files:**

- Delete/Create: `src/content/blog/*.mdx`

- [ ] Remove all current blog articles from `src/content/blog`.
- [ ] Create five new MDX posts with new slugs, compliant frontmatter, original Vietnamese copy, and a `## Tài liệu tham khảo` section containing source links.

### Task 4: Validate content buildability

**Files:**

- Verify: `src/content/blog/*.mdx`

- [ ] Run a focused build check for Astro content via `npm run build`.
- [ ] Fix any frontmatter, markdown, or collection-schema issues reported by the build.
