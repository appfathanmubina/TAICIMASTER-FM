# TAICIMASTER FM — Stage 11.27-A

GitHub Production Shell Foundation.

Tahap ini memisahkan frontend TAICIMASTER FM dari Google Apps Script HtmlService tanpa mengganti backend bisnis yang sudah stabil.

## Struktur
- `frontend/` — web/PWA shell untuk GitHub Pages atau custom domain.
- `backend/` — API bridge/proxy dan dispatcher Apps Script.
- `docs/` — arsitektur, deployment, dan test plan.

## Prinsip keamanan
- Jangan commit password, token, service-account key, atau credential.
- GitHub Pages hanya untuk file statis; PHP harus di-host pada server HTTPS yang mendukung PHP + cURL.
- Apps Script backend tetap menjadi otoritas autentikasi, session, role, permission, CRUD, dan database.
- Shell 11.27-A diuji berdampingan; jangan mengganti production sebelum Gate 1–4 lulus.
