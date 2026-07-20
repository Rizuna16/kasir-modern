import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface SidebarItemProps {
  to: string;
  label: string;
  icon?: ReactNode;
}

export default function SidebarItem({ to, label, icon }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      aria-label={label}
      className={({ isActive }) =>
        `
        group

        relative

        flex
        items-center
        gap-3

        rounded-lg

        px-3
        py-2.5

        text-sm
        font-medium

        transition-all
        duration-200


        ${
          isActive
            ? `
              bg-white/15

              text-white

              shadow-sm

              before:absolute
              before:left-0
              before:h-6
              before:w-1
              before:rounded-r-full
              before:bg-white

              dark:bg-gray-800
              dark:text-white
            `
            : `
              text-blue-100

              hover:bg-white/10

              hover:text-white

              hover:translate-x-1


              dark:text-gray-300

              dark:hover:bg-gray-700/50

              dark:hover:text-white
            `
        }
        `
      }
    >
      {icon && (
        <span
          className="
              flex
              h-5
              w-5
              shrink-0
              items-center
              justify-center

              opacity-80

              transition-opacity

              group-hover:opacity-100
            "
        >
          {icon}
        </span>
      )}

      <span
        className="
          truncate
        "
      >
        {label}
      </span>
    </NavLink>
  );
}
