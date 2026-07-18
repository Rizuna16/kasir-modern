/**
 * ============================================================
 * Enterprise Dashboard Analytics Service
 * ============================================================
 *
 * Dashboard Analytics Layer
 *
 * Operational Dashboard
 * +
 * Executive Intelligence Engine
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

import { getPenjualan } from "./penjualanService";

import { getBarang } from "./barangService";

/**
 * ============================================================
 * Executive Summary Existing Dashboard
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
 * EXECUTIVE SUMMARY ENGINE
 * ============================================================
 */

export function getExecutiveSummary(): ExecutiveSummary {
  const transaksi = getPenjualan();

  const today = new Date().toISOString().split("T")[0];

  const transaksiHariIni = transaksi.filter((item) =>
    item.tanggal.startsWith(today),
  );

  const revenueHariIni = transaksiHariIni.reduce(
    (total, item) => total + item.total,
    0,
  );

  return {
    revenueHariIni,

    totalTransaksiHariIni: transaksiHariIni.length,

    totalCustomerHariIni: new Set(
      transaksiHariIni.map((item) => item.pelangganId),
    ).size,

    averageTransaction:
      transaksiHariIni.length > 0
        ? revenueHariIni / transaksiHariIni.length
        : 0,
  };
}

/**
 * ============================================================
 * REVENUE GROWTH ENGINE
 * ============================================================
 */

export function getRevenueGrowth(): RevenueGrowth {
  const transaksi = getPenjualan();

  const now = new Date();

  const today = now.toISOString().split("T")[0];

  const yesterday = new Date(now.getTime() - 86400000)
    .toISOString()
    .split("T")[0];

  const revenueSekarang = transaksi
    .filter((item) => item.tanggal.startsWith(today))
    .reduce((total, item) => total + item.total, 0);

  const revenueSebelumnya = transaksi
    .filter((item) => item.tanggal.startsWith(yesterday))
    .reduce((total, item) => total + item.total, 0);

  const growthPercentage =
    revenueSebelumnya > 0
      ? ((revenueSekarang - revenueSebelumnya) / revenueSebelumnya) * 100
      : 0;

  return {
    periode: "Hari Ini vs Kemarin",

    revenueSekarang,

    revenueSebelumnya,

    growthPercentage,
  };
}

/**
 * ============================================================
 * PROFIT ANALYTICS ENGINE
 * ============================================================
 */

export function getProfitAnalytics(): ProfitAnalytics {
  const transaksi = getPenjualan();

  const barang = getBarang();

  let totalRevenue = 0;

  let totalModal = 0;

  transaksi.forEach((penjualan) => {
    totalRevenue += penjualan.total;

    penjualan.detail.forEach((detail) => {
      const produk = barang.find((item) => item.id === detail.barangId);

      if (produk) {
        totalModal += produk.hargaBeli * detail.qty;
      }
    });
  });

  const totalProfit = totalRevenue - totalModal;

  return {
    totalRevenue,

    totalModal,

    totalProfit,

    marginPercentage: totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0,
  };
}

/**
 * ============================================================
 * CUSTOMER INSIGHT ENGINE
 * ============================================================
 */

export function getCustomerInsight(): CustomerInsight {
  const transaksi = getPenjualan();

  const customerMap = new Map<string, number>();

  transaksi.forEach((item) => {
    const current = customerMap.get(item.pelangganNama) ?? 0;

    customerMap.set(item.pelangganNama, current + item.total);
  });

  let customerTerbaik = "";

  let totalBelanjaTerbesar = 0;

  customerMap.forEach((total, customer) => {
    if (total > totalBelanjaTerbesar) {
      totalBelanjaTerbesar = total;

      customerTerbaik = customer;
    }
  });

  return {
    totalCustomer: customerMap.size,

    customerTerbaik,

    totalBelanjaTerbesar,

    rataRataBelanjaCustomer:
      customerMap.size > 0
        ? transaksi.reduce((total, item) => total + item.total, 0) /
          customerMap.size
        : 0,
  };
}

/**
 * ============================================================
 * SALES CHART
 * ============================================================
 */

export function getSalesChart(): SalesChartItem[] {
  const transaksi = getPenjualan();

  const map = new Map<string, number>();

  transaksi.forEach((item) => {
    const current = map.get(item.tanggal) ?? 0;

    map.set(item.tanggal, current + item.total);
  });

  return Array.from(map.entries()).map(([date, total]) => ({
    date,
    total,
  }));
}

/**
 * ============================================================
 * RECENT TRANSACTION
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
 * TOP PRODUCT
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
 * STOCK ALERT
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
