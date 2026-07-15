export interface Supplier {
  id: string;

  kode: string;

  nama: string;

  alamat: string;

  telepon: string;

  email: string;

  status: "Aktif" | "Nonaktif";

  createdAt: string;

  updatedAt: string;
}
