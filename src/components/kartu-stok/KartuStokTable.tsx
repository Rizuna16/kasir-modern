import { Badge, DataTable } from "../ui";
import type { Column } from "../ui/DataTable";

import type { StockMovement } from "../../types/stockMovement";

interface Props {
  data: StockMovement[];
  loading?: boolean;
}

const formatTanggal = (tanggal: string) =>
  new Date(tanggal).toLocaleDateString("id-ID");

const formatAngka = (angka: number) => angka.toLocaleString("id-ID");

export default function KartuStokTable({ data, loading = false }: Props) {
  const columns: Column<StockMovement>[] = [
    {
      header: "Tanggal",
      accessor: "tanggal",
      render: (row) => formatTanggal(row.tanggal),
    },
    {
      header: "Tipe",
      accessor: "tipe",
      render: (row) => <Badge>{row.tipe}</Badge>,
    },
    {
      header: "Referensi",
      accessor: "referensi",
      render: (row) => row.referensi ?? "-",
    },
    {
      header: "Masuk",
      accessor: "qty",
      className: "text-right",
      render: (row) => (row.qty > 0 ? formatAngka(row.qty) : "-"),
    },
    {
      header: "Keluar",
      accessor: "qty",
      className: "text-right",
      render: (row) => (row.qty < 0 ? formatAngka(Math.abs(row.qty)) : "-"),
    },
    {
      header: "Stok Sebelum",
      accessor: "stokSebelum",
      className: "text-right",
      render: (row) => formatAngka(row.stokSebelum),
    },
    {
      header: "Stok Sesudah",
      accessor: "stokSesudah",
      className: "text-right font-semibold",
      render: (row) => formatAngka(row.stokSesudah),
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
