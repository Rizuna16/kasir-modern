import { useEffect } from "react";

import useSupplier from "../hooks/useSupplier";
import useSupplierModal from "../hooks/useSupplierModal";

import usePagination from "../hooks/usePagination";
import useSearch from "../hooks/useSearch";

import SupplierToolbar from "../components/supplier/SupplierToolbar";
import SupplierTable from "../components/supplier/SupplierTable";
import SupplierTambahModal from "../components/supplier/SupplierTambahModal";
import SupplierEditModal from "../components/supplier/SupplierEditModal";
import SupplierDeleteDialog from "../components/supplier/SupplierDeleteDialog";

import { Card, Pagination } from "../components/ui";

export default function Supplier() {
  const {
    supplier,

    tambahSupplier,

    hapusSupplier,

    ambilSupplier,

    editSupplier,

    getNamaSupplier,
  } = useSupplier();

  const {
    search,

    setSearch,

    filteredData: filteredSupplier,
  } = useSearch(supplier, "nama");

  const {
    page,

    setPage,

    totalPages,

    paginatedData: paginatedSupplier,
  } = usePagination(filteredSupplier, 10);

  useEffect(() => {
    setPage(1);
  }, [search, setPage]);

  const {
    openTambah,

    openEdit,

    openDelete,

    selectedId,

    editId,

    form,

    setForm,

    bukaTambah,

    tutupTambah,

    bukaEdit,

    tutupEdit,

    bukaDelete,

    tutupDelete,
  } = useSupplierModal();

  const handleTambah = () => {
    const berhasil = tambahSupplier({
      kode: form.kode,

      nama: form.nama,

      alamat: form.alamat,

      telepon: form.telepon,

      email: form.email,

      status: form.status,
    });

    if (berhasil) {
      tutupTambah();
    }
  };

  const handleEdit = (id: string) => {
    const data = ambilSupplier(id);

    if (!data) {
      return;
    }

    bukaEdit(id, data);
  };

  const handleUpdate = () => {
    if (editId === null) {
      return;
    }

    editSupplier(editId, {
      kode: form.kode,

      nama: form.nama,

      alamat: form.alamat,

      telepon: form.telepon,

      email: form.email,

      status: form.status,
    });

    tutupEdit();
  };

  const handleDelete = () => {
    if (selectedId === null) {
      return;
    }

    hapusSupplier(selectedId);

    tutupDelete();
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
          Data Supplier
        </h1>

        <p
          className="
            text-gray-500
            dark:text-gray-400
          "
        >
          Kelola data supplier toko
        </p>
      </div>

      <SupplierToolbar
        search={search}
        setSearch={setSearch}
        onTambah={bukaTambah}
      />

      <Card>
        {paginatedSupplier.length === 0 ? (
          <div
            className="
                py-10
                text-center
                text-gray-500
                dark:text-gray-400
              "
          >
            Belum ada data supplier.
          </div>
        ) : (
          <SupplierTable
            data={paginatedSupplier}
            onEdit={handleEdit}
            onDelete={bukaDelete}
          />
        )}
      </Card>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <SupplierTambahModal
        isOpen={openTambah}
        onClose={tutupTambah}
        form={form}
        setForm={setForm}
        onSave={handleTambah}
      />

      <SupplierEditModal
        isOpen={openEdit}
        onClose={tutupEdit}
        form={form}
        setForm={setForm}
        onSave={handleUpdate}
      />

      <SupplierDeleteDialog
        isOpen={openDelete}
        supplierName={getNamaSupplier(selectedId ?? "")}
        onCancel={tutupDelete}
        onConfirm={handleDelete}
      />
    </div>
  );
}
