# Tools Section Pivot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/tools` into a two-track section with one real package quiz and three educational LLM labs, then align homepage and product-page references with the new structure.

**Architecture:** Keep Astro routes static and render interactive tools with Astro components plus bundled client-side module scripts. Put all decision and simulation logic in small TypeScript helper modules with unit tests, then keep route files thin by branching to a quiz component or a lab component by `toolType` and `slug`.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS, Vitest, Playwright

---

## Scope Check

This plan keeps the quiz and the three labs in one implementation because they share the same content collection, `/tools` routes, homepage promotion, card UI, and verification flow. They are separate experiences, but not separate subsystems at the routing and content-model level.

## File Structure

### Content and schema

- Modify: `src/content/config.ts`
  Add tool metadata for `toolType`, `estimatedMinutes`, `level`, `learningOutcomes`, and `stepCount`.
- Modify: `src/content/tools/ai-package-quiz.json`
  Convert the placeholder quiz entry into a real practical tool entry.
- Modify: `src/content/tools/monthly-ai-budget.json`
  Replace with `token-hoat-dong-nhu-the-nao`.
- Modify: `src/content/tools/package-value-comparison.json`
  Replace with `llm-xu-ly-input-output-tool-va-thinking-ra-sao`.
- Create: `src/content/tools/coding-agent-tim-dung-skill-nhu-the-nao.json`
  Add the third educational lab.

### Pure logic

- Modify: `src/utils/tools.ts`
  Keep only shared tool metadata helpers and section-grouping helpers.
- Create: `src/utils/aiPackageQuiz.ts`
  Hold quiz answer/result types and exact product-routing logic.
- Create: `src/utils/tokenLab.ts`
  Derive token simulation state from user controls.
- Create: `src/utils/pipelineLab.ts`
  Derive conceptual LLM pipeline state from user controls.
- Create: `src/utils/skillFinderLab.ts`
  Derive coding-agent workflow routing from task signals.

### Components

- Create: `src/components/tools/ToolSection.astro`
  Render labeled sections on `/tools`.
- Modify: `src/components/tools/ToolCard.astro`
  Show tool type, time, and stronger description.
- Create: `src/components/tools/AiPackageQuiz.astro`
  Render the quiz form, result card, and client-side behavior.
- Create: `src/components/tools/LabShell.astro`
  Shared step layout for the educational labs.
- Create: `src/components/tools/TokenLab.astro`
  Token lab UI and interactive script.
- Create: `src/components/tools/PipelineLab.astro`
  Input/output/tool/thinking lab UI and interactive script.
- Create: `src/components/tools/SkillFinderLab.astro`
  Coding-agent skill-routing lab UI and interactive script.

### Routes

- Modify: `src/pages/tools/index.astro`
  Split the index into `Công cụ thực dụng` and `LLM Lab`.
- Modify: `src/pages/tools/[slug].astro`
  Branch between quiz and lab rendering.
- Modify: `src/pages/index.astro`
  Update tools section messaging to promote both tracks.
- Modify: `src/pages/store/[slug].astro`
  Restrict related tools to practical tools only, or remove the block if no practical tool is related.

### Tests

- Modify: `tests/unit/tools.test.ts`
  Replace placeholder recommendation tests with exact quiz-routing tests.
- Create: `tests/unit/tokenLab.test.ts`
  Cover token-state derivation.
- Create: `tests/unit/pipelineLab.test.ts`
  Cover LLM pipeline branching.
- Create: `tests/unit/skillFinderLab.test.ts`
  Cover coding-agent workflow routing.
- Create: `tests/e2e/tools.spec.ts`
  Cover the tools index, the practical quiz flow, and one educational lab page.

## Task 1: Expand the tools schema and reseed the tool content

**Files:**

- Modify: `src/content/config.ts`
- Modify: `src/content/tools/ai-package-quiz.json`
- Modify: `src/content/tools/monthly-ai-budget.json`
- Modify: `src/content/tools/package-value-comparison.json`
- Create: `src/content/tools/coding-agent-tim-dung-skill-nhu-the-nao.json`

- [ ] **Step 1: Rewrite the tool content entries first so the old schema fails loudly**

```json
{
  "slug": "ai-package-quiz",
  "title": "Chọn gói AI phù hợp",
  "description": "Một quiz ngắn để chọn đúng gói Google hoặc ChatGPT / coding agent theo nhu cầu thực tế.",
  "toolType": "practical",
  "featured": true,
  "estimatedMinutes": 3,
  "level": "beginner",
  "stepCount": 4,
  "learningOutcomes": [
    "Biết khi nào nên đi theo hướng Google",
    "Biết khi nào ChatGPT / coding agent là đủ",
    "Nhận 1 gợi ý sản phẩm cụ thể để xem tiếp trong cửa hàng"
  ],
  "relatedProducts": [
    "chatgpt-plus-personal-renewal",
    "google-ai-pro-2tb-family-owner",
    "google-ai-pro-2tb-family-member",
    "google-premium-5tb-family-owner",
    "google-ai-ultra-30tb-share"
  ],
  "relatedPosts": []
}
```

```json
{
  "slug": "token-hoat-dong-nhu-the-nao",
  "title": "Token hoạt động như thế nào",
  "description": "Mô phỏng cách prompt bị chia thành token, cách context window đầy lên, và vì sao prompt dài làm tăng chi phí.",
  "toolType": "lab",
  "featured": true,
  "estimatedMinutes": 12,
  "level": "beginner",
  "stepCount": 6,
  "learningOutcomes": [
    "Hiểu token là gì theo trực giác",
    "Hiểu context window đầy như thế nào",
    "Hiểu prompt dài ảnh hưởng đến chi phí và tốc độ ra sao"
  ],
  "relatedProducts": [],
  "relatedPosts": []
}
```

```json
{
  "slug": "llm-xu-ly-input-output-tool-va-thinking-ra-sao",
  "title": "LLM xử lý input, output, tool và thinking ra sao",
  "description": "Mô phỏng luồng xử lý từ input tới câu trả lời để thấy lúc nào model trả lời trực tiếp, lúc nào cần tool, và thinking nằm ở đâu.",
  "toolType": "lab",
  "featured": true,
  "estimatedMinutes": 14,
  "level": "beginner",
  "stepCount": 6,
  "learningOutcomes": [
    "Hiểu mô hình phân loại yêu cầu",
    "Hiểu lúc nào tool trở nên cần thiết",
    "Phân biệt output nhìn thấy với reasoning nội bộ"
  ],
  "relatedProducts": [],
  "relatedPosts": []
}
```

