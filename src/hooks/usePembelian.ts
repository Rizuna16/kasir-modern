import { useEffect, useState } from "react";

import type { Pembelian } from "../types/pembelian";

import { getPembelian, deletePembelian } from "../services/pembelianService";

export default function usePembelian() {
  const [pembelian, setPembelian] = useState<Pembelian[]>([]);

  async function loadData() {
    const data = await getPembelian();

    setPembelian(data);
  }

  async function hapus(id: string) {
    await deletePembelian(id);

    loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return {
    pembelian,

    hapus,

    loadData,
  };
}
