import { useEffect, useState } from "react";

import type { Pembelian } from "../types/pembelian";

import { getPembelian, deletePembelian } from "../services/pembelianService";

export default function usePembelian() {
  const [pembelian, setPembelian] = useState<Pembelian[]>([]);

  const [loading, setLoading] = useState(false);

  async function loadData() {
    try {
      setLoading(true);

      const data = await getPembelian();

      setPembelian(data);
    } finally {
      setLoading(false);
    }
  }

  async function hapus(id: string) {
    await deletePembelian(id);

    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return {
    pembelian,

    loading,

    hapus,

    loadData,
  };
}
