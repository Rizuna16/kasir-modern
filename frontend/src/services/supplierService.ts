import type { Supplier } from "../types/supplier";

const STORAGE_KEY = "supplier";

// Data awal supplier

const defaultSupplier: Supplier[] = [
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

// Ambil data supplier

const getStorage = (): Supplier[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(
      STORAGE_KEY,

      JSON.stringify(defaultSupplier),
    );

    return defaultSupplier;
  }

  return JSON.parse(data);
};

// Simpan supplier

const saveStorage = (data: Supplier[]): void => {
  localStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(data),
  );
};

// Ambil semua supplier

export const getSupplier = (): Supplier[] => {
  return getStorage();
};

// Ambil supplier berdasarkan id

export const getSupplierById = (id: string): Supplier | undefined => {
  const supplier = getStorage();

  return supplier.find((item) => item.id === id);
};

// Tambah supplier

export const addSupplier = (
  data: Omit<Supplier, "id" | "createdAt" | "updatedAt">,
): Supplier => {
  const supplier = getStorage();

  const newSupplier: Supplier = {
    id: crypto.randomUUID(),

    ...data,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  supplier.push(newSupplier);

  saveStorage(supplier);

  return newSupplier;
};

// Update supplier

export const updateSupplier = (
  id: string,

  data: Omit<Supplier, "id" | "createdAt" | "updatedAt">,
): Supplier | null => {
  const supplier = getStorage();

  const index = supplier.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  supplier[index] = {
    ...supplier[index],

    ...data,

    id,

    createdAt: supplier[index].createdAt,

    updatedAt: new Date().toISOString(),
  };

  saveStorage(supplier);

  return supplier[index];
};

// Hapus supplier

export const deleteSupplier = (id: string): void => {
  const supplier = getStorage();

  const dataBaru = supplier.filter((item) => item.id !== id);

  saveStorage(dataBaru);
};
