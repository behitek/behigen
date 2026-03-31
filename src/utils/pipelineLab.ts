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
  route: string;
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
      route: "Luồng trả lời có kiểm tra an toàn",
      visibleLayers: [
        "Input",
        "Phân loại task và mức rủi ro",
        "Kiểm tra chính sách và an toàn",
        "Reasoning nội bộ",
        "Câu trả lời",
      ],
      takeaway:
        "Tác vụ nhạy cảm thường đi qua thêm lớp chính sách và kiểm tra an toàn. Cách reasoning bên trong khác nhau theo model và thường không được lộ nguyên văn.",
    };
  }

  if (controls.needsFreshInfo && controls.hasToolAccess) {
    return {
      classification: classificationMap[controls.requestType],
      route: "Model yêu cầu tool -> ứng dụng chạy tool -> model trả lời",
      visibleLayers: [
        "Input",
        "Phân loại task",
        "Quyết định gọi tool",
        "Ứng dụng chạy tool",
        "Kết quả quay lại model",
        "Câu trả lời",
      ],
      takeaway:
        "Trong các hệ thống hiện đại, tool use thường là vòng lặp giữa model và ứng dụng. Model không tự truy cập web hay database nếu app không cấp tool và gửi kết quả lại.",
    };
  }

  if (controls.needsFreshInfo && !controls.hasToolAccess) {
    return {
      classification: classificationMap[controls.requestType],
      route: "Không có tool -> trả lời kèm giới hạn",
      visibleLayers: [
        "Input",
        "Phân loại task",
        "Kiểm tra kiến thức và ngữ cảnh sẵn có",
        "Trả lời kèm độ bất định hoặc từ chối",
      ],
      takeaway:
        "Nếu câu hỏi cần dữ liệu mới mà không có tool, hệ thống đáng tin nên nêu giới hạn hoặc yêu cầu kiểm chứng thay vì đoán.",
    };
  }

  return {
    classification: classificationMap[controls.requestType],
    route: "Trả lời trực tiếp từ prompt và kiến thức ổn định",
    visibleLayers: [
      "Input",
      "Phân loại task",
      "Ngữ cảnh có sẵn trong prompt",
      "Reasoning nội bộ",
      "Câu trả lời",
    ],
    takeaway:
      "Không phải câu hỏi nào cũng cần tool. Với chủ đề ổn định, model có thể trả lời trực tiếp từ prompt và kiến thức sẵn có, còn reasoning thường chỉ lộ ra dưới dạng summary hoặc không lộ ra.",
  };
}
