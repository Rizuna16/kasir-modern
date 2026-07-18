import {
  getBarang,
  updateStokBarang,
  kurangiStokBarang,
} from "./barangService";

import { recordStockMovement } from "./stockMovementService";

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
    return JSON.parse(data) as Pembelian[];
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
  return getStorage().find((item) => item.id === id);
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

  /*
    Update stok barang
    + catat stock movement
  */

  newPembelian.detail.forEach((item) => {
    const barangSebelum = getBarang().find(
      (barang) => barang.id === item.barangId,
    );

    if (!barangSebelum) {
      return;
    }

    const stokSebelum = barangSebelum.stok;

    const barangSesudah = updateStokBarang(item.barangId, item.qty);

    if (!barangSesudah) {
      return;
    }

    recordStockMovement({
      barangId: item.barangId,

      tipe: "Pembelian",

      qty: item.qty,

      stokSebelum,

      stokSesudah: barangSesudah.stok,

      referensi: newPembelian.id,

      keterangan: "Stok masuk dari pembelian",
    });
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

  /*
    Kembalikan stok lama
  */

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

  /*
    Tambahkan stok baru
    + catat movement
  */

  pembelian[index].detail.forEach((item) => {
    const barangSebelum = getBarang().find(
      (barang) => barang.id === item.barangId,
    );

    if (!barangSebelum) {
      return;
    }

    const stokSebelum = barangSebelum.stok;

    const barangSesudah = updateStokBarang(item.barangId, item.qty);

    if (!barangSesudah) {
      return;
    }

    recordStockMovement({
      barangId: item.barangId,

      tipe: "Pembelian",

      qty: item.qty,

      stokSebelum,

      stokSesudah: barangSesudah.stok,

      referensi: id,

      keterangan: "Update pembelian",
    });
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
      const barangSebelum = getBarang().find(
        (barang) => barang.id === item.barangId,
      );

      if (!barangSebelum) {
        return;
      }

      const stokSebelum = barangSebelum.stok;

      const barangSesudah = kurangiStokBarang(item.barangId, item.qty);

      if (!barangSesudah) {
        return;
      }

      recordStockMovement({
        barangId: item.barangId,

        tipe: "Retur Pembelian",

        qty: -item.qty,

        stokSebelum,

        stokSesudah: barangSesudah.stok,

        referensi: id,

        keterangan: "Hapus pembelian",
      });
    });
  }

  const dataBaru = pembelian.filter((item) => item.id !== id);

  saveStorage(dataBaru);
};
