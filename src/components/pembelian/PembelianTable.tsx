import type { Pembelian } from "../../types/pembelian";

interface Props {
  data: Pembelian[];

  onDetail: (pembelian: Pembelian) => void;
}

export default function PembelianTable({ data, onDetail }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="p-3 text-left">No Faktur</th>

            <th className="p-3 text-left">Tanggal</th>

            <th className="p-3 text-left">Supplier</th>

            <th className="p-3 text-left">Total</th>

            <th className="p-3 text-left">Status</th>

            <th className="p-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.nomorFaktur}</td>

              <td className="p-3">{item.tanggal}</td>

              <td className="p-3">{item.supplierNama}</td>

              <td className="p-3">Rp {item.total.toLocaleString()}</td>

              <td className="p-3">{item.status}</td>

              <td className="p-3 text-center">
                <button
                  onClick={() => onDetail(item)}
                  className="
                    px-3
                    py-1
                    rounded
                    bg-blue-500
                    text-white
                    hover:bg-blue-600
                  "
                >
                  Detail
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
                Belum ada transaksi pembelian
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
