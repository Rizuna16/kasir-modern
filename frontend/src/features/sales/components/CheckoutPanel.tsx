import { useState } from "react";

import { Button, Card } from "../../../components/ui";

import SalesStore from "../store/salesStore";

interface Props {
  onSuccess?: () => void;
}

export default function CheckoutPanel({ onSuccess }: Props) {
  const [message, setMessage] = useState("");

  function handleCheckout() {
    const cart = SalesStore.getCart();

    if (!cart) {
      setMessage("Tidak ada transaksi aktif");

      return;
    }

    if (cart.items.length === 0) {
      setMessage("Keranjang masih kosong");

      return;
    }

    if (!cart.payment) {
      setMessage("Silahkan lakukan pembayaran terlebih dahulu");

      return;
    }

    const invoice = SalesStore.completeSale();

    if (!invoice) {
      setMessage("Checkout gagal");

      return;
    }

    setMessage(`Transaksi berhasil ${invoice.number}`);
    onSuccess?.();
  }

  return (
    <Card>
      <h2
        className="
          mb-4
          font-semibold
        "
      >
        Checkout
      </h2>

      {message && (
        <div
          className="
            mb-4
            rounded
            border
            p-3
            text-sm
          "
        >
          {message}
        </div>
      )}

      <Button variant="primary" onClick={handleCheckout}>
        Selesaikan Transaksi
      </Button>
    </Card>
  );
}
