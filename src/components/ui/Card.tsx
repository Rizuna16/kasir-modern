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

const paddingClasses: Record<Padding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const headerPaddingClasses: Record<Padding, string> = {
  sm: "px-4 py-3",
  md: "px-6 py-4",
  lg: "px-8 py-5",
};

const footerPaddingClasses: Record<Padding, string> = {
  sm: "px-4 py-3",
  md: "px-6 py-3",
  lg: "px-8 py-4",
};

const variantClasses: Record<Variant, string> = {
  default: `
    bg-white
    dark:bg-slate-900
  `,

  soft: `
    bg-slate-50
    dark:bg-slate-800
  `,
};

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
  return (
    <section
      className={`
        overflow-hidden

        rounded-xl

        border
        border-slate-200
        dark:border-slate-700

        shadow-sm

        transition-all
        duration-200

        ${
          hover
            ? `
              hover:-translate-y-0.5
              hover:shadow-md
            `
            : ""
        }

        ${variantClasses[variant]}

        ${className}
      `}
    >
      {(title || subtitle || action) && (
        <header
          className={`
            flex
            items-center
            justify-between
            gap-4

            border-b
            border-slate-200
            dark:border-slate-700

            ${headerPaddingClasses[padding]}
          `}
        >
          <div className="min-w-0">
            {title && (
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}

      <div className={paddingClasses[padding]}>{children}</div>

      {footer && (
        <footer
          className={`
            border-t
            border-slate-200
            dark:border-slate-700

            text-sm
            text-slate-500
            dark:text-slate-400

            ${footerPaddingClasses[padding]}
          `}
        >
          {footer}
        </footer>
      )}
    </section>
  );
}
