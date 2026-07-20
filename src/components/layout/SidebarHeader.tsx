interface SidebarHeaderProps {
  collapsed: boolean;
}

export default function SidebarHeader({ collapsed }: SidebarHeaderProps) {
  return (
    <div
      className={`
        mb-6

        flex
        items-center

        rounded-2xl

        bg-white/10

        p-3

        backdrop-blur-sm

        transition-all

        duration-300

        ${collapsed ? "justify-center" : "gap-3"}
      `}
    >
      {/* Logo */}

      <div
        className="
          flex

          h-10
          w-10

          shrink-0

          items-center
          justify-center

          rounded-xl

          bg-white

          text-xl

          shadow-md
        "
      >
        🏪
      </div>

      {/* Brand Text */}

      {!collapsed && (
        <div
          className="
            overflow-hidden
          "
        >
          <h1
            className="
              whitespace-nowrap

              text-sm

              font-bold

              text-white
            "
          >
            Kasir Modern
          </h1>

          <p
            className="
              whitespace-nowrap

              text-xs

              text-blue-100
            "
          >
            Enterprise POS
          </p>
        </div>
      )}
    </div>
  );
}
