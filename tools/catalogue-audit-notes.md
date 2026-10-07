# Catalogue audit — 7 October 2026 (UTC)

Scope: all 117 unique catalogue records and 44 town views. This is a structural/source review, not an assertion that every venue is currently open or that the catalogue covers all Ghanaian attractions.

## Changes

- 23 additional precisely identified attraction locations; 29 sourced map records overall. Cape Coast: 6/24; Elmina: 3/6; Kumasi: 3/5.
- Source-backed summaries added where the publisher identifies the subject. Existing genuine descriptions retained. 83 records have descriptions; 66 have recorded content sources. The remaining 34 descriptions and 51 source gaps require further identifiable evidence or custodian confirmation.
- All detail pages distinguish unverified opening hours, admission, public access and permissions. Published GMMB/museum arrangements are labelled as published information to reconfirm, not guaranteed operations. Current fees are not inferred from dated fee tables.
- Source dates are the actual review date. Sources and unresolved/rejected coordinates are retained in `visitor-content-audit.json`.
- New public visitor text translated into French, Spanish and German using the existing system.
- UCC public permission is described as unverified rather than asserting an unsupported mandatory permission rule.

## Coordinate decisions

Accept only named attraction/object points. Reject Irish James Fort, the Kumasi town-centre redirect, photo camera coordinates, coarse UCC research coordinates and the conflicting St Francis cathedral point. Fort William Lighthouse is independently corroborated by the correctly named Commons object category. Fort Victoria uses the named fort article corroborated by the mapped fort; the Commons category conflating it with the lighthouse is rejected. Broad shrines, township and regional themes remain without invented single-point locations.

## Photos

No new photo met both subject-identification and reuse-permission requirements for UCC botanical garden or Prempeh II Jubilee Museum. Their placeholders remain. UCC research/department photographs do not provide suitable public-tourism reuse permission; Smithsonian's identified museum photograph requires prior permission. Fourteen catalogue records still use placeholders; the per-record audit lists them. Existing credited images are preserved. Loading an image is not proof of its historical accuracy or ownership.

## Account checks and dependencies

Synthetic browser tests passed for signup validation, implicit/legacy callbacks, expired/rejected tokens, sign-in/out, recovery, TOTP validation, profile errors, DOB validation and translated mobile navigation. They do not prove real email delivery or authenticated production sessions.

Read-only Supabase policy inspection confirmed own-user profile ownership AND restrictive `aal2` enforcement. No customer rows were read or modified. Security advisor reports leaked-password protection disabled; enabling that feature depends on the owner's plan/configuration. No security rule was weakened.

Real registration, delivered confirmation, login/logout, recovery and MFA require an owner-designated authorized test email/account, permission to create it if necessary, and access to its confirmation/recovery messages. No customer account or unsolicited email was used.

## Site-manager contact dependency

No owner-approved public email, WhatsApp/business contact URL or working application submission service is configured. The owner must supply the approved destination and confirm it may be published. No fabricated destination or discard-only form was added.

## Checks

`tools/check-site.cjs`: 131 pages and 4,297 local references, metadata and policy links.

`tools/catalogue-browser-check.cjs [base URL]`: every detail page, actual loaded images, correct town/region, no automatic trip selection, mobile/desktop overflow, all town card counts/default List/maps/popups/empty states, signed-out account screens, invalid/expired-link handling and language persistence. Configure `PUPPETEER_MODULE` and `CHROME_PATH` if required. Detailed run evidence is written to `output/` and is not a substitute for verified operational information.

Production acceptance remains a separate post-deployment check. Payments, booking submission and transport arrangements are unchanged.
