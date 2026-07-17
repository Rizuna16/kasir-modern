import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;

  title?: string;

  description?: string;

  action?: ReactNode;
}

export default function EmptyState({
  icon = "📦",
  title = "Data Kosong",
  description = "Belum ada data untuk ditampilkan",
  action,
}: EmptyStateProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center

        gap-3

        py-10
      "
    >
      <div
        className="
          text-5xl
        "
      >
        {icon}
      </div>

      <h3
        className="
          text-base
          font-semibold
          text-gray-700
        "
      >
        {title}
      </h3>

      <p
        className="
          max-w-sm
          text-center
          text-sm
          text-gray-400
        "
      >
        {description}
      </p>

      {action && (
        <div
          className="
            mt-3
          "
        >
          {action}
        </div>
      )}
    </div>
  );
}
