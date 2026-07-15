import { useMemo, useState } from "react";

export default function usePagination<T>(data: T[], itemsPerPage: number = 10) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    return data.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [data, page, itemsPerPage]);

  return {
    page,
    setPage,
    totalPages,
    paginatedData,
  };
}
