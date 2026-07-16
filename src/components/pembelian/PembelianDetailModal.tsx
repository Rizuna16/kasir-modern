import type { Pembelian } from "../../types/pembelian";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pembelian: Pembelian | null;
}

export default function PembelianDetailModal({
  isOpen,
  onClose,
  pembelian,
}: Props) {
  if (!isOpen || !pembelian) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-5">
          <h2 className="text-2xl font-bold">Detail Pembelian</h2>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Tutup
          </button>
        </div>

        {/* Informasi Transaksi */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Nomor Faktur</p>

            <p className="font-semibold">{pembelian.nomorFaktur}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Tanggal</p>

            <p className="font-semibold">{pembelian.tanggal}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Supplier</p>

            <p className="font-semibold">{pembelian.supplierNama}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>

            <p className="font-semibold">{pembelian.status}</p>
          </div>
        </div>

        {/* Detail Barang */}
        <div className="border rounded-lg overflow-hidden mb-6">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3">Barang</th>
                <th className="text-center p-3">Qty</th>
                <th className="text-right p-3">Harga</th>
                <th className="text-right p-3">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {pembelian.detail.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{item.namaBarang}</td>

                  <td className="text-center p-3">{item.qty}</td>

                  <td className="text-right p-3">
                    Rp {item.hargaBeli.toLocaleString()}
                  </td>

                  <td className="text-right p-3">
                    Rp {item.subtotal.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="flex justify-end border-t pt-4">
          <div className="text-right">
            <p className="text-gray-500">Total Pembelian</p>

            <p className="text-2xl font-bold text-blue-600">
              Rp {pembelian.total.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
