/**
 * ============================================================
 * Enterprise Sales Engine
 * Domain Model : Customer
 * ============================================================
 *
 * Customer merepresentasikan pelanggan yang melakukan
 * transaksi pada Sales Engine.
 *
 * Customer bersifat opsional.
 * Artinya transaksi tetap dapat dilakukan tanpa customer
 * (walk-in customer).
 *
 * Data Customer akan digunakan oleh:
 *
 * - Cart
 * - Invoice
 * - Membership
 * - Loyalty Program
 * * Reward Point
 * - Laporan Penjualan
 *
 * ============================================================
 */

/**
 * Merepresentasikan pelanggan.
 */
export interface Customer {
  /**
   * ID unik customer.
   */
  id: string;

  /**
   * Kode customer.
   *
   * Contoh:
   * CUS-0001
   */
  kode: string;

  /**
   * Nama customer.
   */
  nama: string;

  /**
   * Nomor telepon customer.
   *
   * Bersifat opsional.
   */
  telepon?: string;

  /**
   * Email customer.
   *
   * Bersifat opsional.
   */
  email?: string;

  /**
   * Alamat customer.
   *
   * Bersifat opsional.
   */
  alamat?: string;
}
