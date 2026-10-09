# Migration Candidate QA — TAICIMASTER FM Stage 11.28.6

A migration candidate bundle has been assembled from the supplied Stage 11.28.6 ZIP. It is not a production deployment.

## Static checks completed
- Converted `Index.html` and `JS_App.html` into one static `frontend/app.html`, replacing the Apps Script include template.
- Replaced all literal `google.script.run` references in the converted app with `TaiciBridge.run` (0 literal occurrences remain in the static app).
- JavaScript syntax check: 10 inline script blocks passed.
- Bridge client syntax check: passed.
- Apps Script source syntax parse: 25 source/patch files parsed using temporary `.js` copies; 0 syntax failures.
- Added an explicit allowlist dispatcher and a `?bridge=1` entry branch in the migration patch. The regular Apps Script entry point remains the fallback.

## Known blocker discovered
`updateStatusPerizinan` is called by the frontend but is not defined in the supplied backend source archive. It is intentionally excluded from the bridge allowlist. This existing frontend/backend mismatch must be resolved before role-based CRUD can be declared complete.

## Not yet verified
- No deployment to the Apps Script project was performed.
- No browser end-to-end run against a test spreadsheet was possible from the available repository connection.
- Login, session expiry, remember-me, role matrix, global search, floating buttons, and CRUD are **not marked PASS**.
- The backend bridge patch must be applied as a new file/deployment in Apps Script. Do not replace `Code.gs` wholesale with the patch: it is the original file with a small `doGet` branch inserted.

## Cutover rule
Do not change the existing launcher or merge this candidate into `main` until the missing API is reconciled and end-to-end tests pass in a test deployment. Keep the existing production deployment and `main` as rollback.
