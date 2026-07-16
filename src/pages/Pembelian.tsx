import { useState } from "react";

import PembelianTable from "../components/pembelian/PembelianTable";
import PembelianModal from "../components/pembelian/PembelianModal";

import usePembelian from "../hooks/usePembelian";

export default function Pembelian() {
  const {
    pembelian,

    loadData,
  } = usePembelian();

  const [isTambahOpen, setIsTambahOpen] = useState(false);

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
        <PembelianTable data={pembelian} />
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
    </div>
  );
}
