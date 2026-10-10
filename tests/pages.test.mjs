import { test, expect } from 'bun:test';
import { readFile, access } from 'node:fs/promises';
import { portfolioRoutes } from '../src/data/routes.ts';
const dist = new URL('../dist/', import.meta.url);
const base = (process.env.BASE_PATH ?? '/aboutme').replace(/\/$/, '');
const site = process.env.SITE_URL ?? 'https://mantou-fw.github.io';

test('Pages root has a static redirect to the existing about landing', async () => {
  const html = await readFile(new URL('index.html', dist), 'utf8');
  expect(html).toContain('http-equiv="refresh"');
  expect(html).toContain(`${base}/about/`);
});

test('sitemap and robots are generated with the deployed site and base', async () => {
  const xml = await readFile(new URL('sitemap.xml', dist), 'utf8');
  expect(xml.match(/<loc>/g)?.length).toBe(portfolioRoutes.length);
  for (const { path } of portfolioRoutes) expect(xml).toContain(`<loc>${site}${base}${path}/</loc>`);
  const robots = await readFile(new URL('robots.txt', dist), 'utf8');
  expect(robots).toContain(`Sitemap: ${site}${base}/sitemap.xml`);
  expect(xml).not.toContain('localhost');
});

test('profile facts and avatar survive static deployment without runtime health', async () => {
  const html = await readFile(new URL('profile/index.html', dist), 'utf8');
  for (const fact of ['Founder, HTIFA', 'Taiwan', 'mailto:mantou.fw@gmail.com']) expect(html).toContain(fact);
  await access(new URL('images/portfolio/avatar.png', dist));
  await expect(access(new URL('api/health', dist))).rejects.toThrow();
  await expect(access(new URL('server/entry.mjs', dist))).rejects.toThrow();
});
