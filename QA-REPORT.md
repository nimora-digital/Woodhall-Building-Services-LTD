# Verification report — 18 October 2026

## Passed

- Dependency installation and final clean `npm ci` from the included lockfile, Node 22.17.1.
- TypeScript checking and final Vite production build.
- Seven server tests: valid input, malformed/oversized input, forged service type, disabled POST, disabled status, unsupported method, foreign-origin rejection. All seven passed after the clean install.
- All 17 named routes and an unmatched route opened in the browser. Each rendered its own H1/title. No horizontal overflow was observed at the 614-pixel available browser viewport.
- Visual inspection of the homepage and contact page at a 1440-pixel iframe viewport; homepage at a 375-pixel iframe viewport; direct responsive homepage at 614 pixels. Desktop header, hero, enquiry layout and mobile layout rendered correctly in these inspected views.
- Responsive menu expanded and navigation to the gallery closed it.
- Gallery Brickwork filter reduced the count from five to one, and the image viewer opened with an image and caption and closed successfully.
- Empty form showed seven linked errors and focused the error summary. Corrected synthetic details cleared the errors and produced the explicit “nothing has been sent or stored” message. No real personal data was used.
- First FAQ expanded and its answer was present in the accessibility tree.
- Direct visit to Thank You showed “No submission confirmed”, avoiding false success.
- Browser error/warning log was empty when inspected after route and interaction checks.
- Local generated photographs and locally hosted fonts were visible in inspected layouts. All six required WebP assets are included; lazy images below the fold may load only when approached.
- Netlify configuration includes Node 22, production build, dist publication, function route, SPA fallback, noindex and security headers. Source, lockfile and assets are included in the export.

## Corrected during verification

- Copied missing local font assets and licences, removing the initial build warnings.
- Corrected the preview launch invocation after npm stripped its port option.
- Stopped the owned preview server to clear a Windows executable lock during clean installation, then repeated installation, tests and production build successfully.

## Verification limits

- No authorised Netlify deployment was available. This is built and ready to deploy, **not verified live**.
- Private Netlify Blobs storage, real Turnstile verification, deployment response headers and production redirects require testing in the deployed Netlify environment. The backend is intentionally disabled by default. Server tests verify validation and safe rejection, not actual cloud persistence.
- No screenshot reference or original approved Woodhall photographs were attached. Generated imagery is expressly illustrative. Prior Nimora websites/master instruction files were not available for comparison.
- No real reviews, before/after project pairs or customer-approved project records were supplied. Their dormant components have not been tested with real customer material.
- No exhaustive assistive-technology audit, real-device Safari/iOS testing, Lighthouse audit or load test was performed. The implemented keyboard, semantic, label, error and reduced-motion features do not amount to accessibility certification.
- Unknown SPA paths return the custom 404 view through an HTTP 200 fallback. A true HTTP 404 on every unknown SPA URL would need additional server handling.
- Canonical metadata and absolute sitemap URLs require `VITE_SITE_URL` set to the actual host. No production domain is fabricated; the default sitemap is a valid empty XML document.

See README for deployment instructions, private-storage activation, retention limitations and customer sign-off checklist.
