import { useState } from "react";
import type { Barang } from "../../types/barang";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Barang) => void;
}

export default function TambahBarangModal({ isOpen, onClose, onSave }: Props) {
  const [form, setForm] = useState<Barang>({
    kode: "",
    nama: "",
    harga: "",
    stok: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "stok" ? Number(value) : value,
    });
  };

  const handleSave = () => {
    onSave(form);

    setForm({
      kode: "",
      nama: "",
      harga: "",
      stok: 0,
    });

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Tambah Barang</h2>

          <button onClick={onClose} className="text-gray-500 text-xl">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            name="kode"
            value={form.kode}
            onChange={handleChange}
            placeholder="Kode Barang"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama Barang"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="harga"
            value={form.harga}
            onChange={handleChange}
            placeholder="Harga Jual"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="number"
            name="stok"
            value={form.stok}
            onChange={handleChange}
            placeholder="Stok"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Batal
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}
