import { useState } from "react";
import { toast } from "sonner";

import {
  addBarang,
  deleteBarang,
  getBarang,
  getBarangById,
  updateBarang,
} from "../services/barangService";

import type { Barang } from "../types/barang";
import type { BarangFormData } from "../types/barangForm";

export default function useBarang() {
  const [barang, setBarang] = useState<Barang[]>(getBarang());

  const refreshBarang = () => {
    setBarang(getBarang());
  };

  const tambahBarang = (form: BarangFormData) => {
    if (form.nama.trim() === "") {
      toast.error("Nama barang wajib diisi!");
      return false;
    }

    addBarang({
      kode: form.kode,

      barcode: form.barcode,

      nama: form.nama,

      kategoriId: form.kategoriId,

      satuanId: form.satuanId,

      supplierId: form.supplierId,

      hargaBeli: form.hargaBeli,

      hargaGrosir: form.hargaGrosir,

      hargaSemiGrosir: form.hargaSemiGrosir,

      hargaEcer: form.hargaEcer,

      stok: form.stok,

      minimalStok: form.minimalStok,

      status: form.status,
    });

    refreshBarang();

    toast.success("Barang berhasil ditambahkan!");

    return true;
  };

  const hapusBarang = (id: string) => {
    deleteBarang(id);

    refreshBarang();

    toast.success("Barang berhasil dihapus!");
  };

  const ambilBarang = (id: string) => {
    return getBarangById(id);
  };

  const editBarang = (id: string, form: BarangFormData) => {
    updateBarang(id, {
      kode: form.kode,

      barcode: form.barcode,

      nama: form.nama,

      kategoriId: form.kategoriId,

      satuanId: form.satuanId,

      supplierId: form.supplierId,

      hargaBeli: form.hargaBeli,

      hargaGrosir: form.hargaGrosir,

      hargaSemiGrosir: form.hargaSemiGrosir,

      hargaEcer: form.hargaEcer,

      stok: form.stok,

      minimalStok: form.minimalStok,

      status: form.status,
    });

    refreshBarang();

    toast.success("Barang berhasil diperbarui!");
  };

  return {
    barang,

    refreshBarang,

    tambahBarang,

    hapusBarang,

    ambilBarang,

    editBarang,
  };
}
