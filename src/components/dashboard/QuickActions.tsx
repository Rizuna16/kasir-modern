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

export default function QuickActions({ onNavigate }: Props) {
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

  return (
    <div
      className="
        rounded-2xl

        border
        border-gray-100
        dark:border-gray-700

        bg-white
        dark:bg-gray-800

        p-6

        shadow-sm
      "
    >
      <div
        className="
          mb-6
        "
      >
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

          grid-cols-2

          gap-4

          md:grid-cols-4
        "
      >
        {actions.map((action) => (
          <button
            key={action.path}
            type="button"
            onClick={() => onNavigate?.(action.path)}
            className="
              group

              rounded-xl

              border
              border-gray-100

              p-4

              text-left

              transition-all

              duration-300

              hover:-translate-y-1

              hover:shadow-md

              dark:border-gray-700
            "
          >
            <div
              className={`
                flex

                h-12

                w-12

                items-center

                justify-center

                rounded-xl

                text-xl

                ${action.color}
              `}
            >
              {action.icon}
            </div>

            <p
              className="
                mt-3

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
