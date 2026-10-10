# Mantou / Faith portfolio

## Approved intent
Use the existing Bun + Astro Echo implementation. Display name: Mantou / Faith. Include all seven public faithli-dev repositories, as explicitly selected by the user. Use the supplied avatar unchanged. Preserve Echo's typography, spacing, project cards, responsive layout and theme control.

## Content contract
Use public repository descriptions, READMEs and package manifests for concise project summaries and technology lists. Link to GitHub, with live links only where repository homepage metadata provides one. Do not infer employment, certifications, availability, email, social accounts or proficiency from public code. Remove template biographies, employers, contributions, favorites and sample articles from published pages. Repository cover artwork is typographic identification, not a fabricated product screenshot.

## Implementation
One profile/project data module supplies home, about, project catalog, detail pages and sitemap. Static Astro routes with existing React card/filter islands. Keep deployment configuration and user Git history.

## Validation
Astro typecheck and build; built route/asset graph and sitemap tests; source URL and personal-content guards; desktop/mobile browser checks for navigation, filtering, avatar and theme. Commit the completed personalization. No deployment or push requested.
