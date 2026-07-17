import { Card } from "../ui";

import { formatRupiah } from "../../utils/currency";

interface Props {
  totalTransaksi: number;

  totalOmzet: number;
}

export default function LaporanStats({
  totalTransaksi,

  totalOmzet,
}: Props) {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-4
        md:grid-cols-2
      "
    >
      <Card>
        <p
          className="
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          Total Transaksi
        </p>

        <h2
          className="
            mt-2
            text-3xl
            font-bold
            text-gray-800
            dark:text-white
          "
        >
          {totalTransaksi}
        </h2>
      </Card>

      <Card>
        <p
          className="
            text-sm
            text-gray-500
            dark:text-gray-400
          "
        >
          Total Omzet
        </p>

        <h2
          className="
            mt-2
            text-3xl
            font-bold
            text-gray-800
            dark:text-white
          "
        >
          {formatRupiah(totalOmzet)}
        </h2>
      </Card>
    </div>
  );
}
