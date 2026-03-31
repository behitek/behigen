export interface ToolGroupEntry {
  data: {
    toolType: "practical" | "lab";
  };
}

export function groupToolsByType<T extends ToolGroupEntry>(tools: T[]) {
  return {
    practical: tools.filter((tool) => tool.data.toolType === "practical"),
    labs: tools.filter((tool) => tool.data.toolType === "lab"),
  };
}
