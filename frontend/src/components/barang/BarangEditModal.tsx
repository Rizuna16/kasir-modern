import BarangModal from "./BarangModal";

import type { BarangFormData } from "../../types/barangForm";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  form: BarangFormData;

  setForm: React.Dispatch<React.SetStateAction<BarangFormData>>;

  onSave: () => void;
}

export default function BarangEditModal({
  isOpen,

  onClose,

  form,

  setForm,

  onSave,
}: Props) {
  return (
    <BarangModal
      isOpen={isOpen}
      title="Edit Barang"
      onClose={onClose}
      form={form}
      setForm={setForm}
      onSave={onSave}
    />
  );
}
