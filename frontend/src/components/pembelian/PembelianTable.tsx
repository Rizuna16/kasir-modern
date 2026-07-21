// src/components/pembelian/PembelianTable.tsx

import { DataTable, Button, Badge } from "../ui";

import type { Pembelian } from "../../types/pembelian";

import { formatRupiah } from "../../utils/currency";

interface Props {
  data: Pembelian[];

  onDetail: (pembelian: Pembelian) => void;
}

export default function PembelianTable({
  data,

  onDetail,
}: Props) {
  return (
    <DataTable
      columns={[
        {
          header: "No",
          accessor: "id",
          render: (_, index) => (
            <span
              className="
                text-gray-700
                dark:text-gray-300
              "
            >
              {index + 1}
            </span>
          ),
        },

        {
          header: "Nomor Faktur",
          accessor: "nomorFaktur",
          render: (item) => (
            <span
              className="
                font-medium
                text-gray-800
                dark:text-white
              "
            >
              {item.nomorFaktur}
            </span>
          ),
        },

        {
          header: "Tanggal",
          accessor: "tanggal",
          render: (item) => (
            <span
              className="
                text-gray-700
                dark:text-gray-300
              "
            >
              {item.tanggal}
            </span>
          ),
        },

        {
          header: "Supplier",
          accessor: "supplierNama",
          render: (item) => (
            <span
              className="
                text-gray-700
                dark:text-gray-300
              "
            >
              {item.supplierNama}
            </span>
          ),
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
              {formatRupiah(item.total)}
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
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onDetail(item)}
            >
              Detail
            </Button>
          ),
        },
      ]}
      data={data}
      emptyMessage="Belum ada transaksi pembelian"
    />
  );
}
