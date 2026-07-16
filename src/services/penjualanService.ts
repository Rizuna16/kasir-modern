import type { Penjualan } from "../types/penjualan";

import { kurangiStokBarang, updateStokBarang } from "./barangService";

let penjualanData: Penjualan[] = [];

// Ambil semua penjualan
export const getPenjualan = (): Penjualan[] => {
  return [...penjualanData];
};

// Ambil penjualan berdasarkan id
export const getPenjualanById = (id: string): Penjualan | undefined => {
  return penjualanData.find((item) => item.id === id);
};

// Tambah transaksi penjualan
export const addPenjualan = (
  data: Omit<Penjualan, "id" | "createdAt" | "updatedAt">,
): Penjualan => {
  const newPenjualan: Penjualan = {
    id: crypto.randomUUID(),

    ...data,

    createdAt: new Date().toISOString(),

    updatedAt: new Date().toISOString(),
  };

  // kurangi stok barang
  newPenjualan.detail.forEach((item) => {
    kurangiStokBarang(item.barangId, item.qty);
  });

  penjualanData.push(newPenjualan);

  return newPenjualan;
};

// Update transaksi penjualan
export const updatePenjualan = (
  id: string,
  data: Omit<Penjualan, "id" | "createdAt" | "updatedAt">,
): Penjualan | null => {
  const index = penjualanData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  penjualanData[index] = {
    ...penjualanData[index],

    ...data,

    id,

    createdAt: penjualanData[index].createdAt,

    updatedAt: new Date().toISOString(),
  };

  return penjualanData[index];
};

// Hapus transaksi penjualan
export const deletePenjualan = (id: string): void => {
  const transaksi = penjualanData.find((item) => item.id === id);

  if (!transaksi) {
    return;
  }

  // kembalikan stok barang
  transaksi.detail.forEach((item) => {
    updateStokBarang(item.barangId, item.qty);
  });

  penjualanData = penjualanData.filter((item) => item.id !== id);
};
