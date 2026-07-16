import { useState } from "react";

import type { BarangFormData } from "../../types/barangForm";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  onSave: (data: BarangFormData) => void;
}

const initialForm: BarangFormData = {
  kode: "",

  barcode: "",

  nama: "",

  kategoriId: "",

  satuanId: "",

  supplierId: "",

  hargaBeli: 0,

  hargaGrosir: 0,

  hargaSemiGrosir: 0,

  hargaEcer: 0,

  stok: 0,

  minimalStok: 0,

  status: "Aktif",
};

export default function TambahBarangModal({ isOpen, onClose, onSave }: Props) {
  const [form, setForm] = useState<BarangFormData>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,

      [name]: [
        "hargaBeli",
        "hargaGrosir",
        "hargaSemiGrosir",
        "hargaEcer",
        "stok",
        "minimalStok",
      ].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSave = () => {
    onSave(form);

    setForm(initialForm);

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

        <div className="space-y-3">
          <input
            name="kode"
            value={form.kode}
            onChange={handleChange}
            placeholder="Kode Barang"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="barcode"
            value={form.barcode}
            onChange={handleChange}
            placeholder="Barcode"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama Barang"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="hargaBeli"
            type="number"
            value={form.hargaBeli}
            onChange={handleChange}
            placeholder="Harga Beli"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="hargaEcer"
            type="number"
            value={form.hargaEcer}
            onChange={handleChange}
            placeholder="Harga Ecer"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="stok"
            type="number"
            value={form.stok}
            onChange={handleChange}
            placeholder="Stok"
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            name="minimalStok"
            type="number"
            value={form.minimalStok}
            onChange={handleChange}
            placeholder="Minimal Stok"
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
