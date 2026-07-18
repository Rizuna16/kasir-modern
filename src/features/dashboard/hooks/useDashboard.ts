/**
 * ============================================================
 * Enterprise Dashboard
 * Hook : useDashboard
 * ============================================================
 *
 * Responsibility:
 *
 * - Mengambil analytics dashboard
 * - Mengelola loading state
 * - Manual refresh
 * - Auto refresh
 * - Storage synchronization
 *
 * ============================================================
 */

import { useCallback, useEffect, useState } from "react";

import {
  getDashboardSummary,
  getSalesChart,
  getRecentTransactions,
  getTopSellingProducts,
  type DashboardSummary,
  type SalesChartItem,
  type RecentTransactionItem,
  type TopProductItem,
} from "../../sales/services/dashboardService";

import type { Barang } from "../../../types/barang";

import { getBarang } from "../../../services/barangService";

const AUTO_REFRESH_INTERVAL = 30000;

export default function useDashboard() {
  const [loading, setLoading] = useState(true);

  const [statistik, setStatistik] = useState<DashboardSummary | null>(null);

  const [salesChart, setSalesChart] = useState<SalesChartItem[]>([]);

  const [recentTransactions, setRecentTransactions] = useState<
    RecentTransactionItem[]
  >([]);

  const [topProducts, setTopProducts] = useState<TopProductItem[]>([]);

  const [lowStock, setLowStock] = useState<Barang[]>([]);

  const loadDashboard = useCallback(() => {
    setLoading(true);

    try {
      setStatistik(getDashboardSummary());

      setSalesChart(getSalesChart());

      setRecentTransactions(getRecentTransactions());

      setTopProducts(getTopSellingProducts());

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
   * Auto Refresh Engine
   */

  useEffect(() => {
    const timer = window.setInterval(
      () => {
        loadDashboard();
      },

      AUTO_REFRESH_INTERVAL,
    );

    return () => {
      window.clearInterval(timer);
    };
  }, [loadDashboard]);

  /**
   * Browser Storage Sync
   *
   * Update dashboard ketika
   * localStorage berubah dari tab lain
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

    statistik,

    salesChart,

    recentTransactions,

    topProducts,

    lowStock,

    refresh: loadDashboard,
  };
}
