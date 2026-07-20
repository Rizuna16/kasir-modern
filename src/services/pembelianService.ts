import { applyStockMovement } from "./barangService";

import type { Pembelian } from "../types/pembelian";

const STORAGE_KEY = "pembelian";

// =====================================================
// STORAGE
// =====================================================

const getStorage = (): Pembelian[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));

    return [];
  }

  try {
    return JSON.parse(data) as Pembelian[];
  } catch {
    return [];
  }
};

const saveStorage = (data: Pembelian[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// =====================================================
// GET ALL
// =====================================================

export const getPembelian = (): Pembelian[] => {
  return getStorage();
};

// =====================================================
// GET BY ID
// =====================================================

export const getPembelianById = (id: string): Pembelian | undefined => {
  return getStorage().find((item) => item.id === id);
};

// =====================================================
// ADD PEMBELIAN
// =====================================================

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

  /*
    INVENTORY ENGINE

    Pembelian = stok masuk
  */

  newPembelian.detail.forEach((item) => {
    applyStockMovement({
      barangId: item.barangId,

      perubahan: item.qty,

      tipe: "Pembelian",

      referensi: newPembelian.id,

      keterangan: "Stok masuk dari pembelian",
    });
  });

  return newPembelian;
};

// =====================================================
// UPDATE PEMBELIAN
// =====================================================

export const updatePembelian = (
  id: string,

  data: Omit<Pembelian, "id" | "createdAt" | "updatedAt">,
): Pembelian | null => {
  const pembelian = getStorage();

  const index = pembelian.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  /*
   ROLLBACK STOK LAMA
 */

  pembelian[index].detail.forEach((item) => {
    applyStockMovement({
      barangId: item.barangId,

      perubahan: -item.qty,

      tipe: "Retur Pembelian",

      referensi: id,

      keterangan: "Rollback update pembelian",
    });
  });

  pembelian[index] = {
    ...pembelian[index],

    ...data,

    id,

    createdAt: pembelian[index].createdAt,

    updatedAt: new Date().toISOString(),
  };

  /*
   APPLY STOK BARU
 */

  pembelian[index].detail.forEach((item) => {
    applyStockMovement({
      barangId: item.barangId,

      perubahan: item.qty,

      tipe: "Pembelian",

      referensi: id,

      keterangan: "Update pembelian",
    });
  });

  saveStorage(pembelian);

  return pembelian[index];
};

// =====================================================
// DELETE PEMBELIAN
// =====================================================

export const deletePembelian = (id: string): void => {
  const pembelian = getStorage();

  const transaksi = pembelian.find((item) => item.id === id);

  if (transaksi) {
    transaksi.detail.forEach((item) => {
      applyStockMovement({
        barangId: item.barangId,

        perubahan: -item.qty,

        tipe: "Retur Pembelian",

        referensi: id,

        keterangan: "Hapus pembelian",
      });
    });
  }

  const dataBaru = pembelian.filter((item) => item.id !== id);

  saveStorage(dataBaru);
};
