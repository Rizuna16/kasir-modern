import { useEffect, useState } from "react";

import { Card } from "../components/ui";

import LaporanFilter from "../components/laporan/LaporanFilter";
import LaporanStats from "../components/laporan/LaporanStats";
import LaporanTable from "../components/laporan/LaporanTable";
import DetailPenjualanModal from "../components/laporan/DetailPenjualanModal";
import PrintPenjualan from "../components/laporan/PrintPenjualan";
import ExportExcelButton from "../components/laporan/ExportExcelButton";
import ExportPDFButton from "../components/laporan/ExportPDFButton";

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

  useEffect(() => {
    const handleAfterPrint = () => {
      setSelectedPrint(null);
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const bukaPrint = (item: Penjualan) => {
    setSelectedPrint(item);

    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="
            text-2xl
            font-bold
            text-gray-800
            dark:text-white
          "
        >
          Laporan Penjualan
        </h1>

        <p
          className="
            mt-1
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          Rekap transaksi penjualan.
        </p>
      </div>

      <LaporanFilter
        tanggalAwal={tanggalAwal}
        tanggalAkhir={tanggalAkhir}
        onTanggalAwalChange={setTanggalAwal}
        onTanggalAkhirChange={setTanggalAkhir}
        onCari={cariLaporan}
        onReset={resetLaporan}
      />

      <div className="flex justify-end gap-3">
        <ExportExcelButton data={laporan} />

        <ExportPDFButton data={laporan} />
      </div>

      <LaporanStats totalTransaksi={totalTransaksi} totalOmzet={totalOmzet} />

      <Card>
        <LaporanTable
          data={laporan}
          onDetail={bukaDetail}
          onPrint={bukaPrint}
        />
      </Card>

      <DetailPenjualanModal
        isOpen={isDetailOpen}
        penjualan={selectedPenjualan}
        onClose={tutupDetail}
      />

      {selectedPrint && (
        <div className="hidden print:block">
          <PrintPenjualan penjualan={selectedPrint} />
        </div>
      )}
    </div>
  );
}
