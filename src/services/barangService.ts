import type { Barang } from "../types/barang";

let barangData: Barang[] = [];

// Ambil semua barang
export const getBarang = (): Barang[] => {
  return [...barangData];
};

// Ambil barang berdasarkan id
export const getBarangById = (id: string): Barang | undefined => {
  return barangData.find((item) => item.id === id);
};

// Tambah barang baru
export const addBarang = (
  data: Omit<Barang, "id" | "createdAt" | "updatedAt">,
): Barang => {
  const newBarang: Barang = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  barangData.push(newBarang);

  return newBarang;
};

// Update data barang
export const updateBarang = (
  id: string,
  data: Omit<Barang, "id" | "createdAt" | "updatedAt">,
): Barang | null => {
  const index = barangData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  barangData[index] = {
    ...barangData[index],
    ...data,
    id,
    createdAt: barangData[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  return barangData[index];
};

// Tambah stok barang
export const updateStokBarang = (id: string, jumlah: number): Barang | null => {
  const index = barangData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  barangData[index] = {
    ...barangData[index],
    stok: barangData[index].stok + jumlah,
    updatedAt: new Date().toISOString(),
  };

  return barangData[index];
};

// Kurangi stok barang
export const kurangiStokBarang = (
  id: string,
  jumlah: number,
): Barang | null => {
  const index = barangData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  barangData[index] = {
    ...barangData[index],
    stok: barangData[index].stok - jumlah,
    updatedAt: new Date().toISOString(),
  };

  return barangData[index];
};

// Hapus barang
export const deleteBarang = (id: string): void => {
  barangData = barangData.filter((item) => item.id !== id);
};
