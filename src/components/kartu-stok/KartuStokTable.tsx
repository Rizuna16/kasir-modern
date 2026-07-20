import { Badge, DataTable } from "../ui";

import type { Column } from "../ui/DataTable";

import type { StockMovement } from "../../types/stockMovement";

interface Props {
  data: StockMovement[];

  loading?: boolean;
}

const formatTanggal = (tanggal: string) => {
  if (!tanggal) {
    return "-";
  }

  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatAngka = (angka: number) => {
  return angka.toLocaleString("id-ID");
};

function getBadgeVariant(tipe: string) {
  switch (tipe) {
    case "Pembelian":
    case "Transfer Masuk":
      return "success";

    case "Penjualan":
    case "Transfer Keluar":
      return "danger";

    case "Retur Pembelian":
    case "Retur Penjualan":
      return "warning";

    case "Stock Opname":
    case "Penyesuaian":
      return "info";

    default:
      return "secondary";
  }
}

export default function KartuStokTable({
  data,

  loading = false,
}: Props) {
  const columns: Column<StockMovement>[] = [
    {
      header: "Tanggal",

      accessor: "tanggal",

      render: (row) => (
        <span
          className="
              text-gray-700

              dark:text-gray-300
            "
        >
          {formatTanggal(row.tanggal)}
        </span>
      ),
    },

    {
      header: "Tipe",

      accessor: "tipe",

      render: (row) => (
        <Badge variant={getBadgeVariant(row.tipe)}>{row.tipe}</Badge>
      ),
    },

    {
      header: "Referensi",

      accessor: "referensi",

      render: (row) => (
        <span
          className="
            text-gray-700

            dark:text-gray-300
          "
        >
          {row.referensi ?? "-"}
        </span>
      ),
    },

    {
      header: "Masuk",

      accessor: "qty",

      className: "text-right",

      render: (row) => (
        <span
          className="
            font-medium

            text-green-600

            dark:text-green-400
          "
        >
          {row.qty > 0 ? formatAngka(row.qty) : "-"}
        </span>
      ),
    },

    {
      header: "Keluar",

      accessor: "qty",

      className: "text-right",

      render: (row) => (
        <span
          className="
            font-medium

            text-red-600

            dark:text-red-400
          "
        >
          {row.qty < 0 ? formatAngka(Math.abs(row.qty)) : "-"}
        </span>
      ),
    },

    {
      header: "Stok Sebelum",

      accessor: "stokSebelum",

      className: "text-right",

      render: (row) => (
        <span
          className="
            text-gray-700

            dark:text-gray-300
          "
        >
          {formatAngka(row.stokSebelum)}
        </span>
      ),
    },

    {
      header: "Stok Sesudah",

      accessor: "stokSesudah",

      className: "text-right",

      render: (row) => (
        <span
          className="
            font-semibold

            text-gray-900

            dark:text-white
          "
        >
          {formatAngka(row.stokSesudah)}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      emptyMessage="Belum ada riwayat pergerakan stok"
    />
  );
}
