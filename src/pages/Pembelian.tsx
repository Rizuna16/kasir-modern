import { useState } from "react";

import PembelianTable from "../components/pembelian/PembelianTable";
import PembelianModal from "../components/pembelian/PembelianModal";
import PembelianDetailModal from "../components/pembelian/PembelianDetailModal";

import usePembelian from "../hooks/usePembelian";

import type { Pembelian as PembelianType } from "../types/pembelian";

import { Button, Card } from "../components/ui";

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
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-gray-800
              dark:text-white
            "
          >
            Transaksi Pembelian
          </h1>

          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Kelola transaksi pembelian barang
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setIsTambahOpen(true);
          }}
        >
          Tambah Pembelian
        </Button>
      </div>

      {/* TABLE */}
      <Card>
        <PembelianTable data={pembelian} onDetail={handleDetail} />
      </Card>

      {/* TAMBAH MODAL */}
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

      {/* DETAIL MODAL */}
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
