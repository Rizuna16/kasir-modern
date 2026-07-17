import SidebarItem from "./SidebarItem";

import { useAuth } from "../context/AuthContext";
import { NAVIGATION } from "../config/navigation";

const Sidebar = () => {
  const { user } = useAuth();

  const menus = NAVIGATION.filter((menu) => {
    if (!user) {
      return false;
    }

    return menu.permissions.includes(user.role);
  });

  return (
    <aside className="h-screen w-64 bg-blue-600 p-5">
      <h1 className="mb-8 text-2xl font-bold text-white">Kasir Modern</h1>

      <nav className="space-y-2">
        {menus.map((menu) => (
          <SidebarItem key={menu.path} to={menu.path} label={menu.label} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
