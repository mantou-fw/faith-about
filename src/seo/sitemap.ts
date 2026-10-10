import type { APIContext } from 'astro';
import { EnumChangefreq, type SitemapItemLoose } from 'sitemap';

import echoRoutes from '../content/echo/routes.json';

const staticEntries: SitemapItemLoose[] = echoRoutes.map(({ path }) => ({
  url: path,
  changefreq: EnumChangefreq.WEEKLY,
  priority: path === '/' ? 1 : 0.7,
}));

/**
 * Add runtime-backed URLs here.
 *
 * This function runs when /sitemap.xml is requested, so it can query
 * Cloudflare D1, KV, a CMS, an API, or any other runtime data source.
 *
 * Example:
 * const posts = await db.prepare('SELECT slug, updated_at FROM posts WHERE published = 1').all();
 * return posts.results.map((post) => ({
 *   url: `/posts/${post.slug}`,
 *   lastmod: post.updated_at,
 * }));
 */
export async function getDynamicSitemapEntries(
  _context: APIContext,
): Promise<SitemapItemLoose[]> {
  return [];
}

export async function getSitemapEntries(
  context: APIContext,
): Promise<SitemapItemLoose[]> {
  const dynamicEntries = await getDynamicSitemapEntries(context);

  return [...staticEntries, ...dynamicEntries];
}
