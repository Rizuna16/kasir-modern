import type { Dispatch, SetStateAction } from "react";

import type { Kategori } from "../../types/kategori";

import { Button, Card, DataTable, SearchBox } from "../ui";

interface Props {
  data: Kategori[];

  search: string;

  setSearch: Dispatch<SetStateAction<string>>;

  onTambah: () => void;

  onDelete: (id: number) => void;

  onEdit: (id: number) => void;
}

export default function KategoriTable({
  data,

  search,

  setSearch,

  onTambah,

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
    <Card>
      <div
        className="
          space-y-5
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h2
              className="
                text-lg
                font-semibold
                text-gray-900
                dark:text-white
              "
            >
              Master Kategori
            </h2>

            <p
              className="
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              Kelola kategori barang
            </p>
          </div>

          <Button variant="primary" onClick={onTambah}>
            + Tambah Kategori
          </Button>
        </div>

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
    </Card>
  );
}
