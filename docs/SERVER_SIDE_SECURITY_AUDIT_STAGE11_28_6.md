# Audit Server-Side Awal — TAICIMASTER FM Stage 11.28.6

Sumber yang diperiksa: ZIP pengguna `TAICIMASTER_FM_STAGE11_28_6_GLOBAL_SEARCH_AND_FLOATING_BUTTON_FIX.zip`.

## Bukti yang terlihat pada implementasi backend

- `Auth.gs`: `authenticateUser(emailOrUsername, password, rememberMe)`, `changeOwnPassword(userId, oldPassword, newPassword, token)`.
- `Security.gs`: `restoreRememberedSession(rememberToken)`, `revokeRememberToken(rememberToken)`, `logoutUser(token)`.
- `Santri.gs`: `getSantriList(role, aksesKelas, token)` memanggil `requireCapability_(token, 'santri.view')` dan mengambil role/scope kelas dari sesi server untuk membatasi data wali kelas.
- `Kesehatan.gs`: `simpanKesehatan(data, token)` memeriksa `requireCapability_(token, 'kesehatan.create')`, validasi wajib, santri, tanggal, duplicate guard, lock, dan audit log.
- `Pelanggaran.gs`: `simpanPelanggaran(formData, fileObj, token)` memeriksa `requireCapability_(token, 'pelanggaran.create')`, akses santri, validasi tanggal, duplicate guard, serta mencatat audit log.
- `Perizinan.gs`: `simpanPerizinan(data, token)` memeriksa `requireCapability_(token, 'perizinan.create')`, validasi tanggal, batas bulanan, duplicate guard, lock, dan audit log.
- `WaliKelas.gs`: `simpanCatatanWaliKelas(data, token)` memeriksa capability dan `assertSantriAccess_` sebelum menulis.
- `Prestasi.gs`: operasi create/update/delete dan approval memiliki implementasi terpisah; semua perlu dicocokkan dengan capability yang tepat sebelum bridge diizinkan.
- `BackupRecovery.gs`: `createManualBackup(token)` dan `restoreBackup(token, fileId, confirmationCode)` merupakan operasi sensitif yang memerlukan pengujian role dan konfirmasi.

## Implikasi migrasi

1. Beberapa endpoint sudah memiliki pemeriksaan capability server-side, tetapi **itu bukan bukti bahwa seluruh RPC aman**. Update/delete, dashboard, ekspor, konfigurasi, daftar user, audit log, dan backup harus diperiksa satu per satu.
2. Jangan menghapus parameter token dari panggilan backend saat migrasi. Untuk setiap endpoint, cocokkan posisi argumen token dan bentuk hasilnya.
3. Bridge tidak boleh mengubah role atau akses kelas menjadi klaim yang dipercaya. Sumber kebenaran adalah sesi server.
4. Untuk file upload, bridge harus membatasi ukuran payload, memvalidasi MIME/type dan otorisasi server-side; data base64 tidak boleh dikirim tanpa batas.
5. Belum aman membuat allowlist final hanya dari nama fungsi yang ditemukan di UI. Nama fungsi dinamis harus diselesaikan dan seluruh implementasi server-side ditinjau.
6. `authenticateUser` dan `restoreRememberedSession` membutuhkan perlakuan khusus karena alur awal tidak sama dengan endpoint yang sudah memiliki sesi.

## Yang belum dapat dinyatakan lulus

- Belum ada endpoint bridge di backend Apps Script yang dipasang dan di-deploy.
- Belum ada antarmuka statis hasil konversi dari `Index.html` dan `JS_App.html`.
- Belum ada uji integrasi browser terhadap Apps Script deployment uji.
- Login/session/role/global search/floating actions/CRUD belum diuji end-to-end melalui bridge.

## Keputusan

Jangan aktifkan bridge di produksi dan jangan mengubah launcher PWA untuk mengalihkan ke bridge sampai semua hal di atas diselesaikan. Pertahankan deployment Apps Script yang ada sebagai fallback.
