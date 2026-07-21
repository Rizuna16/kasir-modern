/**
 * ============================================================
 * Customer Insight Card
 * ============================================================
 *
 * Executive Intelligence Dashboard
 *
 * Analisa perilaku pelanggan.
 *
 * ============================================================
 */

import type { CustomerInsight } from "../../types/dashboard";

interface Props {
  data: CustomerInsight;
}

export default function CustomerInsightCard({ data }: Props) {
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
            Customer Insight
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
            Customer Intelligence
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

            bg-purple-100

            text-xl

            text-purple-600

            dark:bg-purple-900/30

            dark:text-purple-400
          "
        >
          👥
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
            Total Customer
          </span>

          <span
            className="
              font-bold

              text-gray-900
              dark:text-white
            "
          >
            {data.totalCustomer}
          </span>
        </div>

        <div
          className="
            rounded-xl

            bg-purple-50

            p-4

            dark:bg-purple-900/20
          "
        >
          <p
            className="
              text-xs

              text-gray-500
              dark:text-gray-400
            "
          >
            Customer Terbaik
          </p>

          <p
            className="
              mt-1

              text-lg

              font-bold

              text-purple-600

              dark:text-purple-400
            "
          >
            {data.customerTerbaik || "-"}
          </p>
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
            Belanja Terbesar
          </span>

          <span
            className="
              font-semibold

              text-gray-900
              dark:text-white
            "
          >
            Rp {data.totalBelanjaTerbesar.toLocaleString("id-ID")}
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
            Average Spending
          </span>

          <span
            className="
              font-bold

              text-gray-900
              dark:text-white
            "
          >
            Rp {data.rataRataBelanjaCustomer.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}
