import { useEffect, useState } from "react";

import { getBarang } from "../../services/barangService";

import type { Barang } from "../../types/barang";

export default function LowStock() {
  const [stocks, setStocks] = useState<Barang[]>([]);

  useEffect(() => {
    const data = getBarang();

    const lowStock = data.filter((item) => item.stok <= item.minimalStok);

    setStocks(lowStock);
  }, []);

  return (
    <div
      className="
        rounded-xl

        border
        border-gray-200

        bg-white

        p-5

        shadow-sm

        transition-all

        duration-200

        dark:border-gray-700

        dark:bg-gray-800
      "
    >
      <h2
        className="
          mb-4

          text-lg

          font-bold

          text-gray-900

          dark:text-white
        "
      >
        Stok Menipis
      </h2>

      <div className="space-y-3">
        {stocks.length === 0 ? (
          <p
            className="
              text-sm

              text-gray-500

              dark:text-gray-400
            "
          >
            Semua stok aman
          </p>
        ) : (
          stocks.map((item) => (
            <div
              key={item.id}
              className="
                flex

                items-center

                justify-between
              "
            >
              <div
                className="
                  flex

                  items-center

                  gap-2

                  text-gray-700

                  dark:text-gray-200
                "
              >
                <span>⚠️</span>

                <span>{item.nama}</span>
              </div>

              <span
                className="
                  text-sm

                  font-semibold

                  text-red-500

                  dark:text-red-400
                "
              >
                {item.stok}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
