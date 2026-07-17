import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getPenjualan } from "../../services/penjualanService";

interface ChartData {
  hari: string;
  penjualan: number;
}

export default function SalesChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const penjualan = getPenjualan();

    const grouped: Record<string, number> = {};

    penjualan.forEach((item) => {
      const tanggal = new Date(item.tanggal);

      const label = tanggal.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
      });

      grouped[label] = (grouped[label] || 0) + item.total;
    });

    const chartData = Object.entries(grouped).map(([hari, penjualan]) => ({
      hari,
      penjualan,
    }));

    setData(chartData.slice(-7));
  }, []);

  return (
    <div
      className="
        rounded-xl

        border
        border-gray-200

        bg-white

        p-5

        shadow-sm

        transition-all

        duration-200

        dark:border-gray-700

        dark:bg-gray-800
      "
    >
      <h2
        className="
          mb-5

          text-lg

          font-bold

          text-gray-900

          dark:text-white
        "
      >
        Grafik Penjualan Mingguan
      </h2>

      <div className="h-75">
        {data.length === 0 ? (
          <div
            className="
              flex

              h-full

              items-center

              justify-center

              text-gray-500

              dark:text-gray-400
            "
          >
            Belum ada transaksi penjualan
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#6b7280"
                opacity={0.3}
              />

              <XAxis dataKey="hari" stroke="#9ca3af" />

              <YAxis stroke="#9ca3af" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderRadius: "12px",
                  border: "none",
                  color: "#fff",
                }}
              />

              <Line
                type="monotone"
                dataKey="penjualan"
                strokeWidth={3}
                stroke="#2563eb"
                dot={{
                  r: 4,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
