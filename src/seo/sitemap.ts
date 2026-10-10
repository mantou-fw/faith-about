import type { APIContext } from 'astro';
import { EnumChangefreq, type SitemapItemLoose } from 'sitemap';
import { portfolioRoutes } from '../data/routes';
import { withBase } from '../lib/paths';

export async function getSitemapEntries(_context: APIContext): Promise<SitemapItemLoose[]> {
  return portfolioRoutes.map(({ path }) => ({
    url: withBase(path === "/" ? path : `${path}/`),
    changefreq: EnumChangefreq.WEEKLY,
    priority: path === '/' ? 1 : 0.7,
  }));
}
