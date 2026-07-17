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

        shadow-sm

        dark:border-gray-700

        dark:bg-gray-800

        md:flex-row

        md:items-center

        md:justify-between
      "
    >
      <SearchBox
        value={search}
        onChange={setSearch}
        placeholder="Cari supplier..."
      />

      <Button onClick={onTambah}>+ Tambah Supplier</Button>
    </div>
  );
}
