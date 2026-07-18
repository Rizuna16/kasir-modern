import type { Cart, Payment } from "../features/sales/types";

import type {
  PaymentMethod,
  PaymentStatus,
} from "../features/sales/constants/payment";

function createPayment(
  method: PaymentMethod,
  paidAmount: number,
  referenceNumber?: string,
): Payment {
  return {
    method,

    status: "pending" as PaymentStatus,

    paidAmount,

    changeAmount: 0,

    referenceNumber,
  };
}

function calculateChange(cart: Cart, paidAmount: number): number {
  const change = paidAmount - cart.grandTotal;

  return change > 0 ? change : 0;
}

function validatePayment(cart: Cart, paidAmount: number): boolean {
  return paidAmount >= cart.grandTotal;
}

function processPayment(cart: Cart, payment: Payment): Cart {
  const valid = validatePayment(cart, payment.paidAmount);

  const updatedPayment: Payment = {
    ...payment,

    status: valid ? "paid" : "pending",

    changeAmount: valid ? calculateChange(cart, payment.paidAmount) : 0,
  };

  return {
    ...cart,

    payment: updatedPayment,

    status: valid ? "completed" : cart.status,

    updatedAt: new Date().toISOString(),
  };
}

function isPaid(payment?: Payment): boolean {
  return payment?.status === "paid";
}

export const PaymentEngine = {
  createPayment,

  calculateChange,

  validatePayment,

  processPayment,

  isPaid,
};

export default PaymentEngine;
