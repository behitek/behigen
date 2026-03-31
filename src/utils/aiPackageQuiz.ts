export interface AiPackageQuizAnswers {
  primaryNeed: "google" | "coding";
  needsGoogleStorage: boolean;
  googleUseCase: "balanced" | "storage" | "ultra";
  needsFamilyMembers: boolean;
  needsOwnerControl: boolean;
  wantsLowestPrice: boolean;
  hasExistingChatGptAccount: boolean;
}

export interface AiPackageQuizAction {
  slug: string;
  label: string;
}

export interface AiPackageQuizResult {
  mode: "single" | "bundle";
  recommendedSlug: string;
  heading: string;
  summary: string;
  reasons: string[];
  whyNotOtherPath: string;
  primaryRecommendation: AiPackageQuizAction;
  secondaryRecommendation?: AiPackageQuizAction;
}

function getChatGptRecommendation(
  answers: Pick<
    AiPackageQuizAnswers,
    "hasExistingChatGptAccount" | "wantsLowestPrice"
  >,
): AiPackageQuizAction {
  if (answers.hasExistingChatGptAccount && !answers.wantsLowestPrice) {
    return {
      slug: "chatgpt-plus-personal-renewal",
      label: "Xem ChatGPT Plus gia hạn",
    };
  }

  return {
    slug: "chatgpt-plus-personal-new-account",
    label: "Xem ChatGPT Plus tài khoản mới",
  };
}

function getGoogleRecommendation(
  answers: Pick<AiPackageQuizAnswers, "googleUseCase" | "needsOwnerControl">,
): AiPackageQuizAction {
  if (answers.googleUseCase === "ultra") {
    return {
      slug: "google-ai-ultra-30tb-share",
      label: "Xem Google AI Ultra 30TB",
    };
  }

  if (answers.googleUseCase === "storage" && answers.needsOwnerControl) {
    return {
      slug: "google-premium-5tb-family-owner",
      label: "Xem Google Premium 5TB",
    };
  }

  if (answers.needsOwnerControl) {
    return {
      slug: "google-ai-pro-2tb-family-owner",
      label: "Xem Google AI Pro 2TB quản lý family",
    };
  }

  return {
    slug: "google-ai-pro-2tb-family-member",
    label: "Xem Google AI Pro 2TB tham gia",
  };
}

function buildReasons(answers: AiPackageQuizAnswers): string[] {
  const reasons: string[] = [];

  if (answers.primaryNeed === "coding") {
    reasons.push(
      "Bạn ưu tiên hiệu suất coding, debug và chat AI cho công việc hằng ngày.",
    );
  } else {
    reasons.push(
      "Bạn nghiêng về hệ sinh thái Google hơn là chỉ mua một gói chat AI riêng lẻ.",
    );
  }

  if (answers.needsGoogleStorage) {
    reasons.push("Bạn vẫn cần Drive, storage hoặc chia sẻ/family của Google.");
  }

  if (answers.googleUseCase === "storage") {
    reasons.push(
      "Nhu cầu storage của bạn nghiêng về lưu trữ dài hạn hơn là chỉ chat AI.",
    );
  }

  if (answers.googleUseCase === "ultra") {
    reasons.push(
      "Bạn cần tier Google và dung lượng rất cao, nên gói Google phải được tính riêng.",
    );
  }

  if (answers.needsOwnerControl) {
    reasons.push(
      "Bạn cần full quyền quản lý family thay vì chỉ tham gia vào gói của người khác.",
    );
  }

  if (answers.hasExistingChatGptAccount) {
    reasons.push(
      "Bạn đã có tài khoản ChatGPT nên phương án gia hạn sẽ gọn hơn nếu cần dùng thêm.",
    );
  }

  return reasons;
}

