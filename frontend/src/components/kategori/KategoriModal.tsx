import { Modal, Input, Button } from "../ui";

interface KategoriModalProps {
  isOpen: boolean;

  title: string;

  form: {
    nama: string;
    deskripsi: string;
  };

  setForm: (value: { nama: string; deskripsi: string }) => void;

  onClose: () => void;

  onSave: () => void;
}

export default function KategoriModal({
  isOpen,
  title,
  form,
  setForm,
  onClose,
  onSave,
}: KategoriModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <Input
          label="Nama Kategori"
          placeholder="Contoh: Minuman"
          value={form.nama}
          onChange={(e) =>
            setForm({
              ...form,
              nama: e.target.value,
            })
          }
        />

        <Input
          label="Deskripsi"
          placeholder="Contoh: Produk minuman"
          value={form.deskripsi}
          onChange={(e) =>
            setForm({
              ...form,
              deskripsi: e.target.value,
            })
          }
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>

          <Button onClick={onSave}>Simpan</Button>
        </div>
      </div>
    </Modal>
  );
}
