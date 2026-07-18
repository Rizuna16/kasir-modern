import { useEffect, useState } from "react";

import type { Invoice } from "../../features/sales/types";

import {
  getPengaturan,
  type PengaturanToko,
} from "../../services/pengaturanService";

import { formatRupiah } from "../../utils/currency";

interface Props {
  invoice: Invoice;
}

export default function PrintPenjualan({ invoice }: Props) {
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

      {/* INFO INVOICE */}

      <div className="mt-3 text-xs">
        <div className="flex justify-between">
          <span>No Nota</span>

          <span>{invoice.number}</span>
        </div>

        <div className="flex justify-between">
          <span>Tanggal</span>

          <span>{invoice.date.slice(0, 10)}</span>
        </div>

        <div className="flex justify-between">
          <span>Kasir</span>

          <span>{invoice.cashierName}</span>
        </div>

        <div className="flex justify-between">
          <span>Pelanggan</span>

          <span>{invoice.customer?.nama ?? "Walk-in"}</span>
        </div>
      </div>

      {/* DETAIL ITEM */}

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
          {invoice.items.map((item) => (
            <tr key={item.id}>
              <td>{item.namaBarang}</td>

              <td className="text-center">{item.qty}</td>

              <td className="text-right">{formatRupiah(item.harga)}</td>

              <td className="text-right">{formatRupiah(item.total)}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr className="border-t">
            <td
              colSpan={3}
              className="
                pt-2
                text-right
                font-bold
              "
            >
              SUBTOTAL
            </td>

            <td
              className="
                pt-2
                text-right
                font-bold
              "
            >
              {formatRupiah(invoice.subtotal)}
            </td>
          </tr>

          <tr>
            <td
              colSpan={3}
              className="
                text-right
                font-bold
              "
            >
              DISKON
            </td>

            <td className="text-right">
              {formatRupiah(
                invoice.items.reduce((total, item) => total + item.discount, 0),
              )}
            </td>
          </tr>

          <tr>
            <td
              colSpan={3}
              className="
                text-right
                font-bold
              "
            >
              PAJAK
            </td>

            <td className="text-right">{formatRupiah(invoice.tax)}</td>
          </tr>

          <tr className="border-t">
            <td
              colSpan={3}
              className="
                pt-2
                text-right
                font-bold
              "
            >
              TOTAL
            </td>

            <td
              className="
                pt-2
                text-right
                font-bold
              "
            >
              {formatRupiah(invoice.grandTotal)}
            </td>
          </tr>
        </tfoot>
      </table>

      {/* PAYMENT */}

      <div className="mt-3 text-xs">
        <div className="flex justify-between">
          <span>Metode</span>

          <span>{invoice.payment.method}</span>
        </div>

        <div className="flex justify-between">
          <span>Bayar</span>

          <span>{formatRupiah(invoice.payment.paidAmount)}</span>
        </div>

        <div className="flex justify-between">
          <span>Kembali</span>

          <span>{formatRupiah(invoice.payment.changeAmount)}</span>
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
          mt-5
          border-t
          pt-2
          text-center
          text-xs
        "
      >
        <p>Terima kasih telah berbelanja</p>

        <p>Sampai jumpa kembali</p>
      </div>
    </div>
  );
}
