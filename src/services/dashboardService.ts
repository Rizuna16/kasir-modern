/**
 * ============================================================
 * Enterprise Dashboard Analytics Service V2
 * ============================================================
 *
 * Dashboard Intelligence Engine
 *
 * Responsibility:
 *
 * - Operational Analytics
 * - Executive Intelligence
 * - Business Metrics
 * - Performance Calculation
 *
 * Architecture:
 *
 * UI
 *  ↓
 * Hook
 *  ↓
 * Dashboard Service
 *  ↓
 * Domain Services
 *
 * ============================================================
 */

import type {
  DashboardSummary,
  SalesChartItem,
  RecentInvoiceItem,
  TopProductItem,
  StockAlertItem,
  ExecutiveSummary,
  RevenueGrowth,
  ProfitAnalytics,
  CustomerInsight,
} from "../types/dashboard";
import {
  calculateDashboardSummary,
  calculateExecutiveSummary,
  calculateRevenueGrowth,
  calculateProfitAnalytics,
} from "./analyticsService";
import { getPenjualan } from "./penjualanService";

import { getBarang } from "./barangService";

/**
 * ============================================================
 * INTERNAL DATA SNAPSHOT
 * ============================================================
 *
 * Semua analytics memakai snapshot yang sama.
 *
 * Benefit:
 *
 * - Menghindari pembacaan service berulang
 * - Lebih siap migrasi API
 * - Performance lebih stabil
 *
 * ============================================================
 */

function getDashboardSnapshot() {
  return {
    transaksi: getPenjualan(),

    barang: getBarang(),
  };
}

export function getDashboardSummary(): DashboardSummary {
  const { transaksi } = getDashboardSnapshot();

  return calculateDashboardSummary(transaksi);
}

/**
 * ============================================================
 * EXECUTIVE SUMMARY ENGINE
 * ============================================================
 */

export function getExecutiveSummary(): ExecutiveSummary {
  const { transaksi } = getDashboardSnapshot();

  return calculateExecutiveSummary(transaksi);
}

/**
 * ============================================================
 * REVENUE GROWTH
 * ============================================================
 */

export function getRevenueGrowth(): RevenueGrowth {
  const { transaksi } = getDashboardSnapshot();

  return calculateRevenueGrowth(transaksi);
}

/**
 * ============================================================
 * PROFIT ANALYTICS
 * ============================================================
 */

export function getProfitAnalytics(): ProfitAnalytics {
  const { transaksi, barang } = getDashboardSnapshot();

  return calculateProfitAnalytics(transaksi, barang);
}
/**
 * ============================================================
 * CUSTOMER INSIGHT ENGINE
 * ============================================================
 */

export function getCustomerInsight(): CustomerInsight {
  const { transaksi } = getDashboardSnapshot();

  const customerMap = new Map<string, number>();

  transaksi.forEach((item) => {
    const current = customerMap.get(item.pelangganNama) ?? 0;

    customerMap.set(
      item.pelangganNama,

      current + item.total,
    );
  });

  let customerTerbaik = "";

  let totalBelanjaTerbesar = 0;

  customerMap.forEach((total, nama) => {
    if (total > totalBelanjaTerbesar) {
      totalBelanjaTerbesar = total;

      customerTerbaik = nama;
    }
  });

  const totalRevenue = transaksi.reduce(
    (total, item) => total + item.total,

    0,
  );

  return {
    totalCustomer: customerMap.size,

    customerTerbaik,

    totalBelanjaTerbesar,

    rataRataBelanjaCustomer:
      customerMap.size > 0 ? totalRevenue / customerMap.size : 0,
  };
}

/**
 * ============================================================
 * SALES CHART ENGINE
 * ============================================================
 */

export function getSalesChart(): SalesChartItem[] {
  const { transaksi } = getDashboardSnapshot();

  const salesMap = new Map<string, number>();

  transaksi.forEach((item) => {
    const date = item.tanggal.split("T")[0];

    const current = salesMap.get(date) ?? 0;

    salesMap.set(
      date,

      current + item.total,
    );
  });

  return Array.from(salesMap.entries())

    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())

    .map(([date, total]) => ({
      date,

      label: date,

      total,
    }));
}

/**
 * ============================================================
 * RECENT TRANSACTION ENGINE
 * ============================================================
 */

export function getRecentInvoices(): RecentInvoiceItem[] {
  const { transaksi } = getDashboardSnapshot();

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
 * TOP PRODUCT ENGINE
 * ============================================================
 */

export function getTopProducts(): TopProductItem[] {
  const { transaksi } = getDashboardSnapshot();

  const productMap = new Map<string, TopProductItem>();

  transaksi.forEach((penjualan) => {
    penjualan.detail.forEach((detail) => {
      const existing = productMap.get(detail.barangId);

      if (existing) {
        existing.qty += detail.qty;

        existing.revenue += detail.subtotal;
      } else {
        productMap.set(
          detail.barangId,

          {
            barangId: detail.barangId,

            namaBarang: detail.namaBarang,

            productId: detail.barangId,

            productName: detail.namaBarang,

            qty: detail.qty,

            revenue: detail.subtotal,
          },
        );
      }
    });
  });

  return Array.from(productMap.values())

    .sort((a, b) => b.qty - a.qty)

    .slice(0, 5);
}

/**
 * ============================================================
 * STOCK ALERT ENGINE
 * ============================================================
 */

export function getStockAlerts(): StockAlertItem[] {
  const { barang } = getDashboardSnapshot();

  return barang

    .filter((item) => item.stok <= item.minimalStok)

    .map((item) => ({
      barangId: item.id,

      productId: item.id,

      namaBarang: item.nama,

      productName: item.nama,

      stok: item.stok,

      stock: item.stok,

      minimumStok: item.minimalStok,

      level: item.stok <= 5 ? "critical" : "warning",
    }));
}
