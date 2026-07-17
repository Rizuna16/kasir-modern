import type { ReactNode } from "react";

type Size = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  isOpen: boolean;

  title: string;

  description?: string;

  children: ReactNode;

  onClose: () => void;

  footer?: ReactNode;

  size?: Size;

  closeOnOverlay?: boolean;
}

export default function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
  footer,
  size = "md",
  closeOnOverlay = false,
}: ModalProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",

    md: "max-w-2xl",

    lg: "max-w-4xl",

    xl: "max-w-6xl",
  };

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      onClick={handleOverlayClick}
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

          dark:bg-gray-800


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

            dark:border-gray-700


            px-6

            py-4
          "
        >
          <div>
            <h2
              className="
                text-lg

                font-semibold


                text-gray-900

                dark:text-white
              "
            >
              {title}
            </h2>

            {description && (
              <p
                className="
                  mt-1

                  text-sm

                  text-gray-500

                  dark:text-gray-400
                "
              >
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup modal"
            className="
              flex

              h-8

              w-8

              items-center

              justify-center


              rounded-full


              text-gray-500

              dark:text-gray-400


              transition


              hover:bg-gray-100

              hover:text-red-500


              dark:hover:bg-gray-700

              dark:hover:text-red-400
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

            text-gray-800

            dark:text-gray-100
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

              dark:border-gray-700


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
