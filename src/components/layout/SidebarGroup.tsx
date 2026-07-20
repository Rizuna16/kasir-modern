import type { ReactNode } from "react";

interface SidebarGroupProps {
  id: string;

  title: string;

  children: ReactNode;

  isOpen: boolean;

  onToggle: () => void;

  icon?: ReactNode;
}

export default function SidebarGroup({
  id,
  title,
  children,
  isOpen,
  onToggle,
  icon,
}: SidebarGroupProps) {
  const contentId = `sidebar-group-${id}`;

  return (
    <section>
      {/* Group Header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="
          group

          flex
          w-full
          items-center
          justify-between

          rounded-xl

          px-3
          py-2.5

          text-sm
          font-medium

          text-blue-100

          transition-all
          duration-200

          hover:bg-white/10
          hover:text-white

          dark:text-gray-300
          dark:hover:bg-gray-800
          dark:hover:text-white
        "
      >
        {/* Title + Icon */}
        <span
          className="
            flex
            items-center
            gap-3
          "
        >
          {icon && (
            <span
              className="
                flex
                h-5
                w-5
                items-center
                justify-center

                opacity-80

                transition-opacity
                duration-200

                group-hover:opacity-100
              "
            >
              {icon}
            </span>
          )}

          <span>{title}</span>
        </span>

        {/* Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={`
            h-4
            w-4

            transition-transform
            duration-300

            ${isOpen ? "rotate-180" : ""}
          `}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown Content */}
      <div
        id={contentId}
        className={`
          grid

          transition-all
          duration-300

          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div
          className="
            overflow-hidden
          "
        >
          <div
            className="
              mt-2

              ml-3

              space-y-1

              border-l
              border-white/10

              pl-3
            "
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
