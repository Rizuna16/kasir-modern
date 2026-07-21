/**
 * ============================================================
 * Executive Summary Card
 * ============================================================
 *
 * Executive KPI Dashboard
 *
 * Menampilkan ringkasan performa bisnis hari ini.
 *
 * ============================================================
 */

import type { ExecutiveSummary } from "../../types/dashboard";

interface Props {
  data: ExecutiveSummary;
}

export default function ExecutiveSummaryCard({ data }: Props) {
  const cards = [
    {
      title: "Revenue Hari Ini",

      value: `Rp ${data.revenueHariIni.toLocaleString("id-ID")}`,

      icon: "💰",

      color:
        "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },

    {
      title: "Transaksi Hari Ini",

      value: data.totalTransaksiHariIni,

      icon: "🧾",

      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },

    {
      title: "Customer Hari Ini",

      value: data.totalCustomerHariIni,

      icon: "👥",

      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },

    {
      title: "Average Transaction",

      value: `Rp ${data.averageTransaction.toLocaleString("id-ID")}`,

      icon: "📊",

      color:
        "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
  ];

  return (
    <div
      className="
        grid

        grid-cols-1
        gap-6

        sm:grid-cols-2

        xl:grid-cols-4
      "
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            group

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
              items-center
              justify-between
              gap-4
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
                {card.title}
              </p>

              <h2
                className="
                  mt-3

                  text-2xl

                  font-bold

                  text-gray-900
                  dark:text-white
                "
              >
                {card.value}
              </h2>
            </div>

            <div
              className={`
                flex

                h-14
                w-14

                items-center
                justify-center

                rounded-2xl

                text-2xl

                shadow-sm

                transition-transform
                duration-300

                group-hover:scale-110

                ${card.color}
              `}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
