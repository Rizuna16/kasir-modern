import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import DataTable from "../ui/DataTable";

import type { Penjualan } from "../../types/penjualan";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  penjualan: Penjualan | null;
}

export default function DetailPenjualanModal({
  isOpen,

  onClose,

  penjualan,
}: Props) {
  if (!penjualan) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} title="Detail Penjualan" onClose={onClose}>
      <div className="space-y-5">
        {/* INFORMASI TRANSAKSI */}

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
              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Nomor Nota
              </p>

              <p
                className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                "
              >
                {penjualan.nomorNota}
              </p>
            </div>

            <div>
              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Tanggal
              </p>

              <p
                className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                "
              >
                {penjualan.tanggal}
              </p>
            </div>

            <div>
              <p
                className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Pelanggan
              </p>

              <p
                className="
                  font-semibold
                  text-gray-800
                  dark:text-white
                "
              >
                {penjualan.pelangganNama}
              </p>
            </div>

            <div>
              <p
                className="
                  mb-1
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                "
              >
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

        {/* DETAIL BARANG */}

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
            Detail Barang
          </h3>

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

                accessor: "hargaJual",

                render: (item) => (
                  <span>Rp {item.hargaJual.toLocaleString()}</span>
                ),
              },

              {
                header: "Subtotal",

                accessor: "subtotal",

                render: (item) => (
                  <span
                    className="
                      font-semibold
                    "
                  >
                    Rp {item.subtotal.toLocaleString()}
                  </span>
                ),
              },
            ]}
            data={penjualan.detail}
            emptyMessage="Belum ada barang"
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
              Total Penjualan
            </span>

            <span
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              Rp {penjualan.total.toLocaleString()}
            </span>
          </div>
        </Card>

        <div
          className="
            flex
            justify-end
          "
        >
          <Button variant="secondary" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
}
