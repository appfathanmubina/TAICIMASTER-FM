# TAICIMASTER FM — Inventaris RPC Frontend (Tahap Audit)

Sumber: `TAICIMASTER_FM_STAGE11_28_6_GLOBAL_SEARCH_AND_FLOATING_BUTTON_FIX.zip`, khususnya `JS_App.html`. Dokumen ini inventaris awal, bukan allowlist final. Nama fungsi yang terlihat di UI **tidak boleh langsung diizinkan** sebelum implementasi backend-nya ditinjau.

## RPC autentikasi dan sesi
- `authenticateUser(emailOrUsername, password, rememberMe)`
- `restoreRememberedSession(rememberToken)`
- `logoutUser(token)`
- `revokeRememberToken(token)`
- `getSystemConfig()`
- `changeOwnPassword(userId, oldPassword, newPassword, token)`

Catatan: login dan pemulihan sesi harus memiliki bentuk respons yang konsisten. Jangan simpan password di localStorage. Remember token hanya boleh dipakai sesuai TTL dan mekanisme pencabutan yang sudah ada. `getSystemConfig()` perlu diperiksa agar tidak mengirim konfigurasi rahasia.

## RPC data awal/dashboard yang terdeteksi
- `getDashboardStats(role, aksesKelas, ..., ... , token)`
- `getDashboardTodayInfo(role, aksesKelas, token)`
- `getDashboardAnalytics(token, 6)`
- `getSantriList(role, aksesKelas, token)`
- `getPrestasiList(token)`
- `getPelanggaranList(token)`
- `getPerizinanList(role, aksesKelas, token)`
- `getKesehatanList(role, aksesKelas, token)`
- `getRiwayatCatatanWaliKelas(aksesKelas, token)`
- `getRekapClassList(role, aksesKelas, token)`
- `getRekapPerAnak(role, aksesKelas, 'ALL', token)`
- `getRekapPerKelas(role, aksesKelas, token)`
- `getBiodataCompletenessWaliKelas(token)`
- `getWaliKelasClassSummary(aksesKelas, token)`
- `getUserList(token)` — superadmin
- `getAuditLog(token, filters)` — superadmin
- `getPendingPrestasiList(token)`

## RPC operasi tulis yang terdeteksi dalam berkas frontend
- Prestasi: `simpanPrestasi`, `updatePrestasi`, `deletePrestasi`, `updatePrestasiApprovalStatus`
- Pelanggaran: `simpanPelanggaran`, `updatePelanggaran`, `deletePelanggaran`
- Perizinan: `simpanPerizinan`, `updatePerizinan`, `deletePerizinan`, `updateStatusPerizinan`, `bulkMarkPerizinanReturned`
- Kesehatan: `simpanKesehatan`, `updateKesehatan`, `deleteKesehatan`, `bulkMarkKesehatanRecovered`
- Biodata: `getBiodataSantri`, `simpanBiodataSantri`
- Catatan wali: `simpanCatatanWaliKelas`, `updateCatatanWaliKelas`, `deleteCatatanWaliKelas`

## RPC admin/laporan/backup yang terdeteksi
- `getStage7Status`, `updateFeatureToggle`
- `getBackupSettings`, `setBackupRetention`, `listBackups`, `createManualBackup`, `verifyBackup`, `restoreBackup`
- `runSystemHealthCheck`
- `exportRekapCsv`, `generateRekapPdf`
- `getRekapPerAnak`, `getRekapPerKelas`

## Keputusan keamanan sementara
1. **Belum ada allowlist produksi yang diaktifkan.** Inventaris ini perlu dicocokkan dengan definisi backend, argumen token, `requireCapability_`, `requireSessionResult_`, pemeriksaan akses baris santri, dan validasi input.
2. `restoreBackup`, perubahan konfigurasi, pengaturan fitur, ekspor, serta operasi bulk diklasifikasikan sensitif dan tidak boleh dimasukkan ke allowlist sampai otorisasi server-side diverifikasi.
3. Hindari pemanggilan backend menggunakan nama fungsi bebas dari pesan browser. `taiciPwaBridgeCall` harus memeriksa nama fungsi terhadap objek allowlist eksplisit dan menolak semua nama lain.
4. Argumen role/nama kelas dari browser tidak boleh dipercaya sebagai otorisasi. Backend harus mengambil role dan scope dari sesi server yang valid.
5. Pencarian global belum ditemukan sebagai satu endpoint yang jelas dari daftar awal. Audit lanjutan harus menelusuri implementasi pencarian di UI dan memastikan hasilnya difilter berdasarkan capability dan scope kelas.
6. Audit CRUD harus menguji create/update/delete, duplikasi submit, kegagalan jaringan, token kedaluwarsa, akses lintas kelas, unggah berkas, dan audit trail.

## Status
- [x] Pemetaan awal fungsi frontend dari kode sumber
- [ ] Peninjauan implementasi server-side untuk setiap RPC
- [ ] Pemetaan nama fungsi dinamis yang tersisa
- [ ] Implementasi allowlist final pada backend Apps Script
- [ ] Migrasi `Index.html` dan penggantian seluruh `google.script.run` dengan klien bridge
- [ ] Uji regresi role/session/global search/floating actions/CRUD
- [ ] Deployment uji dan persetujuan cutover
