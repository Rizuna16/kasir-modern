import type { ReactNode } from "react";

interface SidebarGroupProps {
  id: string;

  title: string;

  children: ReactNode;

  isOpen: boolean;

  active: boolean;

  collapsed: boolean;

  onToggle: () => void;

  icon?: ReactNode;
}

export default function SidebarGroup({
  id,

  title,

  children,

  isOpen,

  active,

  collapsed,

  onToggle,

  icon,
}: SidebarGroupProps) {
  const contentId = `sidebar-group-${id}`;

  /*
  =====================================
  COLLAPSED MODE

  Icon only + hover popup

  =====================================
  */

  if (collapsed) {
    return (
      <section
        className="
          group

          relative
        "
      >
        <button
          type="button"
          onClick={onToggle}
          className={`
            flex

            h-11

            w-full

            items-center

            justify-center


            rounded-xl


            transition-all


            duration-200



            ${
              active
                ? `
                  bg-white/20

                  text-white

                  shadow

                `
                : `
                  text-blue-100

                  hover:bg-white/10

                  hover:text-white

                `
            }
          `}
        >
          {icon}
        </button>

        {/* Hover Popup */}

        <div
          className="
            invisible

            absolute

            left-full

            top-0

            z-50

            ml-3

            w-48


            rounded-xl

            bg-white

            p-3

            opacity-0


            shadow-xl


            transition-all


            duration-200


            group-hover:visible

            group-hover:opacity-100


            dark:bg-gray-800
          "
        >
          <p
            className="
              mb-2

              text-sm

              font-semibold

              text-gray-800

              dark:text-white
            "
          >
            {title}
          </p>

          <div
            className="
              space-y-1
            "
          >
            {children}
          </div>
        </div>
      </section>
    );
  }

  /*
  =====================================
  NORMAL MODE

  Full sidebar

  =====================================
  */

  return (
    <section>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={`
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


          transition-all


          duration-200



          ${
            active
              ? `
                bg-white/15

                text-white

              `
              : `
                text-blue-100

                hover:bg-white/10

                hover:text-white

              `
          }
        `}
      >
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
                "
            >
              {icon}
            </span>
          )}

          <span>{title}</span>
        </span>

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
