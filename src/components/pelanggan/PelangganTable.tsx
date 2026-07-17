import { DataTable, Button, Badge } from "../ui";

import type { Column } from "../ui/DataTable";

import type { Pelanggan } from "../../types/pelanggan";

interface Props {
  data: Pelanggan[];

  onEdit: (pelanggan: Pelanggan) => void;

  onDelete: (pelanggan: Pelanggan) => void;
}

export default function PelangganTable({ data, onEdit, onDelete }: Props) {
  const columns: Column<Pelanggan>[] = [
    {
      header: "Kode",

      accessor: "kode",
    },

    {
      header: "Nama",

      accessor: "nama",
    },

    {
      header: "Telepon",

      accessor: "telepon",
    },

    {
      header: "Kota",

      accessor: "kota",
    },

    {
      header: "Status",

      accessor: "aktif",

      className: "text-center",

      render: (row) => (
        <Badge variant={row.aktif ? "success" : "danger"}>
          {row.aktif ? "Aktif" : "Tidak Aktif"}
        </Badge>
      ),
    },

    {
      header: "Aksi",

      accessor: "id",

      className: "w-44 text-center",

      render: (row) => (
        <div
          className="
            flex
            justify-center
            gap-2
          "
        >
          <Button size="sm" variant="secondary" onClick={() => onEdit(row)}>
            Edit
          </Button>

          <Button size="sm" variant="danger" onClick={() => onDelete(row)}>
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="Belum ada data pelanggan"
    />
  );
}
