import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Barang from "../pages/Barang";
import Kategori from "../pages/Kategori";
import Satuan from "../pages/Satuan";
import Supplier from "../pages/Supplier";
import Pelanggan from "../pages/Pelanggan";
import Penjualan from "../pages/Penjualan";
import Pembelian from "../pages/Pembelian";
import LaporanPenjualan from "../pages/LaporanPenjualan";
import Pengaturan from "../pages/Pengaturan";
import Login from "../pages/Login";
import User from "../pages/User";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Layout Utama */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/barang" element={<Barang />} />

        <Route path="/kategori" element={<Kategori />} />

        <Route path="/satuan" element={<Satuan />} />

        <Route path="/supplier" element={<Supplier />} />

        <Route path="/pelanggan" element={<Pelanggan />} />

        <Route path="/user" element={<User />} />

        <Route path="/penjualan" element={<Penjualan />} />

        <Route path="/pembelian" element={<Pembelian />} />

        <Route path="/laporan" element={<LaporanPenjualan />} />

        <Route path="/pengaturan" element={<Pengaturan />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
