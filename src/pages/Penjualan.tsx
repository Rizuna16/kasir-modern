import { useEffect, useState } from "react";

import PenjualanTable from "../components/penjualan/PenjualanTable";
import PenjualanModal from "../components/penjualan/PenjualanModal";
import DetailPenjualanModal from "../components/penjualan/DetailPenjualanModal";
import PrintPenjualan from "../components/laporan/PrintPenjualan";

import usePenjualan from "../hooks/usePenjualan";

import type { Penjualan as PenjualanType } from "../types/penjualan";

import type { Invoice } from "../features/sales/types";

import { Button, Card } from "../components/ui";

const PRINT_DELAY = 300;

/**
 * ============================================================
 * LEGACY PENJUALAN -> ENTERPRISE INVOICE
 * ============================================================
 */

function mapPenjualanToInvoice(data: PenjualanType): Invoice {
  return {
    id: data.id,

    number: data.nomorNota,

    date: data.tanggal,

    cashierId: "",

    cashierName: "Kasir",

    customer: data.pelangganNama
      ? {
          id: String(data.pelangganId),

          kode: `CUS-${data.pelangganId}`,

          nama: data.pelangganNama,
        }
      : undefined,

    items: data.detail.map((item) => ({
      id: item.id,

      barangId: item.barangId,

      kodeBarang: "",

      namaBarang: item.namaBarang,

      harga: item.hargaJual,

      qty: item.qty,

      subtotal: item.subtotal,

      discount: 0,

      tax: 0,

      total: item.subtotal,
    })),

    subtotal: data.total,

    itemDiscount: 0,

    transactionDiscount: 0,

    tax: 0,

    serviceCharge: 0,

    grandTotal: data.total,

    payment: {
      method: "cash",

      status: data.status === "LUNAS" ? "paid" : "pending",

      paidAmount: data.total,

      changeAmount: 0,
    },

    createdAt: data.createdAt,
  };
}

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

  const [selectedPrint, setSelectedPrint] = useState<Invoice | null>(null);

  const handleDetail = (data: PenjualanType) => {
    setSelectedPenjualan(data);

    setIsDetailOpen(true);
  };

  const handlePrint = (data: PenjualanType) => {
    const invoice = mapPenjualanToInvoice(data);

    setSelectedPrint(invoice);

    setTimeout(() => {
      window.print();
    }, PRINT_DELAY);
  };

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

        <Button variant="primary" onClick={() => setIsTambahOpen(true)}>
          Tambah Penjualan
        </Button>
      </div>

      <Card>
        {penjualan.length === 0 ? (
          <div
            className="
                py-10
                text-center
                text-gray-500
                dark:text-gray-400
              "
          >
            Belum ada transaksi penjualan.
          </div>
        ) : (
          <PenjualanTable
            data={penjualan}
            onDelete={hapusPenjualan}
            onDetail={handleDetail}
            onPrint={handlePrint}
          />
        )}
      </Card>

      <PenjualanModal
        isOpen={isTambahOpen}
        onClose={() => setIsTambahOpen(false)}
        onSave={() => {
          setIsTambahOpen(false);

          loadPenjualan();
        }}
      />

      <DetailPenjualanModal
        isOpen={isDetailOpen}
        penjualan={selectedPenjualan}
        onClose={() => {
          setIsDetailOpen(false);

          setSelectedPenjualan(null);
        }}
      />

      {selectedPrint && (
        <div className="hidden print:block">
          <PrintPenjualan invoice={selectedPrint} />
        </div>
      )}
    </div>
  );
}
