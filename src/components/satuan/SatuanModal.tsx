import { Modal, Input, Button } from "../ui";

interface SatuanForm {
  nama: string;
}

interface SatuanModalProps {
  isOpen: boolean;

  title: string;

  form: SatuanForm;

  setForm: (value: SatuanForm) => void;

  onClose: () => void;

  onSave: () => void;
}

export default function SatuanModal({
  isOpen,
  title,
  form,
  setForm,
  onClose,
  onSave,
}: SatuanModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-5">
        <Input
          label="Nama Satuan"
          placeholder="Contoh: PCS"
          value={form.nama}
          onChange={(e) =>
            setForm({
              ...form,
              nama: e.target.value,
            })
          }
        />

        <div className="flex justify-end gap-3 pt-5">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>

          <Button onClick={onSave}>Simpan</Button>
        </div>
      </div>
    </Modal>
  );
}
