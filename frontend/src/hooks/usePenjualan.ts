import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  addPenjualan,
  deletePenjualan,
  getPenjualan,
} from "../services/penjualanService";

import type { Penjualan } from "../types/penjualan";

export default function usePenjualan() {
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  // ambil data penjualan
  const loadPenjualan = () => {
    setLoading(true);

    try {
      const data = getPenjualan();

      setPenjualan(data);
    } catch (error) {
      toast.error("Gagal mengambil data penjualan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPenjualan();
  }, []);

  // tambah transaksi
  const tambahPenjualan = (
    data: Omit<Penjualan, "id" | "createdAt" | "updatedAt">,
  ) => {
    try {
      addPenjualan(data);

      loadPenjualan();

      toast.success("Transaksi penjualan berhasil disimpan");
    } catch (error) {
      toast.error("Gagal menyimpan transaksi penjualan");
    }
  };

  // hapus transaksi
  const hapusPenjualan = (id: string) => {
    try {
      deletePenjualan(id);

      loadPenjualan();

      toast.success("Transaksi penjualan berhasil dihapus");
    } catch (error) {
      toast.error("Gagal menghapus transaksi penjualan");
    }
  };

  return {
    penjualan,

    loading,

    loadPenjualan,

    tambahPenjualan,

    hapusPenjualan,
  };
}
