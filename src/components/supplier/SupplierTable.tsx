import DataTable from "../ui/DataTable";

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

      render: (row: Supplier) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            row.status === "Aktif"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },

    {
      header: "Aksi",
      accessor: "id" as keyof Supplier,

      render: (row: Supplier) => (
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(row.id)}
            className="rounded bg-yellow-500 px-3 py-1 text-sm text-white hover:bg-yellow-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(row.id)}
            className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
