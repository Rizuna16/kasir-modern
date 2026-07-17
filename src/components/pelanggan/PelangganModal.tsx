import type { Dispatch, SetStateAction } from "react";

import { Modal, Button } from "../ui";

import PelangganForm from "./PelangganForm";

import type { PelangganFormData } from "../../types/pelangganForm";

interface PelangganModalProps {
  isOpen: boolean;

  title: string;

  onClose: () => void;

  onSave: () => void;

  form: PelangganFormData;

  setForm: Dispatch<SetStateAction<PelangganFormData>>;
}

export default function PelangganModal({
  isOpen,

  title,

  onClose,

  onSave,

  form,

  setForm,
}: PelangganModalProps) {
  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="space-y-6">
        <PelangganForm form={form} setForm={setForm} />

        <div
          className="
            flex
            justify-end
            gap-3
          "
        >
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
