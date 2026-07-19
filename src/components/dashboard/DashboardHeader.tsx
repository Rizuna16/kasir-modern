import { RefreshCw } from "lucide-react";

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
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-2">
        <p className="text-sm font-medium text-blue-600">{greeting} 👋</p>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Executive Dashboard
        </h1>

        <p className="max-w-2xl text-sm text-gray-500 dark:text-gray-400">
          Monitor business performance, sales growth, profitability, and
          inventory health from one centralized dashboard.
        </p>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          Last updated: {lastUpdated}
        </p>
      </div>

      <button
        onClick={onRefresh}
        disabled={loading}
        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        Refresh Dashboard
      </button>
    </div>
  );
}
