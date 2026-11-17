# QA record

## Automated unit checks

- `npm test`: 12 tests passed.
- `npm run check`: all three application JavaScript files passed syntax checks.

Tests cover deterministic and unique fixtures, summary arithmetic, empty/zero-death handling, map-group reconciliation, coaching evidence limits, budget personalization, copied synthetic provider records, and explicit failure of unconfigured providers.

## Supported-browser checks completed

A running staging copy was opened through the supported browser preview. Verified:

- All five routes: Overview, Match history, Coach report, Training plan, About & data.
- Selecting Border produces six synthetic match records.
- Searching for a nonexistent match produces the empty state.
- Reset filters restores all 30 records.
- A match detail dialog opens and closes with Escape.
- Choosing Support changes the coaching-role recommendation.
- Checking a training task persists across page reload.
- Reset checklist clears the checked state.

Actual full-page screenshots were captured in `docs/screenshots/`:

- `overview.jpg`
- `matches.jpg`
- `coach-report.jpg`
- `training.jpg`
- `about.jpg`

## Not verified in the browser

- Mobile viewport layout and horizontal-overflow behavior.
- CSV/report download completion and downloaded file contents.
- Mode filtering and practice-budget changes through browser controls.
- Exhaustive keyboard/screen-reader accessibility, browser compatibility, and console-error inspection.

The inspected browser-log sample contained extension errors; no exhaustive clean-console claim is made. Responsive CSS and export implementations exist, but their presence is not a completed end-to-end test.

## Earlier environment restrictions

A shell-launched Chromium attempt failed with `socket() failed: Operation not permitted`. Direct CUA access to localhost also returned `ERR_CONNECTION_REFUSED`. These attempts were not treated as passing tests. The subsequent supported preview enabled the checks listed above. The standalone Playwright flow in `tests/browser.cjs` was prepared but not completed here.

## Reproduce the broader browser flow

On a compatible development machine, install Playwright as a development-only tool (`npm install --no-save playwright`), install its Chromium browser (`npx playwright install chromium`), start the app on port 4173, then run `node tests/browser.cjs` from the project root. Set `CHROMIUM_PATH` only if using an existing Chromium executable. The script captures PNG screenshots to `docs/screenshots/`; the committed README captures are the JPEGs listed above.

## Icon rendering regression fix

All decorative Unicode icon characters were replaced with inline SVG geometry, including the main brand mark, navigation, metric icons, buttons/links, and dialog close control. Local Arial/Helvetica/sans-serif fallbacks replace references to unavailable display fonts. No external font downloads are required. Three source regression tests verify the icon character exclusion, SVG logo, and local font stack.

All five JPEG screenshots were regenerated from the running preview after this fix and visually inspected. The brand mark, sidebar symbols, metric icons, and action arrows now render as vector shapes without missing-glyph boxes. The updated captures also show functioning filtered match history and a checked training task. The earlier unverified browser areas listed above remain unverified.

## Siege visual redesign

Added a blue/orange match score HUD, original objective schematic, concrete map and operator presentation, attack/defense labels for operators, official roster links, and a dark, hard-edged post-match review visual system. Synthetic-data status and source/asset disclaimers remain explicit. No third-party game imagery is bundled. Unit regression checks cover operator names and schematic/class-symbol disclaimers. Fresh browser captures are pending this design pass.
