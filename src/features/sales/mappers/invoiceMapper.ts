import type { Invoice } from "../types";

import type { Penjualan, DetailPenjualan } from "../../../types/penjualan";

/**
 * ============================================================
 * Enterprise Sales Engine
 * Legacy Invoice Mapper
 * ============================================================
 *
 * Mengubah Enterprise Invoice menjadi model Penjualan V1.
 *
 * File ini hanya sebagai adapter sementara selama proses
 * migrasi dari Penjualan V1 menuju Enterprise Invoice.
 *
 * Tidak melakukan:
 * - Penyimpanan
 * - Validasi
 * - Update stok
 * - Side effect
 *
 * ============================================================
 */

export function mapInvoiceToPenjualan(
  invoice: Invoice,
): Omit<Penjualan, "id" | "createdAt" | "updatedAt"> {
  const detail: DetailPenjualan[] = invoice.items.map((item) => ({
    id: crypto.randomUUID(),

    barangId: item.barangId,

    namaBarang: item.namaBarang,

    qty: item.qty,

    hargaJual: item.harga,

    subtotal: item.subtotal,
  }));

  return {
    nomorNota: invoice.number,

    tanggal: invoice.date,

    pelangganId: invoice.customer ? Number(invoice.customer.id) : 0,

    pelangganNama: invoice.customer?.nama ?? "Umum",

    detail,

    total: invoice.grandTotal,

    status: "LUNAS",
  };
}

export default mapInvoiceToPenjualan;
