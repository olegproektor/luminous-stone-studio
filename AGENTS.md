[# AGENTS.md

## Project identity

Luminous Stone Studio is a Russian-market website for premium outdoor stone and stone-like lighting.

Defaults:
- Russian market
- Russian-language public UI
- .ru launch assumption
- lighting only
- no audio products or speaker positioning unless explicitly requested

Use Essenze di Luce as a visual and editorial reference only. Do not copy proprietary text verbatim.

## Non-negotiables

Unless the task explicitly authorizes architecture changes, preserve:

- alias-first routing
- canonical URL policy
- metadata pipeline
- JSON-LD/schema hooks
- sitemap.xml and robots.txt generation policy
- analytics event names and event wiring
- lead form contracts and wrappers
- download gate logic
- /for-objects qualification flow
- sticky CTA policy
- core data/entity shapes
- seed/config-driven content architecture

Do not change protected systems during visual redesign work.

## Canonical routes

Treat these as canonical unless the task explicitly changes IA:

- /
- /products
- /products/:slug
- /collections/:slug
- /projects
- /projects/:slug
- /materials
- /texture/:slug
- /downloads
- /downloads/catalogue
- /downloads/bim
- /for-objects
- /company
- /faq

Alias rules:
- /custom is an alias for /for-objects
- legacy aliases may exist, but canonical behavior must remain intact
- do not create duplicate indexable routes
- sitemap and robots must reflect canonical routes only

## Allowed changes

For normal UI or redesign tasks, limit changes to the presentation layer:

- typography
- spacing
- layout rhythm
- section composition
- hero treatment
- card design
- image treatment
- header/footer styling
- CTA styling
- visual hierarchy
- Russian copy polish

Do not, by default:
- rewrite routes
- change canonical destinations
- replace forms for convenience
- remove analytics hooks
- alter schema/meta foundations
- change entity shapes to fit layout ideas
- introduce a second navigation/config/routing system

## Content and market rules

Public-facing content should be:
- Russian-first
- premium
- restrained
- architectural
- material-led
- non-generic
- not SaaS-like in tone

Preserve the Russian-market operating assumptions:
- Russian-language UI by default
- legal/privacy/cookie references suitable for Russian operation
- Yandex/domain-readiness considerations where relevant

If legal copy is incomplete, preserve structure and flag gaps. Do not invent authoritative legal claims.

## Working style

- Work repo-grounded: read relevant files before editing.
- Reuse existing helpers, configs, contracts, and seeds.
- Prefer extending current systems over creating parallel ones.
- Keep updates brief unless detailed reporting is requested.
- Do not write long plans by default.

## Verification

After meaningful changes, run the relevant checks.

Default:
- tsc --noEmit
- npm run build
- npm run test

When touching routes, forms, SEO, metadata, downloads, /for-objects, company, FAQ, or page shells, also do targeted smoke checks for:

- route integrity
- alias behavior
- canonical tags
- JSON-LD where relevant
- sitemap/robots sanity where relevant
- /materials
- /texture/:slug
- /downloads
- /downloads/catalogue
- /downloads/bim
- open vs gated download flow
- /for-objects
- /custom alias behavior
- company and FAQ pages
- success/fail form states
- sticky CTA and cookie-banner overlap on mobile

## Reporting

Keep reports concise:

1. What changed
2. Files changed
3. Checks run
4. Result
5. Remaining blockers or risks

If useful, mark items as:
- Closed fully
- Closed partially
- Deferred
]
