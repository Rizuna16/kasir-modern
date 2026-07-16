import Button from "../ui/Button";

interface Props {
  tanggalAwal: string;
  tanggalAkhir: string;
  onTanggalAwalChange: (value: string) => void;
  onTanggalAkhirChange: (value: string) => void;
  onCari: () => void;
  onReset: () => void;
}

export default function LaporanFilter({
  tanggalAwal,
  tanggalAkhir,
  onTanggalAwalChange,
  onTanggalAkhirChange,
  onCari,
  onReset,
}: Props) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Tanggal Awal</label>

          <input
            type="date"
            value={tanggalAwal}
            onChange={(e) => onTanggalAwalChange(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Tanggal Akhir
          </label>

          <input
            type="date"
            value={tanggalAkhir}
            onChange={(e) => onTanggalAkhirChange(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        <div className="flex items-end">
          <Button type="button" variant="primary" fullWidth onClick={onCari}>
            Cari
          </Button>
        </div>

        <div className="flex items-end">
          <Button type="button" variant="secondary" fullWidth onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
