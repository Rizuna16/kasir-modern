import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { Pelanggan } from "../types/pelanggan";

import type { PelangganFormData } from "../types/pelangganForm";

import {
  getPelanggan,
  addPelanggan,
  updatePelanggan,
  deletePelanggan,
} from "../services/pelangganService";

interface UsePelangganReturn {
  pelanggan: Pelanggan[];

  loadPelanggan: () => void;

  tambahPelanggan: (data: PelangganFormData) => boolean;

  editPelanggan: (id: number, data: PelangganFormData) => void;

  hapusPelanggan: (id: number) => void;
}

export default function usePelanggan(): UsePelangganReturn {
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);

  const loadPelanggan = () => {
    const data = getPelanggan();

    setPelanggan(data);
  };

  useEffect(() => {
    loadPelanggan();
  }, []);

  const mappingForm = (data: PelangganFormData) => ({
    kode: data.kode,

    nama: data.nama,

    telepon: data.telepon,

    email: data.email,

    alamat: data.alamat,

    kota: data.kota,

    aktif: data.aktif,

    catatan: data.catatan,
  });

  const tambahPelanggan = (data: PelangganFormData) => {
    if (data.nama.trim() === "") {
      toast.error("Nama pelanggan wajib diisi!");

      return false;
    }

    addPelanggan(mappingForm(data));

    loadPelanggan();

    toast.success("Pelanggan berhasil ditambahkan!");

    return true;
  };

  const editPelanggan = (
    id: number,

    data: PelangganFormData,
  ) => {
    if (data.nama.trim() === "") {
      toast.error("Nama pelanggan wajib diisi!");

      return;
    }

    updatePelanggan(id, mappingForm(data));

    loadPelanggan();

    toast.success("Pelanggan berhasil diperbarui!");
  };

  const hapusPelanggan = (id: number) => {
    deletePelanggan(id);

    loadPelanggan();

    toast.success("Pelanggan berhasil dihapus!");
  };

  return {
    pelanggan,

    loadPelanggan,

    tambahPelanggan,

    editPelanggan,

    hapusPelanggan,
  };
}
