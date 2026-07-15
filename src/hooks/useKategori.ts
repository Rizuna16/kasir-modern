import { useEffect, useState } from "react";

import { getKategori } from "../services/kategoriService";

import type { Kategori } from "../types/kategori";

export default function useKategori() {
  const [kategori, setKategori] = useState<Kategori[]>([]);

  useEffect(() => {
    const data = getKategori();

    setKategori(data);
  }, []);

  const getNamaKategori = (id: string) => {
    const item = kategori.find((k) => String(k.id) === String(id));

    return item ? item.nama : "-";
  };

  return {
    kategori,

    getNamaKategori,
  };
}
