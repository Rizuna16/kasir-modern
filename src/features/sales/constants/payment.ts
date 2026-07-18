/**
 * ============================================================
 * Enterprise Sales Engine
 * Payment Constants
 * ============================================================
 *
 * File ini berisi seluruh konstanta yang berkaitan
 * dengan metode pembayaran dan status pembayaran.
 *
 * Seluruh aplikasi wajib menggunakan konstanta ini
 * dan tidak menuliskan string secara langsung
 * (magic string).
 *
 * Contoh:
 *
 * ✅ PAYMENT_METHOD.CASH
 *
 * ❌ "cash"
 *
 * ============================================================
 */

/**
 * Daftar metode pembayaran yang didukung.
 *
 * Nilai menggunakan huruf kecil agar konsisten
 * saat disimpan ke storage atau dikirim ke API.
 */
export const PAYMENT_METHOD = {
  CASH: "cash",
  QRIS: "qris",
  BANK_TRANSFER: "bank_transfer",
  DEBIT_CARD: "debit_card",
  CREDIT_CARD: "credit_card",
  E_WALLET: "e_wallet",
} as const;

/**
 * Status pembayaran.
 */
export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

/**
 * Tipe Method Pembayaran.
 */
export type PaymentMethod =
  (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

/**
 * Tipe Status Pembayaran.
 */
export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
