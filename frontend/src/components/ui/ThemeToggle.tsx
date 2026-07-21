import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        inline-flex
        items-center
        justify-center

        h-10
        w-10

        rounded-xl

        border
        border-gray-200

        bg-white

        text-lg

        shadow-sm

        transition-all
        duration-200

        hover:shadow-md

        dark:border-gray-700
        dark:bg-gray-800
      "
      title="Ganti tema"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
