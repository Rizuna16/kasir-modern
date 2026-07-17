interface Props {
  title: string;

  value: string | number;

  icon: string;

  color: string;
}

export default function StatCard({
  title,

  value,

  icon,

  color,
}: Props) {
  return (
    <div
      className="
        rounded-xl

        border
        border-gray-200

        bg-white

        p-5

        shadow-sm

        transition-all
        duration-200

        hover:shadow-md

        dark:border-gray-700

        dark:bg-gray-800
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="
              text-sm

              text-gray-500

              dark:text-gray-400
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-2

              text-2xl

              font-bold

              text-gray-900

              dark:text-white
            "
          >
            {value}
          </h2>
        </div>

        <div
          className={`
            flex

            h-12

            w-12

            items-center

            justify-center

            rounded-full

            text-xl

            ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
