# aboutme portfolio merge and Bun runtime

Status: ready-for-agent. User explicitly requested direct merge into mantou-fw/aboutme and Bun runtime.

## Problem and solution
Merge the completed Mantou / Faith portfolio into the existing repository, preserving both Git histories and target-specific public information. Serve the built Astro site with Bun, including runtime endpoints, rather than relying on GitHub Pages static hosting.

## User stories
1. Visitors see the supplied avatar, confirmed name, tech stack and seven public repositories.
2. Existing /about/ landing URLs still work, and the existing HTIFA business, founder role, Taiwan location and public email remain available.
3. Maintainers install, check, build, test and start with Bun. Runtime health verifies Bun is actually executing the server.
4. The validated merge is pushed directly to main as requested.

## Implementation decisions
Preserve the target's root redirect to /about/. Use the incoming homepage composition at /about/ and its profile composition at /profile/. Include existing HTIFA alongside the seven confirmed repositories. Import existing personal/public contact fields into the centralized portfolio data. Drop demo JustOS, fictional article routes and generic X URL from published navigation. Preserve all previous commits and unused source files for history.

Use the official @astrojs/node standalone adapter, executed by Bun's Node-compatible runtime. Scripts explicitly force Bun for Astro CLI execution. Remove obsolete Cloudflare deployment config and npm lockfile; retain bun.lock. Replace GitHub Pages deployment with Bun validation CI because Pages cannot execute Bun. No hosting provider or production domain has been supplied; document build-time SITE_URL and runtime HOST/PORT. Do not claim production deployment.

## Validation
Typecheck, build, route/asset graph and sitemap tests; built server integration tests for runtime health, root redirect, dynamic sitemap/robots and static asset serving under Bun. Local browser smoke check of the production server. Diff review on Standards and Spec axes before committing and pushing.
