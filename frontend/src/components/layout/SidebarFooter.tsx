import { useAuth } from "../../context/AuthContext";

export default function SidebarFooter() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div
      className="
        mt-4

        border-t

        border-white/20

        pt-4
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            bg-white/20

            text-white
          "
        >
          👤
        </div>

        <div
          className="
            flex-1
          "
        >
          <p
            className="
              text-sm
              font-semibold

              text-white
            "
          >
            {user.nama}
          </p>

          <p
            className="
              text-xs

              text-blue-100
            "
          >
            {user.role}
          </p>
        </div>
      </div>
    </div>
  );
}
