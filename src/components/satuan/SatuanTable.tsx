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
    },

    {
      header: "Nama Satuan",
      accessor: "nama" as keyof Satuan,
    },

    {
      header: "Aksi",
      accessor: "id" as keyof Satuan,

      render: (item: Satuan) => (
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onEdit(item.id)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="text-red-600 hover:text-red-800"
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      {/* Header */}

      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-lg font-semibold">Master Satuan</h2>

          <p className="text-gray-500 text-sm">Kelola satuan barang</p>
        </div>

        <Button onClick={onTambah}>+ Tambah Satuan</Button>
      </div>

      {/* Search */}

      <div className="mb-5">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Cari satuan..."
        />
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
