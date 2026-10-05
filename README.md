# Faith — About

Personal about page built with [Astro 7](https://astro.build) and
[Bearnie](https://bearnie.dev) UI primitives, deployed to GitHub Pages as a
fully static site.

The layout reproduces the design language of the Echo template — a centered
content column, dotted hover underlines, hover previews on the favorites
lists, and a GitHub contribution graph in the footer — rebuilt as real Astro
components instead of mirrored HTML.

Live at **https://mantou-fw.github.io/faith-about/**

## Stack

- Astro 7, `output: 'static'` (no adapter, no server runtime)
- Tailwind CSS 4
- Bearnie (source-owned UI primitives, vanilla JS, no framework runtime)
- TypeScript
- GitHub Actions → GitHub Pages

## Commands

```bash
npm install
cp .env.example .env
npm run dev      # http://localhost:4321
npm run check    # astro check
npm run build
npm run preview  # serve dist/ locally
```

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to GitHub
Pages via `withastro/action` + `actions/deploy-pages`. No secrets needed.

Enable it once in the repo if it is not already on:

**Settings → Pages → Build and deployment → Source: GitHub Actions**

### The `base` prefix

The site lives under a subpath, so `astro.config.mjs` sets
`base: '/faith-about'`. Every internal href and every `public/` asset URL must
carry that prefix or it resolves at the domain root and 404s.

Go through the helpers rather than concatenating strings:

```ts
import { withBase, withAsset } from '@/utils/base';

<a href={withBase('/about')}>About</a>
<img src={withAsset('/images/home/avatar.webp')} />
```

`withBase` passes absolute URLs, protocol-relative URLs and fragments through
untouched, so external links need no special casing.

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
├── styles/
└── utils/
    ├── base.ts      deployment-prefix helpers
    └── cn.ts        class composition
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

| Variable               | Purpose                                     | Default                     |
| ---------------------- | ------------------------------------------- | --------------------------- |
| `SITE_URL`             | Canonical origin for SEO + sitemap          | `https://mantou-fw.github.io` |
| `SITE_BASE`            | Deployment subpath                          | `/faith-about`              |
| `PUBLIC_SITE_NAME`     | Site name in titles and structured data     | `Faith LI`                  |
| `PUBLIC_CONTACT_EMAIL` | Footer contact link                         | `mantou.fw@gmail.com`       |
| `PUBLIC_GOOGLE_TAG_ID` | Optional; blank disables Google Tag         | —                           |

All are build-time only. Anything under `PUBLIC_` is inlined into the HTML, so
never put a secret there.

## Credits

- Design language adapted from the Echo Astro template.
- Stack marks from [Simple Icons](https://simpleicons.org) (CC0-1.0).
- UI primitives from [Bearnie](https://bearnie.dev) by Michael Andreuzza.