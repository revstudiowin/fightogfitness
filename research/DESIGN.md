# Research and design inventory — 24 October 2026

Primary evidence: full HTML snapshots of https://fightogfitness.dk/ and https://future.co/, browser accessibility trees, and screenshots. Source snapshots retained locally. Future's initial screenshot had unrevealed content and incomplete imagery; motion quality has not been verified.

## Verified brand
Source homepage CSS tokens: navy #142144, ink #172342, blue #3d59a8, hover #173ba9, muted #5b6780, line #dce3f0, pale #f1f5ff. Original SVG logo preserved. Existing typography is Arial and Georgia; retained in a new sans-led hierarchy.

## Exact major order
1. top: hero, consultation, community and reassurance
2. faellesskabet: daily-life concerns and support
3. oplevelser: ten reviews, member videos, transformations
4. traeningstid: training rhythm, calculator, training explanation
5. foerste-besoeg: consultation benefits and disclosures
6. team: seven coach profiles
7. holdtider: two locations and seven-day schedules
8. spoergsmaal: nine FAQs
9. closing: final consultation CTA
10. footer

Exact text and semantic source are retained in original-home.html and content-inventory.txt. Dynamic content, media, all schedule rows and location descriptions are retained in ../src/content-config.json.

## Interaction inventory
Mobile navigation; consultation modal using native WordPress/Elementor form; successful lead redirects to department-specific booking; reviews with pause and arrows; member video playback; expandable transformations; 0–12 hour calculator in quarter-hour increments compared with 135 minutes; location tabs and daily schedule; full schedule downloads; native details/summary FAQ.

The live form requires original WordPress runtime and fresh server nonce. Present the real contact service in a lazy iframe with a direct-link fallback. Do not reproduce a fake form or generate success. Do not submit test leads to the business. Preserve booking service destinations externally.

## Reference principles and new direction
Future uses confident sans typography, large media, generous breathing room, coherent repeating CTA styling, varied narrative scales and horizontal member stories. New design: oversized navy editorial masthead; panoramic original community photograph; blue consultation strip; numbered concern rows; pale review gallery; navy calculator section; consultation benefits as an editorial numbered list; portrait rail; structured schedule panel; two-column FAQ; oversized blue closing and navy footer. No Future assets or copy used.

Project scope is the local frontend requested in the brief. No public deployment or changes to the live business site.
