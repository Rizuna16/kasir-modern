import type { Dispatch, SetStateAction } from "react";
import type { Kategori } from "../../types/kategori";
import Button from "../ui/Button";

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
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-semibold">Master Kategori</h2>

          <p className="text-gray-500 text-sm">Kelola kategori barang</p>
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
          className="w-full md:w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3 text-left w-20">ID</th>

              <th className="p-3 text-left">Nama Kategori</th>

              <th className="p-3 text-left">Deskripsi</th>

              <th className="p-3 text-center w-40">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">
                  Belum ada data kategori
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3">{item.id}</td>

                  <td className="p-3 font-medium">{item.nama}</td>

                  <td className="p-3 text-gray-600">{item.deskripsi}</td>

                  <td className="p-3">
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          console.log("klik edit", item.id);
                          onEdit(item.id);
                        }}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
