import { DataTable, Button, Badge } from "../ui";

import type { Penjualan } from "../../types/penjualan";

interface Props {
  data: Penjualan[];

  onDelete: (id: string) => void;

  onDetail: (data: Penjualan) => void;

  onPrint: (data: Penjualan) => void;
}

export default function PenjualanTable({
  data,

  onDelete,

  onDetail,

  onPrint,
}: Props) {
  return (
    <DataTable
      columns={[
        {
          header: "No",

          accessor: "id",

          render: (_, index) => index + 1,
        },

        {
          header: "No Nota",

          accessor: "nomorNota",

          render: (item) => (
            <span
              className="
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              {item.nomorNota}
            </span>
          ),
        },

        {
          header: "Tanggal",

          accessor: "tanggal",
        },

        {
          header: "Pelanggan",

          accessor: "pelangganNama",
        },

        {
          header: "Total",

          accessor: "total",

          render: (item) => (
            <span
              className="
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              Rp {item.total.toLocaleString()}
            </span>
          ),
        },

        {
          header: "Status",

          accessor: "status",

          render: (item) => (
            <Badge variant={item.status === "LUNAS" ? "success" : "warning"}>
              {item.status}
            </Badge>
          ),
        },

        {
          header: "Aksi",

          accessor: "id",

          render: (item) => (
            <div
              className="
                flex
                gap-2
              "
            >
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onDetail(item)}
              >
                Detail
              </Button>

              <Button size="sm" variant="primary" onClick={() => onPrint(item)}>
                Print
              </Button>

              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete(item.id)}
              >
                Hapus
              </Button>
            </div>
          ),
        },
      ]}
      data={data}
      emptyMessage="Belum ada transaksi penjualan"
    />
  );
}
