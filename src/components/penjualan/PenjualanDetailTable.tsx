import { DataTable, Button, Input } from "../ui";

import type { DetailPenjualan } from "../../types/penjualan";

interface Props {
  data: DetailPenjualan[];

  onChange: (
    index: number,
    field: keyof DetailPenjualan,
    value: string | number,
  ) => void;

  onDelete: (index: number) => void;
}

export default function PenjualanDetailTable({
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
              className="w-20"
            />
          ),
        },

        {
          header: "Harga Jual",

          accessor: "hargaJual",

          render: (item, index) => (
            <Input
              type="number"
              min="0"
              value={item.hargaJual}
              onChange={(e) =>
                onChange(index, "hargaJual", Number(e.target.value))
              }
              className="w-32"
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
              Rp {item.subtotal.toLocaleString()}
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
