import { Button, Input, Select } from "../ui";

interface Option {
  value: string;

  label: string;
}

interface KartuStokFilterProps {
  barangId: string;

  tipe: string;

  tanggalAwal: string;

  tanggalAkhir: string;

  barangOptions: Option[];

  onBarangChange: (value: string) => void;

  onTipeChange: (value: string) => void;

  onTanggalAwalChange: (value: string) => void;

  onTanggalAkhirChange: (value: string) => void;

  onFilter: () => void;

  onReset: () => void;
}

const tipeOptions: Option[] = [
  {
    value: "",
    label: "Semua Tipe",
  },

  {
    value: "Pembelian",
    label: "Pembelian",
  },

  {
    value: "Penjualan",
    label: "Penjualan",
  },

  {
    value: "Retur Pembelian",
    label: "Retur Pembelian",
  },

  {
    value: "Retur Penjualan",
    label: "Retur Penjualan",
  },

  {
    value: "Penyesuaian",
    label: "Penyesuaian",
  },

  {
    value: "Stock Opname",
    label: "Stock Opname",
  },

  {
    value: "Transfer Masuk",
    label: "Transfer Masuk",
  },

  {
    value: "Transfer Keluar",
    label: "Transfer Keluar",
  },
];

export default function KartuStokFilter({
  barangId,

  tipe,

  tanggalAwal,

  tanggalAkhir,

  barangOptions,

  onBarangChange,

  onTipeChange,

  onTanggalAwalChange,

  onTanggalAkhirChange,

  onFilter,

  onReset,
}: KartuStokFilterProps) {
  return (
    <div
      className="
        space-y-4
      "
    >
      <div
        className="
          grid

          gap-4

          md:grid-cols-5
        "
      >
        <Select
          label="Barang"
          value={barangId}
          options={[
            {
              value: "",
              label: "Semua Barang",
            },

            ...barangOptions,
          ]}
          onChange={onBarangChange}
        />

        <Select
          label="Tipe"
          value={tipe}
          options={tipeOptions}
          onChange={onTipeChange}
        />

        <Input
          label="Tanggal Awal"
          type="date"
          value={tanggalAwal}
          onChange={(e) => onTanggalAwalChange(e.target.value)}
        />

        <Input
          label="Tanggal Akhir"
          type="date"
          value={tanggalAkhir}
          onChange={(e) => onTanggalAkhirChange(e.target.value)}
        />

        <div
          className="
            flex

            items-end

            gap-2
          "
        >
          <Button variant="secondary" fullWidth onClick={onReset}>
            Reset
          </Button>

          <Button fullWidth onClick={onFilter}>
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
}
