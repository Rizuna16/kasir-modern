import { DataTable } from "../ui";

import type { Barang } from "../../types/barang";

import useSatuan from "../../hooks/useSatuan";
import useKategori from "../../hooks/useKategori";
import useSupplier from "../../hooks/useSupplier";

import { formatRupiah } from "../../utils/currency";

interface BarangTableProps {
  data: Barang[];

  onEdit: (data: Barang) => void;

  onDelete: (id: string) => void;
}

export default function BarangTable({
  data,

  onEdit,

  onDelete,
}: BarangTableProps) {
  const { getNamaSatuan } = useSatuan();

  const { getNamaKategori } = useKategori();

  const { getNamaSupplier } = useSupplier();

  const columns = [
    {
      header: "Kode",

      accessor: "kode" as keyof Barang,
    },

    {
      header: "Barcode",

      accessor: "barcode" as keyof Barang,
    },

    {
      header: "Nama Barang",

      accessor: "nama" as keyof Barang,
    },

    {
      header: "Kategori",

      accessor: "kategoriId" as keyof Barang,

      render: (item: Barang) => <>{getNamaKategori(item.kategoriId)}</>,
    },

    {
      header: "Satuan",

      accessor: "satuanId" as keyof Barang,

      render: (item: Barang) => <>{getNamaSatuan(item.satuanId)}</>,
    },

    {
      header: "Supplier",

      accessor: "supplierId" as keyof Barang,

      render: (item: Barang) => <>{getNamaSupplier(item.supplierId)}</>,
    },

    {
      header: "Harga Beli",

      accessor: "hargaBeli" as keyof Barang,

      className: "text-right",

      render: (item: Barang) => <>{formatRupiah(item.hargaBeli)}</>,
    },

    {
      header: "Harga Grosir",

      accessor: "hargaGrosir" as keyof Barang,

      className: "text-right",

      render: (item: Barang) => <>{formatRupiah(item.hargaGrosir)}</>,
    },

    {
      header: "Harga Semi Grosir",

      accessor: "hargaSemiGrosir" as keyof Barang,

      className: "text-right",

      render: (item: Barang) => <>{formatRupiah(item.hargaSemiGrosir)}</>,
    },

    {
      header: "Harga Ecer",

      accessor: "hargaEcer" as keyof Barang,

      className: "text-right",

      render: (item: Barang) => <>{formatRupiah(item.hargaEcer)}</>,
    },

    {
      header: "Stok",

      accessor: "stok" as keyof Barang,

      className: "text-center",

      render: (item: Barang) =>
        item.stok <= item.minimalStok ? (
          <span className="text-red-600 font-semibold">⚠️ {item.stok}</span>
        ) : (
          <span>{item.stok}</span>
        ),
    },

    {
      header: "Status",

      accessor: "status" as keyof Barang,

      className: "text-center",

      render: (item: Barang) => (
        <span
          className={`

          px-3

          py-1

          rounded-full

          text-xs

          font-medium


          ${
            item.status === "Aktif"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }

          `}
        >
          {item.status}
        </span>
      ),
    },

    {
      header: "Aksi",

      accessor: "id" as keyof Barang,

      className: "text-center w-40",

      render: (item: Barang) => (
        <div className="flex justify-center gap-3">
          <button
            onClick={() => onEdit(item)}
            className="
            text-blue-600
            hover:text-blue-800
            "
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="
            text-red-600
            hover:text-red-800
            "
          >
            Hapus
          </button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="
      bg-white
      rounded-xl
      border
      shadow-sm
      p-6
      "
    >
      <DataTable
        columns={columns}
        data={data}
        emptyMessage="Belum ada data barang"
      />
    </div>
  );
}
