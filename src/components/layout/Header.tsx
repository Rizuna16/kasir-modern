import { useAuth } from "../../context/AuthContext";

import { ThemeToggle } from "../ui";

export default function Header() {
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

        px-6

        dark:border-gray-700

        dark:bg-gray-800
      "
    >
      {/* Search */}
      <input
        type="text"
        placeholder="Cari barang..."
        className="
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

          dark:border-gray-600

          dark:bg-gray-700

          dark:text-white
        "
      />

      {/* User Area */}
      <div
        className="
          flex

          items-center

          gap-4
        "
      >
        {/* Theme */}
        <ThemeToggle />

        {/* User Info */}
        <div
          className="
            text-right
          "
        >
          <p
            className="
              font-semibold

              text-gray-800

              dark:text-white
            "
          >
            {user?.nama ?? "User"}
          </p>

          <p
            className="
              text-sm

              text-gray-500

              dark:text-gray-400
            "
          >
            {user?.role ?? "Guest"}
          </p>
        </div>

        {/* Logout */}
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

        {/* Avatar */}
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
