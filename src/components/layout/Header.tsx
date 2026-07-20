import { useAuth } from "../../context/AuthContext";

import { ThemeToggle } from "../ui";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header
      className="
        flex
        h-16
        items-center
        justify-between

        border-b

        bg-white

        px-4
        lg:px-6

        dark:border-gray-700
        dark:bg-gray-800
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Hamburger */}
        <button
          onClick={onToggleSidebar}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-lg

            transition-colors

            hover:bg-gray-100

            lg:hidden

            dark:hover:bg-gray-700
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 dark:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Search */}
        <input
          type="text"
          placeholder="Cari barang..."
          className="
            hidden
            w-72

            rounded-lg

            border
            border-gray-200

            px-4
            py-2

            text-sm

            outline-none

            focus:ring-2
            focus:ring-blue-500

            lg:block

            dark:border-gray-600
            dark:bg-gray-700
            dark:text-white
          "
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="hidden text-right sm:block">
          <p className="font-semibold text-gray-800 dark:text-white">
            {user?.nama ?? "User"}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.role ?? "Guest"}
          </p>
        </div>

        <button
          onClick={logout}
          className="
            rounded-lg

            bg-red-500

            px-3
            py-2

            text-sm
            font-medium

            text-white

            transition

            hover:bg-red-600
          "
        >
          Logout
        </button>

        <div
          className="
            flex

            h-10
            w-10

            items-center
            justify-center

            rounded-full

            bg-blue-600

            font-bold

            text-white
          "
        >
          {user?.nama?.charAt(0) ?? "U"}
        </div>
      </div>
    </header>
  );
}
