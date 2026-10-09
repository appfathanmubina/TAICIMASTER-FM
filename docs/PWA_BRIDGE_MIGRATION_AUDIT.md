# TAICIMASTER FM — Audit Migrasi PWA Bridge (Stage 11.28.6)

## Status
**MIGRATION BRANCH ONLY — NOT DEPLOYED / NOT ACTIVE.** Production branch `main` and the existing Apps Script URL are unchanged. Keep using the current deployment until every gate below passes.

## Baseline reviewed
Source archive: `TAICIMASTER_FM_STAGE11_28_6_GLOBAL_SEARCH_AND_FLOATING_BUTTON_FIX.zip`.
Contains `Index.html`, `JS_App.html`, `Code.gs`, `Auth.gs`, `Security.gs`, `RolePermission.gs`, and feature modules.

## Findings
- `Code.gs` has the existing `doGet(e)` entry point and currently renders the Apps Script HTML application.
- The current PWA `frontend/launch.js` redirects the top-level window to the Apps Script `/exec` URL. This is why the Apps Script notice remains in the user journey.
- The frontend contains many direct `google.script.run` calls, including dynamically selected method names in admin/backup modules. A broad generic bridge dispatcher would be unsafe.
- The Apps Script UI is not yet a self-contained GitHub Pages app: template includes and server-rendered HTML need to be identified and converted before `Index.html` can be hosted statically.
- The existing UI and backend are preserved; this branch does not redirect users or change the production deployment.

## Security requirements for backend bridge
1. Exact allowlisted origin only: `https://appfathanmubina.github.io`; no wildcard origin.
2. Server-side API allowlist only. Do not dispatch arbitrary global function names.
3. Every protected backend function must continue validating the session token and role/permission. Client-side role checks are not authorization.
4. Do not return internal helpers, credentials, configuration secrets, raw exception stacks, or arbitrary Drive/Spreadsheet objects.
5. Do not cache session tokens, API responses, or personal data in the service worker.
6. Preserve logout/session revocation and existing token expiration semantics.
7. Bridge calls must use request IDs, timeouts, bounded payloads, and explicit error responses.

## Required audit gates before switching
- [ ] Build a complete inventory of every Apps Script RPC call in all UI scripts, including dynamically selected functions.
- [ ] Map each call to an existing declared server function and classify read/write/admin/destructive.
- [ ] Confirm login, remembered session, session expiry, logout, and password change.
- [ ] Test every role: Superadmin, Supervisor, Admin Pelanggaran/Perizinan, Admin Prestasi, Wali Kelas, and other roles present in the current source.
- [ ] Test global search results, permission filtering, no-result state, and mobile interactions.
- [ ] Test floating action buttons for each role/module and confirm they do not overlay navigation or forms.
- [ ] Test CRUD create/read/update/delete and file upload for Prestasi, Pelanggaran, Perizinan, Kesehatan, Biodata, and Catatan Wali Kelas.
- [ ] Test approvals, bulk status changes, reports/export, and backup/restore under the relevant authorized role.
- [ ] Run static syntax checks and Apps Script deployment smoke tests.
- [ ] Validate the new deployment using a test account and test spreadsheet before any production switch.
- [ ] Keep the old Apps Script deployment URL and GitHub Pages shell available as rollback.

## Next implementation boundary
This branch intentionally includes only the bridge transport shell. It cannot service requests until the backend functions `getTaiciPwaBridgeConfig()` and `taiciPwaBridgeCall()` are reviewed, added to Apps Script, and deployed. Do not enable a frontend redirect to the bridge until the API allowlist and static UI conversion are complete.
