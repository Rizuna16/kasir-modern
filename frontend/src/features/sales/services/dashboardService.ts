/**
 * ============================================================
 * Enterprise Sales Engine
 * Dashboard Analytics Service
 * ============================================================
 *
 * Responsibility:
 *
 * - Menyediakan data analytics Dashboard
 * - Mengambil sumber data dari Enterprise Invoice
 * - Mengubah Domain Model menjadi View Model
 *
 * Dashboard TIDAK membaca:
 *
 * ❌ penjualanService
 * ❌ Penjualan V1
 *
 * Dashboard membaca:
 *
 * ✅ Invoice Enterprise
 * ✅ Barang Service
 *
 * ============================================================
 */

import { getBarang } from "../../../services/barangService";

import { getInvoices } from "./invoiceService";

/**
 * ============================================================
 * Dashboard Summary
 * ============================================================
 */

export interface DashboardSummary {
  totalBarang: number;

  totalPenjualan: number;

  transaksiHariIni: number;

  stokMenipis: number;
}

/**
 * ============================================================
 * Recent Transaction View Model
 * ============================================================
 */

export interface RecentTransactionItem {
  id: string;

  nomorNota: string;

  pelangganNama: string;

  total: number;

  status: "LUNAS" | "BELUM LUNAS";
}

/**
 * ============================================================
 * Top Product View Model
 * ============================================================
 */

export interface TopProductItem {
  barangId: string;

  namaBarang: string;

  qty: number;
}

/**
 * ============================================================
 * Sales Chart View Model
 * ============================================================
 */

export interface SalesChartItem {
  hari: string;

  penjualan: number;
}

/**
 * ============================================================
 * GET DASHBOARD SUMMARY
 * ============================================================
 */

export function getDashboardSummary(): DashboardSummary {
  const barang = getBarang();

  const invoices = getInvoices();

  const today = new Date().toISOString().slice(0, 10);

  return {
    totalBarang: barang.length,

    totalPenjualan: invoices.reduce(
      (total, invoice) => total + invoice.grandTotal,

      0,
    ),

    transaksiHariIni: invoices.filter(
      (invoice) => invoice.date.slice(0, 10) === today,
    ).length,

    stokMenipis: barang.filter((item) => item.stok <= item.minimalStok).length,
  };
}

/**
 * ============================================================
 * GET RECENT TRANSACTIONS
 * ============================================================
 */

export function getRecentTransactions(limit = 5): RecentTransactionItem[] {
  return getInvoices()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    .slice(0, limit)

    .map((invoice) => ({
      id: invoice.id,

      nomorNota: invoice.number,

      pelangganNama: invoice.customer?.nama ?? "Walk-in Customer",

      total: invoice.grandTotal,

      status: invoice.payment.status === "paid" ? "LUNAS" : "BELUM LUNAS",
    }));
}

/**
 * ============================================================
 * GET TOP SELLING PRODUCTS
 * ============================================================
 */

export function getTopSellingProducts(limit = 5): TopProductItem[] {
  const map = new Map<string, TopProductItem>();

  getInvoices().forEach((invoice) => {
    invoice.items.forEach((item) => {
      const current = map.get(item.barangId);

      if (current) {
        current.qty += item.qty;
      } else {
        map.set(item.barangId, {
          barangId: item.barangId,

          namaBarang: item.namaBarang,

          qty: item.qty,
        });
      }
    });
  });

  return [...map.values()]

    .sort((a, b) => b.qty - a.qty)

    .slice(0, limit);
}

/**
 * ============================================================
 * GET SALES CHART
 * ============================================================
 */

export function getSalesChart(limit = 7): SalesChartItem[] {
  const grouped: Record<string, number> = {};

  getInvoices().forEach((invoice) => {
    const tanggal = new Date(invoice.date);

    const label = tanggal.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });

    grouped[label] = (grouped[label] || 0) + invoice.grandTotal;
  });

  return Object.entries(grouped)

    .map(([hari, penjualan]) => ({
      hari,

      penjualan,
    }))

    .slice(-limit);
}
