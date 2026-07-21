import { Button, Card } from "../../../components/ui";

import type { CartItem } from "../types";

interface CartTableProps {
  items: CartItem[];
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartTable({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}: CartTableProps) {
  return (
    <Card>
      <h2
        className="
          mb-4
          font-semibold
        "
      >
        Keranjang
      </h2>

      {items.length === 0 ? (
        <p>Belum ada barang</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                flex
                items-center
                justify-between
                border-b
                pb-3
              "
            >
              <div>
                <div className="font-medium">{item.namaBarang}</div>

                <div
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  Rp {item.total.toLocaleString()}
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <Button variant="secondary" onClick={() => onDecrease(item.id)}>
                  -
                </Button>

                <span>{item.qty}</span>

                <Button variant="primary" onClick={() => onIncrease(item.id)}>
                  +
                </Button>

                <Button variant="danger" onClick={() => onRemove(item.id)}>
                  Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
