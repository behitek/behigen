import { describe, expect, it } from "vitest";
import { buildAbsoluteUrl } from "../../src/utils/seo";

describe("seo helpers", () => {
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
