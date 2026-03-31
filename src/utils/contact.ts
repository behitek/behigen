export type ContactChannel = "zalo" | "telegram" | "messenger";

export const CONTACT_CHANNELS: ContactChannel[] = [
  "zalo",
  "telegram",
  "messenger",
];
export const CONTACT_CHANNEL_LABELS: Record<ContactChannel, string> = {
  zalo: "Zalo",
  telegram: "Telegram",
  messenger: "Messenger",
};

function normalizeBasePath(basePath?: string): string {
  if (!basePath || basePath === "/") return "";
  return basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
}

export function buildContactHref({
  basePath,
  channel,
}: {
  basePath?: string;
  channel: ContactChannel;
}): string {
  return `${normalizeBasePath(basePath)}/go/${channel}`;
}
