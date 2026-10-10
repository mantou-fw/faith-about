# Mantou / Faith — aboutme

Personal portfolio at https://mantou-fw.github.io/aboutme/, built with Astro and Bun and deployed to GitHub Pages.

## Run locally

Requires Bun 1.3.14 or later.

```bash
bun install --frozen-lockfile
bun run check
bun run build
bun test
bun run start
```

`start` previews the static build. Open http://localhost:4321/aboutme/. For development use `bun run dev`. All Astro CLI commands run with `bun --bun`.

## Deployment

Repository Settings → Pages → Build and deployment → Source must be **GitHub Actions**. `.github/workflows/deploy.yml` runs on pushes to main and manual dispatch, installs with Bun, checks, builds, tests, uploads dist and deploys it with the official Pages actions. PR validation stays in `ci.yml`.

The default site is `https://mantou-fw.github.io` with base `/aboutme`. The deployment workflow takes the origin and base from `configure-pages`, so local URLs and SEO follow the Pages configuration. Set SITE_URL and BASE_PATH before building if using a custom domain; `.env.example` documents the defaults. Tests use the same variables.

GitHub Pages serves static files. Bun runs development, builds and tests; there is no Bun server or runtime health endpoint on Pages. Sitemap and robots are generated during build. The root has a generated HTML redirect to `/aboutme/about/`.

## Content

`src/data/portfolio.json` contains the supplied avatar, Mantou / Faith identity, technology stack, seven selected public GitHub projects and HTIFA. Founder, HTIFA / Taiwan and the public email are preserved. `/about/`, `/profile/`, `/projects/` and each project detail are available under the deployment base. Project filtering and theme controls remain interactive.

Use `src/lib/paths.js` for local navigation and public assets. `src/data/routes.ts` provides the catalog for sitemap and tests. The original Astro and Echo fixtures remain as historical source and do not publish demo routes.

## Credits and history

The starter MIT license and Echo notices remain in THIRD_PARTY_NOTICES.md. Project covers identify projects with typography; they are not product screenshots. The supplied avatar is unchanged.

The previous Bun standalone merge is documented in docs/specs/aboutme-bun-merge.md and docs/bun-merge-review.md. The current Pages deployment supersedes its server hosting target; docs/specs/github-pages.md records this request.

Reference: [Astro GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/).
