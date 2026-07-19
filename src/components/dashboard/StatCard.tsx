import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: string;

  subtitle?: string;
  trend?: string;
  trendPositive?: boolean;
}

export default function StatCard({
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

        rounded-2xl

        border
        border-gray-100
        dark:border-gray-700

        bg-white
        dark:bg-gray-800

        p-6

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
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
            {title}
          </p>

          <h2
            className="
              mt-3

              text-3xl

              font-bold

              text-gray-900
              dark:text-white
            "
          >
            {value}
          </h2>

          {(subtitle || trend) && (
            <div className="mt-4 space-y-1">
              {subtitle && (
                <p
                  className="
                    text-sm

                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  {subtitle}
                </p>
              )}

              {trend && (
                <p
                  className={`text-sm font-semibold ${
                    trendPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {trend}
                </p>
              )}
            </div>
          )}
        </div>

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            text-2xl

            shadow-sm

            transition-transform
            duration-300

            group-hover:scale-110

            ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
