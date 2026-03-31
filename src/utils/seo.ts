export function normalizePathWithBase({
  path,
  basePath,
}: {
  path: string;
  basePath: string;
}): string {
  if (/^https?:\/\//.test(path)) return path;
  if (basePath === "/" || path.startsWith(basePath)) return path;
  return `${basePath.replace(/\/$/, "")}${path}`;
}

export function buildAbsoluteUrl({
  pathOrUrl,
  basePath,
  site,
}: {
  pathOrUrl: string;
  basePath: string;
  site: string | URL;
}): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return new URL(
    normalizePathWithBase({ path: pathOrUrl, basePath }),
    site,
  ).toString();
}
