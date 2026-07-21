/**
 * ============================================================
 * Enterprise Dashboard
 * Component : SalesChart
 * ============================================================
 *
 * Responsibility:
 *
 * - Render grafik penjualan
 * - Menerima data dari parent component
 *
 * Tidak bertanggung jawab:
 *
 * ❌ Mengambil data service
 * ❌ Mengakses invoice
 * ❌ Menghitung analytics
 *
 * Performance:
 *
 * ✅ React.memo optimized
 * ✅ Stable formatter function
 *
 * ============================================================
 */

import { memo } from "react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { SalesChartItem } from "../../features/sales/services/dashboardService";

import EmptyState from "./EmptyState";

interface SalesChartProps {
  data: SalesChartItem[];
}

function formatRupiah(value: number) {
  return `Rp ${Number(value).toLocaleString("id-ID")}`;
}

function SalesChart({ data }: SalesChartProps) {
  const hasData = data.length > 0;

  return (
    <div
      className="
        group
        overflow-hidden

        rounded-3xl

        border
        border-gray-200
        dark:border-gray-700

        bg-white
        dark:bg-gray-800

        shadow-sm

        transition-all
        duration-300

        hover:border-blue-200
        hover:shadow-xl

        dark:hover:border-blue-700
      "
    >
      <div
        className="
          border-b
          border-gray-100

          px-6
          py-5

          dark:border-gray-700
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold
                tracking-tight

                text-gray-900

                dark:text-white
              "
            >
              Sales Analytics
            </h2>

            <p
              className="
                mt-1

                text-sm

                text-gray-500

                dark:text-gray-400
              "
            >
              Visualisasi performa penjualan berdasarkan histori transaksi.
            </p>
          </div>

          <div
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              bg-blue-50

              px-3
              py-1

              text-xs
              font-semibold

              text-blue-700

              dark:bg-blue-900/30

              dark:text-blue-300
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full

                bg-blue-500
              "
            />
            Revenue Trend
          </div>
        </div>
      </div>

      <div className="h-96 p-6">
        {!hasData ? (
          <EmptyState
            icon="📈"
            title="Belum ada data penjualan"
            description="Grafik akan otomatis muncul setelah transaksi penjualan mulai tercatat pada sistem."
            minHeight="min-h-full"
          />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid
                stroke="#CBD5E1"
                strokeDasharray="4 4"
                opacity={0.3}
              />

              <XAxis
                dataKey="hari"
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatRupiah(Number(value))}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: 12,

                  border: "1px solid #E5E7EB",

                  boxShadow: "0 10px 25px rgba(0,0,0,.08)",
                }}
                formatter={(value) => [
                  formatRupiah(Number(value)),

                  "Penjualan",
                ]}
              />

              <Legend />

              <Line
                name="Penjualan"
                type="monotone"
                dataKey="penjualan"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{
                  r: 4,

                  strokeWidth: 2,

                  fill: "#2563EB",
                }}
                activeDot={{
                  r: 7,
                }}
                isAnimationActive
                animationDuration={900}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default memo(SalesChart);
