---
status: completed
---

# Echo template on astro-starter

## Problem Statement
The existing Echo reconstruction runs in a standalone Bun server. The user explicitly asks to implement that same template using `faithli-dev/astro-starter`, with the previously requested Bun workflow.

## Solution
Use the supplied repository as the foundation. Preserve its Astro 7, Cloudflare, SEO, runtime sitemap, Partytown and source-owned Bearnie layers. Replace the starter landing page with the already approved Echo portfolio and all 22 captured routes, keeping their appearance, local assets and interactions.

## User Stories
1. As the owner, I can install, run, check and build the template with Bun.
2. As a visitor, I can browse home, projects, about and articles, open every detail page, filter projects, switch theme, dismiss the banner, copy article links/code and reveal favorite images.
3. As the owner, I can edit readable page data and site components within an actual Astro repository.

## Implementation Decisions
- The reference appearance and content are established by the earlier reconstruction; no new design or product decision is unresolved. The user instruction is the implementation approval.
- Use native `.astro` pages and the existing `BaseLayout`, prerendering all portfolio routes. Keep runtime endpoints compatible with Cloudflare.
- Reuse recovered public React component behavior as source-owned modules, with `@astrojs/react` doing SSR and hydration. Share a single installed React/ReactDOM instance instead of replaying the old site's hydration/runtime bundles.
- Keep readable JSON content, local images/fonts, the reference CSS and existing source primitives. Reused Echo controls are part of the requested template, not new reusable primitives.
- Bun replaces npm by explicit user request. Commit the implementation locally; publishing/pushing is separate.
- Recovery cannot recreate unpublished original TSX/Astro source. Mark recovered component provenance in documentation.

## Testing Decisions
Validate through Astro check/build, all 22 route outputs, local asset references, runtime sitemap, and browser desktop/mobile appearance plus key interactions. Run the repo design detector and Standards/Spec review.

## Out of Scope
CMS, localization, replacement copy, visual redesign and remote deployment are not requested.
