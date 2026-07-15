import type { Satuan } from "../types/satuan";

let satuanData: Satuan[] = [
  { id: 1, nama: "PCS" },
  { id: 2, nama: "Pack" },
  { id: 3, nama: "Dus" },
  { id: 4, nama: "Karton" },
  { id: 5, nama: "Botol" },
  { id: 6, nama: "Kg" },
];

export const getSatuan = (): Satuan[] => {
  return [...satuanData];
};

export const addSatuan = (data: Omit<Satuan, "id">): Satuan => {
  const newSatuan: Satuan = {
    id: satuanData.length + 1,
    ...data,
  };

  satuanData.push(newSatuan);

  return newSatuan;
};

export const getSatuanById = (id: number): Satuan | undefined => {
  return satuanData.find((item) => item.id === id);
};

export const updateSatuan = (
  id: number,
  data: Omit<Satuan, "id">,
): Satuan | null => {
  const index = satuanData.findIndex((item) => item.id === id);

  if (index === -1) return null;

  satuanData[index] = {
    id,
    ...data,
  };

  return satuanData[index];
};

export const deleteSatuan = (id: number): void => {
  satuanData = satuanData.filter((item) => item.id !== id);
};
