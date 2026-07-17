import { useState } from "react";
import { toast } from "sonner";

import { ConfirmDialog, Pagination } from "../components/ui";

import KategoriTable from "../components/kategori/KategoriTable";
import KategoriModal from "../components/kategori/KategoriModal";

import {
  addKategori,
  deleteKategori,
  getKategori,
  getKategoriById,
  updateKategori,
} from "../services/kategoriService";

import type { Kategori } from "../types/kategori";

import useSearch from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";

export default function Kategori() {
  const [kategori, setKategori] = useState<Kategori[]>(getKategori());

  const { search, setSearch, filteredData } = useSearch(kategori, "nama");

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

    deskripsi: "",
  });

  const handleSave = () => {
    if (form.nama.trim() === "") {
      toast.error("Nama kategori wajib diisi!");

      return;
    }

    if (editId !== null) {
      updateKategori(editId, form);

      toast.success("Kategori berhasil diperbarui!");
    } else {
      addKategori(form);

      toast.success("Kategori berhasil ditambahkan!");
    }

    setKategori(getKategori());

    setForm({
      nama: "",

      deskripsi: "",
    });

    setEditId(null);

    setOpenModal(false);
  };

  const handleDelete = () => {
    if (selectedId === null) return;

    deleteKategori(selectedId);

    setKategori(getKategori());

    toast.success("Kategori berhasil dihapus!");

    setSelectedId(null);

    setOpenDelete(false);
  };

  return (
    <div
      className="
        space-y-6
      "
    >
      {/* Page Header */}
      <div>
        <h1
          className="
            text-3xl
            font-bold

            text-gray-900
            dark:text-white
          "
        >
          Data Kategori
        </h1>

        <p
          className="
            text-gray-500
            dark:text-gray-400
          "
        >
          Kelola kategori barang
        </p>
      </div>

      <KategoriTable
        data={paginatedData}
        search={search}
        setSearch={setSearch}
        onTambah={() => {
          setForm({
            nama: "",

            deskripsi: "",
          });

          setEditId(null);

          setOpenModal(true);
        }}
        onEdit={(id) => {
          const data = getKategoriById(id);

          if (!data) return;

          setForm({
            nama: data.nama,

            deskripsi: data.deskripsi,
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

      <KategoriModal
        isOpen={openModal}
        title={editId !== null ? "Edit Kategori" : "Tambah Kategori"}
        form={form}
        setForm={setForm}
        onClose={() => {
          setOpenModal(false);
        }}
        onSave={handleSave}
      />

      <ConfirmDialog
        isOpen={openDelete}
        title="Hapus Kategori"
        message="Apakah Anda yakin ingin menghapus kategori ini?"
        onCancel={() => setOpenDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
