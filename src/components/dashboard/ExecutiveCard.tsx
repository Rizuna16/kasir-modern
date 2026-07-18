/**
 * ============================================================
 * Enterprise Dashboard
 * Component : ExecutiveCard
 * ============================================================
 *
 * Menampilkan ringkasan KPI utama dashboard.
 *
 * Component ini bersifat reusable.
 *
 * Tidak melakukan kalkulasi data.
 *
 * ============================================================
 */

import type { ReactNode } from "react";

interface ExecutiveCardProps {
  title: string;

  value: string | number;

  icon?: ReactNode;

  description?: string;
}

export default function ExecutiveCard({
  title,
  value,
  icon,
  description,
}: ExecutiveCardProps) {
  return (
    <div
      className="
        rounded-xl
        border
        bg-white
        p-5
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-sm
              text-gray-500
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-2
              text-2xl
              font-bold
              text-gray-800
            "
          >
            {value}
          </h3>

          {description && (
            <p
              className="
                  mt-2
                  text-xs
                  text-gray-400
                "
            >
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div
            className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-gray-100
                text-xl
              "
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
