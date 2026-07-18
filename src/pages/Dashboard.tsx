/**
 * ============================================================
 * Enterprise Dashboard
 * Page : Dashboard
 * ============================================================
 *
 * Responsibility:
 *
 * - Menampilkan dashboard analytics
 * - Mengatur layout dashboard
 * - Trigger refresh data
 *
 * Data berasal dari:
 *
 * useDashboard()
 *
 * ============================================================
 */

import { RefreshCw } from "lucide-react";

import StatCard from "../components/dashboard/StatCard";

import SalesChart from "../components/dashboard/SalesChart";

import RecentTransaction from "../components/dashboard/RecentTransaction";

import TopProducts from "../components/dashboard/TopProducts";

import LowStock from "../components/dashboard/LowStock";

import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

import useDashboard from "../features/dashboard/hooks/useDashboard";

import { formatRupiah } from "../utils/currency";

export default function Dashboard() {
  const {
    loading,

    statistik,

    salesChart,

    recentTransactions,

    topProducts,

    lowStock,

    refresh,
  } = useDashboard();

  /**
   * ==========================================================
   * Loading State
   * ==========================================================
   */

  if (loading || !statistik) {
    return <DashboardSkeleton />;
  }

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
            Dashboard
          </h1>

          <p
            className="
              text-gray-500

              dark:text-gray-400
            "
          >
            Ringkasan aktivitas toko hari ini
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

            transition-all

            duration-200

            hover:bg-blue-700

            disabled:cursor-not-allowed

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

      {/* KPI CARDS */}

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
          title="Total Penjualan"
          value={formatRupiah(statistik.totalPenjualan)}
          icon="💰"
          color="bg-green-100"
        />

        <StatCard
          title="Transaksi Hari Ini"
          value={statistik.transaksiHariIni}
          icon="🧾"
          color="bg-blue-100"
        />

        <StatCard
          title="Jumlah Barang"
          value={statistik.totalBarang}
          icon="📦"
          color="bg-purple-100"
        />

        <StatCard
          title="Stok Menipis"
          value={statistik.stokMenipis}
          icon="⚠️"
          color="bg-red-100"
        />
      </div>

      {/* SALES ANALYTICS */}

      <SalesChart data={salesChart} />

      {/* RECENT TRANSACTION */}

      <RecentTransaction data={recentTransactions} />

      {/* PRODUCT + STOCK */}

      <div
        className="
          grid

          grid-cols-1

          lg:grid-cols-2

          gap-6
        "
      >
        <TopProducts data={topProducts} />

        <LowStock data={lowStock} />
      </div>
    </div>
  );
}
