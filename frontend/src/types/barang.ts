export interface Barang {
  id: string;

  kode: string;
  barcode: string;

  nama: string;

  kategoriId: string;
  satuanId: string;
  supplierId: string;

  hargaBeli: number;
  hargaGrosir: number;
  hargaSemiGrosir: number;
  hargaEcer: number;

  stok: number;
  minimalStok: number;

  status: "Aktif" | "Nonaktif";

  createdAt: string;
  updatedAt: string;
}
