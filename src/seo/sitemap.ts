import { EnumChangefreq, type SitemapItemLoose } from 'sitemap';

const staticEntries: SitemapItemLoose[] = [
  {
    url: '/about',
    changefreq: EnumChangefreq.MONTHLY,
    priority: 1,
  },
];

/**
 * Add generated URLs here — collections, content APIs, CMS entries.
 *
 * The sitemap is prerendered at build time, so anything dynamic has to be
 * fetched (or read from a file) while the site builds.
 */
export async function getDynamicSitemapEntries(): Promise<SitemapItemLoose[]> {
  return [];
}

export async function getSitemapEntries(): Promise<SitemapItemLoose[]> {
  const dynamicEntries = await getDynamicSitemapEntries();

  return [...staticEntries, ...dynamicEntries];
}