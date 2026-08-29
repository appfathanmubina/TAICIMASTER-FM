# Stage 11.27-A — Test Plan

### Gate 1 — Shell
- HTTPS aktif
- manifest terbaca
- service worker terdaftar
- logo tampil
- standalone metadata valid

### Gate 2 — API
- POST proxy mengembalikan JSON
- function di luar allowlist ditolak
- error backend tidak menjadi HTML mentah

### Gate 3 — Login
- authenticateUser
- restoreRememberedSession
- logoutUser
- Remember Me 30 hari

### Gate 4 — Role
Uji Superadmin, Supervisor, Admin, dan Wali Kelas.

### Setelah Gate 4
Migrasikan dan uji bertahap:
Prestasi → Pelanggaran → Perizinan → Kesehatan → Biodata → Catatan Wali → Rekapan → PDF/CSV → Audit Trail → Initial Sync.
