export interface PengaturanToko {
  namaToko: string;

  alamat: string;

  telepon: string;
}

const STORAGE_KEY = "pengaturan_toko";

const DEFAULT_DATA: PengaturanToko = {
  namaToko: "Kasir Modern",

  alamat: "Jl. Contoh No.123",

  telepon: "0812-3456-7890",
};

// Ambil data pengaturan

export const getPengaturan = (): PengaturanToko => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));

    return DEFAULT_DATA;
  }

  return JSON.parse(data);
};

// Simpan pengaturan

export const savePengaturan = (data: PengaturanToko): PengaturanToko => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

  return data;
};
