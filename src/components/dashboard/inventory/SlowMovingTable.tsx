import type { SlowMovingProduct } from "../../../types/inventoryAnalytics";

interface Props {
  data: SlowMovingProduct[];
}

export default function SlowMovingTable({ data }: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-4 font-bold">🐢 Slow Moving Product</h3>

      {data.length === 0 && (
        <p className="text-gray-500">Semua produk bergerak normal</p>
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
