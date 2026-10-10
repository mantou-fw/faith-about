import { test, expect } from 'bun:test';
import { readFile, access } from 'node:fs/promises';
import { portfolioRoutes } from '../src/data/routes.ts';
const dist = new URL('../dist/', import.meta.url);
const base = (process.env.BASE_PATH ?? '/aboutme').replace(/\/$/, '');
const site = process.env.SITE_URL ?? 'https://mantou-fw.github.io';

test('Pages root renders the homepage directly without a redirect', async () => {
  const html = await readFile(new URL('index.html', dist), 'utf8');
  expect(html).not.toContain('http-equiv="refresh"');
  expect(html).toContain("Mantou / Faith avatar");
  expect(html).toContain(`href="${base}/"`);
  await expect(access(new URL('about/index.html', dist))).rejects.toThrow();
});

test('sitemap and robots are generated with the deployed site and base', async () => {
  const xml = await readFile(new URL('sitemap.xml', dist), 'utf8');
  expect(xml.match(/<loc>/g)?.length).toBe(portfolioRoutes.length);
  for (const { path } of portfolioRoutes) expect(xml).toContain(`<loc>${site}${base}${path === "/" ? "/" : `${path}/`}</loc>`);
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

test('homepage includes all technology icons, favorite movies and an honest Blog state', async () => {
  const { profile } = await import('../src/data/portfolio.json');
  const { favoriteMovies } = await import('../src/data/about.ts');
  const html = await readFile(new URL('index.html', dist), 'utf8');
  expect(html.match(/data-tech=/g)?.length).toBe(profile.stack.length);
  for (const name of profile.stack) expect(html).toContain(`data-tech="${name}"`);
  expect(html).toContain('Favorite movies');
  for (const movie of favoriteMovies) {
    expect(html).toContain(movie.label);
    expect(html).toContain(`${base}${movie.image}`);
  }
  expect(html).toContain('id="blog-title"');
  expect(html).toContain('No posts published yet');
  expect(html).not.toContain('Scaling a side project to 10k users');
});
