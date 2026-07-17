import { useEffect, useState } from "react";

import { getBarang } from "../../services/barangService";

import type { Barang } from "../../types/barang";

export default function LowStock() {
  const [stocks, setStocks] = useState<Barang[]>([]);

  useEffect(() => {
    const data = getBarang();

    setStocks(data.filter((item) => item.stok <= item.minimalStok));
  }, []);

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

        hover:shadow-lg
      "
    >
      <div className="mb-6">
        <h2
          className="
            text-xl
            font-bold

            text-gray-900
            dark:text-white
          "
        >
          Stok Menipis
        </h2>

        <p
          className="
            mt-1
            text-sm

            text-gray-500
            dark:text-gray-400
          "
        >
          Barang yang perlu segera dilakukan restock.
        </p>
      </div>

      {stocks.length === 0 ? (
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
          <div className="text-5xl">✅</div>

          <p className="font-semibold text-gray-700 dark:text-gray-200">
            Semua stok aman
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tidak ada barang yang perlu direstock.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {stocks.map((item) => (
            <div
              key={item.id}
              className="
                flex
                items-center
                justify-between

                rounded-xl

                px-3
                py-3

                transition-colors

                hover:bg-red-50
                dark:hover:bg-red-900/20
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center

                    rounded-full

                    bg-red-100
                    dark:bg-red-900/40

                    text-lg
                  "
                >
                  ⚠️
                </div>

                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">
                    {item.nama}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Minimal stok: {item.minimalStok}
                  </p>
                </div>
              </div>

              <span
                className="
                  rounded-full

                  bg-red-100
                  dark:bg-red-900/40

                  px-3
                  py-1

                  text-sm
                  font-semibold

                  text-red-700
                  dark:text-red-300
                "
              >
                {item.stok} pcs
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
