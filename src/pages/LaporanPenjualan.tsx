import LaporanFilter from "../components/laporan/LaporanFilter";
import LaporanStats from "../components/laporan/LaporanStats";
import LaporanTable from "../components/laporan/LaporanTable";
import DetailPenjualanModal from "../components/laporan/DetailPenjualanModal";

import useLaporan from "../hooks/useLaporan";

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

      {/* Statistik */}

      <LaporanStats totalTransaksi={totalTransaksi} totalOmzet={totalOmzet} />

      {/* Table */}

      <LaporanTable data={laporan} onDetail={bukaDetail} />

      {/* Detail Modal */}

      <DetailPenjualanModal
        isOpen={isDetailOpen}
        penjualan={selectedPenjualan}
        onClose={tutupDetail}
      />
    </div>
  );
}
