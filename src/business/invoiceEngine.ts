import type { Cart, Invoice } from "../features/sales/types";

function generateInvoiceNumber(): string {
  const now = new Date();

  const date = now.toISOString().slice(0, 10).replace(/-/g, "");

  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `INV-${date}-${random}`;
}

function validateInvoice(cart: Cart): boolean {
  return cart.payment?.status === "paid";
}

function createInvoice(cart: Cart): Invoice | null {
  if (!validateInvoice(cart)) {
    return null;
  }

  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),

    number: generateInvoiceNumber(),

    date: now,

    cashierId: cart.cashierId,

    cashierName: cart.cashierName,

    customer: cart.customer,

    items: cart.items.map((item) => ({
      ...item,
    })),

    subtotal: cart.subtotal,

    itemDiscount: cart.itemDiscount,

    transactionDiscount: cart.transactionDiscount,

    tax: cart.tax,

    serviceCharge: cart.serviceCharge,

    grandTotal: cart.grandTotal,

    payment: {
      ...cart.payment!,
    },

    notes: cart.notes,

    createdAt: now,
  };
}

export const InvoiceEngine = {
  generateInvoiceNumber,

  validateInvoice,

  createInvoice,
};

export default InvoiceEngine;
