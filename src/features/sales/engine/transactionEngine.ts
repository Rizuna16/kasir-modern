import type { Invoice } from "../types";

/**
 * ============================================================
 * Enterprise Sales Engine
 * Transaction Engine
 * ============================================================
 *
 * Responsibility
 * ----------------------------
 * ✅ Final validation transaksi
 * ✅ Business rule transaksi
 * ✅ Hook untuk proses lanjutan
 *
 * Tidak bertanggung jawab terhadap:
 * ❌ Penyimpanan Invoice
 * ❌ LocalStorage
 * ❌ UI
 *
 * Penyimpanan Invoice dilakukan oleh:
 * - invoiceService
 *
 * ============================================================
 */

export interface TransactionResult {
  success: boolean;

  invoice: Invoice;

  message: string;
}

/**
 * Menyelesaikan transaksi.
 *
 * Saat ini hanya melakukan validasi akhir.
 *
 * Tahap berikutnya:
 * - validasi pembayaran
 * - update stok
 * - loyalty point
 * - audit log
 * - sinkronisasi server
 * - print nota
 */
export function completeTransaction(invoice: Invoice): TransactionResult {
  if (invoice.items.length === 0) {
    return {
      success: false,
      invoice,
      message: "Transaksi tidak memiliki item.",
    };
  }

  if (invoice.grandTotal <= 0) {
    return {
      success: false,
      invoice,
      message: "Total transaksi tidak valid.",
    };
  }

  if (invoice.payment.paidAmount < invoice.grandTotal) {
    return {
      success: false,
      invoice,
      message: "Pembayaran kurang dari total transaksi.",
    };
  }

  return {
    success: true,
    invoice,
    message: "Transaksi berhasil divalidasi.",
  };
}
