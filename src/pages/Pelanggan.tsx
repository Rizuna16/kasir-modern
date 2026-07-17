import { useState } from "react";

import PelangganTable from "../components/pelanggan/PelangganTable";
import PelangganTambahModal from "../components/pelanggan/PelangganTambahModal";
import PelangganEditModal from "../components/pelanggan/PelangganEditModal";
import PelangganDeleteDialog from "../components/pelanggan/PelangganDeleteDialog";

import usePelanggan from "../hooks/usePelanggan";

import type { Pelanggan } from "../types/pelanggan";

export default function PelangganPage() {
  const { pelanggan, tambahPelanggan, editPelanggan, hapusPelanggan } =
    usePelanggan();

  const [isTambahOpen, setIsTambahOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedPelanggan, setSelectedPelanggan] = useState<Pelanggan | null>(
    null,
  );

  function handleEdit(data: Pelanggan) {
    setSelectedPelanggan(data);
    setIsEditOpen(true);
  }

  function handleDelete(data: Pelanggan) {
    setSelectedPelanggan(data);
    setIsDeleteOpen(true);
  }

  function handleConfirmDelete() {
    if (!selectedPelanggan) {
      return;
    }

    hapusPelanggan(selectedPelanggan.id);

    setIsDeleteOpen(false);
    setSelectedPelanggan(null);
  }

  return (
    <div className="p-6">
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Master Pelanggan</h1>

        <button
          onClick={() => {
            setIsTambahOpen(true);
          }}
          className="
            rounded
            bg-blue-600
            px-4
            py-2
            text-white
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

      <PelangganDeleteDialog
        isOpen={isDeleteOpen}
        pelangganName={selectedPelanggan?.nama ?? ""}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSelectedPelanggan(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
