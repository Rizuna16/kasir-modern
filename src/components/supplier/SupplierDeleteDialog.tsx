import ConfirmDialog from "../ui/ConfirmDialog";

interface SupplierDeleteDialogProps {
  isOpen: boolean;
  supplierName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function SupplierDeleteDialog({
  isOpen,
  supplierName,
  onConfirm,
  onCancel,
}: SupplierDeleteDialogProps) {
  return (
    <ConfirmDialog
      isOpen={isOpen}
      title="Hapus Supplier"
      message={`Apakah Anda yakin ingin menghapus supplier "${supplierName}"?`}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
