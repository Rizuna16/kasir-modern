import type { Customer } from "../types";

import type { Pelanggan } from "../../../types/pelanggan";

import { getPelanggan } from "../../../services/pelangganService";

/**
 * ============================================================
 * Enterprise Sales Engine
 * Customer Adapter
 * ============================================================
 *
 * Adapter antara Master Pelanggan lama
 * dengan Customer Domain Sales Engine.
 *
 * Sales Engine tidak membaca data master
 * secara langsung.
 *
 * Data dari Master Pelanggan akan
 * ditransformasikan menjadi Customer Domain.
 *
 * ============================================================
 */

/**
 * Mengambil seluruh customer
 * untuk kebutuhan transaksi penjualan.
 */
export function getCustomers(): Customer[] {
  const pelanggan = getPelanggan();

  return pelanggan.map(
    (item: Pelanggan): Customer => ({
      /**
       * Master Pelanggan menggunakan number.
       * Sales Domain menggunakan string.
       */
      id: String(item.id),

      kode: item.kode,

      nama: item.nama,

      telepon: item.telepon,

      email: item.email,

      alamat: item.alamat,
    }),
  );
}

/**
 * Mengambil customer berdasarkan ID.
 */
export function getCustomerById(id: string): Customer | undefined {
  const customers = getCustomers();

  return customers.find((item) => item.id === id);
}
