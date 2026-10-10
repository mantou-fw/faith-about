import {
  siAstro, siSvelte, siReact, siTypescript, siJavascript, siTailwindcss,
  siCloudflare, siNodedotjs, siBun, siDrizzle, siZod, siPython,
} from 'simple-icons';

// MJML has no Simple Icons mark. Use a labelled email/code symbol for the tool.
export const stackIcons: Record<string, { path: string; hex: string }> = {
  Astro: siAstro,
  'Svelte / SvelteKit': siSvelte,
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  'Tailwind CSS': siTailwindcss,
  Cloudflare: siCloudflare,
  'Node.js': siNodedotjs,
  Bun: siBun,
  'Drizzle ORM': siDrizzle,
  Zod: siZod,
  Python: siPython,
  MJML: {
    hex: 'F45E43',
    path: 'M2 3h20v18H2V3zm2 2v2l8 5 8-5V5H4zm0 4v10h16V9l-8 5-8-5zm3 5-3 2 3 2 1-1-2-1 2-1-1-1zm10 0-1 1 2 1-2 1 1 1 3-2-3-2zm-5 0-2 4h2l2-4h-2z',
  },
};
