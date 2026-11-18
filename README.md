# BLACK MERIDIAN — Commercial services website

A production Next.js website for BLACK MERIDIAN Sales & Consulting Ltd. The November redesign retains the ivory, ink-navy and copper identity with bold typography, a lightweight illustrated meridian hero, a Services mega-menu, clear service detail pages and collaboration options.

## Run

- `npm install`
- `npm run dev` — development server
- `npm run build` — static production export in `out/`
- `npm start` — production preview at http://127.0.0.1:3100
- `npm run qa` — responsive, navigation, form and accessibility checks against that preview (Chrome required)

## Current content

The website supports German, English, Turkish, Polish, Romanian, Albanian, Spanish, French, Greek, Ukrainian, Bulgarian and Italian. Every language has static page URLs, localized metadata and hreflang alternatives. The header selector preserves the current page, query and anchor. English remains the default for unprefixed URLs; legacy expertise paths resolve within the selected language.

Translations are stored in `lib/locales/*.json`, generated from the public English copy through Google Translate at development time, with manually refined hero wording and German service terminology. No translation service is called by visitors. Translations are machine-assisted drafts and have not received native-speaker editorial review. `lib/locales/source.json` is the translation inventory; `node scripts/translate-locales.cjs` fills missing entries without overwriting existing edits. `node scripts/locales-qa.mjs` verifies all 12 languages in the production preview, including responsive layouts, metadata, switching, form handoffs and privacy text.

Six service categories include the original 31 supplied service groups and the new talent and partnerships offering:

- Online Sales: 6 groups
- Offline Sales: 6 groups
- Marketing & Advertising: 6 groups
- Sales Support & Customer Services: 6 groups
- Business Development & Consultancy: 7 groups
- Talent Management & Brand Partnerships: 6 groups (supporting copy drafted from the supplied service title)

The separately mentioned comprehensive service list has not yet been supplied. The current catalog covers every item in the client’s message; it must be reconciled with that additional list when received.

Three collaboration models: Individual Services, Monthly Management, and Outsourced Departments. Service and model links preselect the enquiry form. The contact flow prepares a message to `https://wa.me/491722187353`; visitors review and send it themselves. No enquiry is sent automatically or stored in a website database. Telephone links use `tel:+491722187353`. Contact, footer and closing sections include `info@blackmeridian-global.com` as a mailto link.

## Edit

- `lib/services.ts`: service catalog, complete descriptions, collaboration models, canonical pages and legacy mappings.
- `components/ModernSite.tsx`: current page layouts, navigation and global sections.
- `components/Navigator.tsx`: validated enquiry flow, service/model selection and WhatsApp handoff.
- `app/modern.css`: responsive redesign styles.
- `app/[[...path]]/page.tsx`: static routing and metadata.
- `lib/en.ts`: shared form, sector and privacy text.

The previous UI components remain as legacy source; routing renders `ModernSite`.

## Deployment

Git root: `black-meridian` itself. Vercel project Root Directory must be blank / `./`, Framework Next.js, production branch `master`. `vercel.json` sets the framework and build command. Do not override Vercel Output Directory: Next.js static export is detected automatically.

The confirmed production origin is `https://www.blackmeridian-global.com`, centralized in `lib/seo.ts`. Canonical URLs, hreflang, robots.txt, sitemap, social metadata and structured data all use this domain. The original private Sites manifest is retained; delivery uses the connected GitHub/Vercel workflow.

Google Search Console: add the URL-prefix property `https://www.blackmeridian-global.com/` and verify ownership. If using HTML verification, set the provided content token in the deployment environment as `GOOGLE_SITE_VERIFICATION`, then rebuild and deploy before clicking Verify. Alternatively use the DNS verification workflow for a domain property. After verification, submit `https://www.blackmeridian-global.com/sitemap.xml` and inspect the homepage or important service URLs. No Search Console submission or verified indexing is implied by deployment. Google decides indexing; sitemap discovery is not an inclusion guarantee. Empty Insights pages and the pre-launch privacy pages are intentionally noindex and omitted from the sitemap.

Run `node scripts/seo-qa.mjs` after the production build to check all sitemap URLs against exported pages, canonical/hreflang tags, schema and crawl directives.

Confirm registered company address, registration details, legal representative and applicable legal notices before public commercial launch. No client logos, testimonials, revenue figures or office locations are invented.

## Assets and accessibility

Self-hosted DM Sans and Cormorant Garamond. The hero is an SVG illustration, not a raster screenshot or WebGL scene. Reduced-motion preferences are respected. The detail pages use text, anchor navigation and structured lists rather than per-service images.

`npm run qa` checks the homepage, all six service pages, overview, collaboration, about, contact, industries and privacy at four widths. It verifies 37 service entries, desktop/mobile navigation, keyboard dismissal, preselected enquiry values, required fields, WhatsApp payloads, runtime errors and axe scans. It never sends a WhatsApp message.
