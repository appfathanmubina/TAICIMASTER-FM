# Stage 11.27-A — Panduan GitHub Production Shell

## 1. Repository
Buat repository `TAICIMASTER-FM`. Untuk source development, gunakan private repository jika memungkinkan.

## 2. GitHub Pages
Publikasikan isi `frontend/` melalui GitHub Pages. Pastikan HTTPS aktif.

> GitHub Pages tidak menjalankan PHP.

## 3. API Proxy
Host `backend/api-proxy.php` pada hosting HTTPS yang mendukung PHP + cURL.

Isi `GAS_WEB_APP_URL` di server proxy dengan deployment Apps Script `/exec`. Jangan menaruh credential di frontend atau repository.

## 4. Apps Script API Dispatcher
Tambahkan `ProductionApi.gs` sebagai deployment backend terpisah. Allowlist pada file tersebut membatasi fungsi yang boleh dipanggil dari production shell; fungsi bisnis tetap melakukan autentikasi/otorisasi sendiri.

## 5. URL proxy
Jika proxy berada pada origin yang sama dengan frontend, `frontend/config.js` dapat menggunakan `./api-proxy.php`.

Jika proxy berada pada origin berbeda, set `API_PROXY_URL` ke URL HTTPS proxy dan konfigurasi CORS secara spesifik. Hindari `*` untuk aplikasi administrasi.

## 6. Custom domain
Setelah Gate 1–4 lulus, hubungkan custom domain HTTPS, misalnya `taicimaster.example.com`.

## 7. Rollback
11.26 tetap menjadi fallback. Jangan menghapus deployment lama sampai seluruh pengujian production shell lulus.
