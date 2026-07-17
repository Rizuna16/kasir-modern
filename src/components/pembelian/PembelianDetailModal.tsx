// src/components/pembelian/PembelianDetailModal.tsx

import { Modal, Button, Card, Badge, DataTable } from "../ui";

import { formatRupiah } from "../../utils/currency";

import type { Pembelian } from "../../types/pembelian";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  pembelian: Pembelian | null;
}

export default function PembelianDetailModal({
  isOpen,

  onClose,

  pembelian,
}: Props) {
  if (!pembelian) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} title="Detail Pembelian" onClose={onClose}>
      <div className="space-y-5">
        <Card>
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nomor Faktur
              </p>

              <p className="font-semibold text-gray-800 dark:text-white">
                {pembelian.nomorFaktur}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tanggal
              </p>

              <p className="font-semibold text-gray-800 dark:text-white">
                {pembelian.tanggal}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supplier
              </p>

              <p className="font-semibold text-gray-800 dark:text-white">
                {pembelian.supplierNama}
              </p>
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                Status
              </p>

              <Badge
                variant={pembelian.status === "LUNAS" ? "success" : "warning"}
              >
                {pembelian.status}
              </Badge>
            </div>
          </div>
        </Card>

        <Card>
          <h3
            className="
              mb-4
              text-lg
              font-semibold
              text-gray-800
              dark:text-white
            "
          >
            Barang Pembelian
          </h3>

          <DataTable
            columns={[
              {
                header: "Barang",

                accessor: "namaBarang",

                render: (item) => (
                  <span className="font-medium text-gray-800 dark:text-white">
                    {item.namaBarang}
                  </span>
                ),
              },

              {
                header: "Qty",

                accessor: "qty",
              },

              {
                header: "Harga",

                accessor: "hargaBeli",

                render: (item) => <span>{formatRupiah(item.hargaBeli)}</span>,
              },

              {
                header: "Subtotal",

                accessor: "subtotal",

                render: (item) => (
                  <span className="font-semibold">
                    {formatRupiah(item.subtotal)}
                  </span>
                ),
              },
            ]}
            data={pembelian.detail}
            emptyMessage="Belum ada detail barang"
          />
        </Card>

        <Card>
          <div
            className="
              flex
              justify-between
              items-center
            "
          >
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Total Pembelian
            </span>

            <span
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              {formatRupiah(pembelian.total)}
            </span>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button variant="secondary" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
}
