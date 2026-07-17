import { useEffect } from "react";
import { AlertTriangle, Info, X } from "lucide-react";

import Button from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;

  title?: string;

  message?: string;

  onCancel: () => void;

  onConfirm: () => void;

  confirmText?: string;

  cancelText?: string;

  variant?: "danger" | "warning" | "info";

  loading?: boolean;
}

export default function ConfirmDialog({
  isOpen,
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  onCancel,
  onConfirm,
  confirmText = "Hapus",
  cancelText = "Batal",
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, loading, onCancel]);

  if (!isOpen) return null;

  const icon = {
    danger: (
      <AlertTriangle
        className="
          h-10
          w-10
          text-red-500
        "
      />
    ),

    warning: (
      <AlertTriangle
        className="
          h-10
          w-10
          text-yellow-500
        "
      />
    ),

    info: (
      <Info
        className="
          h-10
          w-10
          text-blue-500
        "
      />
    ),
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

        p-4

        backdrop-blur-sm
      "
      onClick={() => {
        if (!loading) {
          onCancel();
        }
      }}
    >
      <div
        className="
          w-full

          max-w-md

          rounded-2xl

          bg-white

          dark:bg-slate-900

          shadow-2xl

          animate-in

          fade-in

          zoom-in-95

          duration-200
        "
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {/* Header */}

        <div
          className="
            flex

            items-center

            justify-between

            border-b

            border-gray-100

            dark:border-slate-700

            px-6

            py-4
          "
        >
          <h2
            className="
              text-lg

              font-semibold

              text-slate-800

              dark:text-white
            "
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              rounded-lg

              p-2

              text-slate-500

              transition

              hover:bg-slate-100

              hover:text-slate-700


              dark:text-slate-400

              dark:hover:bg-slate-800

              dark:hover:text-white
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}

        <div
          className="
            flex

            flex-col

            items-center

            px-6

            py-8

            text-center
          "
        >
          {icon[variant]}

          <p
            className="
              mt-5

              text-slate-600

              dark:text-slate-300
            "
          >
            {message}
          </p>
        </div>

        {/* Footer */}

        <div
          className="
            flex

            justify-end

            gap-3

            border-t

            border-gray-100

            dark:border-slate-700

            px-6

            py-4
          "
        >
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>

          <Button
            variant={
              variant === "danger"
                ? "danger"
                : variant === "warning"
                  ? "warning"
                  : "primary"
            }
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
