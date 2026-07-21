import { PERMISSIONS } from "./permissions";

export const MENU = [
  {
    label: "Dashboard",
    path: "/",
    permissions: PERMISSIONS.DASHBOARD,
  },
  {
    label: "Barang",
    path: "/barang",
    permissions: PERMISSIONS.BARANG,
  },
  {
    label: "Kategori",
    path: "/kategori",
    permissions: PERMISSIONS.KATEGORI,
  },
  {
    label: "Satuan",
    path: "/satuan",
    permissions: PERMISSIONS.SATUAN,
  },
  {
    label: "Supplier",
    path: "/supplier",
    permissions: PERMISSIONS.SUPPLIER,
  },
  {
    label: "Pelanggan",
    path: "/pelanggan",
    permissions: PERMISSIONS.PELANGGAN,
  },
  {
    label: "User",
    path: "/user",
    permissions: PERMISSIONS.USER,
  },
  {
    label: "Penjualan",
    path: "/penjualan",
    permissions: PERMISSIONS.PENJUALAN,
  },
  {
    label: "Pembelian",
    path: "/pembelian",
    permissions: PERMISSIONS.PEMBELIAN,
  },
  {
    label: "Laporan",
    path: "/laporan",
    permissions: PERMISSIONS.LAPORAN,
  },
  {
    label: "Pengaturan",
    path: "/pengaturan",
    permissions: PERMISSIONS.PENGATURAN,
  },
] as const;
