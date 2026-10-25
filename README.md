# SiLapor - Sistem Pelaporan Kerusakan Fasilitas Kampus

**SiLapor** adalah website pelaporan kerusakan fasilitas kampus. Mahasiswa dapat melaporkan kerusakan (AC, proyektor, toilet, WiFi, dan lainnya) beserta foto bukti, lalu memantau status penanganannya. Admin sarana dan prasarana dapat memverifikasi laporan dan memperbarui statusnya.

Proyek ini dikerjakan oleh **Kelompok 9 - Divisi Web & UI/UX Developer** (Vinix Batch 5) sebagai:

- **Modul 7:** transformasi desain Figma menjadi prototipe web interaktif.
- **Modul 8:** perubahan data statis menjadi data dinamis (API), form dengan validasi, dan UX states.

## Tautan Penting

| Keterangan | Tautan |
|---|---|
| Live Web (Vercel) | https://pengaduan-mahasiswa-web.vercel.app/ |
| Repositori GitHub | https://github.com/robby5431/pengaduan-mahasiswa |
| Desain Figma (Modul 5) | https://www.figma.com/design/yDw5qop2pHOulbNWUyFsTs/Desain-Website-Pelaporan-Kerusakan-Fasilitas-Kampus?nodeid=105-1265&p=f&t=TvbqGSfhxNo5jyS6-0 |

## Daftar Isi

