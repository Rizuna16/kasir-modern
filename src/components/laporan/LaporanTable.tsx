import Button from "../ui/Button";

import type { Penjualan } from "../../types/penjualan";

interface Props {
  data: Penjualan[];

  onDetail: (item: Penjualan) => void;

  onPrint?: (item: Penjualan) => void;
}

export default function LaporanTable({ data, onDetail, onPrint }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">No</th>

            <th className="px-4 py-3 text-left">Tanggal</th>

            <th className="px-4 py-3 text-left">Nomor Nota</th>

            <th className="px-4 py-3 text-left">Pelanggan</th>

            <th className="px-4 py-3 text-right">Total</th>

            <th className="px-4 py-3 text-center">Status</th>

            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                Tidak ada transaksi.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>

                <td className="px-4 py-3">{item.tanggal}</td>

                <td className="px-4 py-3 font-medium">{item.nomorNota}</td>

                <td className="px-4 py-3">{item.pelangganNama}</td>

                <td className="px-4 py-3 text-right">
                  Rp {item.total.toLocaleString("id-ID")}
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "LUNAS"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => {
                        console.log("KLIK DETAIL", item);

                        onDetail(item);
                      }}
                    >
                      Detail
                    </Button>

                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => onPrint?.(item)}
                      disabled={!onPrint}
                    >
                      Print
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
