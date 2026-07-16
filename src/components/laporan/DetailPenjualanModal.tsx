import Modal from "../ui/Modal";

import type { Penjualan } from "../../types/penjualan";

interface Props {
  isOpen: boolean;

  penjualan: Penjualan | null;

  onClose: () => void;
}

export default function DetailPenjualanModal({
  isOpen,
  penjualan,
  onClose,
}: Props) {
  if (!penjualan) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} title="Detail Penjualan" onClose={onClose}>
      <div className="space-y-6">
        {/* Informasi Transaksi */}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Nomor Nota</p>

            <p className="font-semibold">{penjualan.nomorNota}</p>
          </div>

          <div>
            <p className="text-gray-500">Tanggal</p>

            <p className="font-semibold">{penjualan.tanggal}</p>
          </div>

          <div>
            <p className="text-gray-500">Pelanggan</p>

            <p className="font-semibold">{penjualan.pelangganNama}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>

            <p className="font-semibold">{penjualan.status}</p>
          </div>
        </div>

        {/* Detail Barang */}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Barang</th>

                <th className="px-3 py-2 text-center">Qty</th>

                <th className="px-3 py-2 text-right">Harga</th>

                <th className="px-3 py-2 text-right">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {penjualan.detail.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-3 py-2">{item.namaBarang}</td>

                  <td className="px-3 py-2 text-center">{item.qty}</td>

                  <td className="px-3 py-2 text-right">
                    Rp {item.hargaJual.toLocaleString("id-ID")}
                  </td>

                  <td className="px-3 py-2 text-right">
                    Rp {item.subtotal.toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="border-t bg-gray-50">
                <td colSpan={3} className="px-3 py-3 text-right font-bold">
                  Total
                </td>

                <td className="px-3 py-3 text-right font-bold">
                  Rp {penjualan.total.toLocaleString("id-ID")}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Modal>
  );
}
