import { useState } from "react";
import { toast } from "sonner";

import {
  addSupplier,
  deleteSupplier,
  getSupplier,
  getSupplierById,
  updateSupplier,
} from "../services/supplierService";

import type { Supplier } from "../types/supplier";
import type { SupplierFormData } from "../types/supplierForm";

interface UseSupplierReturn {
  supplier: Supplier[];

  refreshSupplier: () => void;

  tambahSupplier: (form: SupplierFormData) => boolean;

  hapusSupplier: (id: string) => void;

  ambilSupplier: (id: string) => Supplier | undefined;

  getNamaSupplier: (id: string) => string;

  editSupplier: (id: string, form: SupplierFormData) => void;
}

export default function useSupplier(): UseSupplierReturn {
  const [supplier, setSupplier] = useState<Supplier[]>(getSupplier());

  const refreshSupplier = () => {
    setSupplier(getSupplier());
  };

  const mappingForm = (form: SupplierFormData) => ({
    kode: form.kode,
    nama: form.nama,
    alamat: form.alamat,
    telepon: form.telepon,
    email: form.email,
    status: form.status,
  });

  const tambahSupplier = (form: SupplierFormData) => {
    if (form.nama.trim() === "") {
      toast.error("Nama supplier wajib diisi!");

      return false;
    }

    addSupplier(mappingForm(form));

    refreshSupplier();

    toast.success("Supplier berhasil ditambahkan!");

    return true;
  };

  const hapusSupplier = (id: string) => {
    deleteSupplier(id);

    refreshSupplier();

    toast.success("Supplier berhasil dihapus!");
  };

  const ambilSupplier = (id: string) => {
    return getSupplierById(id);
  };

  const getNamaSupplier = (id: string) => {
    const data = getSupplierById(id);

    return data ? data.nama : "";
  };

  const editSupplier = (id: string, form: SupplierFormData) => {
    if (form.nama.trim() === "") {
      toast.error("Nama supplier wajib diisi!");

      return;
    }

    const lama = getSupplierById(id);

    if (!lama) {
      toast.error("Supplier tidak ditemukan!");

      return;
    }

    updateSupplier(id, mappingForm(form));

    refreshSupplier();

    toast.success("Supplier berhasil diperbarui!");
  };

  return {
    supplier,

    refreshSupplier,

    tambahSupplier,

    hapusSupplier,

    ambilSupplier,

    getNamaSupplier,

    editSupplier,
  };
}
