import type { Customer } from "./customer";
import type { Payment } from "./payment";
import type { CartItem } from "./cart";

/**
 * ============================================================
 * Enterprise Sales Engine
 * Domain Model : Invoice
 * ============================================================
 *
 * Invoice adalah snapshot final dari transaksi penjualan.
 *
 * Berbeda dengan Cart yang masih dapat berubah,
 * Invoice bersifat immutable (tidak boleh diubah)
 * setelah transaksi selesai.
 *
 * Invoice digunakan untuk:
 *
 * - Penyimpanan transaksi
 * - Cetak nota
 * - Laporan
 * - Audit
 * - Riwayat penjualan
 *
 * ============================================================
 */
export interface Invoice {
  /**
   * ID unik invoice.
   */
  id: string;

  /**
   * Nomor invoice / nota.
   */
  number: string;

  /**
   * Tanggal transaksi.
   */
  date: string;

  /**
   * ID kasir.
   */
  cashierId: string;

  /**
   * Nama kasir (snapshot).
   */
  cashierName: string;

  /**
   * Customer transaksi.
   *
   * Opsional untuk walk-in customer.
   */
  customer?: Customer;

  /**
   * Daftar item transaksi.
   */
  items: CartItem[];

  /**
   * Total sebelum diskon.
   */
  subtotal: number;

  /**
   * Total diskon per item.
   */
  itemDiscount: number;

  /**
   * Total diskon transaksi.
   */
  transactionDiscount: number;

  /**
   * Total pajak.
   */
  tax: number;

  /**
   * Biaya layanan.
   */
  serviceCharge: number;

  /**
   * Grand total transaksi.
   */
  grandTotal: number;

  /**
   * Informasi pembayaran.
   */
  payment: Payment;

  /**
   * Catatan transaksi.
   */
  notes?: string;

  /**
   * Waktu invoice dibuat.
   */
  createdAt: string;
}
