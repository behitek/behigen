import { describe, expect, it } from "vitest";
import { getAiPackageQuizResult } from "../../src/utils/aiPackageQuiz";

describe("getAiPackageQuizResult", () => {
  it("routes coding-first users with an existing ChatGPT account to renewal", () => {
    const result = getAiPackageQuizResult({
      primaryNeed: "coding",
      needsGoogleStorage: false,
      hasExistingChatGptAccount: true,
      wantsLowestPrice: false,
      googleUseCase: "balanced",
      needsFamilyMembers: false,
      needsOwnerControl: false,
    });

    expect(result.recommendedSlug).toBe("chatgpt-plus-personal-renewal");
  });

  it("routes coding-first users without an existing account to the low-cost new account option", () => {
    const result = getAiPackageQuizResult({
      primaryNeed: "coding",
      needsGoogleStorage: false,
      hasExistingChatGptAccount: false,
      wantsLowestPrice: true,
      googleUseCase: "balanced",
      needsFamilyMembers: false,
      needsOwnerControl: false,
    });

    expect(result.recommendedSlug).toBe("chatgpt-plus-personal-new-account");
  });

  it("routes google users who need family control to the owner variant", () => {
    const result = getAiPackageQuizResult({
      primaryNeed: "google",
      needsGoogleStorage: true,
      googleUseCase: "balanced",
      needsFamilyMembers: true,
      needsOwnerControl: true,
      wantsLowestPrice: false,
      hasExistingChatGptAccount: false,
    });

    expect(result.recommendedSlug).toBe("google-ai-pro-2tb-family-owner");
  });

  it("routes google users who only need to join a plan to the member variant", () => {
    const result = getAiPackageQuizResult({
      primaryNeed: "google",
      needsGoogleStorage: true,
      googleUseCase: "balanced",
      needsFamilyMembers: false,
      needsOwnerControl: false,
      wantsLowestPrice: true,
      hasExistingChatGptAccount: false,
    });

    expect(result.recommendedSlug).toBe("google-ai-pro-2tb-family-member");
  });

  it("routes storage-heavy family-control users to the owner variant", () => {
    const result = getAiPackageQuizResult({
      primaryNeed: "google",
      needsGoogleStorage: true,
      googleUseCase: "storage",
      needsFamilyMembers: true,
      needsOwnerControl: true,
      wantsLowestPrice: false,
      hasExistingChatGptAccount: false,
    });

    expect(result.recommendedSlug).toBe("google-ai-pro-2tb-family-owner");
  });

  it("recommends buying both when a coding-first user also needs google storage", () => {
    const result = getAiPackageQuizResult({
      primaryNeed: "coding",
      needsGoogleStorage: true,
      googleUseCase: "balanced",
      needsFamilyMembers: true,
      needsOwnerControl: false,
      wantsLowestPrice: false,
      hasExistingChatGptAccount: true,
    });

    expect(result.mode).toBe("bundle");
    expect(result.primaryRecommendation.slug).toBe(
      "chatgpt-plus-personal-renewal",
    );
    expect(result.secondaryRecommendation?.slug).toBe(
      "google-ai-pro-2tb-family-member",
    );
    expect(result.whyNotOtherPath).toMatch(/thiếu storage\/family/i);
  });

  it("lets google lead the bundle when storage needs are heavier than the coding side", () => {
    const result = getAiPackageQuizResult({
      primaryNeed: "coding",
      needsGoogleStorage: true,
      googleUseCase: "storage",
      needsFamilyMembers: true,
      needsOwnerControl: true,
      wantsLowestPrice: false,
      hasExistingChatGptAccount: false,
    });

    expect(result.mode).toBe("bundle");
    expect(result.primaryRecommendation.slug).toBe(
      "google-ai-pro-2tb-family-owner",
    );
    expect(result.secondaryRecommendation?.slug).toBe(
      "chatgpt-plus-personal-new-account",
    );
  });
});
