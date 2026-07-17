import { updateStokBarang, kurangiStokBarang } from "./barangService";

import type { Pembelian } from "../types/pembelian";

const STORAGE_KEY = "pembelian";

// Ambil data storage

const getStorage = (): Pembelian[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

    return [];
  }

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Simpan storage

const saveStorage = (data: Pembelian[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Ambil semua pembelian

export const getPembelian = (): Pembelian[] => {
  return getStorage();
};

// Ambil berdasarkan ID

export const getPembelianById = (id: string): Pembelian | undefined => {
  const pembelian = getStorage();

  return pembelian.find((item) => item.id === id);
};

// Tambah pembelian

export const addPembelian = (
  data: Omit<Pembelian, "id" | "createdAt" | "updatedAt">,
): Pembelian => {
  const pembelian = getStorage();

  const now = new Date().toISOString();

  const newPembelian: Pembelian = {
    id: crypto.randomUUID(),

    ...data,

    createdAt: now,

    updatedAt: now,
  };

  pembelian.push(newPembelian);

  saveStorage(pembelian);

  newPembelian.detail.forEach((item) => {
    updateStokBarang(item.barangId, item.qty);
  });

  return newPembelian;
};

// Update pembelian

export const updatePembelian = (
  id: string,

  data: Omit<Pembelian, "id" | "createdAt" | "updatedAt">,
): Pembelian | null => {
  const pembelian = getStorage();

  const index = pembelian.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  pembelian[index].detail.forEach((item) => {
    kurangiStokBarang(item.barangId, item.qty);
  });

  pembelian[index] = {
    ...pembelian[index],

    ...data,

    id,

    createdAt: pembelian[index].createdAt,

    updatedAt: new Date().toISOString(),
  };

  pembelian[index].detail.forEach((item) => {
    updateStokBarang(item.barangId, item.qty);
  });

  saveStorage(pembelian);

  return pembelian[index];
};

// Hapus pembelian

export const deletePembelian = (id: string): void => {
  const pembelian = getStorage();

  const transaksi = pembelian.find((item) => item.id === id);

  if (transaksi) {
    transaksi.detail.forEach((item) => {
      kurangiStokBarang(item.barangId, item.qty);
    });
  }

  const dataBaru = pembelian.filter((item) => item.id !== id);

  saveStorage(dataBaru);
};
