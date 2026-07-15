import type { ReactNode } from "react";

interface Props {
  isOpen: boolean;

  title: string;

  children: ReactNode;

  onClose: () => void;
}

export default function UserModal({
  isOpen,

  title,

  children,

  onClose,
}: Props) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        bg-black
        bg-opacity-50
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-lg
          shadow-lg
          w-full
          max-w-lg
          p-6
        "
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="
              text-gray-500
              hover:text-black
            "
          >
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
