import { describe, expect, it } from "vitest";
import { buildContactHref } from "../../src/utils/contact";

describe("contact helpers", () => {
  it("creates an internal Telegram redirect link", () => {
    expect(
      buildContactHref({
        channel: "telegram",
      }),
    ).toBe("/go/telegram");
  });

  it("creates an internal Zalo redirect link", () => {
    expect(
      buildContactHref({
        channel: "zalo",
      }),
    ).toBe("/go/zalo");
  });

  it("keeps base paths when generating redirect links", () => {
    expect(
      buildContactHref({
        basePath: "/shop/",
        channel: "messenger",
      }),
    ).toBe("/shop/go/messenger");
  });
});
