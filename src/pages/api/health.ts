import type { APIRoute } from 'astro';
export const prerender = false;
export const GET: APIRoute = () => {
  const bun = (globalThis as typeof globalThis & { Bun?: { version: string } }).Bun;
  return Response.json({ ok: true, runtime: bun ? 'bun' : 'node', version: bun?.version, timestamp: new Date().toISOString() }, {
    headers: { 'cache-control': 'no-store' },
  });
};
