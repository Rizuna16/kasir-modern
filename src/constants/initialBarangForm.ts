import type { BarangFormData } from "../types/barangForm";

export const initialBarangForm: BarangFormData = {
  kode: "",

  barcode: "",

  nama: "",

  kategoriId: "",

  satuanId: "",

  supplierId: "",

  hargaBeli: 0,

  hargaGrosir: 0,

  hargaSemiGrosir: 0,

  hargaEcer: 0,

  stok: 0,

  minimalStok: 0,

  status: "Aktif",
};
