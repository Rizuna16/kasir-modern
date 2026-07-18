import { useEffect, useState } from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  getSalesChart,
  type SalesChartItem,
} from "../../features/sales/services/dashboardService";

export default function SalesChart() {
  const [data, setData] = useState<SalesChartItem[]>([]);

  useEffect(() => {
    const result = getSalesChart();

    setData(result);
  }, []);

  return (
    <div
      className="
        rounded-2xl

        border
        border-gray-100
        dark:border-gray-700

        bg-white
        dark:bg-gray-800

        p-6

        shadow-sm

        transition-all
        duration-300

        hover:shadow-lg
      "
    >
      <div className="mb-6">
        <h2
          className="
            text-xl
            font-bold

            text-gray-900
            dark:text-white
          "
        >
          Grafik Penjualan
        </h2>

        <p
          className="
            mt-1
            text-sm

            text-gray-500
            dark:text-gray-400
          "
        >
          Performa penjualan selama 7 hari terakhir.
        </p>
      </div>

      <div className="h-80">
        {data.length === 0 ? (
          <div
            className="
              flex
              h-full
              flex-col
              items-center
              justify-center
              gap-3
            "
          >
            <div className="text-5xl">📈</div>

            <p className="font-semibold text-gray-700 dark:text-gray-200">
              Belum ada data penjualan
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Grafik akan muncul setelah transaksi pertama.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                stroke="#CBD5E1"
                strokeDasharray="3 3"
                opacity={0.25}
              />

              <XAxis dataKey="hari" stroke="#9CA3AF" />

              <YAxis stroke="#9CA3AF" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                  padding: "10px",
                  color: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="penjualan"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 7 }}
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
