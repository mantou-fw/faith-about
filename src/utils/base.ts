/**
 * Internal-link helpers.
 *
 * The site is deployed under a GitHub Pages subpath (`/faith-about`), so every
 * hand-written href needs the `base` prefix. Going through `withBase` keeps that
 * in one place — a missed prefix is a 404 at runtime, not a build error.
 */

const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

/** Prefix a root-relative path with the deployment base. */
export function withBase(path: string): string {
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith('#')) return path;
  const clean = path.startsWith('/') ? path : '/' + path;
  return base + clean;
}

/** Prefix a public/ asset path (images, fonts) with the deployment base. */
export function withAsset(path: string): string {
  return withBase(path);
}