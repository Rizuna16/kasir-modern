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
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h2 className="text-lg font-bold mb-4">Transaksi Terakhir</h2>

      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada transaksi</p>
        ) : (
          transactions.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3 last:border-none"
            >
              <div>
                <p className="font-semibold">{item.nomorNota}</p>

                <p className="text-sm text-gray-500">{item.pelangganNama}</p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  Rp {item.total.toLocaleString()}
                </p>

                <p
                  className={
                    item.status === "LUNAS"
                      ? "text-sm text-green-600"
                      : "text-sm text-red-600"
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
