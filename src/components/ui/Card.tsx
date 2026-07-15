import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function Card({ title, subtitle, children, action }: CardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            {title && (
              <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            )}

            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>

          {action && action}
        </div>
      )}

      <div className="p-6">{children}</div>
    </div>
  );
}
