import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";

const BASE_URL_PROD = "/behigen/";
const isDev = process.argv.includes("dev");
const BASE_URL = isDev ? "/" : BASE_URL_PROD;

export default defineConfig({
  site: "https://behitek.com",
  base: BASE_URL,
  vite: {
    resolve: {
      alias: {
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@content": fileURLToPath(new URL("./src/content", import.meta.url)),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
        "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
        "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
  integrations: [mdx(), sitemap(), tailwind({ applyBaseStyles: false })],
});
