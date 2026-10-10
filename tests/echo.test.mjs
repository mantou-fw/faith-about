import { describe, expect, test } from 'bun:test';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import routes from '../src/content/echo/routes.json' with { type: 'json' };
import { GET as sitemap } from '../src/pages/sitemap.xml.ts';

const root = new URL('../', import.meta.url).pathname;
const paths = new Set(routes.map(({ path }) => path));

describe('Astro portfolio build', () => {
  for (const route of routes) {
    test(`${route.path} is prerendered with a complete local asset graph`, async () => {
      const html = await readFile(join(root, 'dist/client', route.path, 'index.html'), 'utf8');
      expect(html).toContain(`<title>${route.title}</title>`);
      expect(html.match(/<main\b/g)?.length).toBe(1);
      expect(html.match(/<body\b/g)?.length).toBe(1);
      expect(html).toContain('renderer-url="/_astro/');
      expect(html).not.toContain('echo-astro-template.vercel.app');
      expect(html).not.toContain('client.Bbawvn5d.js');
      expect(html).not.toContain('{{');
      const resources = [...html.matchAll(/(?:src|href|component-url|renderer-url)="(\/[^"?#]*)/g)];
      for (const [, resource] of resources) {
        if (resource === '/sitemap.xml') continue;
        if (paths.has(resource)) continue;
        await access(join(root, 'dist/client', resource));
      }
    });
  }

  test('runtime sitemap exposes all portfolio routes at the configured origin', async () => {
    const response = await sitemap({ site: new URL('https://portfolio.example'), request: new Request('https://portfolio.example/sitemap.xml') });
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/xml');
    const xml = await response.text();
    expect(xml.match(/<loc>/g)?.length).toBe(22);
    for (const { path } of routes) expect(xml).toContain(`<loc>https://portfolio.example${path}</loc>`);
  });
});
