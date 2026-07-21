interface SearchBoxProps {
  value: string;

  placeholder?: string;

  onChange: (value: string) => void;
}

export default function SearchBox({
  value,
  placeholder = "Cari data...",
  onChange,
}: SearchBoxProps) {
  return (
    <div className="relative w-full md:w-80">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="
          absolute
          left-3
          top-1/2

          h-5
          w-5

          -translate-y-1/2

          text-gray-400

          dark:text-gray-500
        "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full

          rounded-lg

          border

          border-gray-300

          dark:border-gray-600


          bg-white

          dark:bg-gray-800


          py-2.5

          pl-10

          pr-4


          text-sm

          text-gray-900

          dark:text-white


          placeholder:text-gray-400

          dark:placeholder:text-gray-500


          outline-none


          transition


          focus:border-blue-500

          focus:ring-2

          focus:ring-blue-200

          dark:focus:ring-blue-900/40
        "
      />
    </div>
  );
}
