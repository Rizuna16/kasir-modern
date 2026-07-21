import type { Kategori } from "../../types/kategori";

let kategoriData: Kategori[] = [
  {
    id: 1,
    nama: "Makanan",
    deskripsi: "Produk makanan ringan dan berat",
  },
  {
    id: 2,
    nama: "Minuman",
    deskripsi: "Produk minuman dingin dan panas",
  },
  {
    id: 3,
    nama: "Sembako",
    deskripsi: "Kebutuhan pokok rumah tangga",
  },
];

// GET SEMUA KATEGORI
export function getKategori(): Kategori[] {
  return kategoriData;
}

// GET KATEGORI BY ID
export function getKategoriById(id: number): Kategori | undefined {
  return kategoriData.find((item) => item.id === id);
}

// TAMBAH KATEGORI
export function addKategori(kategori: Omit<Kategori, "id">): Kategori {
  const newKategori: Kategori = {
    id: Date.now(),
    ...kategori,
  };

  kategoriData.push(newKategori);

  return newKategori;
}

// UPDATE KATEGORI
export function updateKategori(
  id: number,
  data: Omit<Kategori, "id">,
): Kategori | undefined {
  const index = kategoriData.findIndex((item) => item.id === id);

  if (index === -1) {
    return undefined;
  }

  kategoriData[index] = {
    id,
    ...data,
  };

  return kategoriData[index];
}

// DELETE KATEGORI
export function deleteKategori(id: number): void {
  kategoriData = kategoriData.filter((item) => item.id !== id);
}
