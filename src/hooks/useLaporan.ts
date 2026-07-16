import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { getPenjualan } from "../services/penjualanService";

import type { Penjualan } from "../types/penjualan";

export default function useLaporan() {
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);

  const [laporan, setLaporan] = useState<Penjualan[]>([]);

  const [loading, setLoading] = useState(false);

  const [tanggalAwal, setTanggalAwal] = useState("");

  const [tanggalAkhir, setTanggalAkhir] = useState("");

  const [selectedPenjualan, setSelectedPenjualan] = useState<Penjualan | null>(
    null,
  );

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // =========================
  // LOAD DATA LAPORAN
  // =========================

  const loadLaporan = () => {
    setLoading(true);

    try {
      const data = getPenjualan();

      setPenjualan(data);

      setLaporan(data);
    } catch (error) {
      toast.error("Gagal mengambil data laporan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLaporan();
  }, []);

  // =========================
  // FILTER LAPORAN
  // =========================

  const cariLaporan = () => {
    if (!tanggalAwal || !tanggalAkhir) {
      setLaporan(penjualan);

      return;
    }

    const hasil = penjualan.filter((item) => {
      return item.tanggal >= tanggalAwal && item.tanggal <= tanggalAkhir;
    });

    setLaporan(hasil);
  };

  // =========================
  // RESET FILTER
  // =========================

  const resetLaporan = () => {
    setTanggalAwal("");

    setTanggalAkhir("");

    setLaporan(penjualan);
  };

  // =========================
  // DETAIL PENJUALAN
  // =========================

  const bukaDetail = (item: Penjualan) => {
    setSelectedPenjualan(item);

    setIsDetailOpen(true);
  };

  const tutupDetail = () => {
    setSelectedPenjualan(null);

    setIsDetailOpen(false);
  };

  // =========================
  // STATISTIK
  // =========================

  const totalTransaksi = useMemo(() => {
    return laporan.length;
  }, [laporan]);

  const totalOmzet = useMemo(() => {
    return laporan.reduce((total, item) => total + item.total, 0);
  }, [laporan]);

  return {
    loading,

    laporan,

    tanggalAwal,

    tanggalAkhir,

    setTanggalAwal,

    setTanggalAkhir,

    cariLaporan,

    resetLaporan,

    totalTransaksi,

    totalOmzet,

    selectedPenjualan,

    isDetailOpen,

    bukaDetail,

    tutupDetail,

    loadLaporan,
  };
}
