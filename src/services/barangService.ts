import type { Barang } from "../types/barang";

let barangData: Barang[] = [];

// Ambil semua barang
export const getBarang = (): Barang[] => {
  return [...barangData];
};

// Ambil barang berdasarkan id
export const getBarangById = (id: string): Barang | undefined => {
  return barangData.find((item) => item.id === id);
};

// Tambah barang baru
export const addBarang = (
  data: Omit<Barang, "id" | "createdAt" | "updatedAt">,
): Barang => {
  const newBarang: Barang = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  barangData.push(newBarang);

  console.log("=== Barang Baru Ditambahkan ===");
  console.log(newBarang);
  console.log("Isi barangData:", barangData);

  return newBarang;
};

// Update data barang
export const updateBarang = (
  id: string,
  data: Omit<Barang, "id" | "createdAt" | "updatedAt">,
): Barang | null => {
  const index = barangData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  barangData[index] = {
    ...barangData[index],
    ...data,
    id,
    createdAt: barangData[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  return barangData[index];
};

// Update stok barang
export const updateStokBarang = (id: string, jumlah: number): Barang | null => {
  console.log("========== UPDATE STOK ==========");
  console.log("ID dicari:", id);
  console.log("Jumlah tambah:", jumlah);
  console.log("Isi barangData sebelum update:", barangData);

  const index = barangData.findIndex((item) => item.id === id);

  console.log("Index ditemukan:", index);

  if (index === -1) {
    console.warn("Barang tidak ditemukan!");
    return null;
  }

  barangData[index] = {
    ...barangData[index],
    stok: barangData[index].stok + jumlah,
    updatedAt: new Date().toISOString(),
  };

  console.log("Barang setelah update:", barangData[index]);
  console.log("Isi barangData sesudah update:", barangData);

  return barangData[index];
};

// Hapus barang
export const deleteBarang = (id: string): void => {
  barangData = barangData.filter((item) => item.id !== id);
};
