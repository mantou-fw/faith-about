import { describe, expect, test } from 'bun:test';
import { readFile, access, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { portfolioRoutes as routes } from '../src/data/routes.ts';
import { projects } from '../src/data/portfolio.json' with { type: 'json' };

const dist = new URL('../dist/', import.meta.url).pathname;
const base = (process.env.BASE_PATH ?? '/aboutme').replace(/\/$/, '');
const site = process.env.SITE_URL ?? 'https://mantou-fw.github.io';
const localPath = (url) => {
  expect(url.startsWith(`${base}/`)).toBe(true);
  return decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]);
};

describe('static Pages portfolio', () => {
  for (const route of routes) {
    test(`${route.path} has working base-prefixed routes and assets`, async () => {
      const html = await readFile(join(dist, route.path, 'index.html'), 'utf8');
      expect(html).toContain(`<title>${route.title}</title>`);
      expect(html.match(/<main\b/g)?.length).toBe(1);
      expect(html.match(/<body\b/g)?.length).toBe(1);
      expect(html).toContain(`href="${site}${base}${route.path}/"`);
      expect(html).toContain(`content="${site}${base}/images/portfolio/`);
      if (['/about', '/projects'].includes(route.path)) expect(html).toContain(`renderer-url="${base}/_astro/`);
      for (const unwanted of ["John's", 'hi@john.me', '11.2k', 'href="undefined"', 'echo-astro-template.vercel.app', '{{']) {
        expect(html).not.toContain(unwanted);
      }
      for (const [, resource] of html.matchAll(/(?:src|href|component-url|renderer-url)="(\/[^"#]*)/g)) {
        const path = localPath(resource);
        await access(join(dist, path.endsWith('/') ? `${path}index.html` : path));
      }
    });
  }
});

test('all selected projects preserve real source/live links', async () => {
  expect(projects.filter((p) => p.sourceUrl)).toHaveLength(7);
  const catalog = await readFile(join(dist, 'projects/index.html'), 'utf8');
  for (const project of projects) {
    expect(catalog).toContain(`${base}/projects/${project.slug}/`);
    const html = await readFile(join(dist, 'projects', project.slug, 'index.html'), 'utf8');
    if (project.sourceUrl) expect(html).toContain(`href="${project.sourceUrl}"`);
    else expect(html).not.toContain('Source code');
    if (project.liveUrl) expect(html).toContain(`href="${project.liveUrl}"`);
    else expect(html).not.toContain('View live');
  }
  await expect(access(join(dist, 'projects/echo-ui/index.html'))).rejects.toThrow();
});

test('built CSS fonts and JS entry points resolve under the Pages base', async () => {
  for (const filename of await readdir(join(dist, '_astro'))) {
    if (!filename.endsWith('.css') && !filename.endsWith('.js')) continue;
    const source = await readFile(join(dist, '_astro', filename), 'utf8');
    if (filename.endsWith('.css')) {
      for (const [, resource] of source.matchAll(/url\(["']?(\/[^)"']+)/g)) await access(join(dist, localPath(resource)));
    }
    if (filename.endsWith('.js')) {
      for (const [, resource] of source.matchAll(/(?:from|import)\s*["'](\.\/[^"']+)/g)) await access(join(dist, '_astro', resource));
    }
  }
});
