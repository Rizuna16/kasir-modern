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
          Produk Terlaris
        </h2>

        <p
          className="
            mt-1
            text-sm

            text-gray-500
            dark:text-gray-400
          "
        >
          5 produk dengan jumlah penjualan tertinggi.
        </p>
      </div>

      {products.length === 0 ? (
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
          <div className="text-5xl">🏆</div>

          <p className="font-semibold text-gray-700 dark:text-gray-200">
            Belum ada produk terlaris
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Produk akan muncul setelah ada transaksi penjualan.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((item, index) => (
            <div
              key={item.nama}
              className="
                flex
                items-center
                justify-between

                rounded-xl

                px-3
                py-3

                transition-colors

                hover:bg-gray-50
                dark:hover:bg-gray-700/40
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center

                    rounded-full

                    bg-blue-100
                    dark:bg-blue-900/40

                    text-sm
                    font-bold

                    text-blue-700
                    dark:text-blue-300
                  "
                >
                  {index + 1}
                </div>

                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {item.nama}
                </span>
              </div>

              <span
                className="
                  rounded-full

                  bg-blue-100
                  dark:bg-blue-900/40

                  px-3
                  py-1

                  text-sm
                  font-semibold

                  text-blue-700
                  dark:text-blue-300
                "
              >
                {item.terjual} pcs
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
