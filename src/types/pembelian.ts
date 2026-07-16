export interface DetailPembelian {
  id: string;

  barangId: string;

  namaBarang: string;

  qty: number;

  hargaBeli: number;

  subtotal: number;
}

export interface Pembelian {
  id: string;

  nomorFaktur: string;

  tanggal: string;

  supplierId: string;

  supplierNama: string;

  detail: DetailPembelian[];

  total: number;

  status: "LUNAS" | "BELUM LUNAS";

  createdAt: string;

  updatedAt: string;
}
