import { RefreshCw, Activity } from "lucide-react";

interface DashboardHeaderProps {
  loading: boolean;
  onRefresh: () => void;
}

export default function DashboardHeader({
  loading,
  onRefresh,
}: DashboardHeaderProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 11
      ? "Good Morning"
      : hour < 15
        ? "Good Afternoon"
        : hour < 18
          ? "Good Evening"
          : "Good Night";

  const lastUpdated = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-white to-slate-50 p-8 shadow-sm transition-all duration-300 dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-gray-950">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-blue-600">
              {greeting} 👋
            </span>

            <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 dark:border-green-900 dark:bg-green-950/40 dark:text-green-400">
              <Activity className="h-3.5 w-3.5 fill-current" />
              Live Data
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-4xl">
              Executive Dashboard
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Monitor business performance, sales growth, profitability,
              customer activity, and inventory health through one centralized
              executive dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <span>System Status: Operational</span>
            </div>

            <div className="text-gray-500 dark:text-gray-400">
              Last updated:
              <span className="ml-2 font-medium text-gray-700 dark:text-gray-200">
                {lastUpdated}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />

            {loading ? "Refreshing..." : "Refresh Dashboard"}
          </button>
        </div>
      </div>
    </div>
  );
}
