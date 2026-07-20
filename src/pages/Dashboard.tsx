/**
 * ============================================================
 * Enterprise Executive Dashboard
 * Page : Dashboard
 * ============================================================
 *
 * Responsibility:
 *
 * - Operational dashboard
 * - Executive intelligence
 * - Inventory intelligence
 * - Business analytics
 *
 * Architecture:
 *
 * UI
 *  |
 *  v
 * useDashboard
 *  |
 *  v
 * Dashboard Services
 *
 * ============================================================
 */

import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSection from "../components/dashboard/DashboardSection";
import StatCard from "../components/dashboard/StatCard";

import SalesChart from "../components/dashboard/SalesChart";
import RecentTransaction from "../components/dashboard/RecentTransaction";
import TopProducts from "../components/dashboard/TopProducts";
import LowStock from "../components/dashboard/LowStock";

import InventorySummaryCard from "../components/dashboard/inventory/InventorySummaryCard";
import LowStockAlert from "../components/dashboard/inventory/LowStockAlert";
import FastMovingTable from "../components/dashboard/inventory/FastMovingTable";
import SlowMovingTable from "../components/dashboard/inventory/SlowMovingTable";
import InventoryHealthCard from "../components/dashboard/inventory/InventoryHealthCard";

import ExecutiveSummaryCard from "../components/dashboard/ExecutiveSummaryCard";
import RevenueGrowthCard from "../components/dashboard/RevenueGrowthCard";
import ProfitAnalyticsCard from "../components/dashboard/ProfitAnalyticsCard";
import CustomerInsightCard from "../components/dashboard/CustomerInsightCard";

import QuickActions from "../components/dashboard/QuickActions";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

import useDashboard from "../features/dashboard/hooks/useDashboard";

import { formatRupiah } from "../utils/currency";

export default function Dashboard() {
  const navigate = useNavigate();

  const {
    loading,

    statistik,

    inventory,

    executiveSummary,

    revenueGrowth,

    profitAnalytics,

    customerInsight,

    salesChart,

    recentTransactions,

    topProducts,

    lowStock,

    refresh,
  } = useDashboard();

  /**
   * ==========================================================
   * NAVIGATION
   * ==========================================================
   */

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  /**
   * ==========================================================
   * DATA ADAPTER
   * ==========================================================
   */

  const salesChartAdapter = useMemo(
    () =>
      salesChart.map((item) => ({
        hari: item.label ?? item.date ?? "-",

        penjualan: item.total,
      })),
    [salesChart],
  );

  const recentTransactionAdapter = useMemo(
    () =>
      recentTransactions.map((item) => ({
        id: item.id,

        nomorNota: item.invoice ?? item.invoiceNumber ?? "-",

        pelangganNama: item.customer ?? item.customerName ?? "Umum",

        total: item.total,

        tanggal: item.tanggal ?? item.date ?? "-",

        status: item.status ?? "LUNAS",
      })),
    [recentTransactions],
  );

  const topProductsAdapter = useMemo(
    () =>
      topProducts.map((item) => ({
        barangId: item.barangId ?? item.productId ?? "-",

        namaBarang: item.namaBarang ?? item.productName ?? "-",

        qty: item.qty ?? item.jumlahTerjual ?? 0,

        revenue: item.revenue ?? item.totalPenjualan ?? 0,
      })),
    [topProducts],
  );

  /**
   * ==========================================================
   * LOADING STATE
   * ==========================================================
   */

  if (loading || !statistik) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <DashboardHeader loading={loading} onRefresh={refresh} />

      {/* =====================================================
          EXECUTIVE INTELLIGENCE
      ===================================================== */}

      <DashboardSection
        title="Executive Intelligence"
        description="
        Ringkasan performa bisnis,
        pertumbuhan revenue,
        profit,
        dan customer insight.
        "
      >
        {executiveSummary && <ExecutiveSummaryCard data={executiveSummary} />}

        <div
          className="
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-2
          "
        >
          {revenueGrowth && <RevenueGrowthCard data={revenueGrowth} />}

          {profitAnalytics && <ProfitAnalyticsCard data={profitAnalytics} />}
        </div>

        {customerInsight && <CustomerInsightCard data={customerInsight} />}
      </DashboardSection>

      {/* =====================================================
          BUSINESS PERFORMANCE
      ===================================================== */}

      <DashboardSection
        title="Business Performance"
        description="
        KPI utama operasional bisnis.
        "
      >
        <div
          className="
          grid
          grid-cols-1
          gap-5
          md:grid-cols-2
          xl:grid-cols-4
          "
        >
          <StatCard
            title="Revenue"
            value={formatRupiah(statistik.totalRevenue)}
            icon="💰"
            color="bg-green-100"
            subtitle="Total pendapatan"
          />

          <StatCard
            title="Transaksi"
            value={statistik.totalTransaction}
            icon="🧾"
            color="bg-blue-100"
            subtitle="Jumlah transaksi"
          />

          <StatCard
            title="Customer"
            value={statistik.totalCustomer}
            icon="👥"
            color="bg-purple-100"
            subtitle="Customer aktif"
          />

          <StatCard
            title="Average Transaction"
            value={formatRupiah(statistik.averageTransaction)}
            icon="📊"
            color="bg-orange-100"
            subtitle="Rata-rata transaksi"
          />
        </div>
      </DashboardSection>

      {/* =====================================================
          SALES ANALYTICS
      ===================================================== */}

      <DashboardSection
        title="Sales Analytics"
        description="
        Visualisasi trend penjualan.
        "
      >
        <SalesChart data={salesChartAdapter} />
      </DashboardSection>

      {/* =====================================================
          INVENTORY INTELLIGENCE
      ===================================================== */}

      {inventory && (
        <DashboardSection
          title="Inventory Intelligence"
          description="
          Analisa kesehatan stok,
          fast moving,
          slow moving,
          dan alert inventory.
          "
        >
          <InventorySummaryCard summary={inventory} />

          <div className="mt-6">
            <InventoryHealthCard data={inventory.inventoryHealth} />
          </div>

          <div className="mt-6">
            <LowStockAlert data={inventory.lowStockProducts} />
          </div>

          <div
            className="
            mt-6
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-2
            "
          >
            <FastMovingTable data={inventory.fastMovingProducts} />

            <SlowMovingTable data={inventory.slowMovingProducts} />
          </div>
        </DashboardSection>
      )}

      {/* =====================================================
          OPERATIONAL OVERVIEW
      ===================================================== */}

      <DashboardSection
        title="Operational Overview"
        description="
        Monitoring transaksi dan stok harian.
        "
      >
        <RecentTransaction data={recentTransactionAdapter} />

        <div
          className="
          mt-6
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-2
          "
        >
          <TopProducts data={topProductsAdapter} />

          <LowStock data={lowStock} />
        </div>
      </DashboardSection>

      {/* =====================================================
          QUICK ACTION
      ===================================================== */}

      <DashboardSection
        title="Quick Actions"
        description="
        Akses cepat menu operasional.
        "
      >
        <QuickActions onNavigate={handleNavigate} />
      </DashboardSection>
    </div>
  );
}
