/**
 * ============================================================
 * Revenue Growth Card
 * ============================================================
 *
 * Executive Intelligence Dashboard
 *
 * Menampilkan perbandingan revenue periode berjalan
 * dengan periode sebelumnya.
 *
 * ============================================================
 */

import type { RevenueGrowth } from "../../types/dashboard";

interface Props {
  data: RevenueGrowth;
}

export default function RevenueGrowthCard({ data }: Props) {
  const isGrowthUp = data.growthPercentage >= 0;

  return (
    <div
      className="
        rounded-2xl

        border
        border-gray-100
        dark:border-gray-700

        bg-white
        dark:bg-gray-800

        p-6

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div
        className="
          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-wider

              text-gray-500
              dark:text-gray-400
            "
          >
            Revenue Growth
          </p>

          <h2
            className="
              mt-2

              text-lg
              font-bold

              text-gray-900
              dark:text-white
            "
          >
            {data.periode}
          </h2>
        </div>

        <div
          className={`
            flex

            h-12
            w-12

            items-center
            justify-center

            rounded-xl

            text-xl

            ${
              isGrowthUp
                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
            }
          `}
        >
          {isGrowthUp ? "📈" : "📉"}
        </div>
      </div>

      <div
        className="
          mt-6

          space-y-4
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-sm

              text-gray-500
              dark:text-gray-400
            "
          >
            Revenue Sekarang
          </span>

          <span
            className="
              font-semibold

              text-gray-900
              dark:text-white
            "
          >
            Rp {data.revenueSekarang.toLocaleString("id-ID")}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-sm

              text-gray-500
              dark:text-gray-400
            "
          >
            Sebelumnya
          </span>

          <span
            className="
              font-semibold

              text-gray-900
              dark:text-white
            "
          >
            Rp {data.revenueSebelumnya.toLocaleString("id-ID")}
          </span>
        </div>

        <div
          className="
            mt-4

            rounded-xl

            bg-gray-50
            dark:bg-gray-700/50

            p-4
          "
        >
          <p
            className="
              text-xs

              text-gray-500
              dark:text-gray-400
            "
          >
            Growth
          </p>

          <p
            className={`
              mt-1

              text-2xl

              font-bold

              ${
                isGrowthUp
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }
            `}
          >
            {isGrowthUp ? "+" : ""}
            {data.growthPercentage.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}
