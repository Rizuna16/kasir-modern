export type StockMovementType =
  | "Pembelian"
  | "Penjualan"
  | "Retur Pembelian"
  | "Retur Penjualan"
  | "Penyesuaian"
  | "Stock Opname"
  | "Transfer Masuk"
  | "Transfer Keluar";

export interface StockMovement {
  id: string;

  barangId: string;

  tanggal: string;

  tipe: StockMovementType;

  qty: number;

  stokSebelum: number;

  stokSesudah: number;

  referensi?: string;

  keterangan?: string;

  createdBy?: string;

  createdAt: string;
}
