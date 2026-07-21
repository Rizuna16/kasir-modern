import type { Dispatch, SetStateAction } from "react";

import PelangganModal from "./PelangganModal";

import type { PelangganFormData } from "../../types/pelangganForm";

interface PelangganEditModalProps {
  isOpen: boolean;

  onClose: () => void;

  onSave: () => void;

  form: PelangganFormData;

  setForm: Dispatch<SetStateAction<PelangganFormData>>;
}

export default function PelangganEditModal({
  isOpen,
  onClose,
  onSave,
  form,
  setForm,
}: PelangganEditModalProps) {
  return (
    <PelangganModal
      isOpen={isOpen}
      title="Edit Pelanggan"
      onClose={onClose}
      onSave={onSave}
      form={form}
      setForm={setForm}
    />
  );
}
