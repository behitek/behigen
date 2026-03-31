import { describe, expect, it } from 'vitest';
import { buildPipelineLabState } from '../../src/utils/pipelineLab';

describe('buildPipelineLabState', () => {
  it('uses the direct path for a low-risk explanation request with no fresh-data need', () => {
    const state = buildPipelineLabState({
      requestType: 'explain',
      hasToolAccess: false,
      needsFreshInfo: false,
      riskLevel: 'low'
    });

    expect(state.route).toBe('Trả lời trực tiếp từ prompt và kiến thức ổn định');
  });

  it('uses the tool path when the request needs fresh information and tools exist', () => {
    const state = buildPipelineLabState({
      requestType: 'search',
      hasToolAccess: true,
      needsFreshInfo: true,
      riskLevel: 'medium'
    });

    expect(state.route).toBe('Model yêu cầu tool -> ứng dụng chạy tool -> model trả lời');
  });

  it('uses the careful path for high-risk requests even when no tool is needed', () => {
    const state = buildPipelineLabState({
      requestType: 'advice',
      hasToolAccess: false,
      needsFreshInfo: false,
      riskLevel: 'high'
    });

    expect(state.route).toBe('Luồng trả lời có kiểm tra an toàn');
  });
});
