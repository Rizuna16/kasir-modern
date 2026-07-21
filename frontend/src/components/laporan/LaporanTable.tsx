import { DataTable, Button, Badge } from "../ui";

import { formatRupiah } from "../../utils/currency";

import type { SalesReportItem } from "../../features/sales/services/reportService";

interface Props {
  data: SalesReportItem[];

  onDetail: (item: SalesReportItem) => void;

  onPrint?: (item: SalesReportItem) => void;
}

export default function LaporanTable({
  data,

  onDetail,

  onPrint,
}: Props) {
  return (
    <DataTable
      columns={[
        {
          header: "No",

          accessor: "id",

          render: (_, index) => <span>{index + 1}</span>,
        },

        {
          header: "Tanggal",

          accessor: "tanggal",
        },

        {
          header: "Nomor Nota",

          accessor: "nomorNota",

          render: (item) => (
            <span
              className="
                font-medium
                text-gray-800
                dark:text-white
              "
            >
              {item.nomorNota}
            </span>
          ),
        },

        {
          header: "Pelanggan",

          accessor: "pelangganNama",
        },

        {
          header: "Total",

          accessor: "total",

          render: (item) => (
            <span
              className="
                font-semibold
                text-gray-800
                dark:text-white
              "
            >
              {formatRupiah(item.total)}
            </span>
          ),
        },

        {
          header: "Status",

          accessor: "status",

          render: (item) => (
            <Badge variant={item.status === "LUNAS" ? "success" : "warning"}>
              {item.status}
            </Badge>
          ),
        },

        {
          header: "Aksi",

          accessor: "id",

          render: (item) => (
            <div
              className="
                flex
                justify-center
                gap-2
              "
            >
              <Button
                size="sm"
                variant="primary"
                onClick={() => onDetail(item)}
              >
                Detail
              </Button>

              <Button
                size="sm"
                variant="secondary"
                onClick={() => onPrint?.(item)}
                disabled={!onPrint}
              >
                Print
              </Button>
            </div>
          ),
        },
      ]}
      data={data}
      emptyMessage="Tidak ada transaksi."
    />
  );
}
