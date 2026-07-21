/**
 * ============================================================
 * Enterprise Dashboard
 * Component : TopProducts
 * ============================================================
 *
 * Responsibility:
 *
 * - Menampilkan produk terlaris
 * - Menerima data analytics dari parent component
 *
 * Tidak melakukan:
 *
 * ❌ Mengambil invoice
 * ❌ Menghitung penjualan
 * ❌ Memanggil service
 *
 * Performance:
 *
 * ✅ React.memo optimized
 *
 * ============================================================
 */

import { memo, useMemo } from "react";

import type { TopProductItem } from "../../features/sales/services/dashboardService";

import EmptyState from "./EmptyState";

interface TopProductsProps {
  data: TopProductItem[];
}

const RANK_ICONS = ["🥇", "🥈", "🥉"];

function getRankIcon(index: number) {
  return RANK_ICONS[index] ?? `#${index + 1}`;
}

function TopProducts({ data }: TopProductsProps) {
  const maxQty = useMemo(() => {
    if (data.length === 0) {
      return 1;
    }

    return Math.max(
      ...data.map((item) => item.qty),

      1,
    );
  }, [data]);

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

        hover:border-amber-200

        hover:shadow-xl

        dark:hover:border-amber-700
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
              Top Products
            </h2>

            <p
              className="
                mt-1

                text-sm

                text-gray-500

                dark:text-gray-400
              "
            >
              Produk dengan performa penjualan terbaik berdasarkan jumlah
              transaksi.
            </p>
          </div>

          <div
            className="
              rounded-full

              bg-amber-50

              px-3

              py-1

              text-xs

              font-semibold

              text-amber-700

              dark:bg-amber-900/30

              dark:text-amber-300
            "
          >
            TOP 5
          </div>
        </div>
      </div>

      <div className="p-6">
        {data.length === 0 ? (
          <EmptyState
            icon="🏆"
            title="Belum ada produk terlaris"
            description="Daftar produk akan muncul secara otomatis setelah transaksi penjualan mulai tercatat."
            minHeight="min-h-[240px]"
          />
        ) : (
          <div className="space-y-5">
            {data.map((item, index) => {
              const percentage = (item.qty / maxQty) * 100;

              return (
                <div
                  key={item.barangId}
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

                              bg-amber-100

                              text-xl

                              font-bold

                              dark:bg-amber-900/30
                            "
                      >
                        {getRankIcon(index)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3
                          className="
                                truncate

                                font-semibold

                                text-gray-900

                                dark:text-white
                              "
                        >
                          {item.namaBarang}
                        </h3>

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

                                  from-amber-400

                                  to-orange-500

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
                          {percentage.toFixed(0)}% dibanding produk terlaris
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className="
                              rounded-full

                              bg-blue-100

                              px-3

                              py-1

                              text-sm

                              font-semibold

                              text-blue-700

                              dark:bg-blue-900/30

                              dark:text-blue-300
                            "
                      >
                        {item.qty} pcs
                      </div>

                      <p
                        className="
                              mt-3

                              text-xs

                              text-gray-500

                              dark:text-gray-400
                            "
                      >
                        Total Unit Sold
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

export default memo(TopProducts);
