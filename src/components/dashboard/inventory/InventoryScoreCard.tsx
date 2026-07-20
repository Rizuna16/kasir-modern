import type { InventoryScore } from "../../../types/inventoryAnalytics";

interface Props {
  data: InventoryScore;
}

export default function InventoryScoreCard({ data }: Props) {
  const color =
    data.label === "Excellent"
      ? "text-green-600"
      : data.label === "Healthy"
        ? "text-blue-600"
        : data.label === "Warning"
          ? "text-yellow-600"
          : "text-red-600";

  return (
    <div
      className="
      rounded-xl
      border
      bg-white
      p-6
      shadow-sm
      "
    >
      <h3
        className="
        text-sm
        font-semibold
        text-gray-500
        "
      >
        Inventory Score
      </h3>

      <div
        className={`
        mt-4
        text-5xl
        font-bold
        ${color}
        `}
      >
        {data.score}
      </div>

      <div
        className="
        mt-2
        text-sm
        font-medium
        "
      >
        {data.label}
      </div>
    </div>
  );
}
