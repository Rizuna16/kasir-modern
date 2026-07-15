import { useEffect, useState } from "react";

import PelangganModal from "./PelangganModal";

import type { Pelanggan } from "../../types/pelanggan";

interface Props {
  isOpen: boolean;

  pelanggan: Pelanggan | null;

  onClose: () => void;

  onSave: (id: number, data: Omit<Pelanggan, "id">) => void;
}

export default function PelangganEditModal({
  isOpen,

  pelanggan,

  onClose,

  onSave,
}: Props) {
  const [form, setForm] = useState<Omit<Pelanggan, "id">>({
    kode: "",

    nama: "",

    telepon: "",

    email: "",

    alamat: "",

    kota: "",

    aktif: true,

    catatan: "",
  });

  useEffect(() => {
    if (pelanggan) {
      setForm({
        kode: pelanggan.kode,

        nama: pelanggan.nama,

        telepon: pelanggan.telepon,

        email: pelanggan.email,

        alamat: pelanggan.alamat,

        kota: pelanggan.kota,

        aktif: pelanggan.aktif,

        catatan: pelanggan.catatan,
      });
    }
  }, [pelanggan]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,

      [name]: value,
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,

      aktif: e.target.checked,
    });
  };

  const handleSubmit = () => {
    if (!pelanggan) return;

    onSave(
      pelanggan.id,

      form,
    );

    onClose();
  };

  return (
    <PelangganModal isOpen={isOpen} title="Edit Pelanggan" onClose={onClose}>
      <div className="space-y-4">
        <input
          name="kode"
          value={form.kode}
          onChange={handleChange}
          placeholder="Kode Pelanggan"
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama Pelanggan"
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="telepon"
          value={form.telepon}
          onChange={handleChange}
          placeholder="Nomor Telepon"
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="kota"
          value={form.kota}
          onChange={handleChange}
          placeholder="Kota"
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="alamat"
          value={form.alamat}
          onChange={handleChange}
          placeholder="Alamat"
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          name="catatan"
          value={form.catatan}
          onChange={handleChange}
          placeholder="Catatan"
          className="w-full border rounded px-3 py-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.aktif}
            onChange={handleCheckbox}
          />
          Aktif
        </label>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </PelangganModal>
  );
}
