import type { Cart, CartItem, Customer, Payment, Invoice } from "../types";

import {
  addItem as cartAddItem,
  increaseQty,
  decreaseQty,
  removeItem as cartRemoveItem,
} from "../engine/cartEngine";

import {
  validateNewItemStock,
  validateStockIncrease,
} from "../engine/stockValidator";

import { createInvoice } from "../engine/invoiceEngine";

import { completeTransaction } from "../engine/transactionEngine";

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
 * CART ENGINE
 * ============================================================
 */

function addCartItem(item: CartItem, stock: number): Cart | null {
  if (!activeCart) return null;

  const validation = validateNewItemStock(item.qty, stock);

  if (!validation.success) {
    console.warn(validation.message);

    return activeCart;
  }

  activeCart = cartAddItem(activeCart, item);

  recalculate();

  return activeCart;
}

function increaseCartItem(itemId: string, stock: number): Cart | null {
  if (!activeCart) return null;

  const validation = validateStockIncrease(activeCart, itemId, stock);

  if (!validation.success) {
    console.warn(validation.message);

    return activeCart;
  }

  activeCart = increaseQty(activeCart, itemId);

  recalculate();

  return activeCart;
}

function decreaseCartItem(itemId: string): Cart | null {
  if (!activeCart) return null;

  activeCart = decreaseQty(activeCart, itemId);

  recalculate();

  return activeCart;
}

function removeCartItem(itemId: string): Cart | null {
  if (!activeCart) return null;

  activeCart = cartRemoveItem(activeCart, itemId);

  recalculate();

  return activeCart;
}

/**
 * Customer
 */
function setCustomer(customer?: Customer): Cart | null {
  if (!activeCart) return null;

  activeCart.customer = customer;

  activeCart.updatedAt = new Date().toISOString();

  return activeCart;
}

/**
 * Payment
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
 * ============================================================
 * COMPLETE SALE
 * ============================================================
 */

function completeSale(): Invoice | null {
  if (!activeCart) return null;

  if (!activeCart.payment) return null;

  const invoice = createInvoice(activeCart);

  const result = completeTransaction(invoice);

  if (!result.success) {
    return null;
  }

  activeCart.status = "completed";

  clearCart();

  return invoice;
}

/**
 * Cancel transaksi
 */
function cancelSale() {
  if (activeCart) {
    activeCart.status = "cancelled";

    activeCart.updatedAt = new Date().toISOString();
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
