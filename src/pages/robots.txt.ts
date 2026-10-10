import { withBase } from '../lib/paths';
import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ request, site }) => {
  const baseUrl =
    site?.href.replace(/\/$/, '') ??
    new URL(request.url).origin;
  const sitemap = new URL(withBase('/sitemap.xml'), baseUrl).href;

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    'Sitemap: ' + sitemap,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control':
        'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
