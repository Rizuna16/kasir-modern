import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
  Button,
  Card,
  ConfirmDialog,
  PageHeader,
  Pagination,
} from "../components/ui";

import KategoriTable from "../components/kategori/KategoriTable";
import KategoriModal from "../components/kategori/KategoriModal";

import {
  addKategori,
  deleteKategori,
  getKategori,
  getKategoriById,
  updateKategori,
} from "../services/kategoriService";

import type { Kategori as KategoriType } from "../types/kategori";

import useSearch from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";

export default function Kategori() {
  const [kategori, setKategori] = useState<KategoriType[]>(getKategori());

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

  useEffect(() => {
    setPage(1);
  }, [search, setPage]);

  const handleTambah = () => {
    setForm({
      nama: "",

      deskripsi: "",
    });

    setEditId(null);

    setOpenModal(true);
  };

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
    if (selectedId === null) {
      return;
    }

    deleteKategori(selectedId);

    setKategori(getKategori());

    toast.success("Kategori berhasil dihapus!");

    setSelectedId(null);

    setOpenDelete(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Kategori"
        subtitle="Kelola kategori barang."
        action={
          <Button variant="primary" onClick={handleTambah}>
            Tambah Kategori
          </Button>
        }
      />

      <Card>
        <KategoriTable
          data={paginatedData}
          search={search}
          setSearch={setSearch}
          onEdit={(id) => {
            const data = getKategoriById(id);

            if (!data) {
              return;
            }

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
      </Card>

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
        onCancel={() => {
          setOpenDelete(false);
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}
