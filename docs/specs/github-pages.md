# Bun-powered GitHub Pages deployment

Status: approved by the user's explicit request to set the supplied Pages workflow.

Deploy main to https://mantou-fw.github.io/aboutme/ using GitHub Actions and Bun 1.3.14. Replace the previous standalone server target with static Astro output. Preserve the portfolio content, filtering, theme controls and /about/ landing convention using a generated redirect page. Apply the configured base to navigation, images, SEO and assets. Generate sitemap and robots during build; remove runtime-only health. Build, check and test before uploading dist. Keep pull request validation. Enable workflow-based Pages and verify the published site. No custom domain or redesign.
