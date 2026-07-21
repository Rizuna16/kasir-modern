import { Card, Button, Input } from "../ui";

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
    <Card>
      <div
        className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-4
        "
      >
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
    </Card>
  );
}
