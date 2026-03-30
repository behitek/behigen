import { describe, expect, it } from 'vitest';
import { buildSkillFinderState } from '../../src/utils/skillFinderLab';

describe('buildSkillFinderState', () => {
  it('uses direct execution for a clear low-risk quick edit', () => {
    const state = buildSkillFinderState({
      taskType: 'quick-edit',
      hasInstructions: true,
      hasTests: true,
      isAmbiguous: false,
      isRisky: false,
      isVisual: false
    });

    expect(state.workflow).toBe('direct-execution');
  });

  it('uses systematic debugging for a bug task', () => {
    const state = buildSkillFinderState({
      taskType: 'bug-fix',
      hasInstructions: true,
      hasTests: true,
      isAmbiguous: false,
      isRisky: true,
      isVisual: false
    });

    expect(state.workflow).toBe('systematic-debugging');
  });

  it('uses brainstorming for visual feature work', () => {
    const state = buildSkillFinderState({
      taskType: 'new-feature',
      hasInstructions: true,
      hasTests: false,
      isAmbiguous: false,
      isRisky: false,
      isVisual: true
    });

    expect(state.workflow).toBe('brainstorming');
  });

  it('uses writing-plans for ambiguous or risky feature work', () => {
    const state = buildSkillFinderState({
      taskType: 'new-feature',
      hasInstructions: false,
      hasTests: false,
      isAmbiguous: true,
      isRisky: true,
      isVisual: false
    });

    expect(state.workflow).toBe('writing-plans');
  });
});
