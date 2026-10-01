# Cape Coast Compass

Static multi-page tourism website with 22 Cape Coast entries and 10 nearby destinations.

## Build and preview

Run `node tools/build.cjs` to check links and generate `dist/`. Run `node tools/serve.cjs` for http://127.0.0.1:4173.

## Publishing

Repository: https://github.com/brotherdavid652-a11y/Cape-Coast-Compass

Cloudflare Pages project: `cape-coast-compass`. Build: `node tools/build.cjs`. Output: `dist`. Production branch: `main`.

Initial Cloudflare publication uses Direct Upload because the GitHub integration returned an installation error. Git pushes do not deploy automatically until the integration is repaired or a deployment workflow is configured.

## Photos and service preview

Galleries contain supplied photos refined with AI color/brightness adjustments, responsive WebP files and 7680-pixel-long-edge JPEG downloads. Downloads are upscaled, not native recovered 8K detail. Prompts and edit notes accompany the photos. Original and editing-master files remain locally and are excluded from Git and publication. Attribution for online sources is recorded in `assets/photos/credits.json`. Missing slots remain labelled.

Bookings, notifications, prices, availability and payments are not connected. Proposed trips stay in the browser session. Location is requested only after a click. Nearby destinations are excluded from the Cape Coast city planner. Access and partnerships require confirmation.
