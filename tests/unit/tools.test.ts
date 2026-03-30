import { describe, expect, it } from 'vitest';
import { getAiPackageQuizResult } from '../../src/utils/aiPackageQuiz';

describe('getAiPackageQuizResult', () => {
  it('routes coding-first users with an existing ChatGPT account to renewal', () => {
    const result = getAiPackageQuizResult({
      primaryNeed: 'coding',
      hasExistingChatGptAccount: true,
      wantsLowestPrice: false,
      googleUseCase: 'balanced',
      needsFamilyMembers: false,
      needsOwnerControl: false
    });

    expect(result.recommendedSlug).toBe('chatgpt-plus-personal-renewal');
  });

  it('routes coding-first users without an existing account to the low-cost new account option', () => {
    const result = getAiPackageQuizResult({
      primaryNeed: 'coding',
      hasExistingChatGptAccount: false,
      wantsLowestPrice: true,
      googleUseCase: 'balanced',
      needsFamilyMembers: false,
      needsOwnerControl: false
    });

    expect(result.recommendedSlug).toBe('chatgpt-plus-personal-new-account');
  });

  it('routes google users who need family control to the owner variant', () => {
    const result = getAiPackageQuizResult({
      primaryNeed: 'google',
      googleUseCase: 'balanced',
      needsFamilyMembers: true,
      needsOwnerControl: true,
      wantsLowestPrice: false,
      hasExistingChatGptAccount: false
    });

    expect(result.recommendedSlug).toBe('google-ai-pro-2tb-family-owner');
  });

  it('routes google users who only need to join a plan to the member variant', () => {
    const result = getAiPackageQuizResult({
      primaryNeed: 'google',
      googleUseCase: 'balanced',
      needsFamilyMembers: false,
      needsOwnerControl: false,
      wantsLowestPrice: true,
      hasExistingChatGptAccount: false
    });

    expect(result.recommendedSlug).toBe('google-ai-pro-2tb-family-member');
  });

  it('routes storage-heavy family-control users to google premium', () => {
    const result = getAiPackageQuizResult({
      primaryNeed: 'google',
      googleUseCase: 'storage',
      needsFamilyMembers: true,
      needsOwnerControl: true,
      wantsLowestPrice: false,
      hasExistingChatGptAccount: false
    });

    expect(result.recommendedSlug).toBe('google-premium-5tb-family-owner');
  });
});
