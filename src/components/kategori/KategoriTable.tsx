import type { Dispatch, SetStateAction } from "react";

import type { Kategori } from "../../types/kategori";

import Button from "../ui/Button";
import { DataTable } from "../ui";

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

      className: "text-center w-40",

      render: (item: Kategori) => (
        <div
          className="
            flex
            justify-center
            gap-3
          "
        >
          <button
            onClick={() => onEdit(item.id)}
            className="
              text-blue-600
              hover:text-blue-800

              dark:text-blue-400
              dark:hover:text-blue-300
            "
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="
              text-red-600
              hover:text-red-800

              dark:text-red-400
              dark:hover:text-red-300
            "
          >
            Hapus
          </button>
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

        bg-white

        p-6

        shadow-sm

        transition-all

        duration-200

        dark:border-gray-700

        dark:bg-gray-800
      "
    >
      {/* Header */}
      <div
        className="
          mb-5

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

        <Button onClick={onTambah}>+ Tambah Kategori</Button>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Cari kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full

            md:w-80

            rounded-lg

            border
            border-gray-300

            bg-white

            px-4
            py-2

            text-gray-900

            placeholder:text-gray-400

            focus:outline-none
            focus:ring-2
            focus:ring-blue-500

            dark:border-gray-600

            dark:bg-gray-700

            dark:text-white

            dark:placeholder:text-gray-400
          "
        />
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data}
        emptyMessage="Belum ada data kategori"
      />
    </div>
  );
}
