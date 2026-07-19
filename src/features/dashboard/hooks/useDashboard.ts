/**
 * ============================================================
 * Enterprise Dashboard
 * Hook : useDashboard
 * ============================================================
 *
 * Responsibility:
 *
 * - Mengambil analytics dashboard
 * - Executive Intelligence data
 * - Loading state
 * - Manual refresh
 * - Silent background refresh
 * - Storage synchronization
 *
 * ============================================================
 */

import { useCallback, useEffect, useState } from "react";

import {
  getDashboardSummary,
  getExecutiveSummary,
  getRevenueGrowth,
  getProfitAnalytics,
  getCustomerInsight,
  getSalesChart,
  getRecentInvoices,
  getTopProducts,
} from "../../../services/dashboardService";

import type {
  DashboardSummary,
  ExecutiveSummary,
  RevenueGrowth,
  ProfitAnalytics,
  CustomerInsight,
  SalesChartItem,
  RecentInvoiceItem,
  TopProductItem,
} from "../../../types/dashboard";

import type { Barang } from "../../../types/barang";

import { getBarang } from "../../../services/barangService";

const AUTO_REFRESH_INTERVAL = 30000;

export default function useDashboard() {
  const [loading, setLoading] = useState(true);

  const [statistik, setStatistik] = useState<DashboardSummary | null>(null);

  const [salesChart, setSalesChart] = useState<SalesChartItem[]>([]);

  const [recentTransactions, setRecentTransactions] = useState<
    RecentInvoiceItem[]
  >([]);

  const [topProducts, setTopProducts] = useState<TopProductItem[]>([]);

  const [lowStock, setLowStock] = useState<Barang[]>([]);

  const [executiveSummary, setExecutiveSummary] =
    useState<ExecutiveSummary | null>(null);

  const [revenueGrowth, setRevenueGrowth] = useState<RevenueGrowth | null>(
    null,
  );

  const [profitAnalytics, setProfitAnalytics] =
    useState<ProfitAnalytics | null>(null);

  const [customerInsight, setCustomerInsight] =
    useState<CustomerInsight | null>(null);

  /**
   * ==========================================================
   * LOAD DASHBOARD
   *
   * silent:
   * true  = background refresh
   * false = first load/manual
   *
   * ==========================================================
   */

  const loadDashboard = useCallback((silent = false) => {
    if (!silent) {
      setLoading(true);
    }

    try {
      const barang = getBarang();

      setStatistik(getDashboardSummary());

      setExecutiveSummary(getExecutiveSummary());

      setRevenueGrowth(getRevenueGrowth());

      setProfitAnalytics(getProfitAnalytics());

      setCustomerInsight(getCustomerInsight());

      setSalesChart(getSalesChart());

      setRecentTransactions(getRecentInvoices());

      setTopProducts(getTopProducts());

      setLowStock(barang.filter((item) => item.stok <= item.minimalStok));
    } catch (error) {
      console.error("Dashboard loading error:", error);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, []);

  /**
   * Initial Load
   */

  useEffect(() => {
    loadDashboard(false);
  }, [loadDashboard]);

  /**
   * Auto Refresh
   */

  useEffect(() => {
    const timer = window.setInterval(() => {
      loadDashboard(true);
    }, AUTO_REFRESH_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, [loadDashboard]);

  /**
   * Storage Synchronization
   */

  useEffect(() => {
    function handleStorage() {
      loadDashboard(true);
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [loadDashboard]);

  return {
    loading,

    statistik,

    salesChart,

    recentTransactions,

    topProducts,

    lowStock,

    executiveSummary,

    revenueGrowth,

    profitAnalytics,

    customerInsight,

    /**
     * manual refresh
     */
    refresh: () => loadDashboard(false),
  };
}
