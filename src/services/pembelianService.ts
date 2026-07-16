import { updateStokBarang } from "./barangService";

import type { Pembelian } from "../types/pembelian";

let pembelianData: Pembelian[] = [];

// Ambil semua pembelian
export const getPembelian = (): Pembelian[] => {
  return [...pembelianData];
};

// Ambil berdasarkan id
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

  // Simpan transaksi pembelian
  pembelianData.push(newPembelian);

  // Tambahkan stok setiap barang yang dibeli
  newPembelian.detail.forEach((item) => {
    updateStokBarang(item.barangId, item.qty);
  });

  return newPembelian;
};

// Hapus pembelian
export const deletePembelian = (id: string): void => {
  pembelianData = pembelianData.filter((item) => item.id !== id);
};
