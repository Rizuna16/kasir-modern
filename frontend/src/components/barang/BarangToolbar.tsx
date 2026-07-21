import Button from "../ui/Button";
import Input from "../ui/Input";

interface BarangToolbarProps {
  search: string;

  setSearch: (value: string) => void;

  onTambah: () => void;
}

export default function BarangToolbar({
  search,

  setSearch,

  onTambah,
}: BarangToolbarProps) {
  return (
    <div
      className="
        flex

        flex-col

        gap-4

        rounded-xl

        border
        border-gray-200

        bg-white

        p-4

        md:flex-row

        md:items-center

        md:justify-between

        dark:border-gray-700

        dark:bg-gray-800
      "
    >
      <div className="w-full max-w-md">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama barang..."
        />
      </div>

      <Button variant="primary" onClick={onTambah}>
        + Tambah Barang
      </Button>
    </div>
  );
}
