# Deployment PWA TAICIMASTER FM

## 1. GitHub Pages
Aktifkan GitHub Pages untuk branch kerja setelah shell diuji, dengan folder sumber `/frontend` jika pengaturan Pages mendukung pemilihan folder. HTTPS harus aktif. Jangan menganggap file PHP berjalan di GitHub Pages.

## 2. Konfigurasi Web App
Edit `frontend/config.js` dan isi `APP_URL` dengan URL deployment Apps Script aktif, berakhiran `/exec`. Jangan gunakan URL editor atau URL `/dev` sebagai URL produksi. Konfigurasi URL perlu diuji karena deployment aktif tidak disertakan di ZIP.

## 3. Model integrasi tahap pertama
Shell saat ini berfungsi sebagai pintu masuk PWA dan meneruskan pengguna ke Web App Apps Script melalui navigasi tingkat atas. Model ini sengaja tidak membungkus aplikasi dalam iframe, karena kebijakan framing Google Apps Script harus dihormati dan belum diaudit. Navigasi lintas-origin dapat membuat pengguna meninggalkan konteks tampilan standalone shell; hal ini harus diuji di Android dan iOS.

## 4. Batas offline dan cache
Service worker hanya men-cache aset shell statis same-origin. Fungsi aplikasi, login, API, dan data tetap memerlukan koneksi internet. Jangan menambahkan strategi cache untuk respons backend atau data pengguna tanpa audit keamanan tersendiri.

## 5. Checklist sebelum rilis
- [ ] URL `/exec` aktif dan menggunakan deployment yang benar.
- [ ] GitHub Pages aktif dengan HTTPS.
- [ ] Manifest dan ikon terambil dengan status HTTP sukses.
- [ ] Service worker terdaftar tanpa error.
- [ ] Instalasi dan pembukaan ulang diuji pada Android dan iOS.
- [ ] Login, logout, pemulihan sesi, role, permission diuji.
- [ ] Pencarian global dan tombol mengambang diuji.
- [ ] CRUD perizinan, kesehatan, prestasi, pelanggaran, biodata, dan laporan diuji sesuai role.
- [ ] Cache tidak menyimpan data pengguna atau respons API.
- [ ] Prosedur rollback tersedia.
