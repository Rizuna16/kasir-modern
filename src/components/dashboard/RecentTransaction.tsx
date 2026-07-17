import { useEffect, useState } from "react";

import { getPenjualan } from "../../services/penjualanService";

import type { Penjualan } from "../../types/penjualan";

export default function RecentTransaction() {
  const [transactions, setTransactions] = useState<Penjualan[]>([]);

  useEffect(() => {
    const data = getPenjualan();

    const sorted = [...data]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);

    setTransactions(sorted);
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
        Transaksi Terakhir
      </h2>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p
            className="
              text-sm

              text-gray-500

              dark:text-gray-400
            "
          >
            Belum ada transaksi
          </p>
        ) : (
          transactions.map((item) => (
            <div
              key={item.id}
              className="
                flex

                items-center

                justify-between

                border-b
                border-gray-200

                pb-3

                last:border-none

                dark:border-gray-700
              "
            >
              <div>
                <p
                  className="
                    font-semibold

                    text-gray-900

                    dark:text-white
                  "
                >
                  {item.nomorNota}
                </p>

                <p
                  className="
                    text-sm

                    text-gray-500

                    dark:text-gray-400
                  "
                >
                  {item.pelangganNama}
                </p>
              </div>

              <div className="text-right">
                <p
                  className="
                    font-semibold

                    text-gray-900

                    dark:text-white
                  "
                >
                  Rp {item.total.toLocaleString()}
                </p>

                <p
                  className={
                    item.status === "LUNAS"
                      ? `
                        text-sm

                        text-green-600

                        dark:text-green-400
                      `
                      : `
                        text-sm

                        text-red-600

                        dark:text-red-400
                      `
                  }
                >
                  {item.status}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
