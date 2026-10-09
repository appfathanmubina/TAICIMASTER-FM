# Baseline dan batas perubahan

## Sumber acuan
- ZIP pemilik proyek: `TAICIMASTER_FM_STAGE11_28_6_GLOBAL_SEARCH_AND_FLOATING_BUTTON_FIX.zip`.
- Baseline fitur aplikasi: Apps Script `Index.html`, `JS_App.html`, `Code.gs`, file `.gs`, `appsscript.json`, dan README Stage yang berada di ZIP tersebut.
- Branch kerja PWA: `pwa-rebuild-stage11-28-6`.

## Prinsip
1. File bisnis Apps Script tidak diganti hanya untuk membuat shell PWA.
2. Pencarian global, tombol mengambang, autentikasi, pemulihan sesi, role/permission, perizinan, dan kesehatan menjadi regression-test wajib.
3. Cache Storage hanya menyimpan shell statis same-origin. Tidak menyimpan respons API, halaman autentikasi, sesi, atau data santri.
4. Jangan menyimpan credential, token, atau password di repository.
5. Tidak ada perubahan produksi sampai pengujian fungsi dan konfigurasi deployment dinyatakan lulus.

## Batas yang belum terverifikasi
ZIP sumber tidak memberikan URL deployment Web App Apps Script yang dapat dipastikan masih aktif. Karena itu `frontend/config.js` sengaja menggunakan `APP_URL: ""` sampai URL `/exec` yang benar dikonfirmasi.
