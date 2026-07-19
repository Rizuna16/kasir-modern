import type { ReactNode } from "react";

interface DashboardSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function DashboardSection({
  title,
  description,
  children,
}: DashboardSectionProps) {
  return (
    <section className="space-y-5">
      <div className="border-b border-gray-200 pb-3 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
