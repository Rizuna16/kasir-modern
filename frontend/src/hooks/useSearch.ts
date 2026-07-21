import { useMemo, useState } from "react";

export default function useSearch<T>(data: T[], searchField: keyof T) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!search.trim()) {
      return data;
    }

    return data.filter((item) =>
      String(item[searchField]).toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search, searchField]);

  return {
    search,
    setSearch,
    filteredData,
  };
}