```json
{
  "slug": "coding-agent-tim-dung-skill-nhu-the-nao",
  "title": "Coding agent tìm đúng skill như thế nào",
  "description": "Mô phỏng cách coding agent chọn workflow và skill dựa trên scope task, instructions, test và mức độ rủi ro.",
  "toolType": "lab",
  "featured": true,
  "estimatedMinutes": 15,
  "level": "intermediate",
  "stepCount": 6,
  "learningOutcomes": [
    "Hiểu vì sao context repo làm đổi workflow",
    "Hiểu khi nào agent nên plan thay vì code ngay",
    "Biết cách mô tả task để agent chọn đúng skill hơn"
  ],
  "relatedProducts": [],
  "relatedPosts": []
}
```

- [ ] **Step 2: Run the build and confirm the old schema fails**

Run: `npm run build`  
Expected: FAIL with Zod/content errors complaining about missing `toolType`, `estimatedMinutes`, `level`, `learningOutcomes`, or `stepCount`

- [ ] **Step 3: Extend the tool schema to match the new content model**

```ts
const toolSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  toolType: z.enum(["practical", "lab"]),
  featured: z.boolean().default(false),
  estimatedMinutes: z.number().int().positive(),
  level: z.enum(["beginner", "intermediate"]),
  stepCount: z.number().int().positive(),
  learningOutcomes: z.array(z.string()).min(2),
  relatedProducts: z.array(z.string()).default([]),
  relatedPosts: z.array(z.string()).default([]),
});
```

- [ ] **Step 4: Run the build again to verify the collection passes**

Run: `npm run build`  
Expected: PASS with the four `/tools/*` routes generated

- [ ] **Step 5: Commit**

```bash
git add src/content/config.ts src/content/tools/ai-package-quiz.json src/content/tools/monthly-ai-budget.json src/content/tools/package-value-comparison.json src/content/tools/coding-agent-tim-dung-skill-nhu-the-nao.json
git commit -m "feat: redefine tools content model"
```

## Task 2: Build exact quiz-routing logic with unit tests

**Files:**

- Create: `src/utils/aiPackageQuiz.ts`
- Modify: `src/utils/tools.ts`
- Modify: `tests/unit/tools.test.ts`

- [ ] **Step 1: Replace the placeholder tests with failing quiz-routing tests**

```ts
import { describe, expect, it } from "vitest";
import { getAiPackageQuizResult } from "../../src/utils/aiPackageQuiz";

describe("getAiPackageQuizResult", () => {
  it("routes coding-first users with an existing ChatGPT account to renewal", () => {
    const result = getAiPackageQuizResult({
      primaryNeed: "coding",
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
      googleUseCase: "balanced",
      needsFamilyMembers: false,
      needsOwnerControl: false,
      wantsLowestPrice: true,
      hasExistingChatGptAccount: false,
    });

    expect(result.recommendedSlug).toBe("google-ai-pro-2tb-family-member");
  });

  it("routes storage-heavy family-control users to google premium", () => {
    const result = getAiPackageQuizResult({
      primaryNeed: "google",
      googleUseCase: "storage",
      needsFamilyMembers: true,
      needsOwnerControl: true,
      wantsLowestPrice: false,
      hasExistingChatGptAccount: false,
    });

    expect(result.recommendedSlug).toBe("google-premium-5tb-family-owner");
  });
});
```

- [ ] **Step 2: Run the quiz tests and verify they fail because the helper does not exist yet**

Run: `npm test -- tests/unit/tools.test.ts`  
Expected: FAIL with module or export errors for `getAiPackageQuizResult`

- [ ] **Step 3: Implement the quiz helper and shared tool-group helper**

```ts
export interface AiPackageQuizAnswers {
  primaryNeed: "google" | "coding";
  googleUseCase: "balanced" | "storage" | "ultra";
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

export function getAiPackageQuizResult(
  answers: AiPackageQuizAnswers,
): AiPackageQuizResult {
  if (answers.primaryNeed === "coding") {
    if (answers.hasExistingChatGptAccount && !answers.wantsLowestPrice) {
      return {
        recommendedSlug: "chatgpt-plus-personal-renewal",
        heading: "Bạn hợp với ChatGPT Plus gia hạn chính chủ",
        summary:
          "Bạn không cần storage hệ Google và đã có tài khoản riêng để gia hạn nhanh cho nhu cầu chat AI và coding agent.",
        whyNotOtherPath:
          "Nhóm Google đáng tiền hơn khi bạn thật sự cần Drive, Photos hoặc family.",
      };
    }

    return {
      recommendedSlug: "chatgpt-plus-personal-new-account",
      heading: "Bạn nên bắt đầu bằng ChatGPT Plus cấp tài khoản mới",
      summary:
        "Bạn ưu tiên coding agent hơn storage và muốn điểm vào rẻ nhất để thử nhu cầu dùng thực tế.",
      whyNotOtherPath:
        "Nhóm Google chỉ hợp hơn nếu bạn cần lưu trữ hoặc chia sẻ family.",
    };
  }

  if (answers.googleUseCase === "ultra") {
    return {
      recommendedSlug: "google-ai-ultra-30tb-share",
      heading: "Bạn hợp với Google AI Ultra 30TB",
      summary:
        "Bạn cần tier Google cao hơn cùng dung lượng share rất lớn, nên bản Ultra đáng cân nhắc hơn các gói cân bằng.",
      whyNotOtherPath:
        "Nhóm ChatGPT / coding agent gọn hơn nhưng không giải quyết nhu cầu storage lớn.",
    };
  }

  if (answers.googleUseCase === "storage" && answers.needsOwnerControl) {
    return {
      recommendedSlug: "google-premium-5tb-family-owner",
      heading: "Bạn hợp với Google Premium 5TB quản lý gia đình",
      summary:
        "Bạn ưu tiên storage dài hạn và cần full quyền family để tự quản lý thành viên.",
      whyNotOtherPath:
        "ChatGPT / coding agent mạnh cho code hơn nhưng không thay thế được storage hệ Google.",
    };
  }

  if (answers.needsOwnerControl) {
    return {
      recommendedSlug: "google-ai-pro-2tb-family-owner",
      heading: "Bạn hợp với Google AI Pro 2TB quản lý gia đình",
      summary:
        "Bạn cần cân bằng giữa AI Google, 2TB storage và quyền quản lý family.",
      whyNotOtherPath:
        "Nhóm ChatGPT / coding agent phù hợp hơn khi bạn không cần Drive, Photos hoặc quyền family.",
    };
  }

  return {
    recommendedSlug: "google-ai-pro-2tb-family-member",
    heading: "Bạn hợp với Google AI Pro 2TB tham gia gia đình",
    summary:
      "Bạn cần lợi ích AI và storage của Google nhưng không cần full quyền quản lý family.",
    whyNotOtherPath:
      "Đi theo ChatGPT / coding agent sẽ tiết kiệm hơn nếu bạn chỉ cần code và chat AI.",
  };
}
```

