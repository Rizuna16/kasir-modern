import SidebarItem from "./SidebarItem";

import { useAuth } from "../../context/AuthContext";
import { NAVIGATION } from "../../config/navigation";

export default function Sidebar() {
  const { user } = useAuth();

  const menus = NAVIGATION.filter((menu) => {
    if (!user) {
      return false;
    }

    return menu.permissions.includes(user.role);
  });

  return (
    <aside
      className="
        flex
        h-screen
        w-64
        flex-col

        border-r
        border-blue-500/20

        bg-gradient-to-b
        from-blue-600
        to-blue-700

        p-5

        shadow-xl

        transition-colors
        duration-300

        dark:border-gray-700

        dark:from-gray-900
        dark:to-gray-800
      "
    >
      <div
        className="
          mb-8

          flex
          items-center

          rounded-xl

          bg-white/10

          px-4
          py-3

          backdrop-blur-sm
        "
      >
        <h1
          className="
            text-2xl

            font-bold

            tracking-wide

            text-white
          "
        >
          Kasir Modern
        </h1>
      </div>

      <nav
        className="
          flex-1

          space-y-2
        "
      >
        {menus.map((menu) => (
          <SidebarItem key={menu.path} to={menu.path} label={menu.label} />
        ))}
      </nav>

      <div
        className="
          mt-auto

          rounded-xl

          bg-white/10

          px-4
          py-3

          text-xs

          text-blue-100

          backdrop-blur-sm

          dark:text-gray-300
        "
      >
        <p>Kasir Modern</p>

        <p className="mt-1 opacity-80">Point Of Sales System</p>
      </div>
    </aside>
  );
}
