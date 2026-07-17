import { useMemo } from "react";

import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import RecentTransaction from "../components/dashboard/RecentTransaction";
import TopProducts from "../components/dashboard/TopProducts";
import LowStock from "../components/dashboard/LowStock";

import { getBarang } from "../services/barangService";
import { getPenjualan } from "../services/penjualanService";

export default function Dashboard() {
  const statistik = useMemo(() => {
    const barang = getBarang();

    const penjualan = getPenjualan();

    const totalPenjualan = penjualan.reduce(
      (total, item) => total + item.total,
      0,
    );

    const hariIni = new Date().toISOString().slice(0, 10);

    const transaksiHariIni = penjualan.filter(
      (item) => item.tanggal === hariIni,
    ).length;

    const stokMenipis = barang.filter(
      (item) => item.stok <= item.minimalStok,
    ).length;

    return {
      totalBarang: barang.length,

      totalPenjualan,

      transaksiHariIni,

      stokMenipis,
    };
  }, []);

  return (
    <div className="space-y-6">
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
          value={`Rp ${statistik.totalPenjualan.toLocaleString()}`}
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

      <SalesChart />

      <RecentTransaction />

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        "
      >
        <TopProducts />

        <LowStock />
      </div>
    </div>
  );
}
