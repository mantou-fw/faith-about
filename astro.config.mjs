import { defineConfig } from 'astro/config';
import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages serves this site from https://mantou-fw.github.io/faith-about/,
// so `base` must carry the repository name or every asset URL resolves at /.
const site = process.env.SITE_URL ?? 'https://mantou-fw.github.io';
const base = process.env.SITE_BASE ?? '/faith-about';

export default defineConfig({
  site,
  base,
  // Everything on this site is prerendered at build time. No adapter needed.
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});