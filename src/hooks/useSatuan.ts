import { useEffect, useState } from "react";

import { getSatuan } from "../services/satuanService";

import type { Satuan } from "../types/satuan";

export default function useSatuan() {
  const [satuan, setSatuan] = useState<Satuan[]>([]);

  useEffect(() => {
    const data = getSatuan();

    setSatuan(data);
  }, []);

  const getNamaSatuan = (id: string) => {
    const item = satuan.find((s) => String(s.id) === String(id));

    return item ? item.nama : "-";
  };

  return {
    satuan,

    getNamaSatuan,
  };
}
