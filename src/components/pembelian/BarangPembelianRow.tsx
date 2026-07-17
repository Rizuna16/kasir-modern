import type { DetailPembelian } from "../../types/pembelian";

import { Button, Input } from "../ui";

interface Props {
  item: DetailPembelian;

  index: number;

  onChange: (
    index: number,
    field: keyof DetailPembelian,
    value: string | number,
  ) => void;

  onDelete: (index: number) => void;
}

export default function BarangPembelianRow({
  item,

  index,

  onChange,

  onDelete,
}: Props) {
  return (
    <tr
      className="
        border-b
        dark:border-gray-700
      "
    >
      <td className="p-3">{item.namaBarang}</td>

      <td className="p-3">
        <Input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => onChange(index, "qty", Number(e.target.value))}
          className="w-20"
        />
      </td>

      <td className="p-3">
        <Input
          type="number"
          min="0"
          value={item.hargaBeli}
          onChange={(e) => onChange(index, "hargaBeli", Number(e.target.value))}
          className="w-28"
        />
      </td>

      <td className="p-3">Rp {item.subtotal.toLocaleString()}</td>

      <td className="p-3">
        <Button variant="danger" onClick={() => onDelete(index)}>
          Hapus
        </Button>
      </td>
    </tr>
  );
}
