import usePembelian from "../hooks/usePembelian";

export default function Pembelian() {
  const { pembelian, hapus } = usePembelian();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">Transaksi Pembelian</h1>

      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3">No</th>

              <th>Faktur</th>

              <th>Tanggal</th>

              <th>Supplier</th>

              <th>Total</th>

              <th>Status</th>

              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {pembelian.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{index + 1}</td>

                <td>{item.nomor_faktur}</td>

                <td>{item.tanggal}</td>

                <td>{item.supplier}</td>

                <td>Rp {item.total.toLocaleString()}</td>

                <td>{item.status}</td>

                <td>
                  <button
                    onClick={() => hapus(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
