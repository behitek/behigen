import { describe, expect, it } from "vitest";
import { buildAbsoluteUrl, normalizePathWithBase } from "../../src/utils/seo";

describe("seo helpers", () => {
  it("prefixes site-relative asset paths with the Astro base path", () => {
    expect(
      normalizePathWithBase({
        path: "/blog/prompt-coding-agent.jpg",
        basePath: "/behigen/",
      }),
    ).toBe("/behigen/blog/prompt-coding-agent.jpg");
  });

  it("builds an absolute URL for site-relative images", () => {
    expect(
      buildAbsoluteUrl({
        pathOrUrl: "/og-image.svg",
        basePath: "/behigen/",
        site: "https://behitek.com",
      }),
    ).toBe("https://behitek.com/behigen/og-image.svg");
  });
});
