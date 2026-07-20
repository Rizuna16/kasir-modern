import { SearchBox } from "../ui";

interface SupplierToolbarProps {
  search: string;

  setSearch: (value: string) => void;
}

export default function SupplierToolbar({
  search,

  setSearch,
}: SupplierToolbarProps) {
  return (
    <div
      className="
        w-full
      "
    >
      <SearchBox
        value={search}
        onChange={setSearch}
        placeholder="Cari supplier..."
      />
    </div>
  );
}
