import * as XLSX from "xlsx";

import { Button } from "../ui";

import type { SalesReportItem } from "../../features/sales/services/reportService";

import { toastWarning } from "../../utils/toast";

interface Props {
  data: SalesReportItem[];
}

export default function ExportExcelButton({ data }: Props) {
  const exportExcel = () => {
    if (data.length === 0) {
      toastWarning("Tidak ada data laporan untuk diekspor.");

      return;
    }

    const laporanSheet = data.map((item, index) => {
      const invoice = item.invoice;

      return {
        No: index + 1,

        Tanggal: invoice.date,

        "Nomor Nota": invoice.number,

        Pelanggan: invoice.customer?.nama ?? "Walk In Customer",

        Total: invoice.grandTotal,

        Kasir: invoice.cashierName,

        Status: invoice.payment.status,
      };
    });

    const detailSheet = data.flatMap((item) => {
      const invoice = item.invoice;

      return invoice.items.map((detail) => ({
        "Nomor Nota": invoice.number,

        Barang: detail.namaBarang,

        Qty: detail.qty,

        Harga: detail.harga,

        Subtotal: detail.subtotal,
      }));
    });

    const workbook = XLSX.utils.book_new();

    const worksheetLaporan = XLSX.utils.json_to_sheet(laporanSheet);

    const worksheetDetail = XLSX.utils.json_to_sheet(detailSheet);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheetLaporan,
      "Laporan Penjualan",
    );

    XLSX.utils.book_append_sheet(workbook, worksheetDetail, "Detail Barang");

    XLSX.writeFile(workbook, "laporan-penjualan-enterprise.xlsx");
  };

  return (
    <Button type="button" variant="success" onClick={exportExcel}>
      Export Excel
    </Button>
  );
}
