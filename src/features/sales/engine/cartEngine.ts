import type { Cart, CartItem } from "../types";

/**
 * ============================================================
 * Enterprise Cart Engine
 * ============================================================
 *
 * Business rule untuk mengelola item dalam Cart.
 *
 * Responsibility:
 *
 * ✅ tambah item
 * ✅ tambah qty
 * ✅ kurangi qty
 * ✅ hapus item
 * ✅ clear item
 * ✅ hitung total quantity
 *
 * Tidak menangani:
 *
 * ❌ payment
 * ❌ invoice
 * ❌ discount engine
 * ❌ tax engine
 *
 * Cart adalah Aggregate Root.
 *
 * Semua perubahan item harus melalui engine ini.
 *
 * ============================================================
 */

/**
 * Tambah item baru ke cart
 */
export function addItem(cart: Cart, item: CartItem): Cart {
  return {
    ...cart,

    items: [...cart.items, item],

    updatedAt: new Date().toISOString(),
  };
}

/**
 * Tambah qty item
 */
export function increaseQty(cart: Cart, itemId: string): Cart {
  return {
    ...cart,

    items: cart.items.map((item) => {
      if (item.id !== itemId) return item;

      return {
        ...item,

        qty: item.qty + 1,

        subtotal: item.harga * (item.qty + 1),

        total: item.harga * (item.qty + 1) - item.discount + item.tax,
      };
    }),

    updatedAt: new Date().toISOString(),
  };
}

/**
 * Kurangi qty item
 */
export function decreaseQty(cart: Cart, itemId: string): Cart {
  return {
    ...cart,

    items: cart.items
      .map((item) => {
        if (item.id !== itemId) return item;

        return {
          ...item,

          qty: item.qty - 1,

          subtotal: item.harga * (item.qty - 1),

          total: item.harga * (item.qty - 1) - item.discount + item.tax,
        };
      })
      .filter((item) => item.qty > 0),

    updatedAt: new Date().toISOString(),
  };
}

/**
 * Hapus item berdasarkan CartItem.id
 */
export function removeItem(cart: Cart, itemId: string): Cart {
  return {
    ...cart,

    items: cart.items.filter((item) => item.id !== itemId),

    updatedAt: new Date().toISOString(),
  };
}

/**
 * Menghapus seluruh item
 */
export function clearItems(cart: Cart): Cart {
  return {
    ...cart,

    items: [],

    updatedAt: new Date().toISOString(),
  };
}

/**
 * Total jumlah barang
 */
export function getTotalQty(cart: Cart): number {
  return cart.items.reduce(
    (total, item) => total + item.qty,

    0,
  );
}

/**
 * Cek apakah item ada
 */
export function hasItem(cart: Cart, itemId: string): boolean {
  return cart.items.some((item) => item.id === itemId);
}
