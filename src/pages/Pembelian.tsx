import { useState } from "react";

import PembelianTable from "../components/pembelian/PembelianTable";
import PembelianModal from "../components/pembelian/PembelianModal";
import PembelianDetailModal from "../components/pembelian/PembelianDetailModal";

import usePembelian from "../hooks/usePembelian";

import type { Pembelian as PembelianType } from "../types/pembelian";

import { Button, Card, PageHeader } from "../components/ui";

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
    <div
      className="
        space-y-6
      "
    >
      <PageHeader
        title="Transaksi Pembelian"
        subtitle="Kelola transaksi pembelian barang"
        action={
          <Button
            variant="primary"
            onClick={() => {
              setIsTambahOpen(true);
            }}
          >
            Tambah Pembelian
          </Button>
        }
      />

      <Card>
        <PembelianTable data={pembelian} onDetail={handleDetail} />
      </Card>

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
