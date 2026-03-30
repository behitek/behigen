import { describe, expect, it } from 'vitest';
import { buildTokenLabState } from '../../src/utils/tokenLab';

describe('buildTokenLabState', () => {
  it('marks small prompts as healthy', () => {
    const state = buildTokenLabState({
      contentType: 'chat',
      inputLength: 'short',
      historyTurns: 1,
      outputReserve: 'short'
    });

    expect(state.status).toBe('healthy');
    expect(state.overflowTokens).toBe(0);
  });

  it('marks long prompts as overflow when usage exceeds the context budget', () => {
    const state = buildTokenLabState({
      contentType: 'code',
      inputLength: 'very-long',
      historyTurns: 8,
      outputReserve: 'long'
    });

    expect(state.status).toBe('overflow');
    expect(state.overflowTokens).toBeGreaterThan(0);
  });
});
