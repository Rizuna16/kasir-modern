import type { Pelanggan } from "../../types/pelanggan";

interface Props {
  data: Pelanggan[];

  onEdit: (pelanggan: Pelanggan) => void;

  onDelete: (pelanggan: Pelanggan) => void;
}

export default function PelangganTable({
  data,

  onEdit,

  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Kode</th>

            <th className="border px-4 py-2">Nama</th>

            <th className="border px-4 py-2">Telepon</th>

            <th className="border px-4 py-2">Kota</th>

            <th className="border px-4 py-2">Status</th>

            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.kode}</td>

              <td className="border px-4 py-2">{item.nama}</td>

              <td className="border px-4 py-2">{item.telepon}</td>

              <td className="border px-4 py-2">{item.kota}</td>

              <td className="border px-4 py-2">
                {item.aktif ? (
                  <span className="text-green-600">Aktif</span>
                ) : (
                  <span className="text-red-600">Tidak Aktif</span>
                )}
              </td>

              <td className="border px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(item)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
