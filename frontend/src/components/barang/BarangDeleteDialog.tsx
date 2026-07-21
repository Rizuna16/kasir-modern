import { ConfirmDialog } from "../ui";

interface BarangDeleteDialogProps {
  isOpen: boolean;

  onCancel: () => void;

  onConfirm: () => void;
}

export default function BarangDeleteDialog({
  isOpen,

  onCancel,

  onConfirm,
}: BarangDeleteDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      title="Hapus Barang"
      message="Apakah Anda yakin ingin menghapus barang ini?"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
