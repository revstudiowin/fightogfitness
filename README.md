# FightogFitness

Fresh, dependency-free frontend with original Danish content, verified brand colors and original media. Requires Node 22+.

```
npm run dev
npm run check
npm test
npm run build
node server.mjs --dist
```

Preview: http://127.0.0.1:5173. Production output: `dist/`. Deploy this folder to any static host. No live website or public hosting configuration has been changed.

## Structure

- `index.html`: semantic, server-readable homepage copy and verified SEO metadata/schema.
- `src/styles.css`: responsive design tokens, section layouts, controls and reduced-motion behavior.
- `src/main.js`: navigation, consultation service, reviews, videos, results and schedules.
- `src/content-config.json`: original schedules, location data, member media and results.
- `src/calculator.js`: isolated training-time comparison.
- `src/analytics.js`: disabled, consent-gated Meta integration.
- `src/motion.js` and `src/motion.css`: masked word reveals, staggered section entrances, media parallax and scroll progress. Uses native browser animation APIs, keeps normal scrolling, reduces movement on mobile, and disables motion when reduced motion is requested. Content stays visible if the module does not load.
- `research/DESIGN.md`: evidence, inventory and visual direction.
- `research/original-home.html`: original semantic content for auditing.

## Live service dependencies

The original consultation form is an Elementor form on WordPress. It requires the original runtime, server nonce and backend. Consultation buttons open the real contact page in a lazy-loaded iframe with a direct link. The live form fields and submission stay with the original service; this frontend never claims a lead was submitted. If the original service blocks embedding, use the visible direct link. A native form would require an approved backend integration, fresh nonce strategy, CORS/CSRF decisions and confirmed privacy text. No backend endpoint or credentials were invented.

Original successful lead routing is to `https://fightogfitness.dk/strategisamtalevanlose/` or `https://fightogfitness.dk/strategisamtalevalby/`, according to chosen department. Booking completion remains external. Videos stream from the original site. Profile, legal and service links continue to their verified original destinations.

No real lead or appointment should be submitted as a smoke test. This implementation does not fake success states. Availability counts and review dates reproduce the source snapshot, rather than pretending to be live data.

## Meta Pixel activation

Nothing is loaded or tracked by default. Import `configureAnalytics`, `revokeAnalyticsConsent`, and `trackEvent` from `src/analytics.js`. Call configuration only after the business supplies a Pixel ID and the consent manager reports explicit marketing consent. Connect revocation to the same consent manager. Do not infer consent from visiting or clicking.

`configureAnalytics({pixelId: BUSINESS_ID, marketingConsent: true})` loads the SDK and sends one PageView. Call `trackEvent('Lead', verifiedSubmissionId)` only after a backend-confirmed successful lead. Call Schedule only after verified booking completion, and Contact only for its confirmed appropriate contact action. Cross-origin iframe clicks are not lead or schedule confirmations. Event IDs deduplicate calls per page lifetime; use stable provider IDs for conversion events and coordinate server/browser deduplication if Conversions API is later added. No personal information is accepted by the event utility. Review consent handling with the business before enabling tracking.

## Research limits

Both websites' full HTML and browser DOM were retrieved. The original hero was visually inspected. Future's screenshot contained unrevealed elements, so its scroll animation quality could not be verified. See the validation report for the exact checks completed and any browser limitations.
