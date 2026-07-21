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
  id,
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
  const inputId =
    id ?? props.name ?? `input-${Math.random().toString(36).slice(2, 9)}`;

  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={`${fullWidth ? "w-full" : ""} space-y-1.5`}>
      {label && (
        <label
          htmlFor={inputId}
          className="
            block
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-200
          "
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-3
              flex
              items-center
              text-slate-400
              dark:text-slate-500
            "
          >
            {leftIcon}
          </div>
        )}

        <input
          {...props}
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperId}
          className={`
            w-full

            rounded-xl

            border
            border-slate-300
            dark:border-slate-600

            bg-white
            dark:bg-slate-800

            px-4
            py-2.5

            text-sm
            text-slate-900
            dark:text-white

            shadow-sm

            transition-all
            duration-200

            outline-none

            placeholder:text-slate-400
            dark:placeholder:text-slate-500

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            dark:focus:ring-blue-900/40

            disabled:cursor-not-allowed
            disabled:opacity-60

            ${leftIcon ? "pl-10" : ""}
            ${rightIcon ? "pr-10" : ""}

            ${
              error
                ? `
                  border-red-500
                  focus:border-red-500
                  focus:ring-red-100
                  dark:focus:ring-red-900/40
                `
                : ""
            }

            ${className}
          `}
        />

        {rightIcon && (
          <div
            className="
              pointer-events-none
              absolute
              inset-y-0
              right-3
              flex
              items-center
              text-slate-400
              dark:text-slate-500
            "
          >
            {rightIcon}
          </div>
        )}
      </div>

      {error ? (
        <p
          id={errorId}
          className="
            text-sm
            text-red-500
            dark:text-red-400
          "
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={helperId}
          className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
