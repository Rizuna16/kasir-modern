import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    hari: "Sen",
    penjualan: 400000,
  },
  {
    hari: "Sel",
    penjualan: 650000,
  },
  {
    hari: "Rab",
    penjualan: 500000,
  },
  {
    hari: "Kam",
    penjualan: 900000,
  },
  {
    hari: "Jum",
    penjualan: 750000,
  },
  {
    hari: "Sab",
    penjualan: 1200000,
  },
  {
    hari: "Min",
    penjualan: 1000000,
  },
];

export default function SalesChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h2 className="text-lg font-bold mb-5">Grafik Penjualan Mingguan</h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="hari" />

            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="penjualan" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
