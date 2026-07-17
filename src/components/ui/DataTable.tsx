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
    <div
      className="
        overflow-x-auto

        rounded-xl

        border
        border-gray-200

        bg-white

        shadow-sm
      "
    >
      <table className="min-w-full">
        <thead
          className="
            bg-gray-50
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
                    "
                  >
                    {emptyMessage}
                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-400
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

                  transition

                  hover:bg-gray-50
                "
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={`${String(column.accessor)}-${columnIndex}`}
                    className={`
                      px-5
                      py-3

                      text-sm

                      text-gray-700

                      ${column.className ?? ""}
                    `}
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
