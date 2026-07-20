import type { FastMovingProduct } from "../../../types/inventoryAnalytics";

interface Props {
  data: FastMovingProduct[];
}

export default function FastMovingTable({ data }: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-4 font-bold">🚀 Fast Moving Product</h3>

      {data.length === 0 && (
        <p className="text-gray-500">Belum ada data penjualan</p>
      )}

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={item.barangId}
            className="
                flex
                items-center
                justify-between
                rounded-lg
                border
                p-3
                "
          >
            <div className="flex gap-3">
              <span className="font-bold">#{index + 1}</span>

              <span>{item.nama}</span>
            </div>

            <span className="font-semibold">{item.totalTerjual} pcs</span>
          </div>
        ))}
      </div>
    </div>
  );
}
