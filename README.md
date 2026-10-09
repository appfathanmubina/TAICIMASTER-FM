# TAICIMASTER FM — PWA Rebuild

Repository ini sedang disusun ulang sebagai fondasi PWA untuk sumber aplikasi Apps Script **Stage 11.28.6** yang diberikan pemilik proyek.

## Prinsip pemulihan
- Sumber bisnis Apps Script tidak diganti oleh shell PWA.
- Fitur yang harus tetap dipertahankan mencakup login/sesi, role dan izin, pencarian global, tombol mengambang, serta modul perizinan dan kesehatan.
- Cache PWA hanya untuk shell statis. Respons API, sesi, dan data pengguna tidak disimpan ke Cache Storage.
- Perubahan PWA dikerjakan di branch `pwa-rebuild-stage11-28-6` sebelum dipertimbangkan untuk `main`.

## Struktur
- `frontend/` — shell instalasi PWA, manifest, service worker, konfigurasi URL aplikasi, dan ikon.
- `docs/` — baseline, konfigurasi deployment, dan checklist pengujian.

## Status
Fondasi awal PWA sedang disiapkan. URL deployment Web App Apps Script dan target hosting/proxy belum tercantum di ZIP sumber, sehingga konfigurasi integrasi harus dilengkapi dan diuji sebelum dinyatakan siap produksi.

Lihat [dokumen deployment](docs/DEPLOYMENT.md) dan [catatan baseline](docs/BASELINE.md).
