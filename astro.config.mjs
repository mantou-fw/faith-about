import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.SITE_URL ?? 'https://example.com';

export default defineConfig({
  site,
  devToolbar: { enabled: false },
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    react(),
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
