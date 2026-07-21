# Sales Feature (Enterprise V2)

## Deskripsi

Sales Feature merupakan modul utama yang menangani seluruh proses transaksi
penjualan pada aplikasi Kasir Modern Enterprise.

Modul ini dibangun menggunakan pendekatan **Feature-Based Architecture**
agar setiap bagian memiliki tanggung jawab yang jelas, mudah dirawat,
dan mudah dikembangkan di masa depan.

---

## Tujuan

- Memisahkan logika bisnis dari UI.
- Mengurangi coupling antar modul.
- Mempermudah pengujian (testing).
- Mempermudah penambahan fitur baru.
- Menjadi fondasi untuk POS Enterprise.

---

## Struktur Folder

```text
sales/

components/
constants/
hooks/
pages/
services/
stores/
types/
utils/
validators/

index.ts
README.md
```

---

## Alur Data

```text
UI
 │
 ▼
Store
 │
 ▼
Cart Engine
 │
 ├── Pricing Engine
 ├── Discount Engine
 ├── Payment Engine
 ├── Invoice Engine
 │
 ▼
Inventory Service
 │
 ▼
Stock Movement Engine
```

---

## Tanggung Jawab Setiap Engine

### Cart Engine

- Menambah barang
- Menghapus barang
- Mengubah Qty
- Mengosongkan Cart

---

### Pricing Engine

- Menghitung subtotal
- Menghitung grand total sementara

---

### Discount Engine

- Diskon item
- Diskon transaksi
- Voucher
- Promo

---

### Payment Engine

- Validasi pembayaran
- Menghitung kembalian
- Menentukan status pembayaran

---

### Invoice Engine

- Mengubah Cart menjadi transaksi final
- Membuat nomor invoice
- Menyiapkan data cetak

---

### Inventory Service

- Mengurangi stok barang

---

### Stock Movement Engine

- Menyimpan histori keluar masuk stok

---

## Prinsip Arsitektur

Feature-Based Architecture

Single Responsibility Principle (SRP)

Separation of Concerns (SoC)

Reusable Business Logic

Incremental Development

Clean Code

Scalable Architecture