```ts
export function groupToolsByType<
  T extends { data: { toolType: "practical" | "lab" } },
>(tools: T[]) {
  return {
    practical: tools.filter((tool) => tool.data.toolType === "practical"),
    labs: tools.filter((tool) => tool.data.toolType === "lab"),
  };
}
```

- [ ] **Step 4: Run the unit test again and verify it passes**

Run: `npm test -- tests/unit/tools.test.ts`  
Expected: PASS with five quiz-routing tests green

- [ ] **Step 5: Commit**

```bash
git add src/utils/aiPackageQuiz.ts src/utils/tools.ts tests/unit/tools.test.ts
git commit -m "feat: add ai package quiz logic"
```

## Task 3: Build the token-lab state helper with unit tests

**Files:**

- Create: `src/utils/tokenLab.ts`
- Create: `tests/unit/tokenLab.test.ts`

- [ ] **Step 1: Write failing tests for token capacity states**

```ts
import { describe, expect, it } from "vitest";
import { buildTokenLabState } from "../../src/utils/tokenLab";

describe("buildTokenLabState", () => {
  it("marks small prompts as healthy", () => {
    const state = buildTokenLabState({
      contentType: "chat",
      inputLength: "short",
      historyTurns: 1,
      outputReserve: "short",
    });

    expect(state.status).toBe("healthy");
    expect(state.overflowTokens).toBe(0);
  });

  it("marks long prompts as overflow when usage exceeds the context budget", () => {
    const state = buildTokenLabState({
      contentType: "code",
      inputLength: "very-long",
      historyTurns: 8,
      outputReserve: "long",
    });

    expect(state.status).toBe("overflow");
    expect(state.overflowTokens).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run the new unit tests and verify they fail**

Run: `npm test -- tests/unit/tokenLab.test.ts`  
Expected: FAIL with module-not-found or export-not-found errors

- [ ] **Step 3: Implement the token-state derivation helper**

```ts
export interface TokenLabControls {
  contentType: "chat" | "article" | "code";
  inputLength: "short" | "medium" | "long" | "very-long";
  historyTurns: number;
  outputReserve: "short" | "medium" | "long";
}

export interface TokenLabState {
  usedTokens: number;
  remainingTokens: number;
  overflowTokens: number;
  status: "healthy" | "tight" | "overflow";
  segments: Array<{ label: string; tokens: number }>;
  takeaway: string;
}

const CONTEXT_LIMIT = 8192;

export function buildTokenLabState(controls: TokenLabControls): TokenLabState {
  const baseInput = {
    short: 220,
    medium: 900,
    long: 2600,
    "very-long": 6200,
  }[controls.inputLength];

  const contentMultiplier = {
    chat: 1,
    article: 1.15,
    code: 1.3,
  }[controls.contentType];

  const outputTokens = {
    short: 300,
    medium: 700,
    long: 1400,
  }[controls.outputReserve];

  const historyTokens = controls.historyTurns * 380;
  const inputTokens = Math.round(baseInput * contentMultiplier);
  const usedTokens = 250 + inputTokens + historyTokens + outputTokens;
  const overflowTokens = Math.max(0, usedTokens - CONTEXT_LIMIT);
  const remainingTokens = Math.max(0, CONTEXT_LIMIT - usedTokens);
  const status =
    overflowTokens > 0
      ? "overflow"
      : remainingTokens < 1200
        ? "tight"
        : "healthy";

  return {
    usedTokens,
    remainingTokens,
    overflowTokens,
    status,
    segments: [
      { label: "System", tokens: 250 },
      { label: "Input", tokens: inputTokens },
      { label: "History", tokens: historyTokens },
      { label: "Output reserve", tokens: outputTokens },
    ],
    takeaway:
      status === "overflow"
        ? "Prompt đã vượt context window nên hệ thống phải cắt bớt hoặc bỏ ngữ cảnh cũ."
        : status === "tight"
          ? "Prompt vẫn chạy được nhưng khoảng trống cho output và ngữ cảnh bổ sung đang khá chật."
          : "Prompt còn nhiều khoảng trống nên model có dư địa để trả lời đầy đủ hơn.",
  };
}
```

- [ ] **Step 4: Run the token helper tests and verify they pass**

Run: `npm test -- tests/unit/tokenLab.test.ts`  
Expected: PASS with healthy and overflow coverage

- [ ] **Step 5: Commit**

```bash
git add src/utils/tokenLab.ts tests/unit/tokenLab.test.ts
git commit -m "feat: add token lab state helper"
```

## Task 4: Build the LLM pipeline helper with unit tests

**Files:**

- Create: `src/utils/pipelineLab.ts`
- Create: `tests/unit/pipelineLab.test.ts`

- [ ] **Step 1: Write failing tests for direct, tool, and careful-response paths**

```ts
import { describe, expect, it } from "vitest";
import { buildPipelineLabState } from "../../src/utils/pipelineLab";

describe("buildPipelineLabState", () => {
  it("uses the direct path for a low-risk explanation request with no fresh-data need", () => {
    const state = buildPipelineLabState({
      requestType: "explain",
      hasToolAccess: false,
      needsFreshInfo: false,
      riskLevel: "low",
    });

    expect(state.route).toBe("direct");
  });

  it("uses the tool path when the request needs fresh information and tools exist", () => {
    const state = buildPipelineLabState({
      requestType: "search",
      hasToolAccess: true,
      needsFreshInfo: true,
      riskLevel: "medium",
    });

    expect(state.route).toBe("tool");
  });

  it("uses the careful path for high-risk requests even when no tool is needed", () => {
    const state = buildPipelineLabState({
      requestType: "advice",
      hasToolAccess: false,
      needsFreshInfo: false,
      riskLevel: "high",
    });

    expect(state.route).toBe("careful");
  });
});
```

- [ ] **Step 2: Run the pipeline tests and verify they fail**

Run: `npm test -- tests/unit/pipelineLab.test.ts`  
Expected: FAIL with missing helper exports

- [ ] **Step 3: Implement the pipeline-state helper**

```ts
export interface PipelineLabControls {
  requestType:
    | "chat"
    | "explain"
    | "summarize"
    | "code"
    | "compare"
    | "search"
    | "advice";
  hasToolAccess: boolean;
  needsFreshInfo: boolean;
  riskLevel: "low" | "medium" | "high";
}

export interface PipelineLabState {
  classification: string;
  route: "direct" | "tool" | "careful";
  visibleLayers: string[];
  takeaway: string;
}

