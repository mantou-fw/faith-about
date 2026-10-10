import { beforeAll, afterAll, test, expect } from 'bun:test';
import { portfolioRoutes } from '../src/data/routes.ts';

const root = new URL('../', import.meta.url).pathname;
let child;
let origin;

beforeAll(async () => {
  const reservation = Bun.serve({ hostname: '127.0.0.1', port: 0, fetch: () => new Response() });
  const port = reservation.port;
  reservation.stop(true);
  origin = `http://127.0.0.1:${port}`;
  child = Bun.spawn([process.execPath, 'run', 'start'], {
    cwd: root,
    env: { ...process.env, HOST: '127.0.0.1', PORT: String(port) },
    stdout: 'ignore', stderr: 'pipe',
  });
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      if ((await fetch(`${origin}/api/health`)).ok) return;
    } catch {}
    if (child.exitCode !== null) throw new Error(await new Response(child.stderr).text());
    await Bun.sleep(100);
  }
  throw new Error('Bun production server did not become ready');
}, 10000);

afterAll(async () => {
  if (child) { child.kill(); await child.exited; }
});

test('built production server actually runs on Bun', async () => {
  const response = await fetch(`${origin}/api/health`);
  expect(response.status).toBe(200);
  expect(response.headers.get('cache-control')).toBe('no-store');
  const health = await response.json();
  expect(health.ok).toBe(true);
  expect(health.runtime).toBe('bun');
  expect(health.version).toBe(Bun.version);
});

test('target landing redirect and all merged pages work over HTTP', async () => {
  const rootResponse = await fetch(origin, { redirect: 'manual' });
  expect(rootResponse.status).toBe(302);
  expect(rootResponse.headers.get('location')).toBe('/about/');
  for (const route of portfolioRoutes) {
    const response = await fetch(`${origin}${route.path}/`);
    expect(response.status).toBe(200);
    expect(await response.text()).toContain('Mantou / Faith');
  }
  const profile = await (await fetch(`${origin}/profile/`)).text();
  expect(profile).toContain('Founder, HTIFA');
  expect(profile).toContain('Taiwan');
  expect(profile).toContain('mailto:mantou.fw@gmail.com');
});

test('Bun serves runtime sitemap, robots and static assets', async () => {
  const sitemap = await fetch(`${origin}/sitemap.xml`);
  expect(sitemap.headers.get('content-type')).toContain('application/xml');
  const xml = await sitemap.text();
  expect(xml.match(/<loc>/g)?.length).toBe(portfolioRoutes.length);
  expect(xml).toContain('/projects/htifa');
  expect(xml).not.toContain('faith-about');
  const robots = await fetch(`${origin}/robots.txt`);
  expect(robots.status).toBe(200);
  expect(await robots.text()).toContain('Sitemap:');
  const avatar = await fetch(`${origin}/images/portfolio/avatar.png`);
  expect(avatar.status).toBe(200);
  expect(avatar.headers.get('content-type')).toContain('image/png');
  const missing = await fetch(`${origin}/does-not-exist/`);
  expect(missing.status).toBe(404);
});
