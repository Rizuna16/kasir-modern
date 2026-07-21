// src/components/pembelian/PembelianDetailTable.tsx

import { DataTable, Button, Input } from "../ui";

import type { DetailPembelian } from "../../types/pembelian";

import { formatRupiah } from "../../utils/currency";

interface Props {
  data: DetailPembelian[];

  onChange: (
    index: number,
    field: keyof DetailPembelian,
    value: string | number,
  ) => void;

  onDelete: (index: number) => void;
}

export default function PembelianDetailTable({
  data,

  onChange,

  onDelete,
}: Props) {
  return (
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

          render: (item, index) => (
            <Input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => onChange(index, "qty", Number(e.target.value))}
            />
          ),
        },

        {
          header: "Harga Beli",

          accessor: "hargaBeli",

          render: (item, index) => (
            <Input
              type="number"
              min="1"
              value={item.hargaBeli}
              onChange={(e) =>
                onChange(index, "hargaBeli", Number(e.target.value))
              }
            />
          ),
        },

        {
          header: "Subtotal",

          accessor: "subtotal",

          render: (item) => (
            <span
              className="
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              {formatRupiah(item.subtotal)}
            </span>
          ),
        },

        {
          header: "Aksi",

          accessor: "id",

          render: (_, index) => (
            <Button size="sm" variant="danger" onClick={() => onDelete(index)}>
              Hapus
            </Button>
          ),
        },
      ]}
      data={data}
      emptyMessage="Belum ada barang"
    />
  );
}
