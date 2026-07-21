import type { LowStockProduct } from "../../../types/inventoryAnalytics";

interface Props {
  data: LowStockProduct[];
}

export default function LowStockAlert({ data }: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="font-bold mb-3">⚠️ Low Stock Alert</h3>

      <div className="space-y-2">
        {data.length === 0 && <p className="text-gray-500">Semua stok aman</p>}

        {data.map((item) => (
          <div key={item.barangId} className="flex justify-between">
            <span>{item.nama}</span>

            <span>
              {item.stok}/{item.minimalStok}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
