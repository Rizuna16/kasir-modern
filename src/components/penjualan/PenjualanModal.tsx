import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import PenjualanRow from "./PenjualanRow";
import { toastWarning } from "../../utils/toast";
import { getPelanggan } from "../../services/pelangganService";
import { getBarang } from "../../services/barangService";
import { addPenjualan } from "../../services/penjualanService";

import type { Pelanggan } from "../../types/pelanggan";
import type { Barang } from "../../types/barang";
import type { DetailPenjualan } from "../../types/penjualan";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  onSave: () => void;
}

export default function PenjualanModal({
  isOpen,

  onClose,

  onSave,
}: Props) {
  const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);

  const [barang, setBarang] = useState<Barang[]>([]);

  const [pelangganId, setPelangganId] = useState<number | "">("");

  const [barangId, setBarangId] = useState("");

  const [qty, setQty] = useState(1);

  const [hargaJual, setHargaJual] = useState(0);

  const [detail, setDetail] = useState<DetailPenjualan[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadMasterData();
    }
  }, [isOpen]);

  function loadMasterData() {
    setPelanggan(getPelanggan());

    setBarang(getBarang());
  }

  function tambahBarang() {
    const dataBarang = barang.find((item) => item.id === barangId);

    if (!dataBarang) {
      toastWarning("Silakan pilih barang terlebih dahulu.");

      return;
    }

    const subtotal = qty * hargaJual;

    const newDetail: DetailPenjualan = {
      id: crypto.randomUUID(),

      barangId: dataBarang.id,

      namaBarang: dataBarang.nama,

      qty,

      hargaJual,

      subtotal,
    };

    setDetail([...detail, newDetail]);

    setBarangId("");

    setQty(1);

    setHargaJual(0);
  }

  function handleChangeDetail(
    index: number,

    field: keyof DetailPenjualan,

    value: string | number,
  ) {
    const data = [...detail];

    data[index] = {
      ...data[index],

      [field]: value,
    };

    if (field === "qty" || field === "hargaJual") {
      data[index].subtotal =
        Number(data[index].qty) * Number(data[index].hargaJual);
    }

    setDetail(data);
  }

  function handleDeleteDetail(index: number) {
    const data = detail.filter((_, i) => i !== index);

    setDetail(data);
  }

  function hitungTotal() {
    return detail.reduce(
      (total, item) => total + item.subtotal,

      0,
    );
  }

  function handleSave() {
    const dataPelanggan = pelanggan.find((item) => item.id === pelangganId);

    if (!dataPelanggan) {
      toastWarning("Silakan pilih pelanggan terlebih dahulu.");

      return;
    }

    if (detail.length === 0) {
      toastWarning("Tambahkan minimal satu barang terlebih dahulu.");

      return;
    }

    addPenjualan({
      nomorNota: "PJ-" + Date.now(),

      tanggal: new Date().toISOString().slice(0, 10),

      pelangganId: dataPelanggan.id,

      pelangganNama: dataPelanggan.nama,

      detail,

      total: hitungTotal(),

      status: "LUNAS",
    });

    setDetail([]);

    setPelangganId("");

    onSave();
  }

  return (
    <Modal isOpen={isOpen} title="Tambah Penjualan" onClose={onClose}>
      <div className="space-y-6">
        {/* Pelanggan */}

        <div>
          <label className="block mb-2 font-medium">Pelanggan</label>

          <select
            value={pelangganId}
            onChange={(e) =>
              setPelangganId(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            className="
            border
            rounded-lg
            px-3
            py-2
            w-full
            "
          >
            <option value="">Pilih Pelanggan</option>

            {pelanggan.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Tambah Barang */}

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Tambah Barang</h3>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-2">Barang</label>

              <select
                value={barangId}
                onChange={(e) => setBarangId(e.target.value)}
                className="
                border
                rounded-lg
                px-3
                py-2
                w-full
                "
              >
                <option value="">Pilih Barang</option>

                {barang.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Qty</label>

              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="
                border
                rounded-lg
                px-3
                py-2
                w-full
                "
              />
            </div>

            <div>
              <label className="block mb-2">Harga Jual</label>

              <input
                type="number"
                min="0"
                value={hargaJual}
                onChange={(e) => setHargaJual(Number(e.target.value))}
                className="
                border
                rounded-lg
                px-3
                py-2
                w-full
                "
              />
            </div>
          </div>

          <div className="mt-4">
            <Button type="button" variant="success" onClick={tambahBarang}>
              Tambah Barang
            </Button>
          </div>
        </div>

        {/* Detail Penjualan */}

        <div>
          <h3 className="font-semibold mb-3">Detail Penjualan</h3>

          <table className="w-full border">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-3">Barang</th>

                <th>Qty</th>

                <th>Harga</th>

                <th>Subtotal</th>

                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {detail.map((item, index) => (
                <PenjualanRow
                  key={index}
                  item={item}
                  index={index}
                  onChange={handleChangeDetail}
                  onDelete={handleDeleteDetail}
                />
              ))}

              {detail.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="
                    text-center
                    py-5
                    text-gray-500
                    "
                  >
                    Belum ada barang
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total */}

        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Total</h2>

          <h2 className="text-xl font-bold">
            Rp {hitungTotal().toLocaleString()}
          </h2>
        </div>

        {/* Button */}

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onClose}>
            Batal
          </Button>

          <Button type="button" variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
