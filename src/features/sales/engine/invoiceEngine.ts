import type { Cart, Invoice } from "../types";

/**
 * ============================================================
 * Enterprise Invoice Engine
 * ============================================================
 *
 * Responsibility:
 *
 * ✅ Generate invoice dari Cart
 * ✅ Snapshot transaksi
 * ✅ Nomor invoice
 * ✅ Timestamp
 *
 * Tidak menangani:
 *
 * ❌ Stock
 * ❌ Payment validation
 * ❌ UI
 *
 * ============================================================
 */

function generateInvoiceId(): string {
  return `INV-${crypto.randomUUID()}`;
}

export function createInvoice(cart: Cart): Invoice {
  const now = new Date().toISOString();

  return {
    id: generateInvoiceId(),

    number: cart.invoiceNumber,

    date: now,

    cashierId: cart.cashierId,

    cashierName: cart.cashierName,

    customer: cart.customer,

    items: [...cart.items],

    subtotal: cart.subtotal,

    itemDiscount: cart.itemDiscount,

    transactionDiscount: cart.transactionDiscount,

    tax: cart.tax,

    serviceCharge: cart.serviceCharge,

    grandTotal: cart.grandTotal,

    payment: cart.payment!,

    notes: cart.notes,

    createdAt: now,
  };
}
