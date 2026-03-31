# Repository Guidelines

## Project Structure & Module Organization

`src/` contains the Astro app. Use `src/pages/` for routes, `src/components/` for reusable UI, `src/layouts/` for page shells, and `src/utils/` for plain TypeScript helpers. Content collections live in `src/content/`: blog posts in `blog/*.mdx`, product data in `products/*.json`, FAQ groups in `faq/*.json`, and tool configs in `tools/*.json`. Static assets belong in `public/`. Treat `dist/`, `.astro/`, and `test-results/` as generated output.

## Build, Test, and Development Commands

Install dependencies with `npm install`. Use `npm run dev` for local development and `npm run preview` to serve the production build. Run `npm run build` before merging; it performs `astro check` and then builds the site. Use `npm run lint` for ESLint, `npm run format:check` to verify Prettier output, and `npm run format` to rewrite files. Test commands: `npm test` for Vitest and `npm run test:e2e` for Playwright.

## Coding Style & Naming Conventions

Follow the existing TypeScript and Astro style: 2-space indentation, semicolons, and single quotes in `.ts` files. Keep Astro components and layouts in `PascalCase` such as `ProductCard.astro`; utility modules use `camelCase` filenames such as `contact.ts`. Content filenames and slugs use lowercase kebab-case, for example `google-ai-pro-2tb-family-owner.json`. Prefer the configured path aliases like `@components/*` and `@utils/*` over deep relative imports.

## Testing Guidelines

Unit tests use Vitest with files named `tests/unit/**/*.test.ts`. End-to-end coverage uses Playwright in `tests/e2e/**/*.spec.ts`. Add or update tests whenever you change utility logic, route behavior, or content-driven rendering. There is no enforced coverage threshold yet, so contributors should protect the touched paths directly with focused assertions.

## Commit & Pull Request Guidelines

This repository currently has no commit history, so no house style is established yet. Use short, imperative commit messages and keep one logical change per commit, for example `feat: add store comparison copy` or `fix: correct tool recommendation logic`. PRs should include a concise summary, linked issue if relevant, the commands you ran, and screenshots for visible UI changes.

## Configuration Tips

Keep links `BASE_URL`-aware when adding new routes or cards so local dev and deployed builds behave the same.
