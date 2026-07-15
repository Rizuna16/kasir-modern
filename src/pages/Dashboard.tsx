import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import TopProducts from "../components/dashboard/TopProducts";
import LowStock from "../components/dashboard/LowStock";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-gray-500">Ringkasan aktivitas toko hari ini</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Penjualan"
          value="Rp 25.500.000"
          icon="💰"
          color="bg-green-100"
        />

        <StatCard
          title="Transaksi Hari Ini"
          value="125"
          icon="🧾"
          color="bg-blue-100"
        />

        <StatCard
          title="Jumlah Barang"
          value="1.250"
          icon="📦"
          color="bg-purple-100"
        />

        <StatCard
          title="Stok Menipis"
          value="18"
          icon="⚠️"
          color="bg-red-100"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        ...
      </div>

      <SalesChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts />

        <LowStock />
      </div>
    </div>
  );
}
