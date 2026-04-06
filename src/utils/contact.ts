export type ContactChannel = 'zalo';

export const CONTACT_CHANNELS: ContactChannel[] = ['zalo'];
export const CONTACT_CHANNEL_LABELS: Record<ContactChannel, string> = {
  zalo: 'Zalo'
};

function normalizeBasePath(basePath?: string): string {
  if (!basePath || basePath === '/') return '';
  return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
}

export function buildContactHref({
  basePath,
  channel
}: {
  basePath?: string;
  channel: ContactChannel;
}): string {
  return `${normalizeBasePath(basePath)}/go/${channel}`;
}
