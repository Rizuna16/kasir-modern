import { useEffect, useState } from "react";

import {
  getPengaturan,
  savePengaturan,
  type PengaturanToko,
} from "../services/pengaturanService";

export default function usePengaturan() {
  const [pengaturan, setPengaturan] = useState<PengaturanToko>({
    namaToko: "",
    alamat: "",
    telepon: "",
  });

  useEffect(() => {
    const data = getPengaturan();

    setPengaturan(data);
  }, []);

  const updatePengaturan = (data: PengaturanToko) => {
    const result = savePengaturan(data);

    setPengaturan(result);

    return result;
  };

  return {
    pengaturan,

    updatePengaturan,
  };
}
