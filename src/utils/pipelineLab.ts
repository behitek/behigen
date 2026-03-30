export interface PipelineLabControls {
  requestType: 'chat' | 'explain' | 'summarize' | 'code' | 'compare' | 'search' | 'advice';
  hasToolAccess: boolean;
  needsFreshInfo: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface PipelineLabState {
  classification: string;
  route: 'direct' | 'tool' | 'careful';
  visibleLayers: string[];
  takeaway: string;
}

export function buildPipelineLabState(controls: PipelineLabControls): PipelineLabState {
  const classificationMap = {
    chat: 'Trao đổi mở',
    explain: 'Giải thích khái niệm',
    summarize: 'Tóm tắt nội dung',
    code: 'Tác vụ code',
    compare: 'So sánh lựa chọn',
    search: 'Tra cứu thông tin',
    advice: 'Tư vấn có độ nhạy cao'
  } as const;

  if (controls.riskLevel === 'high') {
    return {
      classification: classificationMap[controls.requestType],
      route: 'careful',
      visibleLayers: ['Input', 'Intent classification', 'Reasoning', 'Guardrails', 'Answer'],
      takeaway:
        'Tác vụ rủi ro cao thường cần reasoning thận trọng hơn ngay cả khi không gọi tool.'
    };
  }

  if (controls.needsFreshInfo && controls.hasToolAccess) {
    return {
      classification: classificationMap[controls.requestType],
      route: 'tool',
      visibleLayers: ['Input', 'Intent classification', 'Tool decision', 'Tool result', 'Answer'],
      takeaway: 'Khi câu hỏi cần dữ liệu mới, tool giúp tránh đoán mò dựa trên kiến thức cũ.'
    };
  }

  return {
    classification: classificationMap[controls.requestType],
    route: 'direct',
    visibleLayers: ['Input', 'Intent classification', 'Reasoning', 'Answer'],
    takeaway:
      'Không phải câu hỏi nào cũng cần tool; nhiều câu hỏi có thể trả lời trực tiếp nếu dữ liệu đủ ổn định.'
  };
}
