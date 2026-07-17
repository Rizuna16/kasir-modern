import * as XLSX from "xlsx";

import type { Penjualan } from "../../types/penjualan";

import { toastWarning } from "../../utils/toast";

interface Props {
  data: Penjualan[];
}

export default function ExportExcelButton({ data }: Props) {
  const exportExcel = () => {
    if (data.length === 0) {
      toastWarning("Tidak ada data laporan untuk diekspor.");
      return;
    }

    const laporanSheet = data.map((item, index) => ({
      No: index + 1,
      Tanggal: item.tanggal,
      "Nomor Nota": item.nomorNota,
      Pelanggan: item.pelangganNama,
      Total: item.total,
      Status: item.status,
    }));

    const detailSheet = data.flatMap((item) =>
      item.detail.map((detail) => ({
        "Nomor Nota": item.nomorNota,
        Barang: detail.namaBarang,
        Qty: detail.qty,
        Harga: detail.hargaJual,
        Subtotal: detail.subtotal,
      })),
    );

    const workbook = XLSX.utils.book_new();

    const worksheetLaporan = XLSX.utils.json_to_sheet(laporanSheet);

    const worksheetDetail = XLSX.utils.json_to_sheet(detailSheet);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheetLaporan,
      "Laporan Penjualan",
    );

    XLSX.utils.book_append_sheet(workbook, worksheetDetail, "Detail Barang");

    XLSX.writeFile(workbook, "laporan-penjualan.xlsx");
  };

  return (
    <button
      type="button"
      onClick={exportExcel}
      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
    >
      Export Excel
    </button>
  );
}