export function getAiPackageQuizResult(
  answers: AiPackageQuizAnswers,
): AiPackageQuizResult {
  const chatGptRecommendation = getChatGptRecommendation(answers);
  const googleRecommendation = getGoogleRecommendation(answers);
  const reasons = buildReasons(answers);

  if (answers.primaryNeed === "coding" && answers.needsGoogleStorage) {
    const googleShouldLead =
      answers.googleUseCase === "storage" ||
      answers.googleUseCase === "ultra" ||
      answers.needsOwnerControl;
    const primaryRecommendation = googleShouldLead
      ? googleRecommendation
      : chatGptRecommendation;
    const secondaryRecommendation = googleShouldLead
      ? chatGptRecommendation
      : googleRecommendation;

    return {
      mode: "bundle",
      recommendedSlug: primaryRecommendation.slug,
      heading: "Bạn nên tách ra 2 gói: ChatGPT cho code, Google cho storage",
      summary:
        "Một gói duy nhất sẽ không phủ đủ nhu cầu của bạn. ChatGPT xử lý phần coding tốt hơn, còn Google giải quyết storage, Drive và family rõ ràng hơn.",
      reasons,
      whyNotOtherPath:
        "Nếu chỉ chọn ChatGPT bạn sẽ thiếu storage/family; nếu chỉ chọn Google bạn sẽ hụt trải nghiệm coding agent chuyên hơn.",
      primaryRecommendation,
      secondaryRecommendation,
    };
  }

  if (answers.primaryNeed === "coding") {
    if (answers.hasExistingChatGptAccount && !answers.wantsLowestPrice) {
      return {
        mode: "single",
        recommendedSlug: chatGptRecommendation.slug,
        heading: "Bạn hợp với ChatGPT Plus gia hạn chính chủ",
        summary:
          "Bạn không cần storage hệ Google và đã có tài khoản riêng để gia hạn nhanh cho nhu cầu chat AI và coding agent.",
        reasons,
        whyNotOtherPath:
          "Nhóm Google đáng tiền hơn khi bạn thật sự cần Drive, Photos hoặc family.",
        primaryRecommendation: chatGptRecommendation,
      };
    }

    return {
      mode: "single",
      recommendedSlug: chatGptRecommendation.slug,
      heading: "Bạn nên bắt đầu bằng ChatGPT Plus cấp tài khoản mới",
      summary:
        "Bạn ưu tiên coding agent hơn storage và muốn điểm vào rẻ nhất để thử nhu cầu dùng thực tế.",
      reasons,
      whyNotOtherPath:
        "Nhóm Google chỉ hợp hơn nếu bạn cần lưu trữ hoặc chia sẻ family.",
      primaryRecommendation: chatGptRecommendation,
    };
  }

  if (answers.googleUseCase === "ultra") {
    return {
      mode: "single",
      recommendedSlug: googleRecommendation.slug,
      heading: "Bạn hợp với Google AI Ultra 30TB",
      summary:
        "Bạn cần tier Google cao hơn cùng dung lượng share rất lớn, nên bản Ultra đáng cân nhắc hơn các gói cân bằng.",
      reasons,
      whyNotOtherPath:
        "Nhóm ChatGPT / coding agent gọn hơn nhưng không giải quyết nhu cầu storage lớn.",
      primaryRecommendation: googleRecommendation,
    };
  }

  if (answers.googleUseCase === "storage" && answers.needsOwnerControl) {
    return {
      mode: "single",
      recommendedSlug: googleRecommendation.slug,
      heading: "Bạn hợp với Google Premium 5TB quản lý gia đình",
      summary:
        "Bạn ưu tiên storage dài hạn và cần full quyền family để tự quản lý thành viên.",
      reasons,
      whyNotOtherPath:
        "ChatGPT / coding agent mạnh cho code hơn nhưng không thay thế được storage hệ Google.",
      primaryRecommendation: googleRecommendation,
    };
  }

  if (answers.needsOwnerControl) {
    return {
      mode: "single",
      recommendedSlug: googleRecommendation.slug,
      heading: "Bạn hợp với Google AI Pro 2TB quản lý gia đình",
      summary:
        "Bạn cần cân bằng giữa AI Google, 2TB storage và quyền quản lý family.",
      reasons,
      whyNotOtherPath:
        "Nhóm ChatGPT / coding agent phù hợp hơn khi bạn không cần Drive, Photos hoặc quyền family.",
      primaryRecommendation: googleRecommendation,
    };
  }

  return {
    mode: "single",
    recommendedSlug: googleRecommendation.slug,
    heading: "Bạn hợp với Google AI Pro 2TB tham gia gia đình",
    summary:
      "Bạn cần lợi ích AI và storage của Google nhưng không cần full quyền quản lý family.",
    reasons,
    whyNotOtherPath:
      "Đi theo ChatGPT / coding agent sẽ tiết kiệm hơn nếu bạn chỉ cần code và chat AI.",
    primaryRecommendation: googleRecommendation,
  };
}
