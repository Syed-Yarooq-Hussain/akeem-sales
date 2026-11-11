# BLACK MERIDIAN — Commercial services website

A production Next.js website for BLACK MERIDIAN Sales & Consulting Ltd. The November redesign retains the ivory, ink-navy and copper identity with bold typography, a lightweight illustrated meridian hero, a Services mega-menu, clear service detail pages and collaboration options.

## Run

- `npm install`
- `npm run dev` — development server
- `npm run build` — static production export in `out/`
- `npm start` — production preview at http://127.0.0.1:3100
- `npm run qa` — responsive, navigation, form and accessibility checks against that preview (Chrome required)

## Current content

The client requested professional English. The main website now uses English throughout. Previous locale and expertise URLs continue to resolve, displaying the relevant English page with an English canonical URL; they are not advertised as translated pages. Original translation files remain available for a future translation pass.

Five service categories contain all 31 supplied service groups:

- Online Sales: 6 groups
- Offline Sales: 6 groups
- Marketing & Advertising: 6 groups
- Sales Support & Customer Services: 6 groups
- Business Development & Consultancy: 7 groups

The separately mentioned comprehensive service list has not yet been supplied. The current catalog covers every item in the client’s message; it must be reconciled with that additional list when received.

Three collaboration models: Individual Services, Monthly Management, and Outsourced Departments. Service and model links preselect the enquiry form. The contact flow prepares a message to `https://wa.me/491722187353`; visitors review and send it themselves. No enquiry is sent automatically or stored in a website database. Telephone links use `tel:+491722187353`.

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

Set `NEXT_PUBLIC_SITE_URL` to the final origin when connecting `sales.akeem-group.com`. Until then, canonical URLs use `https://blackmeridian-seven.vercel.app`. No existing DNS settings were changed. The original private Sites manifest is retained; this redesign is delivered through the connected GitHub/Vercel workflow.

Confirm registered company address, registration details, legal representative and applicable legal notices before public commercial launch. No client logos, testimonials, revenue figures or office locations are invented.

## Assets and accessibility

Self-hosted DM Sans and Cormorant Garamond. The hero is an SVG illustration, not a raster screenshot or WebGL scene. Reduced-motion preferences are respected. The detail pages use text, anchor navigation and structured lists rather than per-service images.

`npm run qa` checks the homepage, all five service pages, overview, collaboration, about, contact, industries and privacy at four widths. It verifies 31 service entries, desktop/mobile navigation, keyboard dismissal, preselected enquiry values, required fields, WhatsApp payloads, runtime errors and axe scans. It never sends a WhatsApp message.
