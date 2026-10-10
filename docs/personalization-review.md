# Personalization review — 2026-10-10

## Standards axis: pass

Content comes from one portfolio JSON module; static project pages and runtime sitemap use the same project catalog. Existing Echo React card/filter primitives remain in their UI layer. Native tech cards use the public Bearnie Card export. No secrets, private contact details, extra dependencies, vendor primitive edits or deployment changes.

Recovered, unused demo source fixtures remain for reconstruction history; fictional project/article routes are removed from the build. Current documentation identifies the original visual QA as historical rather than claiming pixel equivalence after personalization.

## Spec axis: pass

The user confirmed Mantou / Faith and all seven public repositories, and provided the avatar. The homepage/about/catalog/details include that identity and source-backed technology/project content. User image is copied unchanged. Fake contact, job history, biography, sample writing, social links and contribution claims are absent from published pages.

Live links use the two public AWS repository homepages. All seven details link to the corresponding repository. No employment, certification or availability is inferred. Project covers are plainly repository identification artwork.

## Validation

- Astro check: 0 errors, 0 warnings.
- Build: 10 portfolio pages prerendered; Cloudflare server build succeeds.
- Bun tests: 12 passed, 139 assertions. Checks route/asset integrity, sitemap, all seven repository links, optional live links and removal of fictional routes/contact.
- Impeccable detector: succeeds with no findings.
- Browser: desktop 1440×1000 and mobile 390×844. Avatar and all seven covers load; home/catalog/about/detail pages have no horizontal overflow in the checked mobile views.
- Categories: All 7, Starters 2, Tools 3, Learning 2. Mobile Learning filter works.
- Navigation: home → projects → details, profile, and back home. Source-only detail omits live CTA; AWS detail has correct live/source URLs.
- Theme toggle works and persists across page navigation. Saved mobile light/dark screenshots under `qa/`; current desktop homepage is `preview.jpg`.

No production URL was supplied; SITE_URL remains configurable. No public email or role was supplied, so GitHub is the public contact entry. No remote push or deployment performed.
