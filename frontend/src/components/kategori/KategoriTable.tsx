import type { Dispatch, SetStateAction } from "react";

import type { Kategori } from "../../types/kategori";

import { Button, DataTable, SearchBox } from "../ui";

interface Props {
  data: Kategori[];

  search: string;

  setSearch: Dispatch<SetStateAction<string>>;

  onDelete: (id: number) => void;

  onEdit: (id: number) => void;
}

export default function KategoriTable({
  data,

  search,

  setSearch,

  onDelete,

  onEdit,
}: Props) {
  const columns = [
    {
      header: "ID",

      accessor: "id" as keyof Kategori,
    },

    {
      header: "Nama Kategori",

      accessor: "nama" as keyof Kategori,
    },

    {
      header: "Deskripsi",

      accessor: "deskripsi" as keyof Kategori,
    },

    {
      header: "Aksi",

      accessor: "id" as keyof Kategori,

      className: "text-center w-48",

      render: (item: Kategori) => (
        <div
          className="
            flex
            justify-center
            gap-2
          "
        >
          <Button variant="secondary" onClick={() => onEdit(item.id)}>
            Edit
          </Button>

          <Button variant="danger" onClick={() => onDelete(item.id)}>
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
        placeholder="Cari kategori..."
      />

      <DataTable
        columns={columns}
        data={data}
        emptyMessage="Belum ada data kategori"
      />
    </div>
  );
}
