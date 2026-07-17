import type { ReactNode } from "react";

type Size = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  isOpen: boolean;

  title: string;

  children: ReactNode;

  onClose: () => void;

  footer?: ReactNode;

  size?: Size;
}

export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  footer,
  size = "md",
}: ModalProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",

    md: "max-w-2xl",

    lg: "max-w-4xl",

    xl: "max-w-6xl",
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        flex
        items-center
        justify-center

        bg-black/50

        backdrop-blur-sm

        p-4

        animate-in
        fade-in
        duration-200
      "
    >
      <div
        className={`
          w-full

          ${sizes[size]}

          max-h-[90vh]

          overflow-hidden

          rounded-2xl

          bg-white

          shadow-2xl

          animate-in
          zoom-in-95
          duration-200
        `}
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-gray-100

            px-6
            py-4
          "
        >
          <h2
            className="
              text-lg
              font-semibold
              text-gray-800
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-full

              text-gray-500

              transition

              hover:bg-gray-100

              hover:text-red-500
            "
          >
            ✕
          </button>
        </div>

        {/* Body */}

        <div
          className="
            max-h-[calc(90vh-140px)]

            overflow-y-auto

            p-6
          "
        >
          {children}
        </div>

        {/* Footer */}

        {footer && (
          <div
            className="
              flex
              justify-end
              gap-3

              border-t
              border-gray-100

              px-6
              py-4
            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
