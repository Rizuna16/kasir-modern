import type { Penjualan } from "../../types/penjualan";

interface Props {
  penjualan: Penjualan;
}

export default function PrintPenjualan({ penjualan }: Props) {
  return (
    <div
      className="print-area text-black"
      style={{
        width: "80mm",
        padding: "5mm",
        fontFamily: "monospace",
        fontSize: "12px",
      }}
    >
      {/* HEADER */}

      <div className="text-center border-b pb-2">
        <h1 className="text-base font-bold">KASIR MODERN</h1>

        <p>Jl. Contoh No.123</p>

        <p>Telp. 0812-3456-7890</p>
      </div>

      {/* INFO TRANSAKSI */}

      <div className="mt-3 text-xs">
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

      {/* DETAIL BARANG */}

      <table className="w-full mt-3 text-xs">
        <thead>
          <tr className="border-y">
            <th className="text-left py-1">Barang</th>

            <th className="text-center">Qty</th>

            <th className="text-right">Harga</th>

            <th className="text-right">Total</th>
          </tr>
        </thead>

        <tbody>
          {penjualan.detail.map((item) => (
            <tr key={item.id}>
              <td className="py-1">{item.namaBarang}</td>

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
            <td colSpan={3} className="pt-2 text-right font-bold">
              TOTAL
            </td>

            <td className="pt-2 text-right font-bold">
              Rp {penjualan.total.toLocaleString("id-ID")}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* FOOTER */}

      <div className="mt-5 border-t pt-2 text-center text-xs">
        <p>Terima kasih telah berbelanja</p>

        <p>Sampai jumpa kembali</p>
      </div>
    </div>
  );
}
