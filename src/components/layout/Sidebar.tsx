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
    </aside>
  );
}
