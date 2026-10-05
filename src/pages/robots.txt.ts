import type { APIRoute } from 'astro';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://mantou-fw.github.io')).href.replace(/\/$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemap = origin + base + '/sitemap.xml';

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