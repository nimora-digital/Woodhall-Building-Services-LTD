# Woodhall Building Services — Nimora Digital prospect concept

Complete React + Vite + TypeScript website for GitHub → Netlify. This is **not an authorised official business website**. No ChatGPT account or runtime is required. The demo is noindexed, with no analytics, advertising, automatic emails or active enquiry collection.

## Run locally

Use Node **22** and npm. From the extracted repository root:

```
npm ci
npm test
npm run build
npm run dev
```

Production preview: `npm run preview`. Vite serves the frontend only; the Netlify function is available on Netlify (or through Netlify CLI development). The frontend safely remains in demo mode when a backend is unavailable.

## Exact GitHub → Netlify deployment

1. Extract the ZIP. Upload its **contents**, including hidden files, directly to the root of a new GitHub repository. Do not upload the outer ZIP or create an extra nested project directory.
2. In Netlify choose **Add new project → Import an existing project → GitHub**, authorise the intended repository and select its main branch.
3. Set base directory to blank/repository root; install command **npm ci** (Netlify normally installs automatically from the lockfile); build command **npm run build**; publish directory **dist**; functions directory **netlify/functions**; Node version **22**. `netlify.toml` provides these build/runtime settings.
4. Keep `ENQUIRIES_ENABLED=false` or unset. No secrets are needed for the demonstration. Set `VITE_SITE_URL` to the assigned HTTPS Netlify origin, without a trailing slash, then rebuild to generate absolute canonicals and the XML sitemap. No placeholder production domain is invented. The sitemap is an empty valid document until that origin is supplied.
5. Deploy. Check the home page, each deep link, custom 404 view, gallery, phone/email links and the disabled form message. Netlify serves real route files where generated and falls back to the SPA otherwise. Unknown routes show the custom 404 view (SPA fallback has HTTP 200).
6. Confirm noindex in HTML and `X-Robots-Tag` response headers. Do **not** remove demo labelling or noindex until customer launch approval.

There is no verified public deployment included with this export. No authorised Netlify connection was available in this session.

## Pages

Home `/`; Services `/services`; Brickwork & Masonry `/services/brickwork-masonry`; Extensions & Building Work `/services/extensions-building`; Property Renovations `/services/property-renovations`; Landscaping & Garden Construction `/services/garden-construction`; Driveways & Exterior Improvements `/services/driveways-exterior`; Our Work `/our-work`; About `/about`; Our Approach `/our-approach`; Areas `/areas`; FAQs `/faqs`; Contact / Request a Quote `/contact`; Privacy `/privacy`; Cookies `/cookies`; Demo Terms `/terms`; Thank You `/thank-you`; custom unmatched-route 404.

## Editing and approved project content

Company contact information, service content, FAQ content and project configuration are centralised in `src/content.ts`. This is developer-editable configuration, **not a customer-facing CMS**. Shared presentation and reusable components are in `src/App.tsx`, styling in `src/style.css`. Assets and fonts are local under `public/`.

`projects` is intentionally empty. Each project supports title, category, approved location, description, before/during/after image arrays, scope, materials and an optional approved comment. Set `approved:true` only after permission and factual review. The ProjectCard, BeforeAfter and Review components support future approved material. Before/after controls render only when genuine paired assets have been entered. The current filter system covers the inspiration gallery; a full project-management CMS and an independent genuine-project filter interface would be future development.

No reviews, ratings, qualifications, insurance, guarantees, team history or tenure claims have been fabricated. The supplied Facebook screenshot itself was not attached; no Facebook images were copied. All supplied factual context was treated as a brief, not independently verified credentials. Standalone service categories are carefully qualified.

## Enquiry backend — deliberately disabled by default

The form performs accessible browser validation and reports that nothing was sent in demo mode. Success is displayed **only** after a backend response with `stored:true`. Duplicate clicks are prevented and UUID submission keys make retries idempotent. The Netlify function independently validates inputs, rejects unknown work types, requires same-origin POSTs, checks body limits, honeypot and Turnstile, and writes to a private Netlify Blobs store. There is no public record-read route, no automatic email, CRM or acknowledgement integration. No upload endpoint is provided.

Before enabling, the business must approve collection and the following must be completed:

- Identify the controller/privacy contact, lawful basis, retention period, deletion and access procedures, processor terms and any transfer requirements. Replace draft privacy language with the approved facts.
- Approve Cloudflare Turnstile use, create its site for the exact production hostname and put `TURNSTILE_SECRET_KEY` in **server-only** Netlify function environment variables. Never prefix it with `VITE_`.
- Set server `SITE_ORIGIN` to the exact HTTPS origin; set build variable `VITE_TURNSTILE_SITE_KEY` to its public site key. Keep `VITE_SITE_URL` consistent. Redeploy.
- Confirm Netlify Blobs availability and account access controls. Approved staff can inspect/delete records through Netlify's authorised tooling; the site has no admin dashboard. **No automatic retention deletion is implemented**; establish and operate a deletion procedure before collecting data.
- Set `ENQUIRIES_ENABLED=true` only after approval, then deploy and verify one synthetic test enquiry is actually present in `woodhall-private-enquiries`. Check retry behaviour and failure recovery, delete the synthetic record, and record the outcome. Live storage/Turnstile have not been tested in this local build.
- Apply platform rate limits appropriate to expected traffic. Turnstile and the honeypot are implemented; a separate persistent rate limiter is not.

Photograph uploads remain unavailable. Secure upload validation, storage, malware checks, access controls and retention would be additional work. Form data is not logged by this implementation; hosting access/security logs are a separate platform matter.

## SEO and security

Unique route titles/descriptions, semantic content, meaningful image alt text, internal linking, configurable canonicals, generated XML sitemap, robots.txt and global noindex are supplied. Per-route metadata files are generated for direct deep links. No unsupported LocalBusiness credentials or aggregate ratings are emitted. Concept-only CreativeWork structured data describes Nimora's demonstration. Security headers include CSP, anti-framing, MIME sniffing protection, referrer and permissions policies. Verify these headers on the deployed host.

The browser confirmation page checks a navigation receipt; visiting its URL directly cannot claim an enquiry was received. Any current submission acceptance confirms private storage only, not a promise of response or acceptance of work.

## Assets and rights

Photographs were generated using the built-in image-generation tool and are labelled as AI-generated illustrations. Three original generated scenes and derived crops are packaged as WebP. See `ASSETS.md` for generation briefs. They do not represent completed Woodhall work. The conceptual W wordmark is a design proposal, not a reproduction of an approved supplied logo. Manrope and Inter fonts are locally hosted with their licence files in `public/fonts/`.

## Customer sign-off checklist

- Approve authority to launch and exact legal/business identity, contact details and logo.
- Confirm each service, coverage boundary and availability; verify any future credentials or experience claims.
- Supply original project photographs, rights/permissions, factual descriptions and approved locations.
- Approve any review text, attribution and permission; do not create unsupported rating markup.
- Approve privacy controller/contact, retention, terms and enquiry processing; test private storage before activation.
- Confirm domain and hosting ownership, security headers and deployment checks.
- Review content and mobile/desktop layouts; remove noindex and demonstration labels only for an authorised official launch.

No earlier Nimora master-instruction file or prior design references were available in this workspace. The supplied project brief governs this implementation.
