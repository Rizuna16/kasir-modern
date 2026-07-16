import { useEffect, useState } from "react";

import LaporanFilter from "../components/laporan/LaporanFilter";
import LaporanStats from "../components/laporan/LaporanStats";
import LaporanTable from "../components/laporan/LaporanTable";
import DetailPenjualanModal from "../components/laporan/DetailPenjualanModal";
import PrintPenjualan from "../components/laporan/PrintPenjualan";
import ExportExcelButton from "../components/laporan/ExportExcelButton";

import useLaporan from "../hooks/useLaporan";

import type { Penjualan } from "../types/penjualan";

export default function LaporanPenjualan() {
  const {
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
  } = useLaporan();

  const [selectedPrint, setSelectedPrint] = useState<Penjualan | null>(null);

  // =========================
  // RESET SETELAH PRINT
  // =========================

  useEffect(() => {
    const handleAfterPrint = () => {
      setSelectedPrint(null);
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  // =========================
  // PRINT NOTA
  // =========================

  const bukaPrint = (item: Penjualan) => {
    setSelectedPrint(item);

    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-gray-800">Laporan Penjualan</h1>

        <p className="mt-1 text-sm text-gray-500">Rekap transaksi penjualan.</p>
      </div>

      {/* Filter */}

      <LaporanFilter
        tanggalAwal={tanggalAwal}
        tanggalAkhir={tanggalAkhir}
        onTanggalAwalChange={setTanggalAwal}
        onTanggalAkhirChange={setTanggalAkhir}
        onCari={cariLaporan}
        onReset={resetLaporan}
      />

      {/* Export */}

      <div className="flex justify-end">
        <ExportExcelButton data={laporan} />
      </div>

      {/* Statistik */}

      <LaporanStats totalTransaksi={totalTransaksi} totalOmzet={totalOmzet} />

      {/* Table */}

      <LaporanTable data={laporan} onDetail={bukaDetail} onPrint={bukaPrint} />

      {/* Detail Modal */}

      <DetailPenjualanModal
        isOpen={isDetailOpen}
        penjualan={selectedPenjualan}
        onClose={tutupDetail}
      />

      {/* Print Area */}

      {selectedPrint && (
        <div className="hidden print:block">
          <PrintPenjualan penjualan={selectedPrint} />
        </div>
      )}
    </div>
  );
}
