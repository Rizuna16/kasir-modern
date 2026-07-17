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
    <div className="space-y-6">
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-gray-900
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

        <Button variant="primary" onClick={() => setIsTambahOpen(true)}>
          Tambah Pembelian
        </Button>
      </div>

      <Card>
        {pembelian.length === 0 ? (
          <div
            className="
                py-10
                text-center
                text-gray-500
                dark:text-gray-400
              "
          >
            Belum ada transaksi pembelian.
          </div>
        ) : (
          <PembelianTable data={pembelian} onDetail={handleDetail} />
        )}
      </Card>

      <PembelianModal
        isOpen={isTambahOpen}
        onClose={() => setIsTambahOpen(false)}
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
