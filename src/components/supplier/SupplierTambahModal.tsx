import type { Dispatch, SetStateAction } from "react";

import SupplierModal from "./SupplierModal";

import type { SupplierFormData } from "../../types/supplierForm";

interface SupplierTambahModalProps {
  isOpen: boolean;

  onClose: () => void;

  onSave: () => void;

  form: SupplierFormData;

  setForm: Dispatch<SetStateAction<SupplierFormData>>;
}

export default function SupplierTambahModal({
  isOpen,

  onClose,

  onSave,

  form,

  setForm,
}: SupplierTambahModalProps) {
  return (
    <SupplierModal
      isOpen={isOpen}
      title="Tambah Supplier"
      onClose={onClose}
      onSave={onSave}
      form={form}
      setForm={setForm}
    />
  );
}
