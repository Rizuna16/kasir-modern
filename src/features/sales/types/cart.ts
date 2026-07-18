import type { Customer } from "./customer";
import type { Payment } from "./payment";

/**
 * ============================================================
 * Enterprise Sales Engine
 * Domain Model : Cart
 * ============================================================
 *
 * Cart adalah Aggregate Root dari Sales Domain.
 *
 * Semua proses transaksi akan dimulai dari Cart,
 * kemudian diproses oleh berbagai Business Engine
 * hingga akhirnya dikonversi menjadi Invoice.
 *
 * ============================================================
 */

/**
 * Status transaksi.
 */
export type CartStatus =
  | "draft"
  | "active"
  | "hold"
  | "completed"
  | "cancelled";

/**
 * Satu baris item di dalam Cart.
 */
export interface CartItem {
  /**
   * ID unik item Cart.
   */
  id: string;

  /**
   * ID master barang.
   */
  barangId: string;

  /**
   * Snapshot kode barang.
   */
  kodeBarang: string;

  /**
   * Snapshot nama barang.
   */
  namaBarang: string;

  /**
   * Harga jual saat transaksi.
   */
  harga: number;

  /**
   * Jumlah barang.
   */
  qty: number;

  /**
   * Total sebelum diskon.
   */
  subtotal: number;

  /**
   * Diskon item.
   */
  discount: number;

  /**
   * Pajak item.
   */
  tax: number;

  /**
   * Total akhir item.
   */
  total: number;

  /**
   * Catatan item.
   */
  notes?: string;
}

/**
 * Aggregate Root transaksi.
 */
export interface Cart {
  /**
   * ID unik Cart.
   */
  id: string;

  /**
   * Nomor transaksi sementara.
   */
  invoiceNumber: string;

  /**
   * Status transaksi.
   */
  status: CartStatus;

  /**
   * Customer transaksi.
   *
   * Undefined berarti walk-in customer.
   */
  customer?: Customer;

  /**
   * ID kasir.
   */
  cashierId: string;

  /**
   * Nama kasir (snapshot).
   */
  cashierName: string;

  /**
   * Daftar item transaksi.
   */
  items: CartItem[];

  /**
   * Total sebelum diskon.
   */
  subtotal: number;

  /**
   * Total diskon seluruh item.
   */
  itemDiscount: number;

  /**
   * Diskon tingkat transaksi.
   */
  transactionDiscount: number;

  /**
   * Total pajak.
   */
  tax: number;

  /**
   * Biaya layanan.
   */
  serviceCharge: number;

  /**
   * Grand total transaksi.
   */
  grandTotal: number;

  /**
   * Informasi pembayaran.
   *
   * Baru akan terisi ketika kasir
   * masuk ke proses pembayaran.
   */
  payment?: Payment;

  /**
   * Catatan transaksi.
   */
  notes?: string;

  /**
   * Waktu Cart dibuat.
   */
  createdAt: string;

  /**
   * Waktu terakhir diperbarui.
   */
  updatedAt: string;
}
