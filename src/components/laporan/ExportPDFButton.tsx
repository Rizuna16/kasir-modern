import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Button } from "../ui";

import type { Penjualan } from "../../types/penjualan";

import { toastWarning } from "../../utils/toast";
import { formatRupiah } from "../../utils/currency";

interface Props {
  data: Penjualan[];
}

export default function ExportPDFButton({ data }: Props) {
  const exportPDF = () => {
    if (data.length === 0) {
      toastWarning("Tidak ada data laporan untuk diekspor.");

      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.text("KASIR MODERN", 14, 15);

    doc.setFontSize(12);

    doc.text("Laporan Penjualan", 14, 23);

    doc.setFontSize(10);

    doc.text(
      `Tanggal Export: ${new Date().toLocaleDateString("id-ID")}`,
      14,
      30,
    );

    const tableData = data.map((item, index) => [
      index + 1,

      item.tanggal,

      item.nomorNota,

      item.pelangganNama,

      formatRupiah(item.total),

      item.status,
    ]);

    autoTable(doc, {
      startY: 38,

      head: [["No", "Tanggal", "Nota", "Pelanggan", "Total", "Status"]],

      body: tableData,

      styles: {
        fontSize: 9,
      },
    });

    const totalTransaksi = data.length;

    const totalOmzet = data.reduce((total, item) => total + item.total, 0);

    const posisiY = (doc as any).lastAutoTable.finalY + 10;

    doc.text(`Total Transaksi : ${totalTransaksi}`, 14, posisiY);

    doc.text(`Total Omzet : ${formatRupiah(totalOmzet)}`, 14, posisiY + 7);

    doc.save("laporan-penjualan.pdf");
  };

  return (
    <Button type="button" variant="danger" onClick={exportPDF}>
      Export PDF
    </Button>
  );
}
