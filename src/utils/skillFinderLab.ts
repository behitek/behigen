export interface SkillFinderControls {
  taskType: 'quick-edit' | 'bug-fix' | 'new-feature' | 'review' | 'refactor';
  hasInstructions: boolean;
  hasTests: boolean;
  isAmbiguous: boolean;
  isRisky: boolean;
  isVisual: boolean;
}

export interface SkillFinderState {
  workflow: string;
  reason: string;
  improvementTip: string;
}

export function buildSkillFinderState(controls: SkillFinderControls): SkillFinderState {
  if (controls.taskType === 'bug-fix') {
    return {
      workflow: 'Debug theo repo và test',
      reason:
        'Với bug, workflow tốt thường bắt đầu từ repro và test hỏng trước khi sửa. Repo instructions và test harness quyết định agent được dùng cách nào.',
      improvementTip: 'Đưa steps tái hiện, log liên quan và lệnh test đang hỏng để agent vào đúng luồng debug.'
    };
  }

  if (controls.isVisual) {
    return {
      workflow: 'Chốt hướng thiết kế trước rồi mới code',
      reason: 'UI hoặc UX work thường nên chốt hướng thiết kế trước khi code. Chính sách review, design system và repo rules có thể đổi cách làm chi tiết.',
      improvementTip: 'Nói rõ đối tượng, mục tiêu, ràng buộc và phong cách để agent không phải tự đoán giao diện.'
    };
  }

  if (controls.isAmbiguous || controls.isRisky || !controls.hasInstructions) {
    return {
      workflow: 'Đọc rules của repo rồi viết plan',
      reason: 'Khi task mơ hồ, rủi ro hoặc thiếu instructions, agent đáng tin nên đọc tín hiệu repo, làm rõ scope rồi mới chạm code.',
      improvementTip: 'Bổ sung scope, tiêu chí hoàn thành, file nghi ngờ và lệnh verify để agent giảm đoán đáng kể.'
    };
  }

  return {
    workflow: 'Thực thi trực tiếp nhưng vẫn theo rules của repo',
    reason: 'Task nhỏ và rõ có thể làm trực tiếp, nhưng agent tốt vẫn đọc repo instructions trước nếu có thay vì coi đó là luật chung cho mọi dự án.',
    improvementTip: 'Giữ task ngắn, nêu rõ file, expected behavior và lệnh test để agent xử lý nhanh và ít vòng lặp hơn.'
  };
}
