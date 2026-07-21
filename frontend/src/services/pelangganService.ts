import type { Pelanggan } from "../types/pelanggan";

const STORAGE_KEY = "pelanggan";

// Data awal pelanggan

const defaultPelanggan: Pelanggan[] = [
  {
    id: 1,

    kode: "PLG001",

    nama: "Budi Santoso",

    telepon: "081234567890",

    email: "budi@email.com",

    alamat: "Jl. Merdeka No. 10",

    kota: "Sukabumi",

    aktif: true,

    catatan: "",
  },

  {
    id: 2,

    kode: "PLG002",

    nama: "CV Maju Jaya",

    telepon: "082233445566",

    email: "majujaya@email.com",

    alamat: "Jl. Ahmad Yani No. 25",

    kota: "Bandung",

    aktif: true,

    catatan: "Pelanggan Grosir",
  },
];

// Ambil data localStorage

const getStorage = (): Pelanggan[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(
      STORAGE_KEY,

      JSON.stringify(defaultPelanggan),
    );

    return defaultPelanggan;
  }

  return JSON.parse(data);
};

// Simpan data

const saveStorage = (data: Pelanggan[]): void => {
  localStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(data),
  );
};

// Ambil semua pelanggan

export const getPelanggan = (): Pelanggan[] => {
  return getStorage();
};

// Tambah pelanggan

export const addPelanggan = (data: Omit<Pelanggan, "id">): Pelanggan => {
  const pelanggan = getStorage();

  const lastId =
    pelanggan.length > 0 ? Math.max(...pelanggan.map((item) => item.id)) : 0;

  const newPelanggan: Pelanggan = {
    id: lastId + 1,

    ...data,
  };

  pelanggan.push(newPelanggan);

  saveStorage(pelanggan);

  return newPelanggan;
};

// Hapus pelanggan

export const deletePelanggan = (id: number): void => {
  const pelanggan = getStorage();

  const dataBaru = pelanggan.filter((item) => item.id !== id);

  saveStorage(dataBaru);
};

// Ambil berdasarkan id

export const getPelangganById = (id: number): Pelanggan | undefined => {
  const pelanggan = getStorage();

  return pelanggan.find((item) => item.id === id);
};

// Update pelanggan

export const updatePelanggan = (
  id: number,

  data: Omit<Pelanggan, "id">,
): Pelanggan | null => {
  const pelanggan = getStorage();

  const index = pelanggan.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  pelanggan[index] = {
    id,

    ...data,
  };

  saveStorage(pelanggan);

  return pelanggan[index];
};
