/**
 * ============================================================
 * Enterprise Sales Engine
 * Report Service
 * ============================================================
 *
 * Responsibility:
 *
 * ✅ Mengambil data laporan dari Invoice Enterprise
 * ✅ Mapping Invoice menjadi Report View Model
 * ✅ Filter laporan berdasarkan tanggal
 * ✅ Menghitung statistik penjualan
 *
 * Tidak menangani:
 *
 * ❌ UI
 * ❌ Print
 * ❌ Export
 * ❌ Database
 *
 * ============================================================
 */

import type { Invoice } from "../types";

import { getInvoices } from "./invoiceService";

/**
 * ============================================================
 * Report View Model
 * ============================================================
 *
 * Digunakan oleh:
 *
 * - LaporanTable
 * - Export Excel
 * - Export PDF
 * - Dashboard Report
 *
 * UI tidak langsung bergantung
 * ke struktur Invoice.
 *
 * ============================================================
 */

export interface SalesReportItem {
  id: string;

  /**
   * Tanggal transaksi
   */
  tanggal: string;

  /**
   * Nomor nota
   */
  nomorNota: string;

  /**
   * Nama customer
   */
  pelangganNama: string;

  /**
   * Total transaksi
   */
  total: number;

  /**
   * Status pembayaran
   */
  status: "LUNAS" | "BELUM LUNAS";

  /**
   * Original invoice
   *
   * Untuk:
   * - detail
   * - print
   */
  invoice: Invoice;
}

/**
 * ============================================================
 * Mapping Invoice -> Report Item
 * ============================================================
 */

function mapInvoiceToReport(invoice: Invoice): SalesReportItem {
  return {
    id: invoice.id,

    tanggal: invoice.date.slice(0, 10),

    nomorNota: invoice.number,

    pelangganNama: invoice.customer?.nama ?? "Walk-in Customer",

    total: invoice.grandTotal,

    status: invoice.payment.status === "paid" ? "LUNAS" : "BELUM LUNAS",

    invoice,
  };
}

/**
 * ============================================================
 * Ambil semua laporan penjualan
 * ============================================================
 */

export function getSalesReport(): SalesReportItem[] {
  return getInvoices().map(mapInvoiceToReport);
}

/**
 * ============================================================
 * Filter laporan berdasarkan tanggal
 * ============================================================
 */

export function filterSalesReport(
  data: SalesReportItem[],

  tanggalAwal: string,

  tanggalAkhir: string,
): SalesReportItem[] {
  if (!tanggalAwal || !tanggalAkhir) {
    return data;
  }

  return data.filter((item) => {
    return item.tanggal >= tanggalAwal && item.tanggal <= tanggalAkhir;
  });
}

/**
 * ============================================================
 * Hitung jumlah transaksi
 * ============================================================
 */

export function countSales(data: SalesReportItem[]): number {
  return data.length;
}

/**
 * ============================================================
 * Hitung omzet
 * ============================================================
 */

export function calculateSalesTotal(data: SalesReportItem[]): number {
  return data.reduce(
    (total, item) => total + item.total,

    0,
  );
}

/**
 * ============================================================
 * Ambil transaksi terbaru
 * ============================================================
 */

export function getRecentSales(limit = 5): SalesReportItem[] {
  return [...getSalesReport()]

    .sort(
      (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime(),
    )

    .slice(0, limit);
}

/**
 * ============================================================
 * Produk terlaris
 * ============================================================
 */

export function getTopSellingProducts(limit = 5) {
  const products = new Map<
    string,
    {
      barangId: string;

      namaBarang: string;

      qty: number;
    }
  >();

  getInvoices().forEach((invoice) => {
    invoice.items.forEach((item) => {
      const current = products.get(item.barangId);

      if (current) {
        current.qty += item.qty;
      } else {
        products.set(
          item.barangId,

          {
            barangId: item.barangId,

            namaBarang: item.namaBarang,

            qty: item.qty,
          },
        );
      }
    });
  });

  return Array.from(products.values())

    .sort((a, b) => b.qty - a.qty)

    .slice(0, limit);
}
