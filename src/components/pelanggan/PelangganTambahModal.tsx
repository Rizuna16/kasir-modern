import type { Dispatch, SetStateAction } from "react";

import PelangganModal from "./PelangganModal";

import type { PelangganFormData } from "../../types/pelangganForm";

interface PelangganTambahModalProps {
  isOpen: boolean;

  onClose: () => void;

  onSave: () => void;

  form: PelangganFormData;

  setForm: Dispatch<SetStateAction<PelangganFormData>>;
}

export default function PelangganTambahModal({
  isOpen,
  onClose,
  onSave,
  form,
  setForm,
}: PelangganTambahModalProps) {
  return (
    <PelangganModal
      isOpen={isOpen}
      title="Tambah Pelanggan"
      onClose={onClose}
      onSave={onSave}
      form={form}
      setForm={setForm}
    />
  );
}
