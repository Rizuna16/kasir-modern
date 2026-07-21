import type { Penjualan } from "../types/penjualan";

import { applyStockMovement } from "./barangService";

const STORAGE_KEY = "penjualan";

// ======================================================
// STORAGE HELPER
// ======================================================

const getStorage = (): Penjualan[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

    return [];
  }

  try {
    return JSON.parse(data) as Penjualan[];
  } catch {
    return [];
  }
};

const saveStorage = (data: Penjualan[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// ======================================================
// GET ALL
// ======================================================

export const getPenjualan = (): Penjualan[] => {
  return getStorage();
};

// ======================================================
// GET BY ID
// ======================================================

export const getPenjualanById = (id: string): Penjualan | undefined => {
  const penjualan = getStorage();

  return penjualan.find((item) => item.id === id);
};

// ======================================================
// ADD PENJUALAN
// ======================================================

export const addPenjualan = (
  data: Omit<Penjualan, "id" | "createdAt" | "updatedAt">,
): Penjualan => {
  const penjualan = getStorage();

  const now = new Date().toISOString();

  const newPenjualan: Penjualan = {
    id: crypto.randomUUID(),

    ...data,

    createdAt: now,

    updatedAt: now,
  };

  /*
    ==========================================
    INVENTORY ENGINE

    Penjualan =
    stok keluar
    ==========================================
  */

  newPenjualan.detail.forEach((item) => {
    applyStockMovement({
      barangId: item.barangId,

      perubahan: -item.qty,

      tipe: "Penjualan",

      referensi: newPenjualan.id,

      keterangan: "Stok keluar dari transaksi penjualan",
    });
  });

  penjualan.push(newPenjualan);

  saveStorage(penjualan);

  return newPenjualan;
};

// ======================================================
// UPDATE PENJUALAN
// ======================================================

export const updatePenjualan = (
  id: string,

  data: Omit<Penjualan, "id" | "createdAt" | "updatedAt">,
): Penjualan | null => {
  const penjualan = getStorage();

  const index = penjualan.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  /*
    =====================================
    KEMBALIKAN STOK TRANSAKSI LAMA
    =====================================
  */

  penjualan[index].detail.forEach((item) => {
    applyStockMovement({
      barangId: item.barangId,

      perubahan: item.qty,

      tipe: "Penyesuaian",

      referensi: id,

      keterangan: "Rollback stok penjualan lama",
    });
  });

  const updated: Penjualan = {
    ...penjualan[index],

    ...data,

    id,

    createdAt: penjualan[index].createdAt,

    updatedAt: new Date().toISOString(),
  };

  /*
    =====================================
    KURANGI STOK TRANSAKSI BARU
    =====================================
  */

  updated.detail.forEach((item) => {
    applyStockMovement({
      barangId: item.barangId,

      perubahan: -item.qty,

      tipe: "Penjualan",

      referensi: id,

      keterangan: "Update transaksi penjualan",
    });
  });

  penjualan[index] = updated;

  saveStorage(penjualan);

  return updated;
};

// ======================================================
// DELETE PENJUALAN
// ======================================================

export const deletePenjualan = (id: string): void => {
  const penjualan = getStorage();

  const transaksi = penjualan.find((item) => item.id === id);

  if (!transaksi) {
    return;
  }

  /*
    =====================================
    KEMBALIKAN STOK
    RETUR PENJUALAN
    =====================================
  */

  transaksi.detail.forEach((item) => {
    applyStockMovement({
      barangId: item.barangId,

      perubahan: item.qty,

      tipe: "Retur Penjualan",

      referensi: id,

      keterangan: "Hapus transaksi penjualan",
    });
  });

  const dataBaru = penjualan.filter((item) => item.id !== id);

  saveStorage(dataBaru);
};
