import type { Pembelian } from "../../types/pembelian";

interface Props {
  data: Pembelian[];
}

export default function PembelianTable({ data }: Props) {
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
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={5}
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
