import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  label: string;
}

const SidebarItem = ({ to, label }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        block px-4 py-3 rounded-lg transition
        ${
          isActive
            ? "bg-white text-blue-600 font-semibold"
            : "text-white hover:bg-blue-500"
        }
        `
      }
    >
      {label}
    </NavLink>
  );
};

export default SidebarItem;
