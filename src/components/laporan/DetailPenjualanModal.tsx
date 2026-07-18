import { Modal, Card, Badge, DataTable } from "../ui";

import { formatRupiah } from "../../utils/currency";

import type { SalesReportItem } from "../../features/sales/services/reportService";

interface Props {
  isOpen: boolean;

  penjualan: SalesReportItem | null;

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

  const invoice = penjualan.invoice;

  const statusLunas = invoice.payment.status === "paid";

  return (
    <Modal isOpen={isOpen} title="Detail Penjualan" onClose={onClose}>
      <div className="space-y-5">
        {/* INFO INVOICE */}

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
                {invoice.number}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Tanggal
              </p>

              <p className="font-semibold text-gray-800 dark:text-white">
                {invoice.date.split("T")[0]}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Pelanggan
              </p>

              <p className="font-semibold text-gray-800 dark:text-white">
                {invoice.customer?.nama ?? "Walk-in Customer"}
              </p>
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                Status
              </p>

              <Badge variant={statusLunas ? "success" : "warning"}>
                {statusLunas ? "LUNAS" : "BELUM LUNAS"}
              </Badge>
            </div>
          </div>
        </Card>

        {/* DETAIL ITEM */}

        <Card>
          <DataTable
            columns={[
              {
                header: "Barang",

                accessor: "namaBarang",

                render: (item) => (
                  <span
                    className="
                      font-medium
                      text-gray-800
                      dark:text-white
                    "
                  >
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

                accessor: "harga",

                render: (item) => <span>{formatRupiah(item.harga)}</span>,
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
            data={invoice.items}
            emptyMessage="Belum ada detail barang"
          />
        </Card>

        {/* TOTAL */}

        <Card>
          <div
            className="
              flex
              justify-between
              items-center
            "
          >
            <span
              className="
                font-semibold
                text-gray-700
                dark:text-gray-300
              "
            >
              Total
            </span>

            <span
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              {formatRupiah(invoice.grandTotal)}
            </span>
          </div>
        </Card>
      </div>
    </Modal>
  );
}
