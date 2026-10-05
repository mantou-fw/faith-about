# Faith — About

Personal about page built with [Astro 7](https://astro.build) and
[Bearnie](https://bearnie.dev) UI primitives, deployed on Cloudflare Workers.

The layout reproduces the design language of the Echo template — a centered
content column, dotted hover underlines, hover previews on the favorites
lists, and a GitHub contribution graph in the footer — rebuilt as real Astro
components instead of mirrored HTML.

## Stack

- Astro 7 with `@astrojs/cloudflare`
- Tailwind CSS 4
- Bearnie (source-owned UI primitives, no component runtime)
- TypeScript

## Commands

```bash
npm install
cp .env.example .env
npm run dev      # http://localhost:4321
npm run check    # astro check
npm run build
npm run deploy   # build + wrangler deploy
```

## Layout

```text
src/
├── components/
│   ├── bearnie/     vendor primitives — do not edit by hand
│   ├── ui/          the only public primitive API for app code
│   └── site/        page composition
├── data/
│   ├── about.ts         all page copy and lists
│   └── contributions.ts GitHub activity, regenerate from the API
├── layouts/
├── pages/
└── styles/
```

Rules, in order:

1. Check `src/components/bearnie` before writing a new primitive.
2. Application code imports from `@/components/ui`, never from `@/components/bearnie`.
3. Site components compose `@/components/ui`.
4. Use `cn()` from `@/utils/cn` for class composition.
5. Prefer semantic tokens — `bg-background`, `text-muted-foreground`, `border-border`.

See `UI.md` for the full architecture and `AGENTS.md` for agent rules.

## Editing the content

All copy lives in `src/data/about.ts` — name, story paragraphs, favorite
movies and cars, stack, projects, articles. Nothing needs to be touched in
the components.

The stack logos are real Simple Icons paths (CC0-1.0) in
`src/components/site/icons/`. To add a tool, drop its path into a new
component and register it in `StackGrid.astro`.

## The contribution graph

`src/data/contributions.ts` is generated, not hand-written. Refresh it with:

```bash
gh api graphql -F query=@query.graphql   # contributionCalendar
```

The footer then re-derives week columns, month labels and heat levels at
build time, and clips the trailing week so no future days are drawn.

## Configuration

| Variable                 | Purpose                                  |
| ------------------------ | ---------------------------------------- |
| `SITE_URL`               | Canonical origin for SEO + sitemap       |
| `PUBLIC_SITE_NAME`       | Site name in titles and structured data  |
| `PUBLIC_CONTACT_EMAIL`   | Footer contact link                      |
| `PUBLIC_GOOGLE_TAG_ID`   | Optional; blank disables Google Tag      |

## Deploying

The Cloudflare adapter needs a KV namespace for sessions and an Images
binding for image processing. See `wrangler.jsonc`.

```bash
npm run deploy
```

Set `SITE_URL` to the deployed origin so canonical URLs and the sitemap
resolve correctly.

## Credits

- Design language adapted from the Echo Astro template.
- Stack marks from [Simple Icons](https://simpleicons.org) (CC0-1.0).
- UI primitives from [Bearnie](https://bearnie.dev) by Michael Andreuzza.