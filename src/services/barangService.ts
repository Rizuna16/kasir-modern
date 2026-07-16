import type { Barang } from "../types/barang";

const STORAGE_KEY = "barang";

// Ambil data dari localStorage

const getStorage = (): Barang[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
};

// Simpan data ke localStorage

const saveStorage = (data: Barang[]): void => {
  localStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(data),
  );
};

// Ambil semua barang

export const getBarang = (): Barang[] => {
  return getStorage();
};

// Ambil barang berdasarkan id

export const getBarangById = (id: string): Barang | undefined => {
  const data = getStorage();

  return data.find((item) => item.id === id);
};

// Tambah barang baru

export const addBarang = (
  data: Omit<Barang, "id" | "createdAt" | "updatedAt">,
): Barang => {
  const barang = getStorage();

  const newBarang: Barang = {
    id: crypto.randomUUID(),

    ...data,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  barang.push(newBarang);

  saveStorage(barang);

  return newBarang;
};

// Update barang

export const updateBarang = (
  id: string,

  data: Omit<Barang, "id" | "createdAt" | "updatedAt">,
): Barang | null => {
  const barang = getStorage();

  const index = barang.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  barang[index] = {
    ...barang[index],

    ...data,

    id,

    createdAt: barang[index].createdAt,

    updatedAt: new Date().toISOString(),
  };

  saveStorage(barang);

  return barang[index];
};

// Tambah stok barang

export const updateStokBarang = (
  id: string,

  jumlah: number,
): Barang | null => {
  const barang = getStorage();

  const index = barang.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  barang[index] = {
    ...barang[index],

    stok: barang[index].stok + jumlah,

    updatedAt: new Date().toISOString(),
  };

  saveStorage(barang);

  return barang[index];
};

// Kurangi stok barang

export const kurangiStokBarang = (
  id: string,

  jumlah: number,
): Barang | null => {
  const barang = getStorage();

  const index = barang.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  barang[index] = {
    ...barang[index],

    stok: barang[index].stok - jumlah,

    updatedAt: new Date().toISOString(),
  };

  saveStorage(barang);

  return barang[index];
};

// Hapus barang

export const deleteBarang = (id: string): void => {
  const barang = getStorage();

  const newData = barang.filter((item) => item.id !== id);

  saveStorage(newData);
};