export function buildPipelineLabState(
  controls: PipelineLabControls,
): PipelineLabState {
  const classificationMap = {
    chat: "Trao đổi mở",
    explain: "Giải thích khái niệm",
    summarize: "Tóm tắt nội dung",
    code: "Tác vụ code",
    compare: "So sánh lựa chọn",
    search: "Tra cứu thông tin",
    advice: "Tư vấn có độ nhạy cao",
  } as const;

  if (controls.riskLevel === "high") {
    return {
      classification: classificationMap[controls.requestType],
      route: "careful",
      visibleLayers: [
        "Input",
        "Intent classification",
        "Reasoning",
        "Guardrails",
        "Answer",
      ],
      takeaway:
        "Tác vụ rủi ro cao thường cần reasoning thận trọng hơn ngay cả khi không gọi tool.",
    };
  }

  if (controls.needsFreshInfo && controls.hasToolAccess) {
    return {
      classification: classificationMap[controls.requestType],
      route: "tool",
      visibleLayers: [
        "Input",
        "Intent classification",
        "Tool decision",
        "Tool result",
        "Answer",
      ],
      takeaway:
        "Khi câu hỏi cần dữ liệu mới, tool giúp tránh đoán mò dựa trên kiến thức cũ.",
    };
  }

  return {
    classification: classificationMap[controls.requestType],
    route: "direct",
    visibleLayers: ["Input", "Intent classification", "Reasoning", "Answer"],
    takeaway:
      "Không phải câu hỏi nào cũng cần tool; nhiều câu hỏi có thể trả lời trực tiếp nếu dữ liệu đủ ổn định.",
  };
}
```

- [ ] **Step 4: Run the pipeline tests and verify they pass**

Run: `npm test -- tests/unit/pipelineLab.test.ts`  
Expected: PASS with all three route branches covered

- [ ] **Step 5: Commit**

```bash
git add src/utils/pipelineLab.ts tests/unit/pipelineLab.test.ts
git commit -m "feat: add llm pipeline lab logic"
```

## Task 5: Build the coding-agent skill-routing helper with unit tests

**Files:**

- Create: `src/utils/skillFinderLab.ts`
- Create: `tests/unit/skillFinderLab.test.ts`

- [ ] **Step 1: Write failing tests for direct execution, debugging, brainstorming, and planning**

```ts
import { describe, expect, it } from "vitest";
import { buildSkillFinderState } from "../../src/utils/skillFinderLab";

describe("buildSkillFinderState", () => {
  it("uses direct execution for a clear low-risk quick edit", () => {
    const state = buildSkillFinderState({
      taskType: "quick-edit",
      hasInstructions: true,
      hasTests: true,
      isAmbiguous: false,
      isRisky: false,
      isVisual: false,
    });

    expect(state.workflow).toBe("direct-execution");
  });

  it("uses systematic debugging for a bug task", () => {
    const state = buildSkillFinderState({
      taskType: "bug-fix",
      hasInstructions: true,
      hasTests: true,
      isAmbiguous: false,
      isRisky: true,
      isVisual: false,
    });

    expect(state.workflow).toBe("systematic-debugging");
  });

  it("uses brainstorming for visual feature work", () => {
    const state = buildSkillFinderState({
      taskType: "new-feature",
      hasInstructions: true,
      hasTests: false,
      isAmbiguous: false,
      isRisky: false,
      isVisual: true,
    });

    expect(state.workflow).toBe("brainstorming");
  });

  it("uses writing-plans for ambiguous or risky feature work", () => {
    const state = buildSkillFinderState({
      taskType: "new-feature",
      hasInstructions: false,
      hasTests: false,
      isAmbiguous: true,
      isRisky: true,
      isVisual: false,
    });

    expect(state.workflow).toBe("writing-plans");
  });
});
```

- [ ] **Step 2: Run the skill-routing tests and verify they fail**

Run: `npm test -- tests/unit/skillFinderLab.test.ts`  
Expected: FAIL with missing helper exports

- [ ] **Step 3: Implement the workflow-derivation helper**

```ts
export interface SkillFinderControls {
  taskType: "quick-edit" | "bug-fix" | "new-feature" | "review" | "refactor";
  hasInstructions: boolean;
  hasTests: boolean;
  isAmbiguous: boolean;
  isRisky: boolean;
  isVisual: boolean;
}

export interface SkillFinderState {
  workflow:
    | "direct-execution"
    | "systematic-debugging"
    | "brainstorming"
    | "writing-plans";
  reason: string;
  improvementTip: string;
}

export function buildSkillFinderState(
  controls: SkillFinderControls,
): SkillFinderState {
  if (controls.taskType === "bug-fix") {
    return {
      workflow: "systematic-debugging",
      reason:
        "Bug tasks benefit from reproducing the issue and tightening the fix before editing code.",
      improvementTip:
        "Đưa lỗi tái hiện được và test thất bại để agent đi đúng luồng debug.",
    };
  }

  if (controls.isVisual) {
    return {
      workflow: "brainstorming",
      reason:
        "Visual or UX work needs design clarification before implementation.",
      improvementTip:
        "Nói rõ đối tượng, mục tiêu, và phong cách để agent không tự đoán UI.",
    };
  }

  if (controls.isAmbiguous || controls.isRisky || !controls.hasInstructions) {
    return {
      workflow: "writing-plans",
      reason:
        "Ambiguous or high-risk work needs explicit planning and scoping before code changes.",
      improvementTip:
        "Bổ sung scope, tiêu chí hoàn thành, và file liên quan để agent giảm đoán.",
    };
  }

  return {
    workflow: "direct-execution",
    reason:
      "The task is small, clear, and low-risk enough to execute directly.",
    improvementTip:
      "Giữ task ngắn, rõ file, và nêu lệnh test để agent xử lý nhanh hơn.",
  };
}
```

- [ ] **Step 4: Run the skill-routing tests and verify they pass**

Run: `npm test -- tests/unit/skillFinderLab.test.ts`  
Expected: PASS with the four workflow branches green

- [ ] **Step 5: Commit**

```bash
git add src/utils/skillFinderLab.ts tests/unit/skillFinderLab.test.ts
git commit -m "feat: add coding agent skill lab logic"
```

## Task 6: Rebuild the `/tools` index around two labeled sections

**Files:**

- Create: `src/components/tools/ToolSection.astro`
- Modify: `src/components/tools/ToolCard.astro`
- Modify: `src/pages/tools/index.astro`
- Create: `tests/e2e/tools.spec.ts`

- [ ] **Step 1: Add a failing E2E test for grouped tools sections**

```ts
import { expect, test } from "@playwright/test";

test("tools index shows both practical and lab sections", async ({ page }) => {
  await page.goto("/tools");

  await expect(
    page.getByRole("heading", { name: "Công cụ thực dụng" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "LLM Lab" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Chọn gói AI phù hợp/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Token hoạt động như thế nào/i }),
  ).toBeVisible();
});
```

- [ ] **Step 2: Run the tools E2E file and verify the new test fails**

Run: `npm run test:e2e -- tests/e2e/tools.spec.ts`  
Expected: FAIL because the grouped headings do not exist yet

- [ ] **Step 3: Implement the section component, richer tool cards, and grouped index**

```astro
--- src/components/tools/ToolSection.astro
import ToolCard from '@components/tools/ToolCard.astro';

