export interface TokenLabControls {
  contentType: 'chat' | 'article' | 'code';
  inputLength: 'short' | 'medium' | 'long' | 'very-long';
  historyTurns: number;
  outputReserve: 'short' | 'medium' | 'long';
}

export interface TokenLabState {
  usedTokens: number;
  remainingTokens: number;
  overflowTokens: number;
  status: 'healthy' | 'tight' | 'overflow';
  segments: Array<{ label: string; tokens: number }>;
  takeaway: string;
}

const CONTEXT_LIMIT = 8192;

export function buildTokenLabState(controls: TokenLabControls): TokenLabState {
  const baseInput = {
    short: 220,
    medium: 900,
    long: 2600,
    'very-long': 6200
  }[controls.inputLength];

  const contentMultiplier = {
    chat: 1,
    article: 1.15,
    code: 1.3
  }[controls.contentType];

  const outputTokens = {
    short: 300,
    medium: 700,
    long: 1400
  }[controls.outputReserve];

  const historyTokens = controls.historyTurns * 380;
  const inputTokens = Math.round(baseInput * contentMultiplier);
  const usedTokens = 250 + inputTokens + historyTokens + outputTokens;
  const overflowTokens = Math.max(0, usedTokens - CONTEXT_LIMIT);
  const remainingTokens = Math.max(0, CONTEXT_LIMIT - usedTokens);
  const status = overflowTokens > 0 ? 'overflow' : remainingTokens < 1200 ? 'tight' : 'healthy';

  return {
    usedTokens,
    remainingTokens,
    overflowTokens,
    status,
    segments: [
      { label: 'System', tokens: 250 },
      { label: 'Input', tokens: inputTokens },
      { label: 'History', tokens: historyTokens },
      { label: 'Output reserve', tokens: outputTokens }
    ],
    takeaway:
      status === 'overflow'
        ? 'Prompt đã vượt context window nên hệ thống phải cắt bớt hoặc bỏ ngữ cảnh cũ.'
        : status === 'tight'
          ? 'Prompt vẫn chạy được nhưng khoảng trống cho output và ngữ cảnh bổ sung đang khá chật.'
          : 'Prompt còn nhiều khoảng trống nên model có dư địa để trả lời đầy đủ hơn.'
  };
}
