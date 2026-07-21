import type { Satuan } from "../types/satuan";

const STORAGE_KEY = "satuan";

// Data awal satuan

const defaultSatuan: Satuan[] = [
  {
    id: 1,
    nama: "PCS",
  },
  {
    id: 2,
    nama: "Pack",
  },
  {
    id: 3,
    nama: "Dus",
  },
  {
    id: 4,
    nama: "Karton",
  },
  {
    id: 5,
    nama: "Botol",
  },
  {
    id: 6,
    nama: "Kg",
  },
];

// Ambil data dari localStorage

const getStorage = (): Satuan[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(
      STORAGE_KEY,

      JSON.stringify(defaultSatuan),
    );

    return defaultSatuan;
  }

  return JSON.parse(data);
};

// Simpan data

const saveStorage = (data: Satuan[]): void => {
  localStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(data),
  );
};

// Ambil semua satuan

export const getSatuan = (): Satuan[] => {
  return getStorage();
};

// Tambah satuan

export const addSatuan = (data: Omit<Satuan, "id">): Satuan => {
  const satuan = getStorage();

  const lastId =
    satuan.length > 0 ? Math.max(...satuan.map((item) => item.id)) : 0;

  const newSatuan: Satuan = {
    id: lastId + 1,

    ...data,
  };

  satuan.push(newSatuan);

  saveStorage(satuan);

  return newSatuan;
};

// Ambil satuan berdasarkan id

export const getSatuanById = (id: number): Satuan | undefined => {
  const satuan = getStorage();

  return satuan.find((item) => item.id === id);
};

// Update satuan

export const updateSatuan = (
  id: number,

  data: Omit<Satuan, "id">,
): Satuan | null => {
  const satuan = getStorage();

  const index = satuan.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  satuan[index] = {
    id,

    ...data,
  };

  saveStorage(satuan);

  return satuan[index];
};

// Hapus satuan

export const deleteSatuan = (id: number): void => {
  const satuan = getStorage();

  const dataBaru = satuan.filter((item) => item.id !== id);

  saveStorage(dataBaru);
};
