import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleRoute from "../components/auth/RoleRoute";

import { PERMISSIONS } from "../config/permissions";

import MainLayout from "../layouts/MainLayout";

import AccessDenied from "../pages/AccessDenied";
import Barang from "../pages/Barang";
import Dashboard from "../pages/Dashboard";
import Kategori from "../pages/Kategori";
import KartuStok from "../pages/KartuStok";
import LaporanPenjualan from "../pages/LaporanPenjualan";
import Login from "../pages/Login";
import Pelanggan from "../pages/Pelanggan";
import Pembelian from "../pages/Pembelian";
import Pengaturan from "../pages/Pengaturan";
import Penjualan from "../pages/Penjualan";
import Satuan from "../pages/Satuan";
import Supplier from "../pages/Supplier";
import User from "../pages/User";

import PenjualanEnterprise from "../features/sales/pages/PenjualanEnterprise";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}

      <Route path="/login" element={<Login />} />

      <Route path="/403" element={<AccessDenied />} />

      {/* Protected */}

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="/"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.DASHBOARD}>
              <Dashboard />
            </RoleRoute>
          }
        />

        <Route
          path="/barang"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.BARANG}>
              <Barang />
            </RoleRoute>
          }
        />

        <Route
          path="/kategori"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.KATEGORI}>
              <Kategori />
            </RoleRoute>
          }
        />

        <Route
          path="/satuan"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.SATUAN}>
              <Satuan />
            </RoleRoute>
          }
        />

        <Route
          path="/supplier"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.SUPPLIER}>
              <Supplier />
            </RoleRoute>
          }
        />

        <Route
          path="/pelanggan"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.PELANGGAN}>
              <Pelanggan />
            </RoleRoute>
          }
        />

        <Route
          path="/user"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.USER}>
              <User />
            </RoleRoute>
          }
        />

        {/* ============================
            PENJUALAN V1
           ============================ */}

        <Route
          path="/penjualan"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.PENJUALAN}>
              <Penjualan />
            </RoleRoute>
          }
        />

        {/* ============================
            PENJUALAN ENTERPRISE
           ============================ */}

        <Route
          path="/penjualan-enterprise"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.PENJUALAN}>
              <PenjualanEnterprise />
            </RoleRoute>
          }
        />

        <Route
          path="/pembelian"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.PEMBELIAN}>
              <Pembelian />
            </RoleRoute>
          }
        />

        <Route
          path="/laporan"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.LAPORAN}>
              <LaporanPenjualan />
            </RoleRoute>
          }
        />

        <Route
          path="/kartu-stok"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.KARTU_STOK}>
              <KartuStok />
            </RoleRoute>
          }
        />

        <Route
          path="/pengaturan"
          element={
            <RoleRoute allowedRoles={PERMISSIONS.PENGATURAN}>
              <Pengaturan />
            </RoleRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
