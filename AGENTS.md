# AGENTS.md

This file defines the default operating rules for AI coding agents working in this repository.

## Intent Gate — do not silently guess

For any substantial product, feature, architecture, data-model, API-contract, routing, auth, payment, SEO-indexing, localization, design-system, or major UI/UX change, use `.agent/skills/project-intent/SKILL.md` before implementation.

If a material decision or standard is not settled by the user's current instruction, an approved spec, `PRODUCT.md`, `DESIGN.md`, `CONTEXT.md`, ADRs, or existing project rules:

- do not invent the answer;
- inspect all facts you can inspect yourself;
- use `grill-with-docs` / `grilling` for the remaining decisions;
- ask the user for standards/preferences only when they are genuinely decisions;
- do not begin implementation until the design-tree frontier is empty and shared understanding is confirmed;
- write/update a spec under `docs/specs/`;
- after implementation, use `code-review` so the Spec axis checks that the result matches the approved intent.

Small, fully specified, mechanical changes do not require grilling.

See `.agent/references/matt-pocock-skills.md`.

## Git discipline — every completed feature must be committed

A completed feature, vertical slice, bug fix, refactor, or other independently reviewable unit of work must end in its own Git commit.

Do not accumulate several completed features into one large commit.

Before committing:

1. Confirm the feature matches the approved spec or explicit request.
2. Run the relevant validation for that slice when available.
3. Review the diff and remove accidental, generated, debug, or unrelated changes.
4. Stage only files that belong to the completed unit.
5. Commit immediately before starting the next independent feature.

Commit messages should describe the completed unit clearly. Prefer concise conventional prefixes when they fit.

Rules:

- One independently reviewable feature/slice should normally map to one commit.
- If a feature is too large for one understandable commit, split it into smaller vertical slices and commit each completed slice.
- Do not mix unrelated cleanup into a feature commit.
- Do not rewrite, squash, amend, rebase, or force-push existing user commits unless explicitly asked.
- Never discard pre-existing user changes just to produce a clean commit.
- A feature is not considered complete until its intended commit has been created.
- Pushing is separate from committing: push only when the task, repository workflow, or user instruction calls for it.

## Source of truth

For Astro framework behavior, APIs, integrations, routing, rendering, configuration, and current best practices:

1. Prefer the Astro Docs MCP server when available.
2. Otherwise consult the current official Astro documentation.
3. Do not rely on remembered or outdated Astro APIs when current documentation can resolve the question.

Official AI guide:
https://docs.astro.build/en/guides/build-with-ai/

Project MCP configuration:

- Root config: `.mcp.json`
- Astro Docs: https://mcp.docs.astro.build/mcp
- Bearnie MCP: `bunx @bearnie/mcp`

## Project stack

- Astro 7
- Cloudflare Workers via `@astrojs/cloudflare`
- Tailwind CSS 4
- Bun (explicitly requested for this Echo implementation)
- Bearnie as source-owned UI primitives
- Impeccable for frontend design quality
- Matt Pocock alignment/spec/review skills
- `astro-seo`
- Partytown for Google Tag
- runtime sitemap endpoint using `sitemap`
- TypeScript

## Package manager

The user explicitly changed the package-manager policy to Bun for the Echo implementation.

```bash
bun install --frozen-lockfile
bun run dev
bun run check
bun run build
```

Commit `bun.lock`. Do not introduce another package-manager lockfile. Use `bunx` for local CLI invocation.

## UI architecture

```text
pages / features
      ↓
src/components/site
      ↓
src/components/ui
      ↓
src/components/bearnie
      ↓
src/styles/bearnie.css
```

- Application code imports reusable primitives from `@/components/ui`.
- Do not import Bearnie directly from pages/features/site components.
- Check Bearnie before creating a new primitive.
- Read `UI.md` before reusable UI work.
- Use Impeccable for substantial design judgement.

## Rendering and Cloudflare

- Keep Cloudflare runtime compatibility in mind.
- Prefer prerendering for static pages.
- Use on-demand rendering when runtime behavior is required.
- Do not expose secrets through `PUBLIC_*`.

## SEO

Use `src/layouts/BaseLayout.astro`.

Runtime sitemap:

```text
GET /sitemap.xml
```

Dynamic canonical public URLs belong in `src/seo/sitemap.ts`.

## Internationalization

The starter is i18n-ready, not multilingual by default. Do not enable locale-prefixed routing or hreflang unless the product requires it.

## Code quality

Before completing non-trivial work, run relevant validation such as:

```bash
bun run check
bun run build
```

For meaningful UI work, use Impeccable detector when available.

For behavior/architecture work, test at pre-agreed seams.

If validation cannot run, state that explicitly.
