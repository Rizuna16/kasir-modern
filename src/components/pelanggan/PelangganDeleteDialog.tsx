import ConfirmDialog from "../ui/ConfirmDialog";

interface PelangganDeleteDialogProps {
  isOpen: boolean;
  pelangganName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PelangganDeleteDialog({
  isOpen,
  pelangganName,
  onConfirm,
  onCancel,
}: PelangganDeleteDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      title="Hapus Pelanggan"
      message={`Apakah Anda yakin ingin menghapus pelanggan "${pelangganName}"?`}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
