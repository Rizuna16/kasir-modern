import { Button, SearchBox } from "../ui";

interface SupplierToolbarProps {
  search: string;
  setSearch: (value: string) => void;
  onTambah: () => void;
}

export default function SupplierToolbar({
  search,
  setSearch,
  onTambah,
}: SupplierToolbarProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="w-full max-w-sm">
        <SearchBox
          value={search}
          onChange={setSearch}
          placeholder="Cari supplier..."
        />
      </div>

      <Button onClick={onTambah}>+ Tambah Supplier</Button>
    </div>
  );
}
