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

import { addInvoice } from "../services/invoiceService";

import { mapInvoiceToPenjualan } from "../mappers/invoiceMapper";

import { addPenjualan } from "../../../services/penjualanService";

let activeCart: Cart | null = null;

/**
 * ============================================================
 * Enterprise Sales Store
 * ============================================================
 *
 * SalesStore merupakan Orchestrator dari Enterprise Sales Engine.
 *
 * Responsibility:
 *
 * ✅ Mengelola Cart aktif
 * ✅ Mengelola Customer
 * ✅ Mengelola Payment
 * ✅ Checkout
 * ✅ Menjalankan Business Engine
 * ✅ Menyimpan Enterprise Invoice
 * ✅ Menjaga kompatibilitas Legacy Penjualan
 *
 * ============================================================
 */

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}`;
}

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

function getCart(): Cart | null {
  return activeCart;
}

function setCart(cart: Cart): Cart {
  activeCart = cart;

  return cart;
}

/**
 * ============================================================
 * CART
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
 * ============================================================
 * CUSTOMER
 * ============================================================
 */

function setCustomer(customer?: Customer): Cart | null {
  if (!activeCart) return null;

  activeCart.customer = customer;

  activeCart.updatedAt = new Date().toISOString();

  return activeCart;
}

/**
 * ============================================================
 * PAYMENT
 * ============================================================
 */

function setPayment(payment: Payment): Cart | null {
  if (!activeCart) return null;

  activeCart.payment = payment;

  activeCart.updatedAt = new Date().toISOString();

  return activeCart;
}

/**
 * ============================================================
 * RECALCULATE
 * ============================================================
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
    activeCart.itemDiscount -
    activeCart.transactionDiscount +
    activeCart.tax +
    activeCart.serviceCharge;

  activeCart.updatedAt = new Date().toISOString();
}

/**
 * ============================================================
 * CHECKOUT
 * ============================================================
 */

function completeSale(): Invoice | null {
  if (!activeCart) return null;

  if (!activeCart.payment) return null;

  /**
   * 1. Generate Enterprise Invoice
   */
  const invoice = createInvoice(activeCart);

  /**
   * 2. Validasi transaksi
   */
  const result = completeTransaction(invoice);

  if (!result.success) {
    console.warn(result.message);

    return null;
  }

  /**
   * 3. Simpan Invoice Enterprise
   */
  addInvoice(invoice);

  /**
   * 4. Mapping ke Legacy Penjualan
   */
  const legacyPenjualan = mapInvoiceToPenjualan(invoice);

  /**
   * 5. Simpan ke Legacy Service
   */
  addPenjualan(legacyPenjualan);

  /**
   * 6. Tandai Cart selesai
   */
  activeCart.status = "completed";

  activeCart.updatedAt = new Date().toISOString();

  /**
   * 7. Bersihkan Cart
   */
  clearCart();

  return invoice;
}

/**
 * ============================================================
 * CANCEL
 * ============================================================
 */

function cancelSale() {
  if (activeCart) {
    activeCart.status = "cancelled";

    activeCart.updatedAt = new Date().toISOString();
  }

  return activeCart;
}

/**
 * ============================================================
 * CLEAR
 * ============================================================
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
