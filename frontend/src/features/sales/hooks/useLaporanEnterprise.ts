import { useEffect, useMemo, useState } from "react";

import { toast } from "sonner";

import type { SalesReportItem } from "../services/reportService";

import {
  getSalesReport,
  filterSalesReport,
  calculateSalesTotal,
} from "../services/reportService";

export default function useLaporanEnterprise() {
  const [laporanAwal, setLaporanAwal] = useState<SalesReportItem[]>([]);

  const [laporan, setLaporan] = useState<SalesReportItem[]>([]);

  const [loading, setLoading] = useState(false);

  const [tanggalAwal, setTanggalAwal] = useState("");

  const [tanggalAkhir, setTanggalAkhir] = useState("");

  const [selectedPenjualan, setSelectedPenjualan] =
    useState<SalesReportItem | null>(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  function loadLaporan() {
    setLoading(true);

    try {
      const data = getSalesReport();

      setLaporanAwal(data);

      setLaporan(data);
    } catch {
      toast.error("Gagal mengambil data laporan");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLaporan();
  }, []);

  function cariLaporan() {
    const hasil = filterSalesReport(laporanAwal, tanggalAwal, tanggalAkhir);

    setLaporan(hasil);
  }

  function resetLaporan() {
    setTanggalAwal("");

    setTanggalAkhir("");

    setLaporan(laporanAwal);
  }

  function bukaDetail(item: SalesReportItem) {
    setSelectedPenjualan(item);

    setIsDetailOpen(true);
  }

  function tutupDetail() {
    setSelectedPenjualan(null);

    setIsDetailOpen(false);
  }

  const totalTransaksi = useMemo(
    () => laporan.length,

    [laporan],
  );

  const totalOmzet = useMemo(
    () => calculateSalesTotal(laporan),

    [laporan],
  );

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
