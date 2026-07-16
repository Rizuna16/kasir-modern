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
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h2 className="text-lg font-bold mb-5">Grafik Penjualan Mingguan</h2>

      <div className="h-[300px]">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Belum ada transaksi penjualan
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="hari" />

              <YAxis />

              <Tooltip />

              <Line type="monotone" dataKey="penjualan" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
