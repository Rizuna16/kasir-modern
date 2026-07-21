/**
 * ============================================================
 * Enterprise Analytics Service
 * ============================================================
 *
 * Responsibility:
 *
 * - Business Analytics
 * - Executive Metrics
 * - Dashboard Calculation
 *
 * Pure analytics layer.
 * Tidak mengambil data dari service lain.
 * Semua data diterima melalui parameter.
 *
 * ============================================================
 */

import type { Barang } from "../types/barang";
import type { Penjualan } from "../types/penjualan";

import type {
  DashboardSummary,
  ExecutiveSummary,
  RevenueGrowth,
  ProfitAnalytics,
  CustomerInsight,
  SalesChartItem,
} from "../types/dashboard";

export function calculateDashboardSummary(
  transaksi: Penjualan[],
): DashboardSummary {
  const totalRevenue = transaksi.reduce((total, item) => total + item.total, 0);

  const totalTransaction = transaksi.length;

  const customers = new Set(transaksi.map((item) => item.pelangganId));

  return {
    totalRevenue,
    totalTransaction,
    totalCustomer: customers.size,
    averageTransaction:
      totalTransaction > 0 ? totalRevenue / totalTransaction : 0,
  };
}

export function calculateExecutiveSummary(
  transaksi: Penjualan[],
): ExecutiveSummary {
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

export function calculateRevenueGrowth(transaksi: Penjualan[]): RevenueGrowth {
  const today = new Date().toISOString().split("T")[0];

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const yesterday = yesterdayDate.toISOString().split("T")[0];

  const revenueSekarang = transaksi
    .filter((item) => item.tanggal.startsWith(today))
    .reduce((total, item) => total + item.total, 0);

  const revenueSebelumnya = transaksi
    .filter((item) => item.tanggal.startsWith(yesterday))
    .reduce((total, item) => total + item.total, 0);

  return {
    periode: "Hari Ini vs Kemarin",
    revenueSekarang,
    revenueSebelumnya,
    growthPercentage:
      revenueSebelumnya > 0
        ? ((revenueSekarang - revenueSebelumnya) / revenueSebelumnya) * 100
        : 0,
  };
}

export function calculateProfitAnalytics(
  transaksi: Penjualan[],
  barang: Barang[],
): ProfitAnalytics {
  const barangMap = new Map(barang.map((item) => [item.id, item]));

  let totalRevenue = 0;
  let totalModal = 0;

  transaksi.forEach((penjualan) => {
    totalRevenue += penjualan.total;

    penjualan.detail.forEach((detail) => {
      const produk = barangMap.get(detail.barangId);

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

export function calculateCustomerInsight(
  transaksi: Penjualan[],
): CustomerInsight {
  const customerMap = new Map<string, number>();

  transaksi.forEach((item) => {
    const current = customerMap.get(item.pelangganNama) ?? 0;

    customerMap.set(item.pelangganNama, current + item.total);
  });

  let customerTerbaik = "";
  let totalBelanjaTerbesar = 0;

  customerMap.forEach((total, nama) => {
    if (total > totalBelanjaTerbesar) {
      totalBelanjaTerbesar = total;
      customerTerbaik = nama;
    }
  });

  const totalRevenue = transaksi.reduce((total, item) => total + item.total, 0);

  return {
    totalCustomer: customerMap.size,
    customerTerbaik,
    totalBelanjaTerbesar,
    rataRataBelanjaCustomer:
      customerMap.size > 0 ? totalRevenue / customerMap.size : 0,
  };
}

export function calculateSalesChart(transaksi: Penjualan[]): SalesChartItem[] {
  const salesMap = new Map<string, number>();

  transaksi.forEach((item) => {
    const date = item.tanggal.split("T")[0];

    const current = salesMap.get(date) ?? 0;

    salesMap.set(date, current + item.total);
  });

  return Array.from(salesMap.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .map(([date, total]) => ({
      date,
      label: date,
      total,
    }));
}
