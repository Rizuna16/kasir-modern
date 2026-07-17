import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;

  label: string;
}

export default function SidebarItem({ to, label }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        block

        rounded-xl

        px-4
        py-3

        font-medium

        transition-all

        duration-200

        ${
          isActive
            ? `
              bg-white

              text-blue-600

              shadow-lg

              dark:bg-gray-700

              dark:text-white
            `
            : `
              text-blue-50

              hover:bg-white/10

              hover:text-white

              dark:text-gray-300

              dark:hover:bg-gray-700/50

              dark:hover:text-white
            `
        }
        `
      }
    >
      {label}
    </NavLink>
  );
}
