import { useState } from "react";

import PenjualanTable from "../components/penjualan/PenjualanTable";
import PenjualanModal from "../components/penjualan/PenjualanModal";

import usePenjualan from "../hooks/usePenjualan";

export default function Penjualan() {
  const {
    penjualan,

    loadPenjualan,

    hapusPenjualan,
  } = usePenjualan();

  const [isTambahOpen, setIsTambahOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Transaksi Penjualan</h1>

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
          Tambah Penjualan
        </button>
      </div>

      <div className="bg-white rounded shadow p-4">
        <PenjualanTable data={penjualan} onDelete={hapusPenjualan} />
      </div>

      <PenjualanModal
        isOpen={isTambahOpen}
        onClose={() => {
          setIsTambahOpen(false);
        }}
        onSave={() => {
          setIsTambahOpen(false);

          loadPenjualan();
        }}
      />
    </div>
  );
}
