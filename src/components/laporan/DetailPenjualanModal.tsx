import { Modal, Card, Badge, DataTable } from "../ui";

import { formatRupiah } from "../../utils/currency";

import type { Penjualan } from "../../types/penjualan";

interface Props {
  isOpen: boolean;

  penjualan: Penjualan | null;

  onClose: () => void;
}

export default function DetailPenjualanModal({
  isOpen,

  penjualan,

  onClose,
}: Props) {
  if (!penjualan) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} title="Detail Penjualan" onClose={onClose}>
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
                Nomor Nota
              </p>

              <p className="font-semibold text-gray-800 dark:text-white">
                {penjualan.nomorNota}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tanggal
              </p>

              <p className="font-semibold text-gray-800 dark:text-white">
                {penjualan.tanggal}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pelanggan
              </p>

              <p className="font-semibold text-gray-800 dark:text-white">
                {penjualan.pelangganNama}
              </p>
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                Status
              </p>

              <Badge
                variant={penjualan.status === "LUNAS" ? "success" : "warning"}
              >
                {penjualan.status}
              </Badge>
            </div>
          </div>
        </Card>

        <Card>
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

                accessor: "hargaJual",

                render: (item) => <span>{formatRupiah(item.hargaJual)}</span>,
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
            data={penjualan.detail}
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
              Total
            </span>

            <span
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              {formatRupiah(penjualan.total)}
            </span>
          </div>
        </Card>
      </div>
    </Modal>
  );
}
