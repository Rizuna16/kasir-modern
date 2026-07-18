import type { Cart, CartItem } from "../features/sales/types";

function createCart(
  data: Omit<
    Cart,
    | "items"
    | "subtotal"
    | "itemDiscount"
    | "transactionDiscount"
    | "tax"
    | "serviceCharge"
    | "grandTotal"
    | "createdAt"
    | "updatedAt"
  >,
): Cart {
  const now = new Date().toISOString();

  return {
    ...data,

    items: [],

    subtotal: 0,

    itemDiscount: 0,

    transactionDiscount: 0,

    tax: 0,

    serviceCharge: 0,

    grandTotal: 0,

    createdAt: now,

    updatedAt: now,
  };
}

function addItem(cart: Cart, item: CartItem): Cart {
  const existing = cart.items.find((i) => i.barangId === item.barangId);

  const items = existing
    ? cart.items.map((i) =>
        i.barangId === item.barangId
          ? {
              ...i,
              qty: i.qty + item.qty,
            }
          : i,
      )
    : [...cart.items, item];

  return {
    ...cart,

    items,

    updatedAt: new Date().toISOString(),
  };
}

function removeItem(cart: Cart, barangId: string): Cart {
  return {
    ...cart,

    items: cart.items.filter((i) => i.barangId !== barangId),

    updatedAt: new Date().toISOString(),
  };
}

function updateQty(cart: Cart, barangId: string, qty: number): Cart {
  if (qty <= 0) {
    return removeItem(cart, barangId);
  }

  return {
    ...cart,

    items: cart.items.map((i) =>
      i.barangId === barangId
        ? {
            ...i,
            qty,
          }
        : i,
    ),

    updatedAt: new Date().toISOString(),
  };
}

function increaseQty(cart: Cart, barangId: string): Cart {
  const item = findItem(cart, barangId);

  if (!item) {
    return cart;
  }

  return updateQty(cart, barangId, item.qty + 1);
}

function decreaseQty(cart: Cart, barangId: string): Cart {
  const item = findItem(cart, barangId);

  if (!item) {
    return cart;
  }

  return updateQty(cart, barangId, item.qty - 1);
}

function clear(cart: Cart): Cart {
  return {
    ...cart,

    items: [],

    updatedAt: new Date().toISOString(),
  };
}

function getItems(cart: Cart): CartItem[] {
  return [...cart.items];
}

function findItem(cart: Cart, barangId: string): CartItem | undefined {
  return cart.items.find((i) => i.barangId === barangId);
}

function hasItem(cart: Cart, barangId: string): boolean {
  return cart.items.some((i) => i.barangId === barangId);
}

function totalQty(cart: Cart): number {
  return cart.items.reduce(
    (total, item) => total + item.qty,

    0,
  );
}

export const CartEngine = {
  createCart,

  addItem,

  removeItem,

  updateQty,

  increaseQty,

  decreaseQty,

  clear,

  getItems,

  findItem,

  hasItem,

  totalQty,
};

export default CartEngine;
