import type { Cart, CartItem, Customer, Payment, Invoice } from "../types";

import {
  addItem as cartAddItem,
  increaseQty,
  decreaseQty,
  removeItem as cartRemoveItem,
} from "../engine/cartEngine";

let activeCart: Cart | null = null;

/**
 * Generate ID sederhana
 */
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}`;
}

/**
 * Generate nomor invoice
 */
function generateInvoiceNumber(): string {
  return `INV-${Date.now()}`;
}

/**
 * Membuat transaksi baru
 */
function startSale(cashierId: string, cashierName: string): Cart {
  const now = new Date().toISOString();

  const cart: Cart = {
    id: generateId("CART"),

    invoiceNumber: generateInvoiceNumber(),

    status: "active",

    cashierId,

    cashierName,

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

  activeCart = cart;

  return cart;
}

/**
 * Mendapatkan cart aktif
 */
function getCart(): Cart | null {
  return activeCart;
}

/**
 * Simpan cart manual
 */
function setCart(cart: Cart): Cart {
  activeCart = cart;

  return cart;
}

/**
 * ============================================================
 * CART ITEM ENGINE ACTION
 * ============================================================
 */

/**
 * Tambah item ke cart
 */
function addCartItem(item: CartItem): Cart | null {
  if (!activeCart) return null;

  activeCart = cartAddItem(activeCart, item);

  recalculate();

  return activeCart;
}

/**
 * Tambah qty
 */
function increaseCartItem(itemId: string): Cart | null {
  if (!activeCart) return null;

  activeCart = increaseQty(activeCart, itemId);

  recalculate();

  return activeCart;
}

/**
 * Kurang qty
 */
function decreaseCartItem(itemId: string): Cart | null {
  if (!activeCart) return null;

  activeCart = decreaseQty(activeCart, itemId);

  recalculate();

  return activeCart;
}

/**
 * Hapus item
 */
function removeCartItem(itemId: string): Cart | null {
  if (!activeCart) return null;

  activeCart = cartRemoveItem(activeCart, itemId);

  recalculate();

  return activeCart;
}

/**
 * Set customer
 */
function setCustomer(customer?: Customer): Cart | null {
  if (!activeCart) return null;

  activeCart.customer = customer;

  activeCart.updatedAt = new Date().toISOString();

  return activeCart;
}

/**
 * Set pembayaran
 */
function setPayment(payment: Payment): Cart | null {
  if (!activeCart) return null;

  activeCart.payment = payment;

  activeCart.updatedAt = new Date().toISOString();

  return activeCart;
}

/**
 * Hitung ulang total
 */
function recalculate() {
  if (!activeCart) return;

  activeCart.subtotal = activeCart.items.reduce(
    (sum, item) => sum + item.subtotal,

    0,
  );

  activeCart.itemDiscount = activeCart.items.reduce(
    (sum, item) => sum + item.discount,

    0,
  );

  activeCart.grandTotal =
    activeCart.subtotal -
    activeCart.itemDiscount +
    activeCart.transactionDiscount +
    activeCart.tax +
    activeCart.serviceCharge;

  activeCart.updatedAt = new Date().toISOString();
}

/**
 * Finalisasi transaksi
 */
function completeSale(): Invoice | null {
  if (!activeCart || !activeCart.payment) return null;

  const now = new Date().toISOString();

  const invoice: Invoice = {
    id: generateId("INV"),

    number: activeCart.invoiceNumber,

    date: now,

    cashierId: activeCart.cashierId,

    cashierName: activeCart.cashierName,

    customer: activeCart.customer,

    items: [...activeCart.items],

    subtotal: activeCart.subtotal,

    itemDiscount: activeCart.itemDiscount,

    transactionDiscount: activeCart.transactionDiscount,

    tax: activeCart.tax,

    serviceCharge: activeCart.serviceCharge,

    grandTotal: activeCart.grandTotal,

    payment: activeCart.payment,

    notes: activeCart.notes,

    createdAt: now,
  };

  activeCart.status = "completed";

  return invoice;
}

/**
 * Cancel transaksi
 */
function cancelSale() {
  if (activeCart) {
    activeCart.status = "cancelled";
  }

  return activeCart;
}

/**
 * Reset transaksi
 */
function clearCart() {
  activeCart = null;
}

export const SalesStore = {
  startSale,

  getCart,

  setCart,

  addCartItem,

  increaseCartItem,

  decreaseCartItem,

  removeCartItem,

  setCustomer,

  setPayment,

  completeSale,

  cancelSale,

  clearCart,
};

export default SalesStore;
