import type { InventoryHealth } from "../../../types/inventoryAnalytics";

interface Props {
  data: InventoryHealth;
}

export default function InventoryHealthCard({ data }: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-4 font-bold">🏥 Inventory Health</h3>

      <div
        className="
        grid
        grid-cols-1
        gap-4
        md:grid-cols-3
        "
      >
        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">Sehat</p>

          <p className="text-2xl font-bold">{data.sehat}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">Warning</p>

          <p className="text-2xl font-bold">{data.warning}</p>
        </div>

        <div className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">Kritis</p>

          <p className="text-2xl font-bold">{data.kritis}</p>
        </div>
      </div>
    </div>
  );
}
