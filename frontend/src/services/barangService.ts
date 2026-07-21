import type { Barang } from "../types/barang";

import type { StockMovementType } from "../types/stockMovement";

import { recordStockMovement } from "./stockMovementService";

const STORAGE_KEY = "barang";

// =====================================================
// STORAGE
// =====================================================

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

const saveStorage = (data: Barang[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// =====================================================
// GET
// =====================================================

export const getBarang = (): Barang[] => {
  return getStorage();
};

export const getBarangById = (id: string): Barang | undefined => {
  return getStorage().find((item) => item.id === id);
};

// =====================================================
// ADD
// =====================================================

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

// =====================================================
// UPDATE DATA BARANG
// =====================================================

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

    updatedAt: new Date().toISOString(),
  };

  saveStorage(barang);

  return barang[index];
};

// =====================================================
// ENTERPRISE STOCK ENGINE
// =====================================================

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

  if (stokSesudah < 0) {
    return null;
  }

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

// =====================================================
// DELETE
// =====================================================

export const deleteBarang = (id: string) => {
  const barang = getStorage();

  saveStorage(barang.filter((item) => item.id !== id));
};
