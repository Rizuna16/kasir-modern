import type { Cart, CartItem } from "../features/sales/types";

function calculateItemDiscount(item: CartItem, discountRate: number): number {
  if (discountRate <= 0) {
    return 0;
  }

  return Math.round(item.subtotal * discountRate);
}

function applyItemDiscount(item: CartItem, discountRate: number): CartItem {
  const subtotal = item.harga * item.qty;

  const discount = calculateItemDiscount(
    {
      ...item,
      subtotal,
    },
    discountRate,
  );

  return {
    ...item,

    subtotal,

    discount,

    total: subtotal - discount + item.tax,
  };
}

function applyCartItemDiscount(cart: Cart, discountRate: number): Cart {
  const items = cart.items.map((item) => applyItemDiscount(item, discountRate));

  const itemDiscount = items.reduce(
    (total, item) => total + item.discount,

    0,
  );

  return {
    ...cart,

    items,

    itemDiscount,

    updatedAt: new Date().toISOString(),
  };
}

function applyTransactionDiscount(cart: Cart, amount: number): Cart {
  const discount = Math.max(0, amount);

  return {
    ...cart,

    transactionDiscount: discount,

    updatedAt: new Date().toISOString(),
  };
}

function clearDiscount(cart: Cart): Cart {
  return {
    ...cart,

    itemDiscount: 0,

    transactionDiscount: 0,

    items: cart.items.map((item) => ({
      ...item,

      discount: 0,

      total: item.subtotal + item.tax,
    })),

    updatedAt: new Date().toISOString(),
  };
}

export const DiscountEngine = {
  calculateItemDiscount,

  applyItemDiscount,

  applyCartItemDiscount,

  applyTransactionDiscount,

  clearDiscount,
};

export default DiscountEngine;
