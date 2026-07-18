/**
 * ============================================================
 * Enterprise Dashboard Analytics Service
 * ============================================================
 *
 * Dashboard Analytics Layer
 *
 * Saat ini menggunakan Penjualan Domain.
 * Nanti dapat diganti ke Invoice Engine
 * tanpa mengubah UI Dashboard.
 *
 * ============================================================
 */

import type {
  DashboardSummary,
  SalesChartItem,
  RecentInvoiceItem,
  TopProductItem,
  StockAlertItem,
} from "../types/dashboard";

import { getPenjualan } from "./penjualanService";

import { getBarang } from "./barangService";

/**
 * ============================================================
 * Executive Summary
 * ============================================================
 */

export function getDashboardSummary(): DashboardSummary {
  const transaksi = getPenjualan();

  const totalRevenue = transaksi.reduce((total, item) => total + item.total, 0);

  const totalTransaction = transaksi.length;

  const averageTransaction =
    totalTransaction > 0 ? totalRevenue / totalTransaction : 0;

  const customers = new Set(transaksi.map((item) => item.pelangganId));

  return {
    totalRevenue,

    totalTransaction,

    averageTransaction,

    totalCustomer: customers.size,
  };
}

/**
 * ============================================================
 * Sales Chart
 * ============================================================
 */

export function getSalesChart(): SalesChartItem[] {
  const transaksi = getPenjualan();

  const map = new Map<string, number>();

  transaksi.forEach((item) => {
    const tanggal = item.tanggal;

    const current = map.get(tanggal) ?? 0;

    map.set(tanggal, current + item.total);
  });

  return Array.from(map.entries()).map(([date, total]) => ({
    date,

    total,
  }));
}

/**
 * ============================================================
 * Recent Transaction
 * ============================================================
 */

export function getRecentInvoices(): RecentInvoiceItem[] {
  const transaksi = getPenjualan();

  return transaksi

    .slice()

    .sort(
      (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime(),
    )

    .slice(0, 5)

    .map((item) => ({
      id: item.id,

      invoiceNumber: item.nomorNota,

      customerName: item.pelangganNama,

      cashierName: "Kasir",

      total: item.total,

      status: item.status,

      date: item.tanggal,
    }));
}

/**
 * ============================================================
 * Top Product
 * ============================================================
 */

export function getTopProducts(): TopProductItem[] {
  const transaksi = getPenjualan();

  const products = new Map<string, TopProductItem>();

  transaksi.forEach((penjualan) => {
    penjualan.detail.forEach((item) => {
      const existing = products.get(item.barangId);

      if (existing) {
        existing.qty += item.qty;

        existing.revenue += item.subtotal;
      } else {
        products.set(item.barangId, {
          productId: item.barangId,

          productName: item.namaBarang,

          qty: item.qty,

          revenue: item.subtotal,
        });
      }
    });
  });

  return Array.from(products.values())

    .sort((a, b) => b.qty - a.qty)

    .slice(0, 5);
}

/**
 * ============================================================
 * Stock Alert
 * ============================================================
 */

export function getStockAlerts(): StockAlertItem[] {
  const barang = getBarang();

  return barang

    .filter((item) => item.stok <= 20)

    .map((item) => ({
      productId: item.id,

      productName: item.nama,

      stock: item.stok,

      level: item.stok <= 5 ? "critical" : "warning",
    }));
}
