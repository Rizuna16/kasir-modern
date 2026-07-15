import type { Dispatch, SetStateAction } from "react";

import SupplierModal from "./SupplierModal";

import type { Supplier } from "../../types/supplier";

interface SupplierTambahModalProps {
  isOpen: boolean;

  onClose: () => void;

  onSave: () => void;

  form: Supplier;

  setForm: Dispatch<SetStateAction<Supplier>>;
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
