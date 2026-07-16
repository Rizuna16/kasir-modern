interface Props {
  totalTransaksi: number;
  totalOmzet: number;
}

export default function LaporanStats({ totalTransaksi, totalOmzet }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-lg border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Total Transaksi</p>

        <h2 className="mt-2 text-3xl font-bold">{totalTransaksi}</h2>
      </div>

      <div className="rounded-lg border bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Total Omzet</p>

        <h2 className="mt-2 text-3xl font-bold">
          Rp {totalOmzet.toLocaleString("id-ID")}
        </h2>
      </div>
    </div>
  );
}
