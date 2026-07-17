import type { ReactNode } from "react";

interface TableCardProps {
  children: ReactNode;

  header?: ReactNode;

  footer?: ReactNode;

  className?: string;
}

export default function TableCard({
  children,
  header,
  footer,
  className = "",
}: TableCardProps) {
  return (
    <div
      className={`
        overflow-hidden

        rounded-xl

        border
        border-gray-200

        bg-white

        shadow-sm

        ${className}
      `}
    >
      {header && (
        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-gray-100

            px-6
            py-4
          "
        >
          {header}
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div
          className="
            border-t
            border-gray-100

            px-6
            py-3
          "
        >
          {footer}
        </div>
      )}
    </div>
  );
}
