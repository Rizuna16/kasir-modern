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
 * ============================================================
 */

import { RefreshCw } from "lucide-react";

import { useNavigate } from "react-router-dom";

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

  if (loading || !statistik) {
    return <DashboardSkeleton />;
  }

  /**
   * ==========================================================
   * DATA ADAPTER
   * ==========================================================
   */

  const salesChartAdapter = salesChart.map((item) => ({
    hari: item.label ?? item.date ?? "-",

    penjualan: item.total,
  }));

  const recentTransactionAdapter = recentTransactions.map((item) => ({
    id: item.id,

    nomorNota: item.invoice ?? item.invoiceNumber ?? "-",

    pelangganNama: item.customer ?? item.customerName ?? "Umum",

    total: item.total,

    tanggal: item.tanggal ?? item.date ?? "-",

    status: item.status ?? "LUNAS",
  }));

  const topProductsAdapter = topProducts.map((item) => ({
    barangId: item.barangId ?? item.productId ?? "-",

    namaBarang: item.namaBarang ?? item.productName ?? "-",

    qty: item.qty ?? item.jumlahTerjual ?? 0,

    revenue: item.revenue ?? item.totalPenjualan ?? 0,
  }));

  return (
    <div
      className="
        space-y-6
      "
    >
      {/* HEADER */}

      <div
        className="
          flex

          items-start

          justify-between

          gap-4
        "
      >
        <div>
          <h1
            className="
              text-3xl

              font-bold

              text-gray-900

              dark:text-white
            "
          >
            Executive Dashboard
          </h1>

          <p
            className="
              text-gray-500

              dark:text-gray-400
            "
          >
            Business intelligence overview
          </p>
        </div>

        <button
          onClick={refresh}
          disabled={loading}
          className="
            flex

            items-center

            gap-2

            rounded-xl

            bg-blue-600

            px-4

            py-2

            text-sm

            font-semibold

            text-white

            hover:bg-blue-700

            disabled:opacity-50
          "
        >
          <RefreshCw
            className={`
              h-4

              w-4

              ${loading ? "animate-spin" : ""}
            `}
          />
          Refresh
        </button>
      </div>

      {/* EXECUTIVE INTELLIGENCE */}

      {executiveSummary && <ExecutiveSummaryCard data={executiveSummary} />}

      <div
        className="
          grid

          grid-cols-1

          lg:grid-cols-2

          gap-6
        "
      >
        {revenueGrowth && <RevenueGrowthCard data={revenueGrowth} />}

        {profitAnalytics && <ProfitAnalyticsCard data={profitAnalytics} />}
      </div>

      {customerInsight && <CustomerInsightCard data={customerInsight} />}

      {/* KPI */}

      <div
        className="
          grid

          grid-cols-1

          md:grid-cols-2

          xl:grid-cols-4

          gap-5
        "
      >
        <StatCard
          title="Revenue"
          value={formatRupiah(statistik.totalRevenue)}
          icon="💰"
          color="bg-green-100"
        />

        <StatCard
          title="Total Transaksi"
          value={statistik.totalTransaction}
          icon="🧾"
          color="bg-blue-100"
        />

        <StatCard
          title="Customer"
          value={statistik.totalCustomer}
          icon="👥"
          color="bg-purple-100"
        />

        <StatCard
          title="Average Transaction"
          value={formatRupiah(statistik.averageTransaction)}
          icon="📊"
          color="bg-orange-100"
        />
      </div>

      {/* SALES ANALYTICS */}

      <SalesChart data={salesChartAdapter} />

      {/* RECENT TRANSACTION */}

      <RecentTransaction data={recentTransactionAdapter} />

      {/* PRODUCT STOCK */}

      <div
        className="
          grid

          grid-cols-1

          lg:grid-cols-2

          gap-6
        "
      >
        <TopProducts data={topProductsAdapter} />

        <LowStock data={lowStock} />
      </div>

      {/* QUICK ACTION */}

      <QuickActions onNavigate={(path) => navigate(path)} />
    </div>
  );
}
