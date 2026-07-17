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

        transition-all

        duration-200

        ${
          isActive
            ? `
              bg-white

              text-blue-600

              font-semibold

              shadow-sm
            `
            : `
              text-white

              hover:bg-blue-500
            `
        }
        `
      }
    >
      {label}
    </NavLink>
  );
}
