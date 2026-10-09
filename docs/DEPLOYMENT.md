# Deployment PWA TAICIMASTER FM

## 1. GitHub Pages
Aktifkan GitHub Pages untuk branch utama setelah perubahan dari branch kerja ditinjau dan digabungkan, dengan folder sumber `/frontend`. Workflow `.github/workflows/pages.yml` menyiapkan deployment folder tersebut saat perubahan masuk ke `main`. HTTPS harus aktif. GitHub Pages tidak menjalankan PHP.

## 2. Konfigurasi Web App
URL deployment yang diberikan pemilik proyek saat ini telah diisikan pada `frontend/config.js`:

`https://script.google.com/macros/s/AKfycbwpdO_qeEQaR3c-Idp4eZfTQL4SKLTx0NIQKDxSwDmYUtn8xYwy3MaecF0gujji8iKHYQ/exec`

URL `/exec` menjalankan versi deployment Apps Script yang dipublikasikan; perubahan source Apps Script harus dipublikasikan melalui deployment yang sesuai. Lihat [dokumentasi resmi Web Apps Apps Script](https://developers.google.com/apps-script/guides/web).

## 3. Model integrasi tahap pertama
Shell saat ini berfungsi sebagai pintu masuk PWA dan meneruskan pengguna ke Web App Apps Script melalui navigasi tingkat atas. Model ini sengaja tidak membungkus aplikasi dalam iframe. Navigasi lintas-origin dapat membuat pengguna meninggalkan konteks tampilan standalone shell; hal ini wajib diuji di Android dan iOS.

## 4. Logo
File resmi `frontend/icons/logo_taicimaster.png` tersedia pada branch kerja dan sekarang dipakai sebagai logo pada halaman shell PWA. Ikon SVG tetap dipertahankan untuk ikon instalasi lintas platform; validasi tampilan dan instalasi nyata tetap perlu dilakukan di perangkat Android dan iOS.

## 5. Batas offline dan cache
Service worker hanya men-cache aset shell statis same-origin. Fungsi aplikasi, login, API, dan data tetap memerlukan koneksi internet. Jangan menambahkan strategi cache untuk respons backend atau data pengguna tanpa audit keamanan tersendiri.

## 6. Checklist sebelum rilis
- [ ] URL `/exec` aktif dan menggunakan deployment yang benar.
- [ ] GitHub Pages aktif dengan HTTPS.
- [ ] Manifest dan ikon terambil dengan status HTTP sukses.
- [ ] Service worker terdaftar tanpa error.
- [ ] Instalasi dan pembukaan ulang diuji pada Android dan iOS.
- [ ] Login, logout, pemulihan sesi, role, permission diuji.
- [ ] Pencarian global dan tombol mengambang diuji.
- [ ] Modul utama diuji sesuai role.
- [ ] Cache tidak menyimpan data pengguna atau respons API.
- [ ] Prosedur rollback tersedia.
