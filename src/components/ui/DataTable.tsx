import type { ReactNode } from "react";

interface Column<T> {
  header: string;

  accessor: keyof T;

  render?: (row: T) => ReactNode;

  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];

  data: T[];

  emptyMessage?: string;

  loading?: boolean;
}

export default function DataTable<T>({
  columns,

  data,

  emptyMessage = "Data tidak tersedia",

  loading = false,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th
                key={`${String(column.accessor)}-${index}`}
                className={`px-4 py-3 text-left text-sm font-semibold ${
                  column.className ?? ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-10 text-center text-gray-500"
              >
                Memuat data...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-10 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-3xl">📦</div>

                  <p className="font-medium text-gray-600">{emptyMessage}</p>

                  <p className="text-sm text-gray-400">
                    Belum ada data untuk ditampilkan
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t hover:bg-gray-50 transition"
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={`${String(column.accessor)}-${columnIndex}`}
                    className={`px-4 py-3 text-sm ${column.className ?? ""}`}
                  >
                    {column.render
                      ? column.render(row)
                      : String(row[column.accessor] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
