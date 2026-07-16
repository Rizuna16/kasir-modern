export interface DetailPenjualan {
  id: string;

  barangId: string;

  namaBarang: string;

  qty: number;

  hargaJual: number;

  subtotal: number;
}

export interface Penjualan {
  id: string;

  nomorNota: string;

  tanggal: string;

  pelangganId: number;

  pelangganNama: string;

  detail: DetailPenjualan[];

  total: number;

  status: "LUNAS" | "BELUM LUNAS";

  createdAt: string;

  updatedAt: string;
}
