import { DataTable, Button } from "../ui";

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

      render: (item: Barang) => (
        <span className="font-mono font-semibold text-gray-700 dark:text-gray-200">
          {item.kode}
        </span>
      ),
    },

    {
      header: "Barcode",
      accessor: "barcode" as keyof Barang,

      render: (item: Barang) => (
        <span className="font-mono text-sm text-gray-500 dark:text-gray-400">
          {item.barcode || "-"}
        </span>
      ),
    },

    {
      header: "Nama Barang",
      accessor: "nama" as keyof Barang,

      render: (item: Barang) => (
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {item.nama}
          </p>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.kode}
          </p>
        </div>
      ),
    },

    {
      header: "Kategori",
      accessor: "kategoriId" as keyof Barang,

      render: (item: Barang) => (
        <span
          className="
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-xs
            font-medium
            text-blue-700

            dark:bg-blue-900/30
            dark:text-blue-300
          "
        >
          {getNamaKategori(item.kategoriId)}
        </span>
      ),
    },

    {
      header: "Satuan",
      accessor: "satuanId" as keyof Barang,

      render: (item: Barang) => (
        <span
          className="
            rounded-full
            bg-purple-100
            px-3
            py-1
            text-xs
            font-medium
            text-purple-700

            dark:bg-purple-900/30
            dark:text-purple-300
          "
        >
          {getNamaSatuan(item.satuanId)}
        </span>
      ),
    },

    {
      header: "Supplier",
      accessor: "supplierId" as keyof Barang,

      render: (item: Barang) => {
        const supplier = getNamaSupplier(item.supplierId);

        return (
          <span className="text-gray-700 dark:text-gray-300">
            {supplier || "-"}
          </span>
        );
      },
    },

    {
      header: "Harga Beli",
      accessor: "hargaBeli" as keyof Barang,

      className: "text-right",

      render: (item: Barang) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {formatRupiah(item.hargaBeli)}
        </span>
      ),
    },

    {
      header: "Harga Grosir",
      accessor: "hargaGrosir" as keyof Barang,

      className: "text-right",

      render: (item: Barang) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {formatRupiah(item.hargaGrosir)}
        </span>
      ),
    },

    {
      header: "Harga Semi",
      accessor: "hargaSemiGrosir" as keyof Barang,

      className: "text-right",

      render: (item: Barang) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {formatRupiah(item.hargaSemiGrosir)}
        </span>
      ),
    },

    {
      header: "Harga Ecer",
      accessor: "hargaEcer" as keyof Barang,

      className: "text-right",

      render: (item: Barang) => (
        <span className="font-semibold text-gray-900 dark:text-white">
          {formatRupiah(item.hargaEcer)}
        </span>
      ),
    },

    {
      header: "Stok",
      accessor: "stok" as keyof Barang,

      className: "text-center",

      render: (item: Barang) => {
        const rendah = item.stok <= item.minimalStok;

        return (
          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold

              ${
                rendah
                  ? `
                    bg-red-100
                    text-red-700
                    dark:bg-red-900/30
                    dark:text-red-300
                  `
                  : `
                    bg-green-100
                    text-green-700
                    dark:bg-green-900/30
                    dark:text-green-300
                  `
              }
            `}
          >
            {rendah ? "⚠️" : "✓"} {item.stok} pcs
          </span>
        );
      },
    },

    {
      header: "Status",
      accessor: "status" as keyof Barang,

      className: "text-center",

      render: (item: Barang) => (
        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold

            ${
              item.status === "Aktif"
                ? `
                  bg-green-100
                  text-green-700
                  dark:bg-green-900/30
                  dark:text-green-300
                `
                : `
                  bg-red-100
                  text-red-700
                  dark:bg-red-900/30
                  dark:text-red-300
                `
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

      className: "text-center w-52",

      render: (item: Barang) => (
        <div className="flex justify-center gap-2">
          <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
            Edit
          </Button>

          <Button size="sm" variant="danger" onClick={() => onDelete(item.id)}>
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="
        rounded-2xl

        border
        border-gray-200
        dark:border-gray-700

        bg-white
        dark:bg-gray-800

        p-6

        shadow-sm

        transition-all
        duration-300

        hover:shadow-md
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
