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
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h2 className="font-bold text-lg mb-4">Stok Menipis</h2>

      <div className="space-y-3">
        {stocks.length === 0 ? (
          <p className="text-gray-500 text-sm">Semua stok aman</p>
        ) : (
          stocks.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>⚠️</span>

                <span>{item.nama}</span>
              </div>

              <span className="text-sm text-red-500 font-semibold">
                {item.stok}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
