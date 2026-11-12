# Project Link — Kaizen / Continuous Improvement Proposal

## 📌 Informasi Inisiatif
- **Nama Inisiatif**: Project Link – Centralized Company Resource Hub
- **Kategori**: Efisiensi Proses Kerja / Eliminasi Pemborosan Waktu (*Waste Elimination*)
- **Tipe Solusi**: Lightweight Web Portal (100% Static HTML + Tailwind CSS + Vanilla JS)

---

## 1. Latar Belakang & Masalah (*Problem Statement*)

1. **Fragmentasi Informasi Kerja**:
   Tautan sistem penting (dashboard analitik, Wiki/dokumentasi, Jira board, staging environment, ERP, dan portal klien) tersebar di berbagai tempat: riwayat chat, email, bookmark pribadi per browser, atau dokumen terpisah.
2. **Pemborosan Waktu (*Wasted Time / Search Friction*)**:
   Personil sering menghabiskan 5–15 menit hanya untuk mencari, memastikan, atau menanyakan tautan tools tertentu kepada rekan kerja.
3. **Kendala Onboarding Anggota Baru**:
   Karyawan baru membutuhkan waktu adaptasi lebih lama hanya untuk mengumpulkan dan memetakan akses sistem masing-masing perusahaan/klien.
4. **Resiko Salah Lingkungan (*Wrong Environment Risk*)**:
   Tanpa direktori terpusat, personil berisiko salah mengakses URL (misal: mengakses environment production padahal ingin ke staging).

---

## 2. Solusi & Inovasi (*Proposed Solution*)

Membangun web portal **Static Resource Directory** yang mengelompokkan seluruh tautan kerja berdasarkan entitas/perusahaan (*grouped by company*):

- **Single Source of Truth**: Satu halaman terpusat yang memetakan seluruh sistem penting perusahaan.
- **Pencarian Real-Time**: Fitur pencarian instan (debounced 150ms) yang langsung memfilter berdasarkan nama perusahaan maupun nama tautan secara simultan.
- **Arsitektur 100% Static & Lightweight**:
  - Dibangun dengan HTML semantic, compiled Tailwind CSS, dan Vanilla JavaScript.
  - Bebas ketergantungan framework berat atau database rumit.
  - Data tersimpan terpisah dan terstruktur pada file data (`data.js` / `links.json`), memudahkan penambahan tautan baru tanpa perlu keahlian coding.
- **Zero Infrastructure Cost**:
  - Dapat diakses langsung secara offline/lokal (`file://`), diletakkan di shared folder kantor, atau di-host di server VPS web root manapun tanpa instalasi runtime khusus.

---

## 3. Matriks Perbandingan (Sebelum vs Sesudah Kaizen)

| Parameter | Sebelum Kaizen (Kondisi Saat Ini) | Sesudah Kaizen (Hasil Perbaikan) |
|---|---|---|
| **Penyimpanan Tautan** | Tersebar di chat, bookmark lokal, catatan terpisah | Terpusat dalam satu dashboard visual terstandar |
| **Kecepatan Akses** | 2 – 10 menit (mencari/menanyakan ke rekan) | 2 – 5 detik (melalui filter pencarian instan) |
| **Ketergantungan Tim** | Tinggi (sering bertanya link ke lead/rekan) | Mandiri (cukup buka portal Project Link) |
| **Onboarding Tim Baru** | Lambat dan butuh pendampingan ekstra | Cepat; 1 link portal mencakup semua sistem |
| **Biaya Pemeliharaan** | Berpotensi butuh tools SaaS berbayar | **Rp 0 / Zero Cost**, bebas biaya langganan |
| **Beban Infrastruktur** | Butuh server backend / database aktif | Ringan (file statis murni < 50 KB total bundle) |

---

## 4. Nilai Tambah & Dampak (*Key Value & Impact*)

1. **Efisiensi Waktu & Produktivitas**: Mengeliminasi pemborosan waktu mikro (*micro-waste*) yang terjadi berulang kali setiap hari di lingkungan kerja.
2. **Standardisasi Akses**: Menjaga integritas URL kerja resmi yang digunakan bersama oleh seluruh anggota tim.
3. **Kemudahan Skalabilitas**: Penambahan perusahaan atau klien baru cukup dilakukan dengan menambahkan satu blok JSON/JS sederhana.
4. **User Experience Bersih & Profesional**: Tampilan modern dengan kontras warna yang nyaman untuk penggunaan harian (*non-distractive, non-AI-slop design*).

---

## 5. Ringkasan Eksekutif (*Elevator Pitch*)

> *"Project Link adalah inisiatif Kaizen untuk mengeliminasi pemborosan waktu pencarian link kerja antar-perusahaan melalui portal direktori statis yang ringan, cepat, dan terpusat. Solusi ini menghadirkan efisiensi kerja harian tim, mempercepat adaptasi anggota baru, dan tidak membebani anggaran biaya maupun infrastruktur server."*

