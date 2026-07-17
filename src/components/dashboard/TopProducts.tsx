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
        Produk Terlaris
      </h2>

      <div className="space-y-4">
        {products.length === 0 ? (
          <p
            className="
              text-sm

              text-gray-500

              dark:text-gray-400
            "
          >
            Belum ada data penjualan.
          </p>
        ) : (
          products.map((item, index) => (
            <div
              key={item.nama}
              className="
                flex

                justify-between

                text-gray-700

                dark:text-gray-200
              "
            >
              <span>
                {index + 1}. {item.nama}
              </span>

              <span
                className="
                  font-semibold

                  text-gray-900

                  dark:text-white
                "
              >
                {item.terjual} pcs
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
