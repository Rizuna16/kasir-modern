import type { Supplier } from "../types/supplier";

let supplierData: Supplier[] = [
  {
    id: crypto.randomUUID(),

    kode: "SUP001",

    nama: "PT Indofood",

    alamat: "Jakarta",

    telepon: "081234567890",

    email: "indofood@email.com",

    status: "Aktif",

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),

    kode: "SUP002",

    nama: "PT Wings Food",

    alamat: "Surabaya",

    telepon: "082233445566",

    email: "wings@email.com",

    status: "Aktif",

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  },
];

// Ambil semua supplier
export const getSupplier = (): Supplier[] => {
  return [...supplierData];
};

// Ambil supplier berdasarkan id
export const getSupplierById = (id: string): Supplier | undefined => {
  return supplierData.find((item) => item.id === id);
};

// Tambah supplier baru
export const addSupplier = (
  data: Omit<Supplier, "id" | "createdAt" | "updatedAt">,
): Supplier => {
  const newSupplier: Supplier = {
    id: crypto.randomUUID(),

    ...data,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  supplierData.push(newSupplier);

  return newSupplier;
};

// Update supplier
export const updateSupplier = (
  id: string,
  data: Omit<Supplier, "id" | "createdAt" | "updatedAt">,
): Supplier | null => {
  const index = supplierData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  supplierData[index] = {
    ...supplierData[index],

    ...data,

    id,

    createdAt: supplierData[index].createdAt,

    updatedAt: new Date().toISOString(),
  };

  return supplierData[index];
};

// Hapus supplier
export const deleteSupplier = (id: string): void => {
  supplierData = supplierData.filter((item) => item.id !== id);
};
