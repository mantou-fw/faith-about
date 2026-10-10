/** Prefix local routes/assets with Astro's configured deployment base. */
export function withBase(path) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
}
