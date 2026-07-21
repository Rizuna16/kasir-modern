/**
 * ============================================================
 * Profit Analytics Card
 * ============================================================
 *
 * Executive Intelligence Dashboard
 *
 * Menampilkan analisa keuntungan bisnis.
 *
 * Revenue
 * - Modal
 * = Profit
 *
 * ============================================================
 */

import type { ProfitAnalytics } from "../../types/dashboard";

interface Props {
  data: ProfitAnalytics;
}

export default function ProfitAnalyticsCard({ data }: Props) {
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
            Profit Analytics
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
            Business Performance
          </h2>
        </div>

        <div
          className="
            flex

            h-12
            w-12

            items-center
            justify-center

            rounded-xl

            bg-green-100
            text-xl
            text-green-600

            dark:bg-green-900/30
            dark:text-green-400
          "
        >
          💹
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
            Total Revenue
          </span>

          <span
            className="
              font-semibold

              text-gray-900
              dark:text-white
            "
          >
            Rp {data.totalRevenue.toLocaleString("id-ID")}
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
            Total Modal
          </span>

          <span
            className="
              font-semibold

              text-gray-900
              dark:text-white
            "
          >
            Rp {data.totalModal.toLocaleString("id-ID")}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            justify-between

            rounded-xl

            bg-green-50

            p-4

            dark:bg-green-900/20
          "
        >
          <span
            className="
              text-sm
              font-medium

              text-gray-600
              dark:text-gray-300
            "
          >
            Total Profit
          </span>

          <span
            className="
              text-xl
              font-bold

              text-green-600
              dark:text-green-400
            "
          >
            Rp {data.totalProfit.toLocaleString("id-ID")}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            justify-between

            border-t
            border-gray-100

            pt-4

            dark:border-gray-700
          "
        >
          <span
            className="
              text-sm

              text-gray-500
              dark:text-gray-400
            "
          >
            Margin
          </span>

          <span
            className="
              font-bold

              text-gray-900
              dark:text-white
            "
          >
            {data.marginPercentage.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}
