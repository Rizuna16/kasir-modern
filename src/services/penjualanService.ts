import type { Penjualan } from "../types/penjualan";

import { kurangiStokBarang, updateStokBarang } from "./barangService";

const STORAGE_KEY = "penjualan";

// Ambil data penjualan

const getStorage = (): Penjualan[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

    return [];
  }

  return JSON.parse(data);
};

// Simpan data

const saveStorage = (data: Penjualan[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Ambil semua penjualan

export const getPenjualan = (): Penjualan[] => {
  return getStorage();
};

// Ambil berdasarkan id

export const getPenjualanById = (id: string): Penjualan | undefined => {
  const penjualan = getStorage();

  return penjualan.find((item) => item.id === id);
};

// Tambah transaksi penjualan

export const addPenjualan = (
  data: Omit<Penjualan, "id" | "createdAt" | "updatedAt">,
): Penjualan => {
  const penjualan = getStorage();

  const newPenjualan: Penjualan = {
    id: crypto.randomUUID(),

    ...data,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  // kurangi stok

  newPenjualan.detail.forEach((item) => {
    kurangiStokBarang(item.barangId, item.qty);
  });

  penjualan.push(newPenjualan);

  saveStorage(penjualan);

  return newPenjualan;
};

// Update transaksi penjualan

export const updatePenjualan = (
  id: string,

  data: Omit<Penjualan, "id" | "createdAt" | "updatedAt">,
): Penjualan | null => {
  const penjualan = getStorage();

  const index = penjualan.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  // kembalikan stok lama

  penjualan[index].detail.forEach((item) => {
    updateStokBarang(item.barangId, item.qty);
  });

  penjualan[index] = {
    ...penjualan[index],

    ...data,

    id,

    createdAt: penjualan[index].createdAt,

    updatedAt: new Date().toISOString(),
  };

  // kurangi stok baru

  penjualan[index].detail.forEach((item) => {
    kurangiStokBarang(item.barangId, item.qty);
  });

  saveStorage(penjualan);

  return penjualan[index];
};

// Hapus transaksi penjualan

export const deletePenjualan = (id: string): void => {
  const penjualan = getStorage();

  const transaksi = penjualan.find((item) => item.id === id);

  if (!transaksi) {
    return;
  }

  // kembalikan stok

  transaksi.detail.forEach((item) => {
    updateStokBarang(item.barangId, item.qty);
  });

  const dataBaru = penjualan.filter((item) => item.id !== id);

  saveStorage(dataBaru);
};
