import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://mantou-fw.github.io',
  base: process.env.BASE_PATH ?? '/aboutme',
  output: 'static',
  session: false,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
