import { Button, DataTable, SearchBox } from "../ui";

import type { Satuan } from "../../types/satuan";

interface SatuanTableProps {
  data: Satuan[];

  search: string;

  setSearch: (value: string) => void;

  onEdit: (id: number) => void;

  onDelete: (id: number) => void;
}

export default function SatuanTable({
  data,

  search,

  setSearch,

  onEdit,

  onDelete,
}: SatuanTableProps) {
  const columns = [
    {
      header: "ID",

      accessor: "id" as keyof Satuan,

      className: "text-center w-20",
    },

    {
      header: "Nama Satuan",

      accessor: "nama" as keyof Satuan,
    },

    {
      header: "Aksi",

      accessor: "id" as keyof Satuan,

      className: "text-center w-44",

      render: (item: Satuan) => (
        <div
          className="
            flex
            justify-center
            gap-2
          "
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(item.id)}
            className="
              text-blue-600
              hover:text-blue-700

              dark:text-blue-400
              dark:hover:text-blue-300
            "
          >
            Edit
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="
              text-red-600
              hover:text-red-700

              dark:text-red-400
              dark:hover:text-red-300
            "
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="
        space-y-5
      "
    >
      <SearchBox
        value={search}
        onChange={setSearch}
        placeholder="Cari satuan..."
      />

      <DataTable
        columns={columns}
        data={data}
        emptyMessage="Belum ada data satuan"
      />
    </div>
  );
}
