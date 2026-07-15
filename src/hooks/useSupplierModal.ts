import { useState } from "react";

import type { Supplier } from "../types/supplier";

import { initialSupplierForm } from "../constants/supplier";

export default function useSupplierModal() {
  const [openTambah, setOpenTambah] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<Supplier>(initialSupplierForm);

  const bukaTambah = () => {
    setForm(initialSupplierForm);

    setOpenTambah(true);
  };

  const tutupTambah = () => {
    setOpenTambah(false);

    setForm(initialSupplierForm);
  };

  const bukaEdit = (id: string, data: Supplier) => {
    setEditId(id);

    setForm(data);

    setOpenEdit(true);
  };

  const tutupEdit = () => {
    setOpenEdit(false);

    setEditId(null);

    setForm(initialSupplierForm);
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
