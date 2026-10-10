import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  session: false,
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
