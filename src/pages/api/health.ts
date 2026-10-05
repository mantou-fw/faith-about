import type { APIRoute } from 'astro';

// Prerendered so the endpoint still exists on a static host. The timestamp is
// the build time, not request time — it answers "was this site built?", not
// "is the server up?".
export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({
      ok: true,
      runtime: 'static',
      builtAt: new Date().toISOString(),
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
      },
    },
  );
};