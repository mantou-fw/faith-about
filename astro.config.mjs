import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://mantou-aboutme.workers.dev',
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  session: false,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
