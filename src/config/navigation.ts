import { PERMISSIONS } from "./permissions";

export const NAVIGATION = [
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
    label: "Penjualan Enterprise",
    path: "/penjualan-enterprise",
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
    label: "Kartu Stok",
    path: "/kartu-stok",
    permissions: PERMISSIONS.KARTU_STOK,
  },

  {
    label: "Pengaturan",
    path: "/pengaturan",
    permissions: PERMISSIONS.PENGATURAN,
  },
] as const;
