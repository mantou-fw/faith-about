import type { APIRoute } from 'astro';
import { SitemapStream, streamToPromise } from 'sitemap';
import { getSitemapEntries } from '../seo/sitemap';

// Prerendered: this route has no runtime data source, and GitHub Pages only
// serves static files.
export const prerender = true;

export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL('https://mantou-fw.github.io')).href.replace(/\/$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');

  const entries = await getSitemapEntries();
  const sitemap = new SitemapStream({ hostname: origin });
  const xmlPromise = streamToPromise(sitemap);

  for (const entry of entries) {
    // sitemap resolves a leading-slash url against the hostname root, which
    // would drop the deployment base. Prefix it here instead.
    sitemap.write({
      ...entry,
      url: base + (entry.url.startsWith('/') ? entry.url : '/' + entry.url),
    });
  }

  sitemap.end();

  const xml = await xmlPromise;

  return new Response(xml.toString(), {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control':
        'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};