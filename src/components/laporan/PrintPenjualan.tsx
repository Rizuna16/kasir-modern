import type { Penjualan } from "../../types/penjualan";

interface Props {
  penjualan: Penjualan;
}

export default function PrintPenjualan({ penjualan }: Props) {
  return (
    <div
      className="mx-auto bg-white p-6 text-black"
      style={{
        width: "80mm",
        minHeight: "100vh",
      }}
    >
      {/* Header */}

      <div className="text-center border-b pb-3">
        <h1 className="text-lg font-bold">KASIR MODERN</h1>

        <p className="text-xs">Jl. Contoh No.123</p>

        <p className="text-xs">Telp. 0812-3456-7890</p>
      </div>

      {/* Informasi */}

      <div className="mt-4 text-xs space-y-1">
        <div className="flex justify-between">
          <span>No Nota</span>

          <span>{penjualan.nomorNota}</span>
        </div>

        <div className="flex justify-between">
          <span>Tanggal</span>

          <span>{penjualan.tanggal}</span>
        </div>

        <div className="flex justify-between">
          <span>Pelanggan</span>

          <span>{penjualan.pelangganNama}</span>
        </div>
      </div>

      {/* Barang */}

      <table className="w-full mt-4 text-xs">
        <thead>
          <tr className="border-y">
            <th className="py-2 text-left">Barang</th>

            <th className="text-center">Qty</th>

            <th className="text-right">Harga</th>

            <th className="text-right">Subtotal</th>
          </tr>
        </thead>

        <tbody>
          {penjualan.detail.map((item) => (
            <tr key={item.id}>
              <td className="py-2">{item.namaBarang}</td>

              <td className="text-center">{item.qty}</td>

              <td className="text-right">
                {item.hargaJual.toLocaleString("id-ID")}
              </td>

              <td className="text-right">
                {item.subtotal.toLocaleString("id-ID")}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t">
            <td colSpan={3} className="pt-3 text-right font-bold">
              Total
            </td>

            <td className="pt-3 text-right font-bold">
              Rp {penjualan.total.toLocaleString("id-ID")}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Footer */}

      <div className="mt-8 border-t pt-3 text-center text-xs">
        <p>Terima kasih telah berbelanja.</p>

        <p>Sampai jumpa kembali.</p>
      </div>
    </div>
  );
}
