import { useMemo, useState } from "react";

import { Button, Card, Input } from "../../../components/ui";

import SalesStore from "../store/salesStore";

import { PAYMENT_METHOD, type PaymentMethod } from "../constants/payment";

import { validatePayment, createPayment } from "../engine/paymentEngine";

interface Props {
  total: number;

  onSuccess?: () => void;
}

export default function PaymentPanel({ total, onSuccess }: Props) {
  const [method, setMethod] = useState<PaymentMethod>(PAYMENT_METHOD.CASH);

  const [paidAmount, setPaidAmount] = useState<number>(0);

  const [message, setMessage] = useState("");

  const change = useMemo(() => {
    if (paidAmount < total) return 0;

    return paidAmount - total;
  }, [paidAmount, total]);

  function prosesPembayaran() {
    const validation = validatePayment(total, paidAmount);

    if (!validation.success) {
      setMessage(validation.message ?? "");

      return;
    }

    const payment = createPayment(
      method,

      total,

      paidAmount,
    );

    SalesStore.setPayment(payment);

    setMessage("Pembayaran berhasil");

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
        Pembayaran
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

      <div
        className="
          space-y-4
        "
      >
        <div>
          <label
            className="
              mb-1
              block
              text-sm
            "
          >
            Metode Pembayaran
          </label>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as PaymentMethod)}
            className="
              w-full
              rounded
              border
              p-2
            "
          >
            <option value={PAYMENT_METHOD.CASH}>Cash</option>

            <option value={PAYMENT_METHOD.QRIS}>QRIS</option>

            <option value={PAYMENT_METHOD.BANK_TRANSFER}>Bank Transfer</option>

            <option value={PAYMENT_METHOD.DEBIT_CARD}>Debit Card</option>

            <option value={PAYMENT_METHOD.CREDIT_CARD}>Credit Card</option>

            <option value={PAYMENT_METHOD.E_WALLET}>E-Wallet</option>
          </select>
        </div>

        <Input
          label="Jumlah Bayar"
          type="number"
          value={paidAmount}
          onChange={(e) => setPaidAmount(Number(e.target.value))}
        />

        <div
          className="
            rounded
            border
            p-3
          "
        >
          <div>Total: Rp {total.toLocaleString()}</div>

          <div
            className="
              mt-2
              font-bold
            "
          >
            Kembalian: Rp {change.toLocaleString()}
          </div>
        </div>

        <Button variant="primary" onClick={prosesPembayaran}>
          Bayar
        </Button>
      </div>
    </Card>
  );
}
