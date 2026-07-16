import type { DetailPenjualan } from "../../types/penjualan";

interface Props {
  item: DetailPenjualan;

  index: number;

  onChange: (
    index: number,
    field: keyof DetailPenjualan,
    value: string | number,
  ) => void;

  onDelete: (index: number) => void;
}

export default function PenjualanRow({
  item,

  index,

  onChange,

  onDelete,
}: Props) {
  return (
    <tr className="border-b">
      <td className="p-3">{item.namaBarang}</td>

      <td className="p-3">
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => onChange(index, "qty", Number(e.target.value))}
          className="
          border
          rounded
          px-2
          py-1
          w-20
          "
        />
      </td>

      <td className="p-3">
        <input
          type="number"
          min="0"
          value={item.hargaJual}
          onChange={(e) => onChange(index, "hargaJual", Number(e.target.value))}
          className="
          border
          rounded
          px-2
          py-1
          w-28
          "
        />
      </td>

      <td className="p-3">Rp {item.subtotal.toLocaleString()}</td>

      <td className="p-3">
        <button
          onClick={() => onDelete(index)}
          className="
          bg-red-500
          text-white
          px-3
          py-1
          rounded
          "
        >
          Hapus
        </button>
      </td>
    </tr>
  );
}
