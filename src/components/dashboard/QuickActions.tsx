/**
 * ============================================================
 * Quick Actions
 * ============================================================
 *
 * Executive Dashboard Shortcut Panel
 *
 * Akses cepat menuju fitur penting aplikasi.
 *
 * ============================================================
 */

interface Props {
  onNavigate?: (path: string) => void;
}

const actions = [
  {
    title: "Transaksi Baru",
    icon: "🛒",
    path: "/penjualan",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },

  {
    title: "Tambah Barang",
    icon: "📦",
    path: "/barang",
    color:
      "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },

  {
    title: "Laporan",
    icon: "📊",
    path: "/laporan",
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },

  {
    title: "Pembelian",
    icon: "🚚",
    path: "/pembelian",
    color:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
];

export default function QuickActions({ onNavigate }: Props) {
  return (
    <div
      className="
        rounded-3xl

        border
        border-gray-100
        dark:border-gray-700

        bg-white
        dark:bg-gray-800

        p-5
        lg:p-6

        shadow-sm

        transition-all
        duration-300

        hover:shadow-lg
      "
    >
      <div className="mb-6">
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wider

            text-gray-500
            dark:text-gray-400
          "
        >
          Quick Actions
        </p>

        <h2
          className="
            mt-2

            text-lg
            font-bold

            text-gray-900
            dark:text-white
          "
        >
          Shortcut Menu
        </h2>
      </div>

      <div
        className="
          grid

          grid-cols-1

          gap-4

          sm:grid-cols-2

          lg:grid-cols-4
        "
      >
        {actions.map((action) => (
          <button
            key={action.path}
            type="button"
            aria-label={action.title}
            onClick={() => onNavigate?.(action.path)}
            className="
              group

              rounded-2xl

              border
              border-gray-100

              p-4

              text-left

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-blue-200
              hover:shadow-md

              dark:border-gray-700
              dark:hover:border-blue-700
            "
          >
            <div
              className={`
                flex

                h-14
                w-14

                items-center
                justify-center

                rounded-2xl

                text-2xl

                transition-transform
                duration-300

                group-hover:scale-110

                ${action.color}
              `}
            >
              {action.icon}
            </div>

            <p
              className="
                mt-4

                text-sm

                font-semibold

                text-gray-900

                dark:text-white
              "
            >
              {action.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
