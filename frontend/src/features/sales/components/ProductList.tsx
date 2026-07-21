import { Button, Card } from "../../../components/ui";

import type { Barang } from "../../../types/barang";

interface ProductListProps {
  products: Barang[];
  onAdd: (barang: Barang) => void;
}

export default function ProductList({ products, onAdd }: ProductListProps) {
  return (
    <Card>
      <h2
        className="
          mb-4
          font-semibold
        "
      >
        Daftar Barang
      </h2>

      {products.length === 0 ? (
        <p
          className="
            text-sm
            text-gray-500
          "
        >
          Barang tidak ditemukan.
        </p>
      ) : (
        <div
          className="
            space-y-2
          "
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="
                flex
                items-center
                justify-between
                rounded
                border
                p-3
              "
            >
              <div>
                <div className="font-medium">{item.nama}</div>

                <div
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Stok : {item.stok}
                </div>

                <div
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Rp {item.hargaEcer.toLocaleString()}
                </div>
              </div>

              <Button variant="primary" onClick={() => onAdd(item)}>
                Tambah
              </Button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
