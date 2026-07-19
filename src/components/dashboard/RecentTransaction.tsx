/**
 * ============================================================
 * Enterprise Dashboard
 * Component : RecentTransaction
 * ============================================================
 *
 * Responsibility:
 *
 * - Menampilkan transaksi terbaru
 * - Menerima data dari parent component
 *
 * Tidak melakukan:
 *
 * ❌ Mengambil data service
 * ❌ Mengakses invoice langsung
 *
 * Performance:
 *
 * ✅ React.memo optimized
 *
 * ============================================================
 */

import { memo } from "react";

import type { RecentTransactionItem } from "../../features/sales/services/dashboardService";

import EmptyState from "./EmptyState";

interface RecentTransactionProps {
  data: RecentTransactionItem[];
}

function formatCurrency(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function RecentTransaction({ data }: RecentTransactionProps) {
  return (
    <div
      className="
        group
        overflow-hidden

        rounded-3xl

        border
        border-gray-200

        dark:border-gray-700

        bg-white

        dark:bg-gray-800

        shadow-sm

        transition-all
        duration-300

        hover:border-blue-200

        hover:shadow-xl

        dark:hover:border-blue-700
      "
    >
      <div
        className="
          border-b
          border-gray-100

          px-6
          py-5

          dark:border-gray-700
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
            <h2
              className="
                text-xl
                font-bold
                tracking-tight

                text-gray-900

                dark:text-white
              "
            >
              Recent Transactions
            </h2>

            <p
              className="
                mt-1
                text-sm

                text-gray-500

                dark:text-gray-400
              "
            >
              Daftar transaksi penjualan terbaru yang tercatat pada sistem.
            </p>
          </div>

          <div
            className="
              rounded-full

              bg-blue-50

              px-3

              py-1

              text-xs

              font-semibold

              text-blue-700

              dark:bg-blue-900/30

              dark:text-blue-300
            "
          >
            {data.length} Transaction
            {data.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      <div className="p-6">
        {data.length === 0 ? (
          <EmptyState
            icon="🧾"
            title="Belum ada transaksi"
            description="Transaksi terbaru akan muncul secara otomatis setelah penjualan dilakukan."
            minHeight="min-h-[240px]"
          />
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="
                      rounded-2xl

                      border

                      border-transparent

                      p-4

                      transition-all

                      duration-300

                      hover:border-gray-200

                      hover:bg-gray-50

                      dark:hover:border-gray-700

                      dark:hover:bg-gray-700/30
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
                  <div
                    className="
                          flex

                          min-w-0

                          items-center

                          gap-4
                        "
                  >
                    <div
                      className="
                            flex

                            h-12

                            w-12

                            shrink-0

                            items-center

                            justify-center

                            rounded-2xl

                            bg-blue-100

                            text-lg

                            font-bold

                            text-blue-700

                            dark:bg-blue-900/30

                            dark:text-blue-300
                          "
                    >
                      🧾
                    </div>

                    <div className="min-w-0">
                      <h3
                        className="
                              truncate

                              font-semibold

                              text-gray-900

                              dark:text-white
                            "
                      >
                        {item.nomorNota}
                      </h3>

                      <p
                        className="
                              mt-1

                              text-sm

                              text-gray-500

                              dark:text-gray-400
                            "
                      >
                        {item.pelangganNama}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className="
                            font-bold

                            text-gray-900

                            dark:text-white
                          "
                    >
                      {formatCurrency(item.total)}
                    </p>

                    <span
                      className={`

                            mt-2

                            inline-flex

                            rounded-full

                            px-3

                            py-1

                            text-xs

                            font-semibold


                            ${
                              item.status === "LUNAS"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }

                          `}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(RecentTransaction);
