# Behigen GitHub Pages CI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add GitHub Actions CI and GitHub Pages deployment so this Astro site can build and publish under `https://behitek.com/behigen/`.

**Architecture:** Keep CI and deployment separate. `ci.yml` validates linting, formatting, unit tests, and production build for pushes and pull requests, while `deploy.yml` re-runs validation on `main` and publishes `dist/` through GitHub Pages.

**Tech Stack:** GitHub Actions, Node.js 20, npm, Astro, GitHub Pages

---

### Task 1: Add CI workflow

**Files:**

- Create: `.github/workflows/ci.yml`
- Test: `package.json`

- [ ] **Step 1: Create the CI workflow file**

```yaml
name: CI
```

- [ ] **Step 2: Add checkout, Node setup, and npm cache for each job**

```yaml
- name: Checkout code
  uses: actions/checkout@v4

- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
```

- [ ] **Step 3: Add lint, format, unit test, and build jobs**

```yaml
- name: Install dependencies
  run: npm ci

- name: Run linter
  run: npm run lint
```

- [ ] **Step 4: Verify the project still builds locally**

Run: `npm run build`
Expected: Astro check and production build complete successfully.

### Task 2: Add deployment workflow

**Files:**

- Create: `.github/workflows/deploy.yml`
- Modify: `astro.config.mjs`
- Test: `package.json`

- [ ] **Step 1: Create the GitHub Pages deployment workflow**

```yaml
name: Deploy to GitHub Pages
```

- [ ] **Step 2: Add required Pages permissions and concurrency**

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

- [ ] **Step 3: Add a validation job and a deploy job that uploads `dist/`**

```yaml
- name: Setup Pages
  uses: actions/configure-pages@v4

- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: './dist'
```

- [ ] **Step 4: Verify Astro production base remains `/behigen/`**

Run: `npm run build`
Expected: built assets and routes use the `/behigen/` base path for production output.
