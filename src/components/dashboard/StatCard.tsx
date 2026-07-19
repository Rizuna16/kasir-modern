/**
 * ============================================================
 * Enterprise Dashboard
 * Component : StatCard
 * ============================================================
 *
 * Responsibility:
 *
 * - Menampilkan metric statistic
 * - Menerima data dari parent component
 *
 * Tidak melakukan:
 *
 * ❌ Mengambil service
 * ❌ Menghitung analytics
 * ❌ Mengubah data bisnis
 *
 * Performance:
 *
 * ✅ React.memo optimized
 *
 * ============================================================
 */

import { memo, type ReactNode } from "react";

interface Props {
  title: string;

  value: string | number;

  icon: ReactNode;

  color: string;

  subtitle?: string;

  trend?: string;

  trendPositive?: boolean;
}

function StatCard({
  title,

  value,

  icon,

  color,

  subtitle,

  trend,

  trendPositive = true,
}: Props) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden

        rounded-3xl

        border
        border-gray-200
        dark:border-gray-700

        bg-white
        dark:bg-gray-800

        p-6

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-1
        hover:border-blue-200
        hover:shadow-xl

        dark:hover:border-blue-700
      "
    >
      <div
        className="
          absolute
          inset-x-0
          top-0

          h-1

          bg-gradient-to-r
          from-blue-500
          via-cyan-500
          to-indigo-500

          opacity-0

          transition-opacity
          duration-300

          group-hover:opacity-100
        "
      />

      <div
        className="
          flex
          items-start
          justify-between
          gap-5
        "
      >
        <div className="min-w-0 flex-1">
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]

              text-gray-500

              dark:text-gray-400
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-3

              break-words

              text-3xl

              font-bold

              tracking-tight

              text-gray-900

              dark:text-white
            "
          >
            {value}
          </h2>

          {(subtitle || trend) && (
            <div className="mt-5 space-y-2">
              {subtitle && (
                <p
                  className="
                      text-sm
                      leading-6

                      text-gray-500

                      dark:text-gray-400
                    "
                >
                  {subtitle}
                </p>
              )}

              {trend && (
                <div
                  className={`
                      inline-flex

                      items-center

                      rounded-full

                      px-3

                      py-1

                      text-xs

                      font-semibold

                      ${
                        trendPositive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }
                    `}
                >
                  {trendPositive ? "▲" : "▼"} {trend}
                </div>
              )}
            </div>
          )}
        </div>

        <div
          className={`
            flex

            h-16

            w-16

            shrink-0

            items-center

            justify-center


            rounded-2xl


            text-2xl


            shadow-md


            transition-all

            duration-300


            group-hover:scale-110

            group-hover:rotate-3


            ${color}

          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default memo(StatCard);
