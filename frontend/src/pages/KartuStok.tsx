import { useEffect, useState } from "react";

import { Card, EmptyState, PageHeader } from "../components/ui";

import KartuStokFilter from "../components/kartu-stok/KartuStokFilter";
import KartuStokTable from "../components/kartu-stok/KartuStokTable";

import { getBarang } from "../services/barangService";
import { getStockMovements } from "../services/stockMovementService";

import type { Barang } from "../types/barang";
import type { StockMovement, StockMovementType } from "../types/stockMovement";

export default function KartuStok() {
  const [data, setData] = useState<StockMovement[]>([]);

  const [barang, setBarang] = useState<Barang[]>([]);

  const [loading, setLoading] = useState(false);

  const [barangId, setBarangId] = useState("");

  const [tipe, setTipe] = useState("");

  const [tanggalAwal, setTanggalAwal] = useState("");

  const [tanggalAkhir, setTanggalAkhir] = useState("");

  useEffect(() => {
    setBarang(getBarang());

    loadData();
  }, []);

  const loadData = (
    customBarangId = barangId,
    customTipe = tipe,
    customTanggalAwal = tanggalAwal,
    customTanggalAkhir = tanggalAkhir,
  ) => {
    setLoading(true);

    const result = getStockMovements({
      barangId: customBarangId || undefined,

      tipe: (customTipe || undefined) as StockMovementType | undefined,

      startDate: customTanggalAwal || undefined,

      endDate: customTanggalAkhir || undefined,
    });

    setData(result);

    setLoading(false);
  };

  const handleReset = () => {
    setBarangId("");

    setTipe("");

    setTanggalAwal("");

    setTanggalAkhir("");

    setData(getStockMovements());
  };

  const barangOptions = barang.map((item) => ({
    value: item.id,

    label: `${item.kode} - ${item.nama}`,
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Kartu Stok"
        subtitle="Riwayat pergerakan stok barang"
      />

      <Card>
        <KartuStokFilter
          barangId={barangId}
          tipe={tipe}
          tanggalAwal={tanggalAwal}
          tanggalAkhir={tanggalAkhir}
          barangOptions={barangOptions}
          onBarangChange={setBarangId}
          onTipeChange={setTipe}
          onTanggalAwalChange={setTanggalAwal}
          onTanggalAkhirChange={setTanggalAkhir}
          onFilter={() => loadData(barangId, tipe, tanggalAwal, tanggalAkhir)}
          onReset={handleReset}
        />
      </Card>

      <Card>
        {data.length === 0 && !loading ? (
          <EmptyState
            icon="📦"
            title="Belum Ada Riwayat Stok"
            description="Belum terdapat pergerakan stok barang."
          />
        ) : (
          <KartuStokTable data={data} loading={loading} />
        )}
      </Card>
    </div>
  );
}
