import Button from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  isOpen,
  title = "Konfirmasi",
  message = "Apakah Anda yakin?",
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Batal
          </Button>

          <Button variant="danger" onClick={onConfirm}>
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
}
