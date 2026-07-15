import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDialog, Pagination } from "../components/ui";

import SatuanTable from "../components/satuan/SatuanTable";
import SatuanModal from "../components/satuan/SatuanModal";

import {
  addSatuan,
  deleteSatuan,
  getSatuan,
  getSatuanById,
  updateSatuan,
} from "../services/satuanService";

import type { Satuan } from "../types/satuan";

import useSearch from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";

export default function Satuan() {
  const [satuan, setSatuan] = useState<Satuan[]>(getSatuan());

  const { search, setSearch, filteredData } = useSearch(satuan, "nama");

  const { page, setPage, totalPages, paginatedData } = usePagination(
    filteredData,
    10,
  );

  const [openModal, setOpenModal] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [form, setForm] = useState({
    nama: "",
  });

  const handleSave = () => {
    if (form.nama.trim() === "") {
      toast.error("Nama satuan wajib diisi!");

      return;
    }

    if (editId !== null) {
      updateSatuan(editId, form);

      toast.success("Satuan berhasil diperbarui!");
    } else {
      addSatuan(form);

      toast.success("Satuan berhasil ditambahkan!");
    }

    setSatuan(getSatuan());

    setForm({
      nama: "",
    });

    setEditId(null);

    setOpenModal(false);
  };

  const handleDelete = () => {
    if (selectedId === null) return;

    deleteSatuan(selectedId);

    setSatuan(getSatuan());

    toast.success("Satuan berhasil dihapus!");

    setSelectedId(null);

    setOpenDelete(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Data Satuan</h1>

        <p className="text-gray-500">Kelola satuan barang</p>
      </div>

      <SatuanTable
        data={paginatedData}
        search={search}
        setSearch={setSearch}
        onTambah={() => {
          setForm({
            nama: "",
          });

          setEditId(null);

          setOpenModal(true);
        }}
        onEdit={(id) => {
          const data = getSatuanById(id);

          if (!data) return;

          setForm({
            nama: data.nama,
          });

          setEditId(id);

          setOpenModal(true);
        }}
        onDelete={(id) => {
          setSelectedId(id);

          setOpenDelete(true);
        }}
      />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <SatuanModal
        isOpen={openModal}
        title={editId ? "Edit Satuan" : "Tambah Satuan"}
        form={form}
        setForm={setForm}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        isOpen={openDelete}
        title="Hapus Satuan"
        message="Apakah Anda yakin ingin menghapus satuan ini?"
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
