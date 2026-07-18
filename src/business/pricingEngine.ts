import type { Cart, CartItem } from "../features/sales/types";

function calculateItemSubtotal(item: CartItem): number {
  return item.harga * item.qty;
}

function calculateCartSubtotal(cart: Cart): number {
  return cart.items.reduce(
    (total, item) => total + calculateItemSubtotal(item),

    0,
  );
}

function calculateTax(subtotal: number, taxRate = 0): number {
  return Math.round(subtotal * taxRate);
}

function calculateGrandTotal(cart: Cart): number {
  return (
    cart.subtotal -
    cart.itemDiscount -
    cart.transactionDiscount +
    cart.tax +
    cart.serviceCharge
  );
}

function calculate(
  cart: Cart,
  options?: {
    taxRate?: number;
  },
): Cart {
  const subtotal = calculateCartSubtotal(cart);

  const tax = calculateTax(subtotal, options?.taxRate ?? 0);

  const updatedCart: Cart = {
    ...cart,

    subtotal,

    tax,

    grandTotal:
      subtotal -
      cart.itemDiscount -
      cart.transactionDiscount +
      tax +
      cart.serviceCharge,

    updatedAt: new Date().toISOString(),
  };

  return updatedCart;
}

export const PricingEngine = {
  calculateItemSubtotal,

  calculateCartSubtotal,

  calculateTax,

  calculateGrandTotal,

  calculate,
};

export default PricingEngine;
