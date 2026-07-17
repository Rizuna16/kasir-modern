import { useEffect, useState } from "react";

import { Button, Card, Pagination, SearchBox } from "../components/ui";

import PelangganTable from "../components/pelanggan/PelangganTable";
import PelangganTambahModal from "../components/pelanggan/PelangganTambahModal";
import PelangganEditModal from "../components/pelanggan/PelangganEditModal";
import PelangganDeleteDialog from "../components/pelanggan/PelangganDeleteDialog";

import usePelanggan from "../hooks/usePelanggan";
import useSearch from "../hooks/useSearch";
import usePagination from "../hooks/usePagination";

import type { Pelanggan } from "../types/pelanggan";
import type { PelangganFormData } from "../types/pelangganForm";

import { initialPelangganForm } from "../utils/initialPelangganForm";

export default function PelangganPage() {
  const {
    pelanggan,

    tambahPelanggan,

    editPelanggan,

    hapusPelanggan,
  } = usePelanggan();

  const {
    search,

    setSearch,

    filteredData,
  } = useSearch(pelanggan, "nama");

  const {
    page,

    setPage,

    totalPages,

    paginatedData,
  } = usePagination(filteredData, 10);

  const [form, setForm] = useState<PelangganFormData>(initialPelangganForm);

  const [isTambahOpen, setIsTambahOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedPelanggan, setSelectedPelanggan] = useState<Pelanggan | null>(
    null,
  );

  useEffect(() => {
    setPage(1);
  }, [search, setPage]);

  const handleTambah = () => {
    setForm(initialPelangganForm);

    setIsTambahOpen(true);
  };

  const handleEdit = (data: Pelanggan) => {
    setForm({
      kode: data.kode,

      nama: data.nama,

      telepon: data.telepon,

      email: data.email,

      alamat: data.alamat,

      kota: data.kota,

      aktif: data.aktif,

      catatan: data.catatan,
    });

    setSelectedPelanggan(data);

    setIsEditOpen(true);
  };

  const handleDelete = (data: Pelanggan) => {
    setSelectedPelanggan(data);

    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedPelanggan) {
      return;
    }

    hapusPelanggan(selectedPelanggan.id);

    setIsDeleteOpen(false);

    setSelectedPelanggan(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          Data Pelanggan
        </h1>

        <p
          className="
            text-gray-500
            dark:text-gray-400
          "
        >
          Kelola data pelanggan
        </p>
      </div>

      <Card>
        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Cari pelanggan..."
          />

          <Button variant="primary" onClick={handleTambah}>
            + Tambah Pelanggan
          </Button>
        </div>
      </Card>

      <Card>
        {paginatedData.length === 0 ? (
          <div
            className="
                py-10
                text-center
                text-gray-500
                dark:text-gray-400
              "
          >
            Belum ada data pelanggan.
          </div>
        ) : (
          <PelangganTable
            data={paginatedData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <PelangganTambahModal
        isOpen={isTambahOpen}
        onClose={() => {
          setIsTambahOpen(false);
        }}
        form={form}
        setForm={setForm}
        onSave={() => {
          const berhasil = tambahPelanggan(form);

          if (berhasil) {
            setForm(initialPelangganForm);

            setIsTambahOpen(false);
          }
        }}
      />

      <PelangganEditModal
        isOpen={isEditOpen}
        form={form}
        setForm={setForm}
        onClose={() => {
          setIsEditOpen(false);

          setSelectedPelanggan(null);
        }}
        onSave={() => {
          if (!selectedPelanggan) {
            return;
          }

          editPelanggan(
            selectedPelanggan.id,

            form,
          );

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
