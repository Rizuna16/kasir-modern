import type { Kategori } from "../types/kategori";

const STORAGE_KEY = "kategori";

// Data awal kategori

const defaultKategori: Kategori[] = [
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

// Ambil data kategori

const getStorage = (): Kategori[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(
      STORAGE_KEY,

      JSON.stringify(defaultKategori),
    );

    return defaultKategori;
  }

  return JSON.parse(data);
};

// Simpan data kategori

const saveStorage = (data: Kategori[]): void => {
  localStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(data),
  );
};

// Ambil semua kategori

export const getKategori = (): Kategori[] => {
  return getStorage();
};

// Tambah kategori

export const addKategori = (data: Omit<Kategori, "id">): Kategori => {
  const kategori = getStorage();

  const lastId =
    kategori.length > 0 ? Math.max(...kategori.map((item) => item.id)) : 0;

  const newKategori: Kategori = {
    id: lastId + 1,

    ...data,
  };

  kategori.push(newKategori);

  saveStorage(kategori);

  return newKategori;
};

// Hapus kategori

export const deleteKategori = (id: number): void => {
  const kategori = getStorage();

  const dataBaru = kategori.filter((item) => item.id !== id);

  saveStorage(dataBaru);
};

// Ambil kategori berdasarkan id

export const getKategoriById = (id: number): Kategori | undefined => {
  const kategori = getStorage();

  return kategori.find((item) => item.id === id);
};

// Update kategori

export const updateKategori = (
  id: number,

  data: Omit<Kategori, "id">,
): Kategori | null => {
  const kategori = getStorage();

  const index = kategori.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  kategori[index] = {
    id,

    ...data,
  };

  saveStorage(kategori);

  return kategori[index];
};
