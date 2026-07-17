import { useEffect, useState } from "react";

import BarangTable from "../components/barang/BarangTable";
import BarangTambahModal from "../components/barang/BarangTambahModal";
import BarangEditModal from "../components/barang/BarangEditModal";
import BarangDeleteDialog from "../components/barang/BarangDeleteDialog";

import {
  getBarang,
  addBarang,
  updateBarang,
  deleteBarang,
} from "../services/barangService";

import type { Barang } from "../types/barang";
import type { BarangFormData } from "../types/barangForm";

import { initialBarangForm } from "../constants/initialBarangForm";

export default function BarangPage() {
  const [barang, setBarang] = useState<Barang[]>([]);

  const [isTambahOpen, setIsTambahOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [deleteId, setDeleteId] = useState("");

  const [form, setForm] = useState<BarangFormData>(initialBarangForm);

  const [editId, setEditId] = useState("");

  function loadData() {
    setBarang(getBarang());
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleSaveTambah() {
    addBarang({
      ...form,
    });

    setIsTambahOpen(false);

    setForm({
      ...initialBarangForm,
    });

    loadData();
  }

  function handleSaveEdit() {
    updateBarang(editId, {
      ...form,
    });

    setIsEditOpen(false);

    setForm({
      ...initialBarangForm,
    });

    loadData();
  }

  function handleEdit(data: Barang) {
    setEditId(data.id);

    setForm({
      kode: data.kode ?? "",
      barcode: data.barcode ?? "",
      nama: data.nama ?? "",
      kategoriId: data.kategoriId ?? "",
      satuanId: data.satuanId ?? "",
      supplierId: data.supplierId ?? "",
      hargaBeli: data.hargaBeli ?? 0,
      hargaGrosir: data.hargaGrosir ?? 0,
      hargaSemiGrosir: data.hargaSemiGrosir ?? 0,
      hargaEcer: data.hargaEcer ?? 0,
      stok: data.stok ?? 0,
      minimalStok: data.minimalStok ?? 0,
      status: data.status ?? "Aktif",
    });

    setIsEditOpen(true);
  }

  function handleDelete(id: string) {
    setDeleteId(id);

    setIsDeleteOpen(true);
  }

  function handleConfirmDelete() {
    deleteBarang(deleteId);

    setIsDeleteOpen(false);

    setDeleteId("");

    loadData();
  }

  return (
    <div className="p-6">
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Master Barang</h1>

        <button
          onClick={() => {
            setForm({
              ...initialBarangForm,
            });

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
          Tambah Barang
        </button>
      </div>

      <BarangTable data={barang} onEdit={handleEdit} onDelete={handleDelete} />

      <BarangTambahModal
        isOpen={isTambahOpen}
        onClose={() => setIsTambahOpen(false)}
        form={form}
        setForm={setForm}
        onSave={handleSaveTambah}
      />

      <BarangEditModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        form={form}
        setForm={setForm}
        onSave={handleSaveEdit}
      />

      <BarangDeleteDialog
        isOpen={isDeleteOpen}
        onCancel={() => {
          setIsDeleteOpen(false);
          setDeleteId("");
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
