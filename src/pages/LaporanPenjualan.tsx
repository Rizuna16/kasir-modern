import { useEffect, useState } from "react";

import { Card } from "../components/ui";

import LaporanFilter from "../components/laporan/LaporanFilter";
import LaporanStats from "../components/laporan/LaporanStats";
import LaporanTable from "../components/laporan/LaporanTable";
import DetailPenjualanModal from "../components/laporan/DetailPenjualanModal";

import ExportExcelButton from "../components/laporan/ExportExcelButton";
import ExportPDFButton from "../components/laporan/ExportPDFButton";

import useLaporanEnterprise from "../features/sales/hooks/useLaporanEnterprise";

import type { SalesReportItem } from "../features/sales/services/reportService";

const PRINT_DELAY = 300;

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
  } = useLaporanEnterprise();

  const [selectedPrint, setSelectedPrint] = useState<SalesReportItem | null>(
    null,
  );

  useEffect(() => {
    const handleAfterPrint = () => {
      setSelectedPrint(null);
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const bukaPrint = (item: SalesReportItem) => {
    setSelectedPrint(item);

    setTimeout(() => {
      window.print();
    }, PRINT_DELAY);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
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
          Rekap transaksi Enterprise Sales Engine.
        </p>
      </div>

      {/* FILTER */}

      <LaporanFilter
        tanggalAwal={tanggalAwal}
        tanggalAkhir={tanggalAkhir}
        onTanggalAwalChange={setTanggalAwal}
        onTanggalAkhirChange={setTanggalAkhir}
        onCari={cariLaporan}
        onReset={resetLaporan}
      />

      {/* EXPORT */}

      <Card>
        <div
          className="
            flex
            justify-end
            gap-3
          "
        >
          <ExportExcelButton data={laporan} />

          <ExportPDFButton data={laporan} />
        </div>
      </Card>

      {/* STAT */}

      <LaporanStats totalTransaksi={totalTransaksi} totalOmzet={totalOmzet} />

      {/* TABLE */}

      <Card>
        {laporan.length === 0 ? (
          <div
            className="
              py-10
              text-center
              text-gray-500
              dark:text-gray-400
            "
          >
            Belum ada transaksi penjualan.
          </div>
        ) : (
          <LaporanTable
            data={laporan}
            onDetail={bukaDetail}
            onPrint={bukaPrint}
          />
        )}
      </Card>

      {/* DETAIL */}

      <DetailPenjualanModal
        isOpen={isDetailOpen}
        penjualan={selectedPenjualan}
        onClose={tutupDetail}
      />

      {/* PRINT AREA */}

      {selectedPrint && (
        <div className="hidden print:block">
          {/* Print Enterprise nanti diarahkan ke Invoice */}
        </div>
      )}
    </div>
  );
}
