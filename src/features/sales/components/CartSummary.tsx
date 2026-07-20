import { Card } from "../../../components/ui";

import type { Cart } from "../types";

interface Props {
  cart?: Cart | null;
}

export default function CartSummary({ cart }: Props) {
  if (!cart) {
    return null;
  }

  return (
    <Card>
      <h2
        className="
          mb-4
          font-semibold
        "
      >
        Ringkasan Transaksi
      </h2>

      <div
        className="
          space-y-3
          text-sm
        "
      >
        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>Rp {cart.subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Diskon Item</span>

          <span>Rp {cart.itemDiscount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Diskon Transaksi</span>

          <span>Rp {cart.transactionDiscount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Pajak</span>

          <span>Rp {cart.tax.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span>Service Charge</span>

          <span>Rp {cart.serviceCharge.toLocaleString()}</span>
        </div>

        <div
          className="
            mt-4
            flex
            justify-between
            border-t
            pt-4
            text-lg
            font-bold
          "
        >
          <span>Total</span>

          <span>Rp {cart.grandTotal.toLocaleString()}</span>
        </div>
      </div>
    </Card>
  );
}
