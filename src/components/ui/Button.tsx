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
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",

    success: "bg-green-600 text-white hover:bg-green-700",

    danger: "bg-red-600 text-white hover:bg-red-700",

    warning: "bg-yellow-500 text-white hover:bg-yellow-600",

    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",

    ghost: "text-gray-700 hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",

    md: "px-5 py-2 text-base",

    lg: "px-6 py-3 text-lg",

    xl: "px-7 py-3.5 text-xl",
  };

  return (
    <button
      {...props}
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
        focus:ring-blue-400

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${variants[variant]}

        ${sizes[size]}

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
              border-white
              border-t-transparent
            "
          />
          Loading...
        </>
      ) : (
        <>
          {leftIcon}

          {children}

          {rightIcon}
        </>
      )}
    </button>
  );
}
