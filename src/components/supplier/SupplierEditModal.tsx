import type { Dispatch, SetStateAction } from "react";

import SupplierModal from "./SupplierModal";

import type { SupplierFormData } from "../../types/supplierForm";

interface SupplierEditModalProps {
  isOpen: boolean;

  onClose: () => void;

  onSave: () => void;

  form: SupplierFormData;

  setForm: Dispatch<SetStateAction<SupplierFormData>>;
}

export default function SupplierEditModal({
  isOpen,
  onClose,
  onSave,
  form,
  setForm,
}: SupplierEditModalProps) {
  return (
    <SupplierModal
      isOpen={isOpen}
      title="Edit Supplier"
      onClose={onClose}
      onSave={onSave}
      form={form}
      setForm={setForm}
    />
  );
}
