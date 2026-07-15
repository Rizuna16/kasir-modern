import type { Pembelian } from "../types/pembelian";

let dataPembelian: Pembelian[] = [
  {
    id: 1,
    nomor_faktur: "PB-001",
    tanggal: "2026-07-16",
    supplier: "PT Sumber Makmur",
    total: 750000,
    status: "LUNAS",
  },

  {
    id: 2,
    nomor_faktur: "PB-002",
    tanggal: "2026-07-17",
    supplier: "CV Maju Jaya",
    total: 1250000,
    status: "BELUM LUNAS",
  },
];

export function getPembelian() {
  return Promise.resolve(dataPembelian);
}

export function addPembelian(pembelian: Pembelian) {
  dataPembelian.push(pembelian);

  return Promise.resolve(pembelian);
}

export function deletePembelian(id: number) {
  dataPembelian = dataPembelian.filter((item) => item.id !== id);

  return Promise.resolve(true);
}
