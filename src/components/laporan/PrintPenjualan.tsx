import { useEffect, useState } from "react";

import type { Penjualan } from "../../types/penjualan";

import {
  getPengaturan,
  type PengaturanToko,
} from "../../services/pengaturanService";

import { formatRupiah } from "../../utils/currency";

interface Props {
  penjualan: Penjualan;
}

export default function PrintPenjualan({ penjualan }: Props) {
  const [pengaturan, setPengaturan] = useState<PengaturanToko | null>(null);

  useEffect(() => {
    const data = getPengaturan();

    setPengaturan(data);
  }, []);

  if (!pengaturan) {
    return null;
  }

  return (
    <div
      className="print-area text-black"
      style={{
        width: "80mm",
        padding: "5mm",
        fontFamily: "monospace",
        fontSize: "12px",
        pageBreakInside: "avoid",
      }}
    >
      {/* HEADER */}

      <div className="text-center border-b pb-2">
        <h1 className="text-base font-bold">
          {pengaturan.namaToko || "Nama Toko"}
        </h1>

        <p>{pengaturan.alamat || "-"}</p>

        <p>Telp. {pengaturan.telepon || "-"}</p>
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

          <span>{penjualan.pelangganNama || "-"}</span>
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
              <td>{item.namaBarang}</td>

              <td className="text-center">{item.qty}</td>

              <td className="text-right">{formatRupiah(item.hargaJual)}</td>

              <td className="text-right">{formatRupiah(item.subtotal)}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t">
            <td colSpan={3} className="pt-2 text-right font-bold">
              TOTAL
            </td>

            <td className="pt-2 text-right font-bold">
              {formatRupiah(penjualan.total)}
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
