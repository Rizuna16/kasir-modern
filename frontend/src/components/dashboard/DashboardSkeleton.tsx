/**
 * ============================================================
 * Enterprise Dashboard
 * Component : DashboardSkeleton
 * ============================================================
 *
 * Loading placeholder dashboard
 *
 * ============================================================
 */

export default function DashboardSkeleton() {
  return (
    <div
      className="
        space-y-6

        animate-pulse
      "
    >
      <div
        className="
          flex

          items-center

          justify-between
        "
      >
        <div
          className="
            space-y-3
          "
        >
          <div
            className="
              h-8

              w-64

              rounded-lg

              bg-gray-200

              dark:bg-gray-700
            "
          />

          <div
            className="
              h-4

              w-96

              rounded

              bg-gray-200

              dark:bg-gray-700
            "
          />
        </div>

        <div
          className="
            h-10

            w-28

            rounded-xl

            bg-gray-200

            dark:bg-gray-700
          "
        />
      </div>

      <div
        className="
          grid

          grid-cols-1

          md:grid-cols-2

          xl:grid-cols-4

          gap-5
        "
      >
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div
            key={index}
            className="
                  h-32

                  rounded-2xl

                  bg-gray-200

                  dark:bg-gray-700
                "
          />
        ))}
      </div>

      <div
        className="
          h-80

          rounded-2xl

          bg-gray-200

          dark:bg-gray-700
        "
      />

      <div
        className="
          h-64

          rounded-2xl

          bg-gray-200

          dark:bg-gray-700
        "
      />

      <div
        className="
          grid

          grid-cols-1

          lg:grid-cols-2

          gap-6
        "
      >
        <div
          className="
            h-72

            rounded-2xl

            bg-gray-200

            dark:bg-gray-700
          "
        />

        <div
          className="
            h-72

            rounded-2xl

            bg-gray-200

            dark:bg-gray-700
          "
        />
      </div>
    </div>
  );
}
