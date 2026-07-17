import type { ReactNode } from "react";

type Padding = "sm" | "md" | "lg";

interface CardProps {
  title?: string;

  subtitle?: string;

  children: ReactNode;

  action?: ReactNode;

  footer?: ReactNode;

  padding?: Padding;

  hover?: boolean;

  className?: string;
}

export default function Card({
  title,
  subtitle,
  children,
  action,
  footer,
  padding = "md",
  hover = false,
  className = "",
}: CardProps) {
  const paddings = {
    sm: "p-4",

    md: "p-6",

    lg: "p-8",
  };

  return (
    <div
      className={`
        rounded-xl

        border
        border-gray-200

        bg-white

        shadow-sm

        transition-all
        duration-200

        ${hover ? "hover:shadow-md" : ""}

        ${className}
      `}
    >
      {(title || subtitle || action) && (
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
          <div>
            {title && (
              <h2
                className="
                  text-lg
                  font-semibold
                  text-gray-800
                "
              >
                {title}
              </h2>
            )}

            {subtitle && (
              <p
                className="
                  mt-1
                  text-sm
                  text-gray-500
                "
              >
                {subtitle}
              </p>
            )}
          </div>

          {action && <div>{action}</div>}
        </div>
      )}

      <div className={paddings[padding]}>{children}</div>

      {footer && (
        <div
          className="
            border-t
            border-gray-100

            px-6
            py-3

            text-sm
            text-gray-500
          "
        >
          {footer}
        </div>
      )}
    </div>
  );
}
