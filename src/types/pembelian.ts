export interface Pembelian {
  id: number;

  nomor_faktur: string;

  tanggal: string;

  supplier: string;

  total: number;

  status: "LUNAS" | "BELUM LUNAS";
}
