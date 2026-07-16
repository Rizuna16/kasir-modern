import type { Dispatch, SetStateAction } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import SupplierForm from "./SupplierForm";

import type { SupplierFormData } from "../../types/supplierForm";

interface SupplierModalProps {
  isOpen: boolean;

  title: string;

  onClose: () => void;

  onSave: () => void;

  form: SupplierFormData;

  setForm: Dispatch<SetStateAction<SupplierFormData>>;
}

export default function SupplierModal({
  isOpen,

  title,

  onClose,

  onSave,

  form,

  setForm,
}: SupplierModalProps) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="space-y-6">
        <SupplierForm form={form} setForm={setForm} />

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>

          <Button variant="primary" onClick={onSave}>
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
