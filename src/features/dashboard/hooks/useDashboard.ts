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
 * - Auto refresh
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

  const loadDashboard = useCallback(() => {
    setLoading(true);

    try {
      setStatistik(getDashboardSummary());

      setExecutiveSummary(getExecutiveSummary());

      setRevenueGrowth(getRevenueGrowth());

      setProfitAnalytics(getProfitAnalytics());

      setCustomerInsight(getCustomerInsight());

      setSalesChart(getSalesChart());

      setRecentTransactions(getRecentInvoices());

      setTopProducts(getTopProducts());

      setLowStock(getBarang().filter((item) => item.stok <= item.minimalStok));
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Initial Load
   */

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  /**
   * Auto Refresh
   */

  useEffect(() => {
    const timer = window.setInterval(() => {
      loadDashboard();
    }, AUTO_REFRESH_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, [loadDashboard]);

  /**
   * Storage Sync
   */

  useEffect(() => {
    function handleStorage() {
      loadDashboard();
    }

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

    refresh: loadDashboard,
  };
}
