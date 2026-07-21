interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;

  value: string;

  options: Option[];

  placeholder?: string;

  onChange: (value: string) => void;

  error?: string;

  helperText?: string;

  fullWidth?: boolean;

  disabled?: boolean;
}

export default function Select({
  label,
  value,
  options,
  placeholder = "Pilih...",
  onChange,
  error,
  helperText,
  fullWidth = true,
  disabled = false,
}: SelectProps) {
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

      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
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

          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-100
          dark:focus:ring-blue-900/40

          disabled:cursor-not-allowed
          disabled:bg-gray-100
          dark:disabled:bg-gray-700

          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100 dark:focus:ring-red-900/40"
              : ""
          }
        `}
      >
        <option value="">{placeholder}</option>

        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

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
