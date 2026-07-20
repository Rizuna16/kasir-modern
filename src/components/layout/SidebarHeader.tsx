export default function SidebarHeader() {
  return (
    <div
      className="
        mb-6

        flex
        items-center
        gap-3

        rounded-2xl

        bg-white/10

        p-3

        backdrop-blur-sm
      "
    >
      <div
        className="
          flex
          h-10
          w-10
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

      <div>
        <h1
          className="
            text-sm
            font-bold

            text-white
          "
        >
          Kasir Modern
        </h1>

        <p
          className="
            text-xs

            text-blue-100
          "
        >
          Enterprise POS
        </p>
      </div>
    </div>
  );
}
