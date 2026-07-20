import { Card, Input } from "../../../components/ui";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <Card>
      <h2
        className="
          mb-4
          font-semibold
        "
      >
        Cari Barang
      </h2>

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari nama barang..."
      />
    </Card>
  );
}
