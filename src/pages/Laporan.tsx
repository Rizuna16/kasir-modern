import LaporanFilter from "../components/laporan/LaporanFilter";
import LaporanStats from "../components/laporan/LaporanStats";
import LaporanTable from "../components/laporan/LaporanTable";
import DetailPenjualanModal from "../components/laporan/DetailPenjualanModal";

import useLaporanEnterprise from "../features/sales/hooks/useLaporanEnterprise";

export default function Laporan() {
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

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-5">
        <h1 className="text-2xl font-bold">Laporan Penjualan</h1>

        <p className="text-sm text-gray-500">
          Rekap transaksi penjualan enterprise
        </p>
      </div>

      {/* Filter */}

      <div className="mb-5">
        <LaporanFilter
          tanggalAwal={tanggalAwal}
          tanggalAkhir={tanggalAkhir}
          onTanggalAwalChange={setTanggalAwal}
          onTanggalAkhirChange={setTanggalAkhir}
          onCari={cariLaporan}
          onReset={resetLaporan}
        />
      </div>

      {/* Statistik */}

      <div className="mb-5">
        <LaporanStats totalTransaksi={totalTransaksi} totalOmzet={totalOmzet} />
      </div>

      {/* Table */}

      <LaporanTable data={laporan} onDetail={bukaDetail} />

      {/* Detail */}

      <DetailPenjualanModal
        isOpen={isDetailOpen}
        penjualan={selectedPenjualan}
        onClose={tutupDetail}
      />
    </div>
  );
}
