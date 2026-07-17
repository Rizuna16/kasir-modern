import { useEffect, useState } from "react";

import PenjualanTable from "../components/penjualan/PenjualanTable";
import PenjualanModal from "../components/penjualan/PenjualanModal";
import DetailPenjualanModal from "../components/penjualan/DetailPenjualanModal";
import PrintPenjualan from "../components/laporan/PrintPenjualan";

import usePenjualan from "../hooks/usePenjualan";

import type { Penjualan as PenjualanType } from "../types/penjualan";

import { Button, Card } from "../components/ui";

export default function Penjualan() {
  const {
    penjualan,

    loadPenjualan,

    hapusPenjualan,
  } = usePenjualan();

  const [isTambahOpen, setIsTambahOpen] = useState(false);

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [selectedPenjualan, setSelectedPenjualan] =
    useState<PenjualanType | null>(null);

  const [selectedPrint, setSelectedPrint] = useState<PenjualanType | null>(
    null,
  );

  function handleDetail(data: PenjualanType) {
    setSelectedPenjualan(data);

    setIsDetailOpen(true);
  }

  function handlePrint(data: PenjualanType) {
    setSelectedPrint(data);

    setTimeout(() => {
      window.print();
    }, 300);
  }

  useEffect(() => {
    const handleAfterPrint = () => {
      setSelectedPrint(null);
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}

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
              text-2xl
              font-bold
              text-gray-800
              dark:text-white
            "
          >
            Transaksi Penjualan
          </h1>

          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Kelola transaksi penjualan barang
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            setIsTambahOpen(true);
          }}
        >
          Tambah Penjualan
        </Button>
      </div>

      {/* TABLE */}

      <Card>
        <PenjualanTable
          data={penjualan}
          onDelete={hapusPenjualan}
          onDetail={handleDetail}
          onPrint={handlePrint}
        />
      </Card>

      {/* TAMBAH PENJUALAN */}

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

      {/* DETAIL PENJUALAN */}

      <DetailPenjualanModal
        isOpen={isDetailOpen}
        penjualan={selectedPenjualan}
        onClose={() => {
          setIsDetailOpen(false);

          setSelectedPenjualan(null);
        }}
      />

      {/* PRINT AREA */}

      {selectedPrint && (
        <div className="hidden print:block">
          <PrintPenjualan penjualan={selectedPrint} />
        </div>
      )}
    </div>
  );
}
