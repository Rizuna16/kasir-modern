import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface SidebarItemProps {
  to: string;

  label: string;

  icon?: ReactNode;

  collapsed?: boolean;
}

export default function SidebarItem({
  to,
  label,
  icon,
  collapsed = false,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `
        group

        relative

        flex

        items-center

        ${collapsed ? "justify-center" : "gap-3"}


        rounded-xl

        border-l-4


        px-4

        py-3


        text-sm

        font-medium


        transition-all

        duration-200



        ${
          isActive
            ? `
              border-white

              bg-white

              text-blue-700

              shadow-lg


              dark:border-blue-500

              dark:bg-gray-800

              dark:text-white

            `
            : `

              border-transparent

              text-blue-50


              hover:translate-x-1

              hover:border-white/40

              hover:bg-white/10

              hover:text-white



              dark:text-gray-300

              dark:hover:border-gray-500

              dark:hover:bg-gray-700/50

              dark:hover:text-white

            `
        }
        `
      }
    >
      {/* Icon */}

      <span
        className="
          flex

          h-5

          w-5

          shrink-0

          items-center

          justify-center
        "
      >
        {icon}
      </span>

      {/* Label */}

      {!collapsed && (
        <span
          className="
              truncate
            "
        >
          {label}
        </span>
      )}

      {/* Custom Tooltip */}

      {collapsed && (
        <span
          className="
              pointer-events-none

              absolute

              left-full

              ml-3

              hidden

              whitespace-nowrap

              rounded-lg

              bg-gray-900

              px-3

              py-2

              text-xs

              text-white

              shadow-lg


              group-hover:block

              dark:bg-black
            "
        >
          {label}
        </span>
      )}
    </NavLink>
  );
}
