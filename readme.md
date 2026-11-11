# 💰 PocketBudget - Pengelola Keuangan & Anggaran Harian Mahasiswa

**Dokumentasi Proyek Ujian Tengah Semester (UTS)**  
**Mata Kuliah:** Mobile Programming Native  
**Universitas Muhammadiyah Sukabumi (UMMI)**

---

## 👤 Identitas Mahasiswa

- **Nama:** Adindra Hakim Mulyawan
- **NIM:** 2430511048
- **Kelas:** Teknik Informatika
- **Dosen Pengampu:** Prajoko, M.Kom

---

## 📖 Deskripsi Proyek

**PocketBudget** adalah aplikasi _mobile cross-platform_ yang dirancang khusus untuk membantu mahasiswa dalam mencatat, memantau, dan mengelola anggaran keuangan harian (pemasukan dan pengeluaran anak kos/mahasiswa).

Aplikasi ini dibangun menggunakan **React Native** dengan kerangka kerja **Expo Router (File-based Routing)** serta memanfaatkan arsitektur komponen modern dan _React Hooks_ untuk mengoptimalkan manajemen _state_ dan performa aplikasi.

---

## ✨ Fitur Utama & Pemenuhan Ketentuan UTS

Aplikasi ini telah memenuhi seluruh kriteria dan indikator penilaian UTS:

1. **Modular Components (Minimal 4 Komponen):**
   - `BalanceSummary`: Card ringkasan total saldo, pemasukan, dan pengeluaran secara interaktif.
   - `TransactionCard`: Kartu item transaksi dengan indikator visual (warna & ikon) dan aksi hapus.
   - `BudgetContext`: Penyedia _shared state_ global dengan React Context API.
   - `useTransactionSearch`: _Custom Hook_ terpisah untuk memisahkan logika pencarian & penyaringan data.

2. **Penggunaan State & Props:**
   - **Props:** Mengalirkan data kalkulasi dan status transaksi dari komponen induk (_Screen_) ke komponen anak (`TransactionCard` & `BalanceSummary`).
   - **State:** Mengelola data transaksi global (`transactions`), input form lokal, filter kategori, serta query pencarian secara _real-time_.

3. **Sistem Navigasi Multi-Halaman:**
   - **Bottom Tabs Navigation:** Perpindahan antar fitur utama (_Home_, _Tambah Transaksi_, _Statistik Kategori_, dan _Pengaturan_).
   - **Stack Navigation:** Navigasi tumpukan menuju halaman detail transaksi.
   - **Dynamic Routes (`app/detail/[id].tsx`):** Rute dinamis berbasis URL parameter `id` untuk menampilkan rincian transaksi tertentu.

4. **Implementasi React Hooks:**
   - `useState`: Pengelolaan data input form, mode transaksi, dan filter kategori.
   - `useEffect`: Mengelola _side-effect_ timer _debounce_ (350ms) pada kolom pencarian beserta fungsi _cleanup_.
   - `useMemo`: Memodelkan _memoization_ untuk perhitungan efisien total saldo, pemasukan, dan pengeluaran tanpa re-render berlebih.
   - `useContext`: Mengakses data global aplikasi secara efisien tanpa _prop-drilling_.
   - `useRef`: Memberikan fokus kursor secara imperatif pada elemen `TextInput` saat tombol _Reset_ ditekan.

---

## 🏗️ Struktur Direktori Proyek

```text
pocket-budget/
├── app/
│   ├── _layout.tsx              # Root Layout (BudgetProvider & Stack Navigation)
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Bottom Tabs Layout (Home, Create, Stats, Settings)
│   │   ├── index.tsx            # Home Screen (Dashboard Saldo & Lista Transaksi)
│   │   ├── create.tsx           # Form Tambah Transaksi (Pemasukan/Pengeluaran)
│   │   ├── stats.tsx            # Statistik Kategori Transaksi
│   │   └── settings.tsx         # Halaman Pengaturan Aplikasi
│   └── detail/
│       └── [id].tsx             # Dynamic Route Detail Transaksi
├── src/
│   ├── components/
│   │   ├── BalanceSummary.tsx   # Komponen Card Ringkasan Saldo
│   │   └── TransactionCard.tsx  # Komponen Card Item Transaksi
│   ├── context/
│   │   └── BudgetContext.tsx    # Context API (Global Shared State)
│   ├── hooks/
│   │   └── useTransactionSearch.ts # Custom Hook Pencarian & Filter
│   └── styles/
│       └── tokens.ts            # Design Tokens (Color, Spacing, Typography, Shadow)
├── package.json
└── README.md
```

---

## ⚙️ Penjelasan Detail 5 React Hooks

| Nama Hook        | Dependency Array                                   | Fungsi & Penerapan pada PocketBudget                                                                                                        |
| :--------------- | :------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **`useState`**   | _(Tidak ada)_                                      | Menyimpan nilai input form (judul, nominal, catatan), status tipe transaksi (`in`/`out`), serta filter kategori aktif.                      |
| **`useEffect`**  | `[query]`                                          | Menjalankan _timer debounce_ (350ms) untuk menunda eksekusi filter teks saat pengguna mengetik, serta melakukan _cleanup_ timer sebelumnya. |
| **`useMemo`**    | `[transactions, debouncedQuery, selectedCategory]` | Melakukan kalkulasi matematika berat (total pemasukan, pengeluaran, sisa saldo) dan hasil filter array secara efisien.                      |
| **`useContext`** | _(Tidak ada)_                                      | Mengakses _state_ global (`transactions`, `addTransaction`, `deleteTransaction`) dari `BudgetContext` di seluruh komponen.                  |
| **`useRef`**     | _(Tidak ada)_                                      | Mengontrol elemen `TextInput` pencarian secara langsung untuk mengembalikan fokus (_focus_) saat tombol _Reset_ diklik.                     |

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat

- Node.js (LTS Version)
- Git & Visual Studio Code
- Aplikasi **Expo Go** pada ponsel fisik (Android/iOS) atau **Android Emulator**

### Langkah Eksekusi

1. **Clone Repository / Masuk ke Folder Proyek:**

   ```bash
   cd pocket-budget
   ```

2. **Instal Dependensi (jika diperlukan):**

   ```bash
   npm install
   ```

3. **Jalankan Development Server Expo:**

   ```bash
   npx expo start -c
   ```

4. **Pengujian Aplikasi:**
   - **Android Emulator:** Tekan huruf `a` pada terminal untuk membuka aplikasi di emulator.
   - **HP Fisik (Expo Go):** Pindai (_scan_) **QR Code** di terminal menggunakan aplikasi Expo Go.

---

## 🔗 Tautan Penyerahan Tugas UTS

- **Repository GitHub:** `https://github.com/adindrax-hub/Mobile-Multi-Platform_UTS`

---

_Dibuat untuk memenuhi Tugas Ujian Tengah Semester Mata Kuliah Mobile Programming Native - Universitas Muhammadiyah Sukabumi._
