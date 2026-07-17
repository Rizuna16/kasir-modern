import { Button, DataTable, SearchBox } from "../ui";

import type { Satuan } from "../../types/satuan";

interface SatuanTableProps {
  data: Satuan[];

  search: string;

  setSearch: (value: string) => void;

  onTambah: () => void;

  onEdit: (id: number) => void;

  onDelete: (id: number) => void;
}

export default function SatuanTable({
  data,
  search,
  setSearch,
  onTambah,
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
        <div className="flex justify-center gap-2">
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
        rounded-xl

        border
        border-gray-200
        dark:border-gray-700

        bg-white
        dark:bg-gray-800

        p-6

        shadow-sm

        transition-all
        duration-200
      "
    >
      {/* Toolbar */}

      <div
        className="
          mb-6

          flex
          flex-col
          gap-4

          md:flex-row
          md:items-center
          md:justify-between
        "
      >
        <div className="w-full md:max-w-sm">
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Cari satuan..."
          />
        </div>

        <Button variant="primary" onClick={onTambah}>
          + Tambah Satuan
        </Button>
      </div>

      {/* Table */}

      <DataTable
        columns={columns}
        data={data}
        emptyMessage="Belum ada data satuan"
      />
    </div>
  );
}
