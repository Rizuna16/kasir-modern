import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  error?: string;

  helperText?: string;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = true,
  className = "",
  disabled,
  ...props
}: InputProps) {
  return (
    <div className={`${fullWidth ? "w-full" : ""} space-y-1`}>
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}

      <div className="relative">
        {leftIcon && (
          <div
            className="
              absolute
              inset-y-0
              left-3
              flex
              items-center
              text-gray-400
            "
          >
            {leftIcon}
          </div>
        )}

        <input
          {...props}
          disabled={disabled}
          className={`
            w-full

            rounded-xl

            border
            border-gray-300

            bg-white

            px-4
            py-2.5

            text-sm

            shadow-sm

            outline-none

            transition-all
            duration-200

            placeholder:text-gray-400

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100

            disabled:bg-gray-100
            disabled:cursor-not-allowed

            ${leftIcon ? "pl-10" : ""}

            ${rightIcon ? "pr-10" : ""}

            ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}

            ${className}
          `}
        />

        {rightIcon && (
          <div
            className="
              absolute
              inset-y-0
              right-3
              flex
              items-center
              text-gray-400
            "
          >
            {rightIcon}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {!error && helperText && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
