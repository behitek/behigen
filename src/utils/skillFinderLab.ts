export interface SkillFinderControls {
  taskType: 'quick-edit' | 'bug-fix' | 'new-feature' | 'review' | 'refactor';
  hasInstructions: boolean;
  hasTests: boolean;
  isAmbiguous: boolean;
  isRisky: boolean;
  isVisual: boolean;
}

export interface SkillFinderState {
  workflow: 'direct-execution' | 'systematic-debugging' | 'brainstorming' | 'writing-plans';
  reason: string;
  improvementTip: string;
}

export function buildSkillFinderState(controls: SkillFinderControls): SkillFinderState {
  if (controls.taskType === 'bug-fix') {
    return {
      workflow: 'systematic-debugging',
      reason:
        'Bug tasks benefit from reproducing the issue and tightening the fix before editing code.',
      improvementTip: 'Đưa lỗi tái hiện được và test thất bại để agent đi đúng luồng debug.'
    };
  }

  if (controls.isVisual) {
    return {
      workflow: 'brainstorming',
      reason: 'Visual or UX work needs design clarification before implementation.',
      improvementTip: 'Nói rõ đối tượng, mục tiêu, và phong cách để agent không tự đoán UI.'
    };
  }

  if (controls.isAmbiguous || controls.isRisky || !controls.hasInstructions) {
    return {
      workflow: 'writing-plans',
      reason: 'Ambiguous or high-risk work needs explicit planning and scoping before code changes.',
      improvementTip: 'Bổ sung scope, tiêu chí hoàn thành, và file liên quan để agent giảm đoán.'
    };
  }

  return {
    workflow: 'direct-execution',
    reason: 'The task is small, clear, and low-risk enough to execute directly.',
    improvementTip: 'Giữ task ngắn, rõ file, và nêu lệnh test để agent xử lý nhanh hơn.'
  };
}
