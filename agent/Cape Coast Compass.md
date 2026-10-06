# Tourism Compass — Ghana-wide project brief

This direction supersedes the older Cape Coast-only operating proposal. Keep the existing repository, Cloudflare project and public domain; Tourism Compass is the public brand.

## Purpose and visitor journey

Tourism Compass is an attraction-discovery and browser-based trip-planning platform for Ghana. Cape Coast is one destination among the towns represented in the catalogue.

**Discover Ghana → Region → Town → Attraction → Add to trip.**

The current catalogue is a growing research collection, not an exhaustive national register, proof of public access or a guarantee of venue operations. Derive regions, towns and counts from `regions-data.json` and `attractions.json`; do not maintain a duplicate attraction database.

Production: https://cape-coast-compass.pages.dev/
Repository: brotherdavid652-a11y/Cape-Coast-Compass
Hosting: existing Cloudflare Pages project `cape-coast-compass`.

## Working experience to preserve

- Homepage: Ghana-wide introduction, catalogue-derived region choices, selected destinations from several regions and the existing planner.
- Attractions: progressive region → town → attraction rendering; direct URLs, breadcrumbs, browser Back, search, interests and accurate counts.
- Cape Coast: destination hero, six compact essential links and one browser with all its catalogue entries.
- View place never changes the trip. Add to trip reuses the existing session state, adds exactly the chosen attraction, preserves other stops, prevents duplicates and synchronizes Added feedback with the planner.
- Town maps default to List on entry. No map UI before town selection. Markers require explicit verified, sourced coordinates and respect filters. Distinguish missing town locations from filters excluding mapped places.
- Missing images use Tourism Compass placeholders. Preserve genuine visitor cautions, photo credits and editing disclosures; do not expose internal completeness notes.
- Accounts remain separate from local trip planning. Signing in does not submit or reserve a visit or upload the trip.

## Trip planning versus proposed services

The planner accepts catalogue attractions across the represented regions. It retains stops, preferred date, visitor count and optional meeting-point notes in existing browser session storage (`cape-compass-trip-v1`). Preserve the key and saved selections. Pickup is optional for planning; never require a Cape Coast pickup for destinations elsewhere.

Opening a page must never add a stop. A saved plan is not a booking, submitted request, optimized route or confirmed schedule. Permission-based location entry does not establish transport coverage, a safe collection point or vehicle access.

Transport, admission coordination, booking submission and payments are proposed future services. Do not promise nationwide transport, availability, vehicle capacity, prices, partnerships or reservations. The current site does not submit bookings, collect card details or process payments.

Shared notice: “Tourism Compass is currently in preview. Trip planning is available; online booking and payments are coming soon.” Keep detailed implementation and service limits in help/policies and necessary notices at relevant actions.

## Implementation and delivery

Use the existing static HTML/CSS/JavaScript source and Cloudflare production workflow. `home-ghana.js` derives the homepage choices/counts from the catalogue. `planner-data.js` is catalogue-generated; `trip.js` owns selection, validation, review and persistence. Reuse these systems.

Preserve attraction names, genuine descriptions, categories, assignments, photographs and coordinates unless a sourced correction is authorized. Do not invent photographs, coordinates, prices, hours, access, durations or historical facts.

Validate locally, commit and deploy, then test the exact public URL in an isolated session at desktop/mobile widths. Restore original trip selections after tests. Do not claim completion from local or preview tests alone.

## Owner information and later batches

The owner must supply verified operator/legal identity, business/contact address and privacy/account-deletion contact. Future transport coverage, partnerships, booking operations, payment and cancellation arrangements must be established before making operational claims. Do not invent these details.

Content gaps remain where sourced descriptions, usable licensed photographs or verified coordinates are absent. Later batches may address standalone My Trip presentation, heritage routes, booking and payments when explicitly authorized.
