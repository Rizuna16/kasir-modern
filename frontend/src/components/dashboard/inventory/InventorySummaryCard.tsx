import type { InventorySummary } from "../../../types/inventoryAnalytics";

interface Props {
  summary: InventorySummary;
}

export default function InventorySummaryCard({ summary }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="rounded-xl border p-4">
        <p className="text-sm text-gray-500">Total Produk</p>

        <h2 className="text-2xl font-bold">{summary.totalProduk}</h2>
      </div>

      <div className="rounded-xl border p-4">
        <p className="text-sm text-gray-500">Total Stok</p>

        <h2 className="text-2xl font-bold">{summary.totalStok}</h2>
      </div>

      <div className="rounded-xl border p-4">
        <p className="text-sm text-gray-500">Nilai Inventory</p>

        <h2 className="text-2xl font-bold">
          Rp {summary.totalNilaiStok.toLocaleString()}
        </h2>
      </div>

      <div className="rounded-xl border p-4">
        <p className="text-sm text-gray-500">Low Stock</p>

        <h2 className="text-2xl font-bold">{summary.lowStockCount}</h2>
      </div>
    </div>
  );
}
