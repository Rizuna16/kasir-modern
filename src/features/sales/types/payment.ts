import type { PaymentMethod, PaymentStatus } from "../constants/payment";

/**
 * ============================================================
 * Enterprise Sales Engine
 * Domain Model : Payment
 * ============================================================
 *
 * Payment merepresentasikan hasil proses pembayaran
 * pada sebuah transaksi penjualan.
 *
 * Payment tidak menghitung total transaksi.
 * Payment hanya menyimpan informasi pembayaran.
 *
 * Domain ini akan digunakan oleh:
 *
 * - Cart
 * - Payment Engine
 * - Invoice Engine
 * - Print Nota
 * - Laporan
 * - Refund
 *
 * ============================================================
 */

export interface Payment {
  /**
   * Metode pembayaran.
   *
   * Contoh:
   * cash
   * qris
   * bank_transfer
   */
  method: PaymentMethod;

  /**
   * Status pembayaran.
   *
   * Contoh:
   * pending
   * paid
   */
  status: PaymentStatus;

  /**
   * Jumlah uang yang dibayarkan customer.
   */
  paidAmount: number;

  /**
   * Jumlah uang kembalian.
   */
  changeAmount: number;

  /**
   * Nomor referensi transaksi.
   *
   * Digunakan untuk pembayaran non-tunai.
   */
  referenceNumber?: string;
}
