import type { Penjualan } from "../../types/penjualan";

interface Props {
  data: Penjualan[];

  onDelete: (id: string) => void;
}

export default function PenjualanTable({
  data,

  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-3 text-left">No Nota</th>

            <th className="p-3 text-left">Tanggal</th>

            <th className="p-3 text-left">Pelanggan</th>

            <th className="p-3 text-left">Total</th>

            <th className="p-3 text-left">Status</th>

            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.nomorNota}</td>

              <td className="p-3">{item.tanggal}</td>

              <td className="p-3">{item.pelangganNama}</td>

              <td className="p-3">Rp {item.total.toLocaleString()}</td>

              <td className="p-3">
                <span
                  className="
                  bg-green-100
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  "
                >
                  {item.status}
                </span>
              </td>

              <td className="p-3">
                <button
                  onClick={() => onDelete(item.id)}
                  className="
                  bg-red-500
                  text-white
                  px-3
                  py-1
                  rounded
                  "
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="
                text-center
                py-5
                text-gray-500
                "
              >
                Belum ada transaksi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
