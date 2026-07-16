import { useState } from "react";

import PembelianTable from "../components/pembelian/PembelianTable";
import PembelianModal from "../components/pembelian/PembelianModal";
import PembelianDetailModal from "../components/pembelian/PembelianDetailModal";

import usePembelian from "../hooks/usePembelian";

import type { Pembelian as PembelianType } from "../types/pembelian";

export default function Pembelian() {
  const { pembelian, loadData } = usePembelian();

  const [isTambahOpen, setIsTambahOpen] = useState(false);

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [selectedPembelian, setSelectedPembelian] =
    useState<PembelianType | null>(null);

  const handleDetail = (item: PembelianType) => {
    setSelectedPembelian(item);

    setIsDetailOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Transaksi Pembelian</h1>

        <button
          onClick={() => {
            setIsTambahOpen(true);
          }}
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Tambah Pembelian
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <PembelianTable data={pembelian} onDetail={handleDetail} />
      </div>

      <PembelianModal
        isOpen={isTambahOpen}
        onClose={() => {
          setIsTambahOpen(false);
        }}
        onSave={() => {
          setIsTambahOpen(false);

          loadData();
        }}
      />

      <PembelianDetailModal
        isOpen={isDetailOpen}
        pembelian={selectedPembelian}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedPembelian(null);
        }}
      />
    </div>
  );
}
