/**
 * ============================================================
 * Enterprise Dashboard
 * Hook : useDashboard
 * ============================================================
 *
 * Responsibility:
 *
 * - Dashboard analytics orchestration
 * - Executive Intelligence data
 * - Loading state management
 * - Manual refresh
 * - Silent background refresh
 * - Storage synchronization
 *
 * Architecture:
 *
 * Component
 *      |
 *      v
 * useDashboard
 *      |
 *      v
 * Dashboard Services
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

import { getBarang } from "../../../services/barangService";

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

const AUTO_REFRESH_INTERVAL = 30000;

export default function useDashboard() {
  const [loading, setLoading] = useState(true);

  /**
   * Operational Dashboard
   */

  const [statistik, setStatistik] = useState<DashboardSummary | null>(null);

  const [salesChart, setSalesChart] = useState<SalesChartItem[]>([]);

  const [recentTransactions, setRecentTransactions] = useState<
    RecentInvoiceItem[]
  >([]);

  const [topProducts, setTopProducts] = useState<TopProductItem[]>([]);

  const [lowStock, setLowStock] = useState<Barang[]>([]);

  /**
   * Executive Intelligence
   */

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
   * =========================================================
   * LOAD DASHBOARD DATA
   *
   * silent:
   *
   * false
   * - initial loading
   * - manual refresh
   *
   * true
   * - background refresh
   *
   * =========================================================
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
      console.error("Dashboard analytics error:", error);
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, []);

  /**
   * Manual refresh
   */

  const refresh = useCallback(() => {
    loadDashboard(false);
  }, [loadDashboard]);

  /**
   * Initial Load
   */

  useEffect(() => {
    loadDashboard(false);
  }, [loadDashboard]);

  /**
   * Background Auto Refresh
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
    const handleStorage = () => {
      loadDashboard(true);
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [loadDashboard]);

  return {
    loading,

    /**
     * Operational
     */

    statistik,

    salesChart,

    recentTransactions,

    topProducts,

    lowStock,

    /**
     * Executive
     */

    executiveSummary,

    revenueGrowth,

    profitAnalytics,

    customerInsight,

    /**
     * Actions
     */

    refresh,
  };
}
