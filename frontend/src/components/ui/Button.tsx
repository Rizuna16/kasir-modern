import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "outline"
  | "ghost";

type Size = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: `
    bg-blue-600
    text-white
    hover:bg-blue-700
    active:bg-blue-800
    focus:ring-blue-500
  `,

  secondary: `
    bg-slate-200
    text-slate-900
    hover:bg-slate-300
    active:bg-slate-400
    dark:bg-slate-700
    dark:text-white
    dark:hover:bg-slate-600
  `,

  success: `
    bg-green-600
    text-white
    hover:bg-green-700
    active:bg-green-800
  `,

  danger: `
    bg-red-600
    text-white
    hover:bg-red-700
    active:bg-red-800
  `,

  warning: `
    bg-amber-500
    text-white
    hover:bg-amber-600
    active:bg-amber-700
  `,

  outline: `
    border
    border-blue-600
    text-blue-600
    bg-transparent
    hover:bg-blue-50
    dark:hover:bg-blue-950/40
  `,

  ghost: `
    bg-transparent
    text-slate-700
    hover:bg-slate-100
    dark:text-slate-200
    dark:hover:bg-slate-800
  `,
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  xl: "h-14 px-8 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        rounded-xl

        font-medium

        transition-all
        duration-200

        shadow-sm
        hover:shadow-md

        focus:outline-none
        focus:ring-2
        focus:ring-offset-2

        disabled:cursor-not-allowed
        disabled:opacity-60

        select-none

        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}

        ${className}
      `}
    >
      {loading ? (
        <>
          <span
            className="
              h-4
              w-4
              animate-spin
              rounded-full
              border-2
              border-current
              border-t-transparent
            "
          />

          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </>
      )}
    </button>
  );
}
