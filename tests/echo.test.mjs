import { describe, expect, test } from 'bun:test';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { portfolioRoutes as routes } from '../src/data/routes.ts';
import { projects } from '../src/data/portfolio.json' with { type: 'json' };
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
      if (route.path === '/' || route.path === '/projects') expect(html).toContain('renderer-url="/_astro/');
      expect(html).not.toContain("John's");
      expect(html).not.toContain('hi@john.me');
      expect(html).not.toContain('11.2k');
      expect(html).not.toContain('href="undefined"');
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
    expect(xml.match(/<loc>/g)?.length).toBe(routes.length);
    for (const { path } of routes) expect(xml).toContain(`<loc>https://portfolio.example${path}</loc>`);
  });
});


test('all seven selected repositories have honest project links and no fictional detail routes', async () => {
  expect(projects).toHaveLength(7);
  const catalog = await readFile(join(root, 'dist/client/projects/index.html'), 'utf8');
  for (const project of projects) {
    expect(catalog).toContain(`/projects/${project.slug}`);
    const html = await readFile(join(root, 'dist/client/projects', project.slug, 'index.html'), 'utf8');
    expect(html).toContain(`href="https://github.com/faithli-dev/${project.slug}"`);
    if (project.liveUrl) expect(html).toContain(`href="${project.liveUrl}"`);
    else expect(html).not.toContain('View live');
  }
  expect(routes.some(({ path }) => path.startsWith('/articles'))).toBe(false);
  await expect(access(join(root, 'dist/client/projects/echo-ui/index.html'))).rejects.toThrow();
});