1. [Fitur](#fitur)
2. [Teknologi](#teknologi)
3. [Struktur Proyek](#struktur-proyek)
4. [Instruksi Menjalankan Secara Lokal](#instruksi-menjalankan-secara-lokal)
5. [Sumber Data dan Layanan Form (Modul 8)](#sumber-data-dan-layanan-form-modul-8)
6. [Panduan Mencoba untuk Mentor](#panduan-mencoba-untuk-mentor)
7. [UX States (Modul 8)](#ux-states-modul-8)
8. [Alur Git](#alur-git)
9. [Kontribusi Anggota Kelompok](#kontribusi-anggota-kelompok)
10. [Log Prompt AI](#log-prompt-ai)
11. [Catatan Perbaikan Manual](#catatan-perbaikan-manual)
12. [Keterbatasan](#keterbatasan)

## Fitur

**Mahasiswa**
- Registrasi dan login akun.
- Beranda dengan statistik laporan milik sendiri (Diproses, Ditolak, Selesai).
- Form pelaporan: kategori, tanggal, lokasi, deskripsi, dan unggah foto dengan pratinjau.
- Riwayat pelaporan dengan pencarian, filter status, dan detail laporan dalam modal.
- Profil: ubah nama, email, password, dan foto profil.

**Admin**
- Dasbor seluruh laporan dengan pencarian dan penomoran halaman.
- Detail laporan, ubah status (Diproses, Selesai, Ditolak), dan hapus laporan.

**Umum**
- Tampilan responsif: sidebar permanen di desktop dan menu hamburger (drawer) di mobile.
- Dialog konfirmasi logout dan notifikasi toast.

## Teknologi

| Komponen | Teknologi |
|---|---|
| Framework UI | React 18 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 3 |
| Ikon | lucide-react |
| Notifikasi | Sonner (toast) |
| Sumber data | MockAPI.io (REST API) |
| Deploy | Vercel |
| Version control | Git dan GitHub |

## Struktur Proyek

```
src/
├── App.jsx                     # State utama, autentikasi, routing berbasis tab
├── components/
│   ├── Sidebar.jsx
│   ├── UserReportDetailModal.jsx
│   ├── ReportSkeleton.jsx      # Modul 8: loading skeleton
│   ├── EmptyState.jsx          # Modul 8: tampilan hasil kosong
│   └── ErrorState.jsx          # Modul 8: tampilan gagal memuat
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── UserHome.jsx
│   ├── UserReportForm.jsx
│   ├── UserReportHistory.jsx
│   ├── UserProfile.jsx
│   ├── AdminHome.jsx
│   └── AdminReportDetail.jsx
├── services/
│   └── reportApi.js            # Modul 8: fungsi GET, POST, PUT, DELETE ke MockAPI
├── utils/
│   └── compressImage.js        # Modul 8: kompres foto sebelum dikirim
└── data/
    └── mockData.js             # Kategori laporan dan data pengguna bawaan
```

## Instruksi Menjalankan Secara Lokal

**Prasyarat:** Node.js (versi LTS) dan Git.

```bash
# 1. Clone repositori
git clone https://github.com/robby5431/pengaduan-mahasiswa.git
cd pengaduan-mahasiswa

# 2. Pasang dependensi
npm install

# 3. Salin contoh environment, lalu isi URL MockAPI
cp .env.example .env.local
```

Di Windows PowerShell, ganti perintah salin dengan `copy .env.example .env.local`.

Isi `.env.local`:

```
VITE_API_URL=https://ISI-URL-MOCKAPI-ANDA/api/v1
```

```bash
# 4. Jalankan server pengembangan
npm run dev
```

Buka alamat yang tampil di terminal (biasanya http://localhost:5173).

Perintah lain:

```bash
npm run build     # build produksi
npm run preview   # pratinjau hasil build
```

> File `.env.local` tidak ikut ter-upload ke GitHub. Gunakan `.env.example` sebagai acuan.

## Sumber Data dan Layanan Form (Modul 8)

### Sumber data: MockAPI.io

Data laporan tidak lagi ditulis langsung di kode, melainkan diambil dari REST API di [MockAPI.io](https://mockapi.io). Daftar laporan dirender dengan `.map()` dari data hasil `GET`, sehingga komponen kartu cukup ditulis satu kali.

Alasan memilih MockAPI: gratis, tanpa kode backend, mendukung operasi CRUD penuh, dan cocok untuk prototipe yang akan diuji pengguna di Modul 9.

**Resource:** `reports`

| Operasi | Method | Endpoint | Dipakai untuk |
|---|---|---|---|
| Read | GET | `/reports` | Memuat seluruh laporan saat aplikasi dibuka |
| Create | POST | `/reports` | Mahasiswa mengirim laporan baru |
| Update | PUT | `/reports/:id` | Admin mengubah status laporan |
| Delete | DELETE | `/reports/:id` | Admin menghapus laporan |

**Struktur data laporan**

| Field | Tipe | Keterangan |
|---|---|---|
| `id` | String | Dibuat otomatis oleh MockAPI |
| `ticketId` | String | Nomor tiket laporan |
| `title`, `category` | String | Judul dan kategori laporan |
| `date`, `formattedDate` | String | Tanggal kejadian |
| `location`, `description` | String | Lokasi dan deskripsi (sudah di-trim) |
| `image` | String | Foto bukti (sudah dikompres) |
| `status`, `adminStatus` | String | Status laporan |
| `userEmail` | String | Email pelapor, dipakai untuk memisahkan data per pengguna |
| `notes` | String | Catatan admin |
| `timeline` | Array | Riwayat perubahan status |

### Layanan form

Form pelaporan terhubung ke **MockAPI melalui `POST /reports`** (tanpa layanan email pihak ketiga seperti Formspree). Data yang berhasil dikirim langsung muncul di riwayat pelapor dan di dasbor admin.

Akun pengguna (registrasi, login, sesi) masih disimpan di `localStorage` peramban, karena cakupan Modul 8 berfokus pada data laporan.

### Validasi dan sanitasi form

- Kolom kosong atau hanya berisi spasi ditolak (`.trim()`).
- Lokasi minimal 3 karakter, deskripsi minimal 10 karakter.
- Tanggal tidak boleh di masa depan.
- Registrasi memeriksa format email dan panjang password.
- Pesan error tampil tepat di bawah kolom yang salah.
- Tombol kirim terkunci dan berubah menjadi "Mengirim laporan..." saat proses berlangsung, sehingga tidak bisa terkirim dua kali.

## Panduan Mencoba untuk Mentor

Data akun tersimpan di peramban, jadi buat akun baru di peramban yang dipakai.

### Sebagai Mahasiswa

1. Buka halaman **Daftar**, isi nama lengkap, email, dan password, lalu login.
2. **Beranda:** lihat statistik laporan milik akun tersebut.
3. **Form Pelaporan:**
   - Klik **Kirim laporan** dalam keadaan kosong. Pesan error muncul di bawah kolom.
   - Isi form dengan benar dan lampirkan foto. Tombol terkunci, toast sukses muncul, dan nomor tiket ditampilkan.
4. **Riwayat Pelaporan:**
   - Coba kolom pencarian dan tombol filter status (Semua, Diproses, Selesai, Ditolak).
   - Ketik kata acak (misalnya `zzzz`) untuk melihat empty state, lalu klik **Reset pencarian**.
   - Klik sebuah laporan untuk membuka detailnya dalam modal.
5. **Profil:** ubah nama, lalu keluar dan masuk kembali. Nama baru tetap tersimpan.

### Sebagai Admin

1. Daftar akun dengan email yang mengandung kata `admin` (contoh: `admin@kampus.ac.id`), lalu login.
2. **Dasbor Admin:** coba pencarian dan penomoran halaman.
3. Klik sebuah laporan, ubah status menjadi **Diproses**, **Selesai**, atau **Ditolak**, lalu lihat toast dan perubahan linimasa.
4. Coba tombol **Hapus** pada detail laporan.
5. Masuk kembali sebagai mahasiswa pemilik laporan dan pastikan statusnya ikut berubah.

### Mencoba tampilan responsif

Buka DevTools peramban (F12), aktifkan mode perangkat, lalu pilih lebar 375 px. Menu hamburger akan menggantikan sidebar.

## UX States (Modul 8)

| State | Cara melihatnya |
|---|---|
| **Loading (skeleton)** | Muat ulang halaman. Untuk memperlambat, DevTools, tab Network, pilih throttling *Slow 3G* |
| **Empty state** | Cari kata yang tidak ada di riwayat atau dasbor, lalu klik tombol Reset |
| **Error state** | DevTools, tab Network, pilih *Offline*, muat ulang halaman, lalu klik **Coba lagi** |
| **Toast** | Muncul saat login, kirim laporan, ubah status, simpan profil, hapus laporan, dan saat terjadi kegagalan |

## Alur Git

- **Modul 7:** pengembangan prototipe dan perbaikan bug dilakukan pada branch terpisah, lalu digabung melalui Pull Request.
- **Modul 8:** seluruh pekerjaan dikerjakan di branch `feat/dynamic-data`, di atas repositori Modul 7, kemudian di-merge ke `main` melalui Pull Request.
- File `.env` dan `.env.local` sudah masuk `.gitignore`. Folder `dist/` juga tidak lagi dilacak.

## Log Prompt AI

AI tool yang digunakan: **Claude (Anthropic)**, **Google (Gemini)** dan **Google (Antigravity)**

| No | Modul | Tujuan | Ringkasan Prompt | Hasil |
|---|---|---|---|---|
| 1 | 7 | Generasi antarmuka | [ISI: prompt utama yang dipakai untuk membuat UI dari desain Figma] | [ISI: hasil dan bagian yang direvisi] |
| 2 | 7 | Perbaikan bug | Meminta bantuan memperbaiki bug nama lengkap pengguna yang otomatis mengikuti nama dari email saat login | Ditemukan akar masalah di alur login dan diberi perubahan pada `LoginPage.jsx` dan `App.jsx` |
| 3 | 7 | Panduan Git | Meminta langkah commit dan push, termasuk penanganan error push dan pergantian akun GitHub | Langkah pembuatan branch, commit, push, dan pengaturan kredensial |
| 4 | 7 | Dokumentasi | Meminta rancangan isi laporan PRD berdasarkan Brief dan Rubrik Modul 7 | Dokumen PRD dalam bentuk PDF |
| 5 | 8 | Perencanaan | Meminta langkah demi langkah pengerjaan Modul 8 berdasarkan brief, dengan memetakan kondisi SiLapor terhadap rubrik | Rencana kerja: MockAPI, lapisan API, filter, validasi, UX states, deploy |
| 6 | 8 | Lapisan API | Meminta perubahan `App.jsx` agar laporan diambil dan disimpan melalui API, bukan `localStorage` | `reportApi.js` dan perubahan state, `handleAddReport`, `handleUpdateStatus` |
| 7 | 8 | Validasi form | Meminta penjelasan penggantian `handleSubmit` agar async, memakai `trim()`, dan menampilkan error per kolom | `validate()` dan `handleSubmit` baru di `UserReportForm.jsx` |
| 8 | 8 | UX states | [ISI: prompt untuk skeleton, empty state, error state, dan toast] | [ISI: hasil] |

**Pola prompt yang dipakai saat menambah fitur di atas desain Modul 7:** awali dengan instruksi "Pertahankan seluruh class styling yang sudah ada", kerjakan bertahap, dan lakukan commit sebelum lanjut ke bagian berikutnya.

## Catatan Perbaikan Manual

Bagian ini mencatat masalah yang ditemukan dan diperbaiki secara manual setelah menggunakan bantuan AI.

### Modul 7

**Bug: nama lengkap pengguna mengikuti nama dari email saat login**

| Aspek | Penjelasan |
|---|---|
| Gejala | Setelah login, nama yang tampil berasal dari bagian depan email (misalnya `SA123`), bukan nama lengkap saat registrasi |
| Akar masalah | `LoginPage` hanya mengirim email ke `App.jsx`, lalu `handleLogin` membentuk nama dari `email.split('@')[0].toUpperCase()` |
| Perbaikan | `LoginPage.jsx` mengirim `{ name, email }`; `handleLogin` memakai nama dari akun terdaftar; perubahan nama di Profil disinkronkan ke data akun |
| File | `src/pages/LoginPage.jsx`, `src/App.jsx` |

```diff
- name: isDimas ? INITIAL_USER.name : email.split('@')[0].toUpperCase(),
+ name: name || (isDimas ? INITIAL_USER.name : email.split('@')[0]),
```

### Modul 8

| No | Masalah | Perbaikan |
|---|---|---|
| 1 | `.gitignore` hanya berisi `node_modules`, sehingga file `.env` berisiko ter-upload dan folder `dist/` ikut ter-commit | Menambahkan `.env`, `.env.local`, dan `dist` ke `.gitignore`, lalu `git rm -r --cached dist` |
| 2 | Atribut `required` pada kolom form memunculkan gelembung peringatan bawaan peramban, sehingga pesan error per kolom tidak tampil | Menambahkan `noValidate` pada `<form>` agar validasi memakai fungsi `validate()` |
| 3 | Foto disimpan sebagai base64 berukuran besar sehingga berisiko ditolak atau lambat saat dikirim ke API | Menambahkan `compressImage()` untuk mengecilkan foto sebelum dikirim, dan membatasi lampiran pada gambar |
| 4 | `handleSubmit` memakai `setTimeout` palsu, sehingga layar sukses tampil walau data belum tersimpan | Diganti `await onSubmitReport(...)`; layar sukses hanya tampil jika pengiriman berhasil |
| 5 | `selectedReport` bernilai `null` sebelum data dari API termuat dan berisiko menyebabkan crash di halaman detail admin | Menambahkan pengaman `selectedReport &&` pada render halaman detail |
| 6 | Toast buatan sendiri tidak sesuai ketentuan brief | Diganti dengan Sonner, dengan tetap mempertahankan fungsi `triggerToast` agar pemanggilan lama tidak berubah |

## Keterbatasan

- MockAPI bersifat publik dan hanya untuk prototipe, sehingga siapa pun yang memiliki URL-nya dapat membaca dan menulis data.
- Akun, password, dan sesi masih disimpan di `localStorage` peramban, bukan di server.
- Pencarian dan filter dilakukan di sisi klien setelah seluruh data dimuat.
- Pembeda admin dan mahasiswa masih berdasarkan kata `admin` pada email, belum memakai sistem peran di server.

## Rencana Pengembangan

- Memindahkan autentikasi dan data pengguna ke backend dengan basis data nyata.
- Menambahkan notifikasi status laporan kepada pelapor.
- Melakukan pengujian kegunaan bersama pengguna sebenarnya (Modul 9).

---

Dibuat oleh **Kelompok 9 - Divisi Web & UI/UX Developer, Vinix Batch 5**.
