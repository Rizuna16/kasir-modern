import { PERMISSIONS } from "./permissions";

export const NAVIGATION = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: "dashboard",
    collapsible: false,

    items: [
      {
        label: "Dashboard",
        path: "/",
        permissions: PERMISSIONS.DASHBOARD,
      },
    ],
  },

  {
    id: "master-data",
    title: "Master Data",
    icon: "database",
    collapsible: true,

    items: [
      {
        label: "Produk",
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
        label: "Pengguna",
        path: "/user",
        permissions: PERMISSIONS.USER,
      },
    ],
  },

  {
    id: "transaksi",
    title: "Transaksi",
    icon: "credit-card",
    collapsible: true,

    items: [
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
    ],
  },

  {
    id: "laporan",
    title: "Laporan",
    icon: "file-chart",
    collapsible: true,

    items: [
      {
        label: "Laporan Penjualan",
        path: "/laporan",
        permissions: PERMISSIONS.LAPORAN,
      },
      {
        label: "Kartu Stok",
        path: "/kartu-stok",
        permissions: PERMISSIONS.KARTU_STOK,
      },
    ],
  },

  {
    id: "pengaturan",
    title: "Pengaturan",
    icon: "settings",
    collapsible: true,

    items: [
      {
        label: "Pengaturan",
        path: "/pengaturan",
        permissions: PERMISSIONS.PENGATURAN,
      },
    ],
  },
] as const;
