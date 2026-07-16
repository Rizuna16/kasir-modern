import { useEffect, useState } from "react";

import { getPenjualan } from "../../services/penjualanService";

interface TopProduct {
  nama: string;
  terjual: number;
}

export default function TopProducts() {
  const [products, setProducts] = useState<TopProduct[]>([]);

  useEffect(() => {
    const penjualan = getPenjualan();

    const mapProduk: Record<string, number> = {};

    penjualan.forEach((transaksi) => {
      transaksi.detail.forEach((item) => {
        mapProduk[item.namaBarang] =
          (mapProduk[item.namaBarang] || 0) + item.qty;
      });
    });

    const hasil = Object.entries(mapProduk)
      .map(([nama, terjual]) => ({
        nama,
        terjual,
      }))
      .sort((a, b) => b.terjual - a.terjual)
      .slice(0, 5);

    setProducts(hasil);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h2 className="font-bold text-lg mb-4">Produk Terlaris</h2>

      <div className="space-y-4">
        {products.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada data penjualan.</p>
        ) : (
          products.map((item, index) => (
            <div key={item.nama} className="flex justify-between">
              <span>
                {index + 1}. {item.nama}
              </span>

              <span className="font-semibold">{item.terjual} pcs</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
