# CosmetoCity Multilingual Blog Publishing Rule

Every new blog topic MUST be published simultaneously in **all 7 supported languages** and placed into its own language-specific route:

- **English (`en`)** → `/blog/en/<en-slug>`
- **German (`de`)** → `/blog/de/<de-slug>`
- **Russian (`ru`)** → `/blog/ru/<ru-slug>`
- **Spanish (`es`)** → `/blog/es/<es-slug>`
- **Arabic (`ar`, `dir="rtl"`)** → `/blog/ar/<ar-slug>`
- **French (`fr`)** → `/blog/fr/<fr-slug>`
- **Italian (`it`)** → `/blog/it/<it-slug>`

## Checklist for Every New Blog Post
1. Create a dedicated module in `src/data/blog/<topicName>.ts` implementing `BlogPost` (TypeScript enforces all 7 `Locale` keys on `slugs`, `metaTitle`, `metaDescription`, `h1Question`, `h1CompleteTitle`, `h1DirectAnswer`, `keyTakeaways`, `recoveryTimeline`, `sections`, `midArticleCta`, and `bottomArticleCta`).
2. Adapt each language natively to local search habits (natural long-tail question H1 + 2–3 sentence Featured Snippet summary).
3. Register the new post in `BLOG_POSTS` inside `src/data/blogPosts.ts`.
4. `src/app/blog/[slug]/[articleSlug]/page.tsx` and `src/app/sitemap.ts` will automatically generate all 7 static language pages, `hreflang` alternates, native `FAQPage` + `MedicalWebPage` JSON-LD schemas, `lang` attributes, `dir="rtl"` for Arabic, WhatsApp CTAs, medical review badges, and sitemap entries.
