import type { ReactNode } from "react";

export interface Column<T> {
  header: string;

  accessor?: keyof T;

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

        bg-white

        shadow-sm


        dark:border-slate-700

        dark:bg-slate-900
      "
    >
      <table
        className="
          min-w-full

          divide-y

          divide-gray-100

          dark:divide-slate-800
        "
      >
        {/* Header */}

        <thead
          className="
            sticky

            top-0

            z-10

            bg-gray-50

            dark:bg-slate-800
          "
        >
          <tr>
            {columns.map((column, index) => (
              <th
                key={`${column.header}-${index}`}
                className={`
                    px-5

                    py-3

                    whitespace-nowrap

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

        {/* Body */}

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

                      border-t-blue-600

                      dark:border-slate-600
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

                    transition-colors

                    duration-150

                    hover:bg-blue-50

                    dark:border-slate-800

                    dark:hover:bg-slate-800/70
                  "
              >
                {columns.map((column, columnIndex) => (
                  <td
                    key={`${column.header}-${columnIndex}`}
                    className={`
                          px-5

                          py-3

                          text-sm

                          align-middle

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
                        {column.accessor
                          ? String(row[column.accessor] ?? "")
                          : null}
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
