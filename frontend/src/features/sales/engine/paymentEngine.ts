import type { Payment } from "../types";

import type { PaymentMethod } from "../constants/payment";

import type { PaymentStatus } from "../constants/payment";

/**
 * ============================================================
 * Enterprise Payment Engine
 * ============================================================
 *
 * Responsibility:
 *
 * ✅ validasi pembayaran
 * ✅ hitung kembalian
 * ✅ membuat Payment object
 *
 * Tidak menangani:
 *
 * ❌ Cart
 * ❌ Invoice
 * ❌ Stock
 *
 * ============================================================
 */

export interface PaymentValidationResult {
  success: boolean;

  message?: string;
}

/**
 * Validasi pembayaran
 */
export function validatePayment(
  total: number,
  paidAmount: number,
): PaymentValidationResult {
  if (paidAmount <= 0) {
    return {
      success: false,

      message: "Jumlah pembayaran harus lebih dari 0",
    };
  }

  if (paidAmount < total) {
    return {
      success: false,

      message: "Jumlah pembayaran kurang",
    };
  }

  return {
    success: true,
  };
}

/**
 * Hitung kembalian
 */
export function calculateChange(total: number, paidAmount: number): number {
  const change = paidAmount - total;

  return change > 0 ? change : 0;
}

/**
 * Membuat object Payment
 */
export function createPayment(
  method: PaymentMethod,
  total: number,
  paidAmount: number,
  referenceNumber?: string,
): Payment {
  return {
    method,

    status: "paid" as PaymentStatus,

    paidAmount,

    changeAmount: calculateChange(total, paidAmount),

    referenceNumber,
  };
}
