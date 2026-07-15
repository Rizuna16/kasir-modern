import type { Pelanggan } from "../types/pelanggan";

let pelangganData: Pelanggan[] = [
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

export const getPelanggan = (): Pelanggan[] => {
  return [...pelangganData];
};

export const addPelanggan = (data: Omit<Pelanggan, "id">): Pelanggan => {
  const newPelanggan: Pelanggan = {
    id: pelangganData.length + 1,
    ...data,
  };

  pelangganData.push(newPelanggan);

  return newPelanggan;
};

export const deletePelanggan = (id: number): void => {
  pelangganData = pelangganData.filter((item) => item.id !== id);
};

export const getPelangganById = (id: number): Pelanggan | undefined => {
  return pelangganData.find((item) => item.id === id);
};

export const updatePelanggan = (
  id: number,
  data: Omit<Pelanggan, "id">,
): Pelanggan | null => {
  const index = pelangganData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  pelangganData[index] = {
    id,
    ...data,
  };

  return pelangganData[index];
};
