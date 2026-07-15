import type { Dispatch, SetStateAction } from "react";

import SupplierModal from "./SupplierModal";

import type { Supplier } from "../../types/supplier";

interface SupplierEditModalProps {
  isOpen: boolean;

  onClose: () => void;

  onSave: () => void;

  form: Supplier;

  setForm: Dispatch<SetStateAction<Supplier>>;
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
