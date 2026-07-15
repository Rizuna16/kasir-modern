import type { Kategori } from "../types/kategori";

let kategoriData: Kategori[] = [
  {
    id: 1,
    nama: "Minuman",
    deskripsi: "Kategori minuman",
  },
  {
    id: 2,
    nama: "Makanan",
    deskripsi: "Kategori makanan",
  },
];

export const getKategori = (): Kategori[] => {
  return [...kategoriData];
};

export const addKategori = (data: Omit<Kategori, "id">): Kategori => {
  const newKategori: Kategori = {
    id: kategoriData.length + 1,
    ...data,
  };

  kategoriData.push(newKategori);

  return newKategori;
};

export const deleteKategori = (id: number): void => {
  kategoriData = kategoriData.filter((item) => item.id !== id);
};
export const getKategoriById = (id: number): Kategori | undefined => {
  return kategoriData.find((item) => item.id === id);
};
export const updateKategori = (
  id: number,
  data: Omit<Kategori, "id">,
): Kategori | null => {
  const index = kategoriData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  kategoriData[index] = {
    id,
    ...data,
  };

  return kategoriData[index];
};
