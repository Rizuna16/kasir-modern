import { DataTable, Button, Badge } from "../ui";

import type { Supplier } from "../../types/supplier";

interface SupplierTableProps {
  data: Supplier[];

  onEdit: (id: string) => void;

  onDelete: (id: string) => void;
}

export default function SupplierTable({
  data,

  onEdit,

  onDelete,
}: SupplierTableProps) {
  const columns = [
    {
      header: "Kode",

      accessor: "kode" as keyof Supplier,
    },

    {
      header: "Nama Supplier",

      accessor: "nama" as keyof Supplier,
    },

    {
      header: "Telepon",

      accessor: "telepon" as keyof Supplier,
    },

    {
      header: "Email",

      accessor: "email" as keyof Supplier,
    },

    {
      header: "Alamat",

      accessor: "alamat" as keyof Supplier,
    },

    {
      header: "Status",

      accessor: "status" as keyof Supplier,

      className: "text-center",

      render: (item: Supplier) => (
        <Badge variant={item.status === "Aktif" ? "success" : "danger"}>
          {item.status}
        </Badge>
      ),
    },

    {
      header: "Aksi",

      accessor: "id" as keyof Supplier,

      className: "text-center",

      render: (item: Supplier) => (
        <div
          className="
            flex
            justify-center
            gap-2
          "
        >
          <Button size="sm" variant="secondary" onClick={() => onEdit(item.id)}>
            Edit
          </Button>

          <Button size="sm" variant="danger" onClick={() => onDelete(item.id)}>
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
      emptyMessage="Belum ada data supplier"
    />
  );
}
