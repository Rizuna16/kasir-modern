import type { Barang } from "../types/barang";

import type { StockMovementType } from "../types/stockMovement";

import { recordStockMovement } from "./stockMovementService";

const STORAGE_KEY = "barang";

// ===============================
// STORAGE HELPER
// ===============================

const getStorage = (): Barang[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    return JSON.parse(data) as Barang[];
  } catch {
    return [];
  }
};

const saveStorage = (data: Barang[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// ===============================
// GET BARANG
// ===============================

export const getBarang = (): Barang[] => {
  return getStorage();
};

// ===============================
// GET BY ID
// ===============================

export const getBarangById = (id: string): Barang | undefined => {
  const data = getStorage();

  return data.find((item) => item.id === id);
};

// ===============================
// ADD BARANG
// ===============================

export const addBarang = (
  data: Omit<Barang, "id" | "createdAt" | "updatedAt">,
): Barang => {
  const barang = getStorage();

  const now = new Date().toISOString();

  const newBarang: Barang = {
    id: crypto.randomUUID(),

    ...data,

    createdAt: now,

    updatedAt: now,
  };

  barang.push(newBarang);

  saveStorage(barang);

  return newBarang;
};

// ===============================
// UPDATE BARANG
// ===============================

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

// ===============================
// UPDATE STOK MANUAL
// ===============================

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

// ===============================
// KURANGI STOK
// ===============================

export const kurangiStokBarang = (
  id: string,

  jumlah: number,
): Barang | null => {
  return updateStokBarang(id, -jumlah);
};

// ===============================
// DELETE BARANG
// ===============================

export const deleteBarang = (id: string): void => {
  const barang = getStorage();

  const result = barang.filter((item) => item.id !== id);

  saveStorage(result);
};

// ===============================
// INVENTORY ENGINE
// ===============================

interface ApplyStockMovementParams {
  barangId: string;

  perubahan: number;

  tipe: StockMovementType;

  referensi?: string;

  createdBy?: string;

  keterangan?: string;
}

export const applyStockMovement = ({
  barangId,

  perubahan,

  tipe,

  referensi,

  createdBy,

  keterangan,
}: ApplyStockMovementParams): Barang | null => {
  const barang = getStorage();

  const index = barang.findIndex((item) => item.id === barangId);

  if (index === -1) {
    return null;
  }

  const stokSebelum = barang[index].stok;

  const stokSesudah = stokSebelum + perubahan;

  barang[index] = {
    ...barang[index],

    stok: stokSesudah,

    updatedAt: new Date().toISOString(),
  };

  saveStorage(barang);

  recordStockMovement({
    barangId,

    tipe,

    qty: Math.abs(perubahan),

    stokSebelum,

    stokSesudah,

    referensi,

    createdBy,

    keterangan,
  });

  return barang[index];
};
