import { useState } from "react";

import PelangganTable from "../components/pelanggan/PelangganTable";
import PelangganTambahModal from "../components/pelanggan/PelangganTambahModal";
import PelangganEditModal from "../components/pelanggan/PelangganEditModal";

import usePelanggan from "../hooks/usePelanggan";

import type { Pelanggan } from "../types/pelanggan";

export default function PelangganPage() {
  const { pelanggan, tambahPelanggan, editPelanggan, hapusPelanggan } =
    usePelanggan();

  const [isTambahOpen, setIsTambahOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedPelanggan, setSelectedPelanggan] = useState<Pelanggan | null>(
    null,
  );

  function handleEdit(data: Pelanggan) {
    setSelectedPelanggan(data);

    setIsEditOpen(true);
  }

  function handleDelete(id: number) {
    const yakin = window.confirm(
      "Apakah Anda yakin ingin menghapus pelanggan ini?",
    );

    if (!yakin) {
      return;
    }

    hapusPelanggan(id);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Master Pelanggan</h1>

        <button
          onClick={() => {
            setIsTambahOpen(true);
          }}
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Tambah Pelanggan
        </button>
      </div>

      <PelangganTable
        data={pelanggan}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PelangganTambahModal
        isOpen={isTambahOpen}
        onClose={() => {
          setIsTambahOpen(false);
        }}
        onSave={(data) => {
          tambahPelanggan(data);

          setIsTambahOpen(false);
        }}
      />

      <PelangganEditModal
        isOpen={isEditOpen}
        pelanggan={selectedPelanggan}
        onClose={() => {
          setIsEditOpen(false);

          setSelectedPelanggan(null);
        }}
        onSave={(id, data) => {
          editPelanggan(id, data);

          setIsEditOpen(false);

          setSelectedPelanggan(null);
        }}
      />
    </div>
  );
}
