import { useEffect, useState } from "react";

import type { Pelanggan } from "../types/pelanggan";

import {
  getPelanggan,
  addPelanggan,
  updatePelanggan,
  deletePelanggan,
} from "../services/pelangganService";

export default function usePelanggan() {
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);

  const loadPelanggan = () => {
    const data = getPelanggan();

    setPelanggan(data);
  };

  useEffect(() => {
    loadPelanggan();
  }, []);

  const tambahPelanggan = (data: Omit<Pelanggan, "id">) => {
    addPelanggan(data);

    loadPelanggan();
  };

  const editPelanggan = (id: number, data: Omit<Pelanggan, "id">) => {
    updatePelanggan(id, data);

    loadPelanggan();
  };

  const hapusPelanggan = (id: number) => {
    deletePelanggan(id);

    loadPelanggan();
  };

  return {
    pelanggan,

    loadPelanggan,

    tambahPelanggan,

    editPelanggan,

    hapusPelanggan,
  };
}
