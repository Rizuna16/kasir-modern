/**
 * ============================================================
 * Enterprise Executive Dashboard
 * Page : Dashboard
 * ============================================================
 *
 * Responsibility:
 *
 * - Menampilkan operational dashboard
 * - Menampilkan executive intelligence
 * - Adapter data service ke UI component
 * - Trigger refresh data
 *
 * Performance:
 *
 * - Memoized adapter
 * - Stable navigation callback
 * - Prevent unnecessary child render
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
   * STABLE NAVIGATION
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

      <DashboardSection
        title="Executive Intelligence"
        description="
        Ringkasan performa bisnis, pertumbuhan pendapatan,
        profitabilitas, dan customer.
        "
      >
        {executiveSummary && <ExecutiveSummaryCard data={executiveSummary} />}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {revenueGrowth && <RevenueGrowthCard data={revenueGrowth} />}

          {profitAnalytics && <ProfitAnalyticsCard data={profitAnalytics} />}
        </div>

        {customerInsight && <CustomerInsightCard data={customerInsight} />}
      </DashboardSection>

      <DashboardSection
        title="Business Performance"
        description="
        Indikator utama yang menggambarkan kondisi bisnis saat ini.
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
            subtitle="
            Total pendapatan seluruh transaksi
            "
          />

          <StatCard
            title="Total Transaksi"
            value={statistik.totalTransaction}
            icon="🧾"
            color="bg-blue-100"
            subtitle="
            Jumlah transaksi yang berhasil
            "
          />

          <StatCard
            title="Customer"
            value={statistik.totalCustomer}
            icon="👥"
            color="bg-purple-100"
            subtitle="
            Customer yang telah bertransaksi
            "
          />

          <StatCard
            title="Average Transaction"
            value={formatRupiah(statistik.averageTransaction)}
            icon="📊"
            color="bg-orange-100"
            subtitle="
            Rata-rata nilai setiap transaksi
            "
          />
        </div>
      </DashboardSection>

      <DashboardSection
        title="Sales Analytics"
        description="
        Visualisasi performa penjualan berdasarkan histori transaksi.
        "
      >
        <SalesChart data={salesChartAdapter} />
      </DashboardSection>

      <DashboardSection
        title="Operational Overview"
        description="
        Pantau transaksi terbaru, produk terlaris,
        dan kondisi stok barang.
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

      <DashboardSection
        title="Quick Actions"
        description="
        Akses cepat ke menu operasional yang paling sering digunakan.
        "
      >
        <QuickActions onNavigate={handleNavigate} />
      </DashboardSection>
    </div>
  );
}
