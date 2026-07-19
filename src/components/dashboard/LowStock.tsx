/**
 * ============================================================
 * Enterprise Dashboard
 * Component : LowStock
 * ============================================================
 *
 * Responsibility:
 *
 * - Menampilkan barang dengan stok menipis
 * - Menerima data dari parent component
 *
 * Tidak melakukan:
 *
 * ❌ Mengambil barang dari service
 * ❌ Filtering stok
 *
 * Optimization:
 *
 * - React.memo untuk mencegah render ulang
 *
 * ============================================================
 */

import { memo } from "react";

import type { Barang } from "../../types/barang";

import EmptyState from "./EmptyState";

interface LowStockProps {
  data: Barang[];
}

function LowStock({ data }: LowStockProps) {
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

        hover:border-red-200
        hover:shadow-xl

        dark:hover:border-red-700
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
              Low Stock Monitoring
            </h2>

            <p
              className="
                mt-1

                text-sm

                text-gray-500
                dark:text-gray-400
              "
            >
              Barang yang membutuhkan perhatian untuk segera dilakukan restock.
            </p>
          </div>

          <div
            className="
              rounded-full

              bg-red-50

              px-3
              py-1

              text-xs
              font-semibold

              text-red-700

              dark:bg-red-900/30
              dark:text-red-300
            "
          >
            ALERT
          </div>
        </div>
      </div>

      <div className="p-6">
        {data.length === 0 ? (
          <EmptyState
            icon="✅"
            title="Semua stok dalam kondisi aman"
            description="Tidak ada barang yang berada di bawah batas minimal stok."
            minHeight="min-h-[240px]"
            className="
              border-green-200
              dark:border-green-900
            "
          />
        ) : (
          <div
            className="
              space-y-5
            "
          >
            {data.map((item) => {
              const percentage =
                item.minimalStok > 0
                  ? Math.min((item.stok / item.minimalStok) * 100, 100)
                  : 100;

              return (
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
                    hover:bg-red-50

                    dark:hover:border-gray-700
                    dark:hover:bg-red-900/10
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                      justify-between

                      gap-4
                    "
                  >
                    <div
                      className="
                        flex
                        flex-1

                        items-start

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

                          bg-red-100

                          text-xl

                          dark:bg-red-900/30
                        "
                      >
                        ⚠️
                      </div>

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <h3
                          className="
                            truncate

                            font-semibold

                            text-gray-900
                            dark:text-white
                          "
                        >
                          {item.nama}
                        </h3>

                        <p
                          className="
                            mt-1

                            text-sm

                            text-gray-500
                            dark:text-gray-400
                          "
                        >
                          Minimal stok : {item.minimalStok} pcs
                        </p>

                        <div
                          className="
                            mt-3

                            h-2

                            overflow-hidden

                            rounded-full

                            bg-gray-200

                            dark:bg-gray-700
                          "
                        >
                          <div
                            className="
                              h-full

                              rounded-full

                              bg-gradient-to-r
                              from-red-500
                              to-orange-400

                              transition-all
                              duration-700
                            "
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <p
                          className="
                            mt-2

                            text-xs

                            text-gray-500
                            dark:text-gray-400
                          "
                        >
                          {percentage.toFixed(0)}% dari batas minimal stok
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className="
                          rounded-full

                          bg-red-100

                          px-3
                          py-1

                          text-sm
                          font-semibold

                          text-red-700

                          dark:bg-red-900/30
                          dark:text-red-300
                        "
                      >
                        {item.stok} pcs
                      </div>

                      <p
                        className="
                          mt-3

                          text-xs

                          text-red-500

                          dark:text-red-400
                        "
                      >
                        Perlu Restock
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(LowStock);
