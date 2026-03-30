export interface AiPackageQuizAnswers {
  primaryNeed: 'google' | 'coding';
  googleUseCase: 'balanced' | 'storage' | 'ultra';
  needsFamilyMembers: boolean;
  needsOwnerControl: boolean;
  wantsLowestPrice: boolean;
  hasExistingChatGptAccount: boolean;
}

export interface AiPackageQuizResult {
  recommendedSlug: string;
  heading: string;
  summary: string;
  whyNotOtherPath: string;
}

export function getAiPackageQuizResult(answers: AiPackageQuizAnswers): AiPackageQuizResult {
  if (answers.primaryNeed === 'coding') {
    if (answers.hasExistingChatGptAccount && !answers.wantsLowestPrice) {
      return {
        recommendedSlug: 'chatgpt-plus-personal-renewal',
        heading: 'Bạn hợp với ChatGPT Plus gia hạn chính chủ',
        summary:
          'Bạn không cần storage hệ Google và đã có tài khoản riêng để gia hạn nhanh cho nhu cầu chat AI và coding agent.',
        whyNotOtherPath:
          'Nhóm Google đáng tiền hơn khi bạn thật sự cần Drive, Photos hoặc family.'
      };
    }

    return {
      recommendedSlug: 'chatgpt-plus-personal-new-account',
      heading: 'Bạn nên bắt đầu bằng ChatGPT Plus cấp tài khoản mới',
      summary:
        'Bạn ưu tiên coding agent hơn storage và muốn điểm vào rẻ nhất để thử nhu cầu dùng thực tế.',
      whyNotOtherPath: 'Nhóm Google chỉ hợp hơn nếu bạn cần lưu trữ hoặc chia sẻ family.'
    };
  }

  if (answers.googleUseCase === 'ultra') {
    return {
      recommendedSlug: 'google-ai-ultra-30tb-share',
      heading: 'Bạn hợp với Google AI Ultra 30TB',
      summary:
        'Bạn cần tier Google cao hơn cùng dung lượng share rất lớn, nên bản Ultra đáng cân nhắc hơn các gói cân bằng.',
      whyNotOtherPath:
        'Nhóm ChatGPT / coding agent gọn hơn nhưng không giải quyết nhu cầu storage lớn.'
    };
  }

  if (answers.googleUseCase === 'storage' && answers.needsOwnerControl) {
    return {
      recommendedSlug: 'google-premium-5tb-family-owner',
      heading: 'Bạn hợp với Google Premium 5TB quản lý gia đình',
      summary:
        'Bạn ưu tiên storage dài hạn và cần full quyền family để tự quản lý thành viên.',
      whyNotOtherPath:
        'ChatGPT / coding agent mạnh cho code hơn nhưng không thay thế được storage hệ Google.'
    };
  }

  if (answers.needsOwnerControl) {
    return {
      recommendedSlug: 'google-ai-pro-2tb-family-owner',
      heading: 'Bạn hợp với Google AI Pro 2TB quản lý gia đình',
      summary:
        'Bạn cần cân bằng giữa AI Google, 2TB storage và quyền quản lý family.',
      whyNotOtherPath:
        'Nhóm ChatGPT / coding agent phù hợp hơn khi bạn không cần Drive, Photos hoặc quyền family.'
    };
  }

  return {
    recommendedSlug: 'google-ai-pro-2tb-family-member',
    heading: 'Bạn hợp với Google AI Pro 2TB tham gia gia đình',
    summary:
      'Bạn cần lợi ích AI và storage của Google nhưng không cần full quyền quản lý family.',
    whyNotOtherPath:
      'Đi theo ChatGPT / coding agent sẽ tiết kiệm hơn nếu bạn chỉ cần code và chat AI.'
  };
}
