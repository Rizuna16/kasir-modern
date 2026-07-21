export interface Pelanggan {
  id: number;

  kode: string;

  nama: string;

  telepon: string;

  email: string;

  alamat: string;

  kota: string;

  aktif: boolean;

  catatan: string;

  createdAt?: string;

  updatedAt?: string;
}
