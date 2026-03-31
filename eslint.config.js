import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astroPlugin from "eslint-plugin-astro";

export default [
  {
    ignores: [
      ".agents/**",
      "dist/**",
      ".astro/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "docs/**",
    ],
  },
  ...astroPlugin.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,mjs,cjs}"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];
