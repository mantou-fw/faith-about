# GitHub Pages review

Spec: docs/specs/github-pages.md

## Standards axis: pass

Bun remains the only package manager and Astro CLI runtime. Static output removes the server-only adapter and endpoint. Local URLs share a base helper across Astro and React; Vite prefixes bundled CSS/fonts/islands. No vendor UI or portfolio data changes. Deployment permissions are scoped to the Pages workflow, which uses frozen install, checks and tests before uploading dist.

## Spec axis: pass

Main pushes and manual dispatch deploy to workflow-based GitHub Pages. Default origin/base target mantou-fw.github.io/aboutme. Portfolio routes, project filtering, theme controls and source/live links are preserved. Sitemap/robots and the about landing redirect are generated files. Runtime health is removed because Pages has no server runtime. README and agent instructions describe the new hosting target.

## Validation

- bun run check: 0 errors, 0 warnings.
- bun run build: static output, 12 HTML pages plus sitemap/robots.
- bun test: 16 pass, 373 assertions, including local route/asset graph, CSS font URLs, JS imports, SEO, redirect and project links.
- git diff --check: clean.

Remote deployment and published browser verification are performed after pushing the reviewed commit; see the GitHub Actions run.