interface Props {
  title: string;
  description: string;
  tools: Array<{ data: {
    slug: string;
    title: string;
    description: string;
    toolType: 'practical' | 'lab';
    estimatedMinutes: number;
    learningOutcomes: string[];
  } }>;
}

const { title, description, tools } = Astro.props;
---

<section>
  <div class="max-w-3xl">
    <h2 class="text-3xl font-black tracking-tight text-slate-950">{title}</h2>
    <p class="mt-3 text-base leading-7 text-slate-600">{description}</p>
  </div>
  <div class="mt-8 grid gap-6 lg:grid-cols-3">
    {tools.map((tool) => <ToolCard tool={tool.data} />)}
  </div>
</section>
```

```astro
--- src/components/tools/ToolCard.astro
const { tool } = Astro.props;
const typeLabel = tool.toolType === 'practical' ? 'Practical Tool' : 'LLM Lab';
---

<article class="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
  <div class="flex items-center justify-between gap-3">
    <p class="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-700">{typeLabel}</p>
    <p class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
      {tool.estimatedMinutes} phút
    </p>
  </div>
  <h3 class="mt-3 text-xl font-black text-slate-950">
    <a href={`${import.meta.env.BASE_URL}tools/${tool.slug}`}>{tool.title}</a>
  </h3>
  <p class="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>
  <ul class="mt-4 space-y-2 text-sm text-slate-700">
    {tool.learningOutcomes.slice(0, 2).map((item: string) => <li>• {item}</li>)}
  </ul>
</article>
```

```astro
--- src/pages/tools/index.astro
import { getCollection } from 'astro:content';
import ToolSection from '@components/tools/ToolSection.astro';
import Layout from '@layouts/Layout.astro';
import { groupToolsByType } from '@utils/tools';

const grouped = groupToolsByType(await getCollection('tools'));
---

<Layout title="Tools và LLM Lab" description="Quiz chọn gói phù hợp và các lab mô phỏng giúp hiểu LLM dễ hơn." canonical="/tools">
  <section class="container py-16">
    <div class="max-w-4xl">
      <p class="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700">Tools</p>
      <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950">Công cụ và LLM Lab</h1>
      <p class="mt-4 text-lg leading-8 text-slate-600">
        Một nơi để vừa chọn đúng gói AI, vừa hiểu các khái niệm LLM quan trọng bằng mô phỏng trực quan.
      </p>
    </div>

    <div class="mt-12 space-y-16">
      <ToolSection
        title="Công cụ thực dụng"
        description="Các tool ngắn, tập trung vào quyết định mua đúng gói theo nhu cầu thật."
        tools={grouped.practical}
      />

      <ToolSection
        title="LLM Lab"
        description="Các walkthrough 10-15 phút để hiểu token, tool use, reasoning và coding-agent workflow."
        tools={grouped.labs}
      />
    </div>
  </section>
</Layout>
```

- [ ] **Step 4: Run the tools E2E test again and verify the index test passes**

Run: `npm run test:e2e -- tests/e2e/tools.spec.ts`  
Expected: PASS for the grouped index test and no route-level regressions in this file

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/ToolSection.astro src/components/tools/ToolCard.astro src/pages/tools/index.astro tests/e2e/tools.spec.ts
git commit -m "feat: group tools index into practical and lab sections"
```

## Task 7: Implement the real `ai-package-quiz` page

**Files:**

- Create: `src/components/tools/AiPackageQuiz.astro`
- Modify: `src/pages/tools/[slug].astro`
- Modify: `tests/e2e/tools.spec.ts`

- [ ] **Step 1: Add a failing E2E test for the quiz result flow**

```ts
test("ai package quiz returns a concrete recommendation", async ({ page }) => {
  await page.goto("/tools/ai-package-quiz");

  await page.getByLabel("Nhu cầu chính").selectOption("google");
  await page.getByLabel("Bạn nghiêng về").selectOption("balanced");
  await page.getByLabel("Có cần tự quản lý family không?").selectOption("yes");
  await page.getByRole("button", { name: "Xem gợi ý" }).click();

  await expect(
    page.getByRole("heading", { name: /Google AI Pro 2TB quản lý gia đình/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Xem sản phẩm/i }),
  ).toHaveAttribute("href", /\/store\/google-ai-pro-2tb-family-owner$/);
});
```

- [ ] **Step 2: Run the tools E2E file and verify the quiz test fails**

Run: `npm run test:e2e -- tests/e2e/tools.spec.ts`  
Expected: FAIL because the interactive quiz UI does not exist yet

- [ ] **Step 3: Implement the quiz component and branch to it from the dynamic tool route**

```astro
--- src/components/tools/AiPackageQuiz.astro
import { getAiPackageQuizResult } from '@utils/aiPackageQuiz';

interface Props {
  tool: {
    title: string;
    description: string;
  };
}

const { tool } = Astro.props;
const defaultResult = getAiPackageQuizResult({
  primaryNeed: 'google',
  googleUseCase: 'balanced',
  needsFamilyMembers: true,
  needsOwnerControl: true,
  wantsLowestPrice: false,
  hasExistingChatGptAccount: false
});
---

<section class="container py-16" data-ai-package-quiz>
  <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
    <form class="rounded-[2rem] border border-slate-200 bg-white p-6" data-quiz-form>
      <label class="block text-sm font-semibold text-slate-900" for="primaryNeed">Nhu cầu chính</label>
      <select id="primaryNeed" name="primaryNeed" class="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3">
        <option value="google">Google: cần storage, Drive, Photos hoặc family</option>
        <option value="coding">ChatGPT / coding agent: cần code và chat AI</option>
      </select>

      <label class="mt-5 block text-sm font-semibold text-slate-900" for="googleUseCase">Bạn nghiêng về</label>
      <select id="googleUseCase" name="googleUseCase" class="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3">
        <option value="balanced">Cân bằng AI và storage</option>
        <option value="storage">Ưu tiên storage dài hạn</option>
        <option value="ultra">Cần tier Google và storage rất cao</option>
      </select>

      <label class="mt-5 block text-sm font-semibold text-slate-900" for="needsOwnerControl">Có cần tự quản lý family không?</label>
      <select id="needsOwnerControl" name="needsOwnerControl" class="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3">
        <option value="yes">Có, tôi cần full quyền family</option>
        <option value="no">Không, chỉ cần tham gia hoặc dùng một mình</option>
      </select>

      <label class="mt-5 block text-sm font-semibold text-slate-900" for="hasExistingChatGptAccount">Bạn đã có tài khoản ChatGPT cần gia hạn chưa?</label>
      <select id="hasExistingChatGptAccount" name="hasExistingChatGptAccount" class="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3">
        <option value="yes">Có, tôi muốn gia hạn tài khoản đang dùng</option>
        <option value="no">Chưa có hoặc không cần giữ tài khoản cũ</option>
      </select>

      <input type="hidden" name="needsFamilyMembers" value="yes" />
      <input type="hidden" name="wantsLowestPrice" value="no" />
      <button type="button" class="rounded-full bg-cyan-600 px-5 py-3 font-semibold text-white" data-submit>
        Xem gợi ý
      </button>
    </form>

    <article class="rounded-[2rem] border border-slate-200 bg-slate-50 p-6" data-result-card>
      <p class="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-700">Kết quả</p>
      <h2 class="mt-3 text-3xl font-black text-slate-950" data-result-heading>{defaultResult.heading}</h2>
      <p class="mt-4 text-base leading-7 text-slate-600" data-result-summary>{defaultResult.summary}</p>
      <p class="mt-4 text-sm leading-6 text-slate-500" data-result-why>{defaultResult.whyNotOtherPath}</p>
      <a class="mt-6 inline-flex rounded-full bg-slate-950 px-5 py-3 font-semibold text-white" data-result-link href={`${import.meta.env.BASE_URL}store/${defaultResult.recommendedSlug}`}>
        Xem sản phẩm
      </a>
    </article>
  </div>
</section>

<script type="module">
  import { getAiPackageQuizResult } from '../../utils/aiPackageQuiz';

  const root = document.querySelector('[data-ai-package-quiz]');
  if (root) {
    const readAnswers = () => ({
      primaryNeed: root.querySelector('[name="primaryNeed"]').value,
      googleUseCase: root.querySelector('[name="googleUseCase"]').value,
      needsFamilyMembers: root.querySelector('[name="needsFamilyMembers"]').value === 'yes',
      needsOwnerControl: root.querySelector('[name="needsOwnerControl"]').value === 'yes',
      wantsLowestPrice: root.querySelector('[name="wantsLowestPrice"]').value === 'yes',
      hasExistingChatGptAccount: root.querySelector('[name="hasExistingChatGptAccount"]').value === 'yes'
    });

    root.querySelector('[data-submit]')?.addEventListener('click', () => {
      const result = getAiPackageQuizResult(readAnswers());
      root.querySelector('[data-result-heading]').textContent = result.heading;
      root.querySelector('[data-result-summary]').textContent = result.summary;
      root.querySelector('[data-result-why]').textContent = result.whyNotOtherPath;
      root.querySelector('[data-result-link]').setAttribute('href', `${import.meta.env.BASE_URL}store/${result.recommendedSlug}`);
    });
  }
</script>
```

```astro
--- src/pages/tools/[slug].astro
import { getCollection } from 'astro:content';
import AiPackageQuiz from '@components/tools/AiPackageQuiz.astro';
import PipelineLab from '@components/tools/PipelineLab.astro';
import SkillFinderLab from '@components/tools/SkillFinderLab.astro';
import TokenLab from '@components/tools/TokenLab.astro';
import Layout from '@layouts/Layout.astro';

// getStaticPaths unchanged except new metadata now comes through

const { tool } = Astro.props;
---

<Layout title={tool.title} description={tool.description} canonical={`/tools/${tool.slug}`}>
  {tool.toolType === 'practical' ? (
    <AiPackageQuiz tool={tool} />
  ) : tool.slug === 'token-hoat-dong-nhu-the-nao' ? (
    <TokenLab tool={tool} />
  ) : tool.slug === 'llm-xu-ly-input-output-tool-va-thinking-ra-sao' ? (
    <PipelineLab tool={tool} />
  ) : (
    <SkillFinderLab tool={tool} />
  )}
</Layout>
```

- [ ] **Step 4: Run the tools E2E file again and verify the quiz flow passes**

Run: `npm run test:e2e -- tests/e2e/tools.spec.ts`  
Expected: PASS for the index test and the concrete quiz recommendation flow

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/AiPackageQuiz.astro src/pages/tools/[slug].astro tests/e2e/tools.spec.ts
git commit -m "feat: add interactive ai package quiz"
```

## Task 8: Implement the shared lab shell and the three educational lab pages

**Files:**

- Create: `src/components/tools/LabShell.astro`
- Create: `src/components/tools/TokenLab.astro`
- Create: `src/components/tools/PipelineLab.astro`
- Create: `src/components/tools/SkillFinderLab.astro`
- Modify: `tests/e2e/tools.spec.ts`

- [ ] **Step 1: Add a failing E2E test that at least one lab page shows step UI and the simulation disclaimer**

```ts
test("token lab page shows a guided simulation shell", async ({ page }) => {
  await page.goto("/tools/token-hoat-dong-nhu-the-nao");

  await expect(
    page.getByRole("heading", { name: /Token hoạt động như thế nào/i }),
  ).toBeVisible();
  await expect(page.getByText(/mô phỏng để hiểu cơ chế/i)).toBeVisible();
  await expect(page.getByText(/Bước 1/i)).toBeVisible();
});
```

- [ ] **Step 2: Run the tools E2E file and verify the new lab assertion fails**

Run: `npm run test:e2e -- tests/e2e/tools.spec.ts`  
Expected: FAIL because the lab shell and disclaimer do not exist yet

- [ ] **Step 3: Implement the shared lab shell and mount the three client-side simulations**

```astro
--- src/components/tools/LabShell.astro
interface Props {
  title: string;
  description: string;
  estimatedMinutes: number;
  stepLabels: string[];
}

const { title, description, estimatedMinutes, stepLabels } = Astro.props;
---

<section class="container py-16">
  <div class="max-w-4xl">
    <p class="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-700">LLM Lab</p>
    <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950">{title}</h1>
    <p class="mt-4 text-lg leading-8 text-slate-600">{description}</p>
    <p class="mt-4 rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
      Mô phỏng để hiểu cơ chế, không phải mô tả nội bộ chính xác của bất kỳ model nào.
    </p>
  </div>

  <div class="mt-10 grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
    <aside class="rounded-[2rem] border border-slate-200 bg-white p-6">
      <p class="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">{estimatedMinutes} phút</p>
      <ol class="mt-4 space-y-3">
        {stepLabels.map((label, index) => <li class="font-semibold text-slate-900">Bước {index + 1}. {label}</li>)}
      </ol>
    </aside>
    <div class="space-y-6">
      <slot />
    </div>
  </div>
</section>
```

```astro
--- src/components/tools/TokenLab.astro
import LabShell from '@components/tools/LabShell.astro';
---

<LabShell
  title="Token hoạt động như thế nào"
  description="Theo dõi prompt bị chia nhỏ và chiếm chỗ trong context window ra sao."
  estimatedMinutes={12}
  stepLabels={['Chọn input', 'Chia token', 'Nhìn context đầy lên', 'Vượt ngưỡng', 'So sánh chi phí', 'Rút ra kết luận']}
>
  <div data-token-lab class="rounded-[2rem] border border-slate-200 bg-white p-6">
    <div class="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
      <div class="space-y-4">
        <label class="block text-sm font-semibold text-slate-900" for="token-content-type">Loại nội dung</label>
        <select id="token-content-type" class="w-full rounded-2xl border border-slate-300 px-4 py-3">
          <option value="chat">Chat ngắn</option>
          <option value="article">Bài viết dài</option>
          <option value="code">Code và log</option>
        </select>
        <label class="block text-sm font-semibold text-slate-900" for="token-input-length">Độ dài input</label>
        <select id="token-input-length" class="w-full rounded-2xl border border-slate-300 px-4 py-3">
          <option value="short">Ngắn</option>
          <option value="medium">Vừa</option>
          <option value="long">Dài</option>
          <option value="very-long">Rất dài</option>
        </select>
      </div>
      <div class="space-y-4">
        <div class="rounded-2xl bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Context usage</p>
          <div class="mt-3 h-4 overflow-hidden rounded-full bg-slate-200">
            <div class="h-full rounded-full bg-cyan-500" data-token-meter></div>
          </div>
          <p class="mt-3 text-sm text-slate-600" data-token-summary></p>
        </div>
        <ul class="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700" data-token-segments></ul>
      </div>
    </div>
  </div>
</LabShell>

<script type="module">
  import { buildTokenLabState } from '../../utils/tokenLab';

  const root = document.querySelector('[data-token-lab]');
  if (root) {
    const contentType = root.querySelector('#token-content-type');
    const inputLength = root.querySelector('#token-input-length');
    const meter = root.querySelector('[data-token-meter]');
    const summary = root.querySelector('[data-token-summary]');
    const segments = root.querySelector('[data-token-segments]');

    const render = () => {
      const state = buildTokenLabState({
        contentType: contentType.value,
        inputLength: inputLength.value,
        historyTurns: 3,
        outputReserve: 'medium'
      });

      meter.style.width = `${Math.min(100, (state.usedTokens / 8192) * 100)}%`;
      summary.textContent = `${state.usedTokens} token đã dùng, trạng thái ${state.status}. ${state.takeaway}`;
      segments.innerHTML = state.segments
        .map((segment) => `<li>${segment.label}: ${segment.tokens} token</li>`)
        .join('');
    };

    contentType.addEventListener('change', render);
    inputLength.addEventListener('change', render);
    render();
  }
</script>
```

```astro
--- src/components/tools/PipelineLab.astro
import LabShell from '@components/tools/LabShell.astro';
---

<LabShell
  title="LLM xử lý input, output, tool và thinking ra sao"
  description="Nhìn luồng từ input đến answer để thấy lúc nào model trả lời trực tiếp, lúc nào cần tool."
  estimatedMinutes={14}
  stepLabels={['Chọn dạng yêu cầu', 'Phân loại intent', 'Mở hoặc tắt tool', 'Theo dõi route', 'So sánh output', 'Rút ra kết luận']}
>
  <div data-pipeline-lab class="rounded-[2rem] border border-slate-200 bg-white p-6">
    <div class="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
      <div class="space-y-4">
        <label class="block text-sm font-semibold text-slate-900" for="pipeline-request-type">Loại yêu cầu</label>
        <select id="pipeline-request-type" class="w-full rounded-2xl border border-slate-300 px-4 py-3">
          <option value="explain">Giải thích khái niệm</option>
          <option value="search">Tra cứu thông tin mới</option>
          <option value="code">Tác vụ code</option>
          <option value="advice">Tư vấn nhạy cảm</option>
        </select>
        <label class="flex items-center gap-3 text-sm text-slate-700"><input type="checkbox" id="pipeline-tool-access" /> Có tool</label>
        <label class="flex items-center gap-3 text-sm text-slate-700"><input type="checkbox" id="pipeline-fresh-info" /> Cần dữ liệu mới</label>
      </div>
      <div class="space-y-4">
        <div class="rounded-2xl bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Route</p>
          <p class="mt-3 text-lg font-bold text-slate-950" data-pipeline-route></p>
          <p class="mt-2 text-sm text-slate-600" data-pipeline-takeaway></p>
        </div>
        <ul class="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700" data-pipeline-layers></ul>
      </div>
    </div>
  </div>
</LabShell>

<script type="module">
  import { buildPipelineLabState } from '../../utils/pipelineLab';

  const root = document.querySelector('[data-pipeline-lab]');
  if (root) {
    const requestType = root.querySelector('#pipeline-request-type');
    const hasToolAccess = root.querySelector('#pipeline-tool-access');
    const needsFreshInfo = root.querySelector('#pipeline-fresh-info');
    const route = root.querySelector('[data-pipeline-route]');
    const takeaway = root.querySelector('[data-pipeline-takeaway]');
    const layers = root.querySelector('[data-pipeline-layers]');

    const render = () => {
      const state = buildPipelineLabState({
        requestType: requestType.value,
        hasToolAccess: hasToolAccess.checked,
        needsFreshInfo: needsFreshInfo.checked,
        riskLevel: 'medium'
      });

      route.textContent = `Route: ${state.route}`;
      takeaway.textContent = state.takeaway;
      layers.innerHTML = state.visibleLayers.map((layer) => `<li>${layer}</li>`).join('');
    };

    requestType.addEventListener('change', render);
    hasToolAccess.addEventListener('change', render);
    needsFreshInfo.addEventListener('change', render);
    render();
  }
</script>
```

```astro
--- src/components/tools/SkillFinderLab.astro
import LabShell from '@components/tools/LabShell.astro';
---

<LabShell
  title="Coding agent tìm đúng skill như thế nào"
  description="Nhìn cách task shape, instructions và test signal làm đổi workflow của coding agent."
  estimatedMinutes={15}
  stepLabels={['Chọn task', 'Bật tín hiệu repo', 'Theo dõi workflow', 'So sánh input yếu và mạnh', 'Rút kinh nghiệm', 'Gợi ý áp dụng']}
>
  <div data-skill-lab class="rounded-[2rem] border border-slate-200 bg-white p-6">
    <div class="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
      <div class="space-y-4">
        <label class="block text-sm font-semibold text-slate-900" for="skill-task-type">Loại task</label>
        <select id="skill-task-type" class="w-full rounded-2xl border border-slate-300 px-4 py-3">
          <option value="quick-edit">Quick edit</option>
          <option value="bug-fix">Bug fix</option>
          <option value="new-feature">New feature</option>
          <option value="review">Review</option>
        </select>
        <label class="flex items-center gap-3 text-sm text-slate-700"><input type="checkbox" id="skill-has-instructions" checked /> Có repo instructions</label>
        <label class="flex items-center gap-3 text-sm text-slate-700"><input type="checkbox" id="skill-is-ambiguous" /> Yêu cầu còn mơ hồ</label>
        <label class="flex items-center gap-3 text-sm text-slate-700"><input type="checkbox" id="skill-is-visual" /> Có yếu tố UI hoặc design</label>
      </div>
      <div class="space-y-4">
        <div class="rounded-2xl bg-slate-50 p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Workflow</p>
          <p class="mt-3 text-lg font-bold text-slate-950" data-skill-workflow></p>
          <p class="mt-2 text-sm text-slate-600" data-skill-reason></p>
        </div>
        <p class="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700" data-skill-tip></p>
      </div>
    </div>
  </div>
</LabShell>

<script type="module">
  import { buildSkillFinderState } from '../../utils/skillFinderLab';

  const root = document.querySelector('[data-skill-lab]');
  if (root) {
    const taskType = root.querySelector('#skill-task-type');
    const hasInstructions = root.querySelector('#skill-has-instructions');
    const isAmbiguous = root.querySelector('#skill-is-ambiguous');
    const isVisual = root.querySelector('#skill-is-visual');
    const workflow = root.querySelector('[data-skill-workflow]');
    const reason = root.querySelector('[data-skill-reason]');
    const tip = root.querySelector('[data-skill-tip]');

    const render = () => {
      const state = buildSkillFinderState({
        taskType: taskType.value,
        hasInstructions: hasInstructions.checked,
        hasTests: true,
        isAmbiguous: isAmbiguous.checked,
        isRisky: isAmbiguous.checked,
        isVisual: isVisual.checked
      });

      workflow.textContent = state.workflow;
      reason.textContent = state.reason;
      tip.textContent = state.improvementTip;
    };

    taskType.addEventListener('change', render);
    hasInstructions.addEventListener('change', render);
    isAmbiguous.addEventListener('change', render);
    isVisual.addEventListener('change', render);
    render();
  }
</script>
```

- [ ] **Step 4: Run the tools E2E file again and verify the lab test passes**

Run: `npm run test:e2e -- tests/e2e/tools.spec.ts`  
Expected: PASS for grouped index, quiz flow, and lab-shell visibility

- [ ] **Step 5: Commit**

```bash
git add src/components/tools/LabShell.astro src/components/tools/TokenLab.astro src/components/tools/PipelineLab.astro src/components/tools/SkillFinderLab.astro tests/e2e/tools.spec.ts
git commit -m "feat: add interactive llm lab pages"
```

## Task 9: Align homepage and product-detail references with the new tools model

**Files:**

- Modify: `src/pages/index.astro`
- Modify: `src/pages/store/[slug].astro`

- [ ] **Step 1: Write the failing homepage and product-detail assertions into E2E coverage**

```ts
test("homepage promotes both practical tools and labs", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Công cụ thực dụng và LLM Lab/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Xem gói phù hợp/i }),
  ).toHaveAttribute("href", /\/tools\/ai-package-quiz$/);
});
```

```ts
test("product detail keeps practical tools but does not surface labs as product-related tools", async ({
  page,
}) => {
  await page.goto("/store/google-ai-pro-2tb-family-owner");

  await expect(
    page.getByRole("heading", { name: /Công cụ liên quan/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Chọn gói AI phù hợp/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Token hoạt động như thế nào/i }),
  ).toHaveCount(0);
});
```

- [ ] **Step 2: Run the impacted E2E files and verify these assertions fail**

Run: `npm run test:e2e -- tests/e2e/home.spec.ts tests/e2e/product-detail.spec.ts tests/e2e/tools.spec.ts`  
Expected: FAIL because homepage copy and product-detail filtering are still using the old tool framing

- [ ] **Step 3: Update homepage messaging and filter product-related tools to practical entries only**

```astro
--- src/pages/index.astro
const featuredTools = (await getCollection('tools')).filter((entry) => entry.data.featured).slice(0, 4);
---

<section class="bg-slate-50 py-16">
  <div class="container">
    <div class="flex items-center justify-between gap-4">
      <h2 class="text-3xl font-black tracking-tight text-slate-950">Công cụ thực dụng và LLM Lab</h2>
      <a href={`${import.meta.env.BASE_URL}tools`} class="text-sm font-semibold text-cyan-700">Xem tất cả công cụ</a>
    </div>
    <p class="mt-3 max-w-3xl text-base leading-7 text-slate-600">
      Một phần để chọn đúng gói mua, một phần để hiểu token, tool use và coding agent trực quan hơn.
    </p>
    <div class="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
      {featuredTools.map((tool) => <ToolCard tool={tool.data} />)}
    </div>
  </div>
</section>
```

```astro
--- src/pages/store/[slug].astro
const relatedTools = allTools.filter(
  (tool) => tool.data.toolType === 'practical' && tool.data.relatedProducts.includes(product.slug)
);
```

- [ ] **Step 4: Run the impacted E2E files again and verify they pass**

Run: `npm run test:e2e -- tests/e2e/home.spec.ts tests/e2e/product-detail.spec.ts tests/e2e/tools.spec.ts`  
Expected: PASS for homepage tools messaging, product-detail filtering, and tools page coverage

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/pages/store/[slug].astro tests/e2e/home.spec.ts tests/e2e/product-detail.spec.ts tests/e2e/tools.spec.ts
git commit -m "feat: align site surfaces with new tools model"
```

## Task 10: Run final verification and clean up any integration regressions

**Files:**

- Verify: files touched in Tasks 1-9 only

- [ ] **Step 1: Run the full unit test suite**

Run: `npm test`  
Expected: PASS with the existing unit tests plus `tools`, `tokenLab`, `pipelineLab`, and `skillFinderLab`

- [ ] **Step 2: Run the full E2E suite**

Run: `npm run test:e2e`  
Expected: PASS with homepage, store, product detail, content paths, and tools coverage green

- [ ] **Step 3: Run the full production build**

Run: `npm run build`  
Expected: PASS with all `/tools/*` routes statically generated and no Astro diagnostics

- [ ] **Step 4: If any test reveals selector drift or route copy mismatches, fix them immediately and rerun only the failing command before rerunning the full suite**

```bash
npm run test:e2e -- tests/e2e/tools.spec.ts
npm test -- tests/unit/tools.test.ts
npm run build
```

- [ ] **Step 5: Commit the final integrated state**

```bash
git add src/content/config.ts src/content/tools src/utils/tools.ts src/utils/aiPackageQuiz.ts src/utils/tokenLab.ts src/utils/pipelineLab.ts src/utils/skillFinderLab.ts src/components/tools src/pages/tools/index.astro src/pages/tools/[slug].astro src/pages/index.astro src/pages/store/[slug].astro tests/unit/tools.test.ts tests/unit/tokenLab.test.ts tests/unit/pipelineLab.test.ts tests/unit/skillFinderLab.test.ts tests/e2e/home.spec.ts tests/e2e/product-detail.spec.ts tests/e2e/tools.spec.ts
git commit -m "feat: rebuild tools as quiz and llm labs"
```
