import type { ReactNode } from "react";

interface PelangganModalProps {
  isOpen: boolean;

  title: string;

  children: ReactNode;

  onClose: () => void;
}

export default function PelangganModal({
  isOpen,
  title,
  children,
  onClose,
}: PelangganModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
