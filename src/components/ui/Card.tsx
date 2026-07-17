import type { ReactNode } from "react";

type Padding = "sm" | "md" | "lg";

type Variant = "default" | "soft";

interface CardProps {
  title?: string;

  subtitle?: string;

  children: ReactNode;

  action?: ReactNode;

  footer?: ReactNode;

  padding?: Padding;

  hover?: boolean;

  variant?: Variant;

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

  variant = "default",

  className = "",
}: CardProps) {
  const paddings = {
    sm: "p-4",

    md: "p-6",

    lg: "p-8",
  };

  const variants = {
    default: `
        bg-white
        dark:bg-slate-900
      `,

    soft: `
        bg-gray-50
        dark:bg-slate-800
      `,
  };

  return (
    <div
      className={`

        rounded-xl


        border

        border-gray-200

        dark:border-slate-700



        ${variants[variant]}



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

            dark:border-slate-700



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

                  dark:text-white

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

                  dark:text-gray-400

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

            dark:border-slate-700



            px-6

            py-3



            text-sm

            text-gray-500

            dark:text-gray-400

          "
        >
          {footer}
        </div>
      )}
    </div>
  );
}
