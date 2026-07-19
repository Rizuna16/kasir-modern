/**
 * ============================================================
 * Enterprise Dashboard
 * Component : EmptyState
 * ============================================================
 *
 * Reusable Empty State
 *
 * Digunakan oleh:
 * - SalesChart
 * - RecentTransaction
 * - TopProducts
 * - LowStock
 *
 * ============================================================
 */

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  minHeight?: string;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  minHeight = "min-h-[320px]",
  className = "",
}: EmptyStateProps) {
  return (
    <div
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
        transition-colors

        dark:border-slate-700
        dark:bg-slate-800/40

        ${className}
      `}
    >
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-5xl dark:bg-blue-900/20">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}
