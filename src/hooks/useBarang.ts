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
      id: crypto.randomUUID(),

      kode: form.kode,

      barcode: form.barcode,

      nama: form.nama,

      kategoriId: form.kategoriId,

      satuanId: form.satuanId,

      supplierId: "",

      hargaBeli: form.hargaBeli,

      hargaGrosir: form.hargaGrosir,

      hargaSemiGrosir: form.hargaSemiGrosir,

      hargaEcer: form.hargaEcer,

      stok: form.stok,

      minimalStok: form.minimalStok,

      status: "Aktif",

      createdAt: new Date().toISOString(),

      updatedAt: new Date().toISOString(),
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

  const editBarang = (
    id: string,

    form: BarangFormData,
  ) => {
    const lama = getBarangById(id);

    if (!lama) return;

    updateBarang(
      id,

      {
        kode: form.kode,

        barcode: form.barcode,

        nama: form.nama,

        kategoriId: form.kategoriId,

        satuanId: form.satuanId,

        supplierId: lama.supplierId,

        hargaBeli: form.hargaBeli,

        hargaGrosir: form.hargaGrosir,

        hargaSemiGrosir: form.hargaSemiGrosir,

        hargaEcer: form.hargaEcer,

        stok: form.stok,

        minimalStok: form.minimalStok,

        status: lama.status,

        updatedAt: new Date().toISOString(),
      },
    );

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
