/**
 * ============================================================
 * Enterprise Dashboard
 * Component : EmptyState
 * ============================================================
 *
 * Reusable Empty State Component
 *
 * Digunakan oleh:
 *
 * - SalesChart
 * - RecentTransaction
 * - TopProducts
 * - LowStock
 *
 * Responsibility:
 *
 * - Menampilkan kondisi data kosong
 * - Memberikan feedback visual kepada user
 *
 * Tidak melakukan:
 *
 * ❌ Fetch data
 * ❌ Business logic
 * ❌ Data processing
 *
 * Accessibility:
 *
 * ✅ Screen reader friendly
 *
 * ============================================================
 */

interface EmptyStateProps {
  icon: string;

  title: string;

  description: string;

  minHeight?: string;

  className?: string;

  iconClassName?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  minHeight = "min-h-[320px]",
  className = "",
  iconClassName = "",
}: EmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`
        flex
        ${minHeight}

        flex-col
        items-center
        justify-center

        rounded-2xl

        border
        border-dashed

        border-slate-200

        bg-slate-50

        px-6
        py-10

        text-center

        transition-all
        duration-300

        dark:border-slate-700
        dark:bg-slate-800/40

        ${className}
      `}
    >
      <div
        className={`
          mb-5

          flex
          h-20
          w-20

          items-center
          justify-center

          rounded-full

          bg-blue-50

          text-5xl

          transition-transform
          duration-300

          hover:scale-110

          dark:bg-blue-900/20

          ${iconClassName}
        `}
      >
        {icon}
      </div>

      <h3
        className="
          text-lg
          font-semibold

          text-slate-800

          dark:text-slate-100
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2

          max-w-md

          text-sm

          leading-6

          text-slate-500

          dark:text-slate-400
        "
      >
        {description}
      </p>
    </div>
  );
}
