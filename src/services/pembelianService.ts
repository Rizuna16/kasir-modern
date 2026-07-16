import { updateStokBarang, kurangiStokBarang } from "./barangService";

import type { Pembelian } from "../types/pembelian";

let pembelianData: Pembelian[] = [];

// Ambil semua pembelian
export const getPembelian = (): Pembelian[] => {
  return [...pembelianData];
};

// Ambil berdasarkan ID
export const getPembelianById = (id: string): Pembelian | undefined => {
  return pembelianData.find((item) => item.id === id);
};

// Tambah pembelian
export const addPembelian = (
  data: Omit<Pembelian, "id" | "createdAt" | "updatedAt">,
): Pembelian => {
  const newPembelian: Pembelian = {
    id: crypto.randomUUID(),

    ...data,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  pembelianData.push(newPembelian);

  // Tambah stok
  newPembelian.detail.forEach((item) => {
    updateStokBarang(item.barangId, item.qty);
  });

  return newPembelian;
};

// ==============================
// UPDATE PEMBELIAN
// ==============================
export const updatePembelian = (
  id: string,
  data: Omit<Pembelian, "id" | "createdAt" | "updatedAt">,
): Pembelian | null => {
  const index = pembelianData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  // Rollback stok lama
  pembelianData[index].detail.forEach((item) => {
    kurangiStokBarang(item.barangId, item.qty);
  });

  // Simpan transaksi baru
  pembelianData[index] = {
    ...pembelianData[index],

    ...data,

    id,

    createdAt: pembelianData[index].createdAt,

    updatedAt: new Date().toISOString(),
  };

  // Tambahkan stok baru
  pembelianData[index].detail.forEach((item) => {
    updateStokBarang(item.barangId, item.qty);
  });

  return pembelianData[index];
};

// Hapus pembelian
export const deletePembelian = (id: string): void => {
  const pembelian = getPembelianById(id);

  if (pembelian) {
    pembelian.detail.forEach((item) => {
      kurangiStokBarang(item.barangId, item.qty);
    });
  }

  pembelianData = pembelianData.filter((item) => item.id !== id);
};
