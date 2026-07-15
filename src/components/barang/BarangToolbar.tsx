import Button from "../ui/Button";

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
    <div className="flex items-center justify-between gap-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari nama barang..."
        className="
        border
        rounded-lg
        px-4
        py-2
        w-full
        max-w-md
        "
      />

      <Button variant="primary" onClick={onTambah}>
        + Tambah Barang
      </Button>
    </div>
  );
}
