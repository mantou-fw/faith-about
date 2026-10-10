import type { APIRoute } from 'astro';
import { SitemapStream, streamToPromise } from 'sitemap';
import { getSitemapEntries } from '../seo/sitemap';

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const baseUrl =
    context.site?.href.replace(/\/$/, '') ??
    new URL(context.request.url).origin;

  const entries = await getSitemapEntries(context);
  const sitemap = new SitemapStream({ hostname: baseUrl });
  const xmlPromise = streamToPromise(sitemap);

  for (const entry of entries) {
    sitemap.write(entry);
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
