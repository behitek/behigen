export interface TokenLabControls {
  contentType: "chat" | "article" | "code";
  inputLength: "short" | "medium" | "long" | "very-long";
  historyTurns: number;
  outputReserve: "short" | "medium" | "long";
}

export interface TokenLabState {
  usedTokens: number;
  capacityPercent: number;
  status: "healthy" | "tight" | "overflow";
  segments: Array<{ label: string; tokens: number }>;
  takeaway: string;
  note: string;
}

const DEMO_CONTEXT_LIMIT = 12000;

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
  const capacityPercent = Math.min(
    100,
    Math.round((usedTokens / DEMO_CONTEXT_LIMIT) * 100),
  );
  const status =
    capacityPercent >= 100
      ? "overflow"
      : capacityPercent >= 82
        ? "tight"
        : "healthy";

  return {
    usedTokens,
    capacityPercent,
    status,
    segments: [
      { label: "System", tokens: 250 },
      { label: "Input", tokens: inputTokens },
      { label: "History", tokens: historyTokens },
      { label: "Output reserve", tokens: outputTokens },
    ],
    takeaway:
      status === "overflow"
        ? "Trên thang mô phỏng này, prompt đã quá chật. Ngoài đời thật, ứng dụng có thể cắt bớt lịch sử, nén bối cảnh hoặc từ chối tùy model."
        : status === "tight"
          ? "Prompt vẫn chạy được nhưng vùng dành cho output và ngữ cảnh bổ sung đang khá chật."
          : "Prompt còn dư địa nên model có nhiều chỗ hơn cho output và ngữ cảnh đi kèm.",
    note: "Thanh đo này là mô phỏng tương đối, không phải giới hạn chung cho mọi model. Tài liệu hiện tại của các nhà cung cấp cho thấy context có thể dao động từ hàng chục nghìn token đến hàng trăm nghìn hoặc hơn 1 triệu token.",
  };
}
