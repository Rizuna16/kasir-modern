import type { ReactNode, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;

  error?: string;

  helperText?: string;

  fullWidth?: boolean;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;
}

export default function Textarea({
  label,
  error,
  helperText,
  fullWidth = true,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}: TextareaProps) {
  return (
    <div className={`${fullWidth ? "w-full" : ""} space-y-1`}>
      {label && (
        <label
          className="
            text-sm
            font-semibold

            text-gray-700
            dark:text-gray-200
          "
        >
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div
            className="
              absolute
              left-3
              top-3

              text-gray-400
              dark:text-gray-500
            "
          >
            {leftIcon}
          </div>
        )}

        <textarea
          {...props}
          disabled={disabled}
          className={`
            w-full

            rounded-xl

            border
            border-gray-300
            dark:border-gray-600

            bg-white
            dark:bg-gray-800

            px-4
            py-2.5

            text-sm

            text-gray-900
            dark:text-white

            shadow-sm

            outline-none

            transition-all
            duration-200

            resize-none

            placeholder:text-gray-400
            dark:placeholder:text-gray-500

            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            dark:focus:ring-blue-900/40

            disabled:cursor-not-allowed
            disabled:bg-gray-100
            dark:disabled:bg-gray-700

            ${leftIcon ? "pl-10" : ""}

            ${rightIcon ? "pr-10" : ""}

            ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/40"
                : ""
            }

            ${className}
          `}
        />

        {rightIcon && (
          <div
            className="
              absolute
              right-3
              top-3

              text-gray-400
              dark:text-gray-500
            "
          >
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p
          className="
            text-sm

            text-red-500
            dark:text-red-400
          "
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          className="
            text-sm

            text-gray-500
            dark:text-gray-400
          "
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
