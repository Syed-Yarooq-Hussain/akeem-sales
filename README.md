# Black Meridian — The Meridian Atlas

A multilingual Next.js website for Black Meridian Sales & Consulting Ltd.

## Run

- `npm install`
- `npm run dev` — development
- `npm run build` — production static export in `out/`
- `npm start` — local production preview at http://127.0.0.1:3100
- `npm run qa` — Chrome browser tests against the running preview

## Editing

- `lib/en.ts`, `lib/de.ts`, `lib/fr.ts`, `lib/es.ts`: complete locale copy and service content.
- `components/Site.tsx`: page sections and navigation.
- `components/Navigator.tsx`: four-step enquiry flow.
- `components/Art.tsx`: lightweight custom SVG atlas and illustrations.
- `app/globals.css`: responsive design system.
- `lib/content.ts`: routes, locales and WhatsApp destination.

## Enquiries

All WhatsApp links open `https://wa.me/491722187353`. The navigator validates selections and contact fields, then prepares a translated WhatsApp message. Visitors review and send it themselves. No message is sent automatically, and no form data is submitted to a website backend or stored persistently. Phone links use `tel:+491722187353`.

## Deployment

The project exports static HTML for 13 pages in each of four locales, plus English aliases. Next.js can also be deployed on Vercel. No existing domain settings were changed. The current Sites project is recorded in `.openai/hosting.json`. Canonical origin is configured in `app/[[...path]]/page.tsx`, `app/sitemap.ts` and `app/robots.ts`; update these when the final domain is connected.

Before a public commercial launch, confirm the company’s registered address, registration details, legal representative, applicable legal notices and privacy details. Service descriptions and sector focus are editable proposals from the supplied brief. No testimonials, clients, revenue statistics or office locations are invented.

## Visual assets

Self-hosted Cormorant Garamond and DM Sans via Fontsource. Locally downloaded sector photographs from Unsplash:

- Architecture: https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
- Technology: https://images.unsplash.com/photo-1485827404703-89b55fcc595e
- Industry: https://images.unsplash.com/photo-1581092921461-eab62e97a780
- Trade: https://images.unsplash.com/photo-1494412519320-aa613dfb7738

The atlas routes are conceptual illustration, not claimed business relationships. SVG replaces a heavy WebGL globe for the new editorial direction and reduced-motion support.

