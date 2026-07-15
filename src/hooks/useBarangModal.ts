import { useState } from "react";

import type { BarangFormData } from "../types/barangForm";

import { initialBarangForm } from "../constants/barang";

export default function useBarangModal() {
  const [openTambah, setOpenTambah] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<BarangFormData>(initialBarangForm);

  const bukaTambah = () => {
    setForm(initialBarangForm);

    setOpenTambah(true);
  };

  const tutupTambah = () => {
    setOpenTambah(false);
  };

  const bukaEdit = (
    id: string,

    data: BarangFormData,
  ) => {
    setEditId(id);

    setForm(data);

    setOpenEdit(true);
  };

  const tutupEdit = () => {
    setOpenEdit(false);

    setEditId(null);

    setForm(initialBarangForm);
  };

  const bukaDelete = (id: string) => {
    setSelectedId(id);

    setOpenDelete(true);
  };

  const tutupDelete = () => {
    setOpenDelete(false);

    setSelectedId(null);
  };

  return {
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
  };
}
