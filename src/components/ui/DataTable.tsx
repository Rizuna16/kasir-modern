import type { ReactNode } from "react";

export interface Column<T> {
  header: string;

  accessor: keyof T;

  render?: (row: T, index: number) => ReactNode;

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
    <div
      className="
        overflow-x-auto

        rounded-xl

        border
        border-gray-200
        dark:border-slate-700

        bg-white
        dark:bg-slate-900

        shadow-sm
      "
    >
      <table className="min-w-full">
        <thead
          className="
            bg-gray-50
            dark:bg-slate-800
          "
        >
          <tr>
            {columns.map((column, index) => (
              <th
                key={`${String(column.accessor)}-${index}`}
                className={`
                  px-5
                  py-3

                  text-left

                  text-xs

                  font-semibold

                  uppercase

                  tracking-wide

                  text-gray-600
                  dark:text-gray-300

                  ${column.className ?? ""}
                `}
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
                className="
                  py-12

                  text-center

                  text-gray-500
                  dark:text-gray-400
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      h-8
                      w-8

                      animate-spin

                      rounded-full

                      border-4

                      border-gray-200
                      dark:border-slate-600

                      border-t-blue-600
                    "
                  />

                  <span>Memuat data...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="
                  py-12

                  text-center
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    gap-2
                  "
                >
                  <div className="text-4xl">📦</div>

                  <p
                    className="
                      font-semibold

                      text-gray-700
                      dark:text-gray-200
                    "
                  >
                    {emptyMessage}
                  </p>

                  <p
                    className="
                      text-sm

                      text-gray-400
                      dark:text-gray-500
                    "
                  >
                    Belum ada data untuk ditampilkan
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="
                  border-t

                  border-gray-100
                  dark:border-slate-800

                  transition

                  hover:bg-gray-50
                  dark:hover:bg-slate-800
                "
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={`${String(column.accessor)}-${columnIndex}`}
                    className={`
                      px-5
                      py-3

                      text-sm

                      ${column.className ?? ""}
                    `}
                  >
                    {column.render ? (
                      column.render(row, rowIndex)
                    ) : (
                      <span
                        className="
                          text-gray-700
                          dark:text-gray-200
                        "
                      >
                        {String(row[column.accessor] ?? "")}
                      </span>
                    )}
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
