# Arsitektur Stage 11.27

Browser / PWA
    |
    v
Frontend TAICIMASTER FM (HTTPS / domain sendiri)
    |
    v
api-proxy.php (same-origin)
    |
    v
Apps Script Web App /exec
    |
    v
ProductionApi.gs allowlist
    |
    v
Existing Auth/Security/CRUD modules
    |
    v
Google Spreadsheet + Drive

Prinsip: UI dipisahkan dari backend tanpa menulis ulang modul bisnis.
