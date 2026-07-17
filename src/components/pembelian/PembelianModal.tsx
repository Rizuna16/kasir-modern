import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import BarangPembelianRow from "./BarangPembelianRow";
import { toastWarning } from "../../utils/toast";
import { getSupplier } from "../../services/supplierService";
import { getBarang } from "../../services/barangService";
import { addPembelian } from "../../services/pembelianService";
import type { Supplier } from "../../types/supplier";
import type { Barang } from "../../types/barang";
import type { DetailPembelian } from "../../types/pembelian";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  onSave: () => void;
}

export default function PembelianModal({
  isOpen,

  onClose,

  onSave,
}: Props) {
  const [supplier, setSupplier] = useState<Supplier[]>([]);

  const [barang, setBarang] = useState<Barang[]>([]);

  const [supplierId, setSupplierId] = useState("");

  const [barangId, setBarangId] = useState("");

  const [qty, setQty] = useState(1);

  const [hargaBeli, setHargaBeli] = useState(0);

  const [detail, setDetail] = useState<DetailPembelian[]>([]);

  useEffect(() => {
    if (isOpen) {
      loadMasterData();
    }
  }, [isOpen]);

  function loadMasterData() {
    setSupplier(getSupplier());

    setBarang(getBarang());
  }

  function tambahBarang() {
    const dataBarang = barang.find((item) => item.id === barangId);

    if (!dataBarang) {
      toastWarning("Silakan pilih barang terlebih dahulu.");

      return;
    }

    const subtotal = qty * hargaBeli;

    const newDetail: DetailPembelian = {
      id: crypto.randomUUID(),

      barangId: dataBarang.id,

      namaBarang: dataBarang.nama,

      qty,

      hargaBeli,

      subtotal,
    };

    setDetail([...detail, newDetail]);

    setBarangId("");

    setQty(1);

    setHargaBeli(0);
  }

  function handleChangeDetail(
    index: number,

    field: keyof DetailPembelian,

    value: string | number,
  ) {
    const data = [...detail];

    data[index] = {
      ...data[index],

      [field]: value,
    };

    if (field === "qty" || field === "hargaBeli") {
      data[index].subtotal =
        Number(data[index].qty) * Number(data[index].hargaBeli);
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
    const dataSupplier = supplier.find((item) => item.id === supplierId);

    if (!dataSupplier) {
      toastWarning("Silakan pilih supplier terlebih dahulu.");

      return;
    }

    if (detail.length === 0) {
      toastWarning("Tambahkan minimal satu barang terlebih dahulu.");

      return;
    }

    addPembelian({
      nomorFaktur: "PB-" + Date.now(),

      tanggal: new Date()

        .toISOString()

        .slice(0, 10),

      supplierId: dataSupplier.id,

      supplierNama: dataSupplier.nama,

      detail,

      total: hitungTotal(),

      status: "LUNAS",
    });

    setDetail([]);

    setSupplierId("");

    onSave();
  }

  return (
    <Modal isOpen={isOpen} title="Tambah Pembelian" onClose={onClose}>
      <div className="space-y-6">
        {/* Supplier */}

        <div>
          <label className="block mb-2 font-medium">Supplier</label>

          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className="
            border
            rounded-lg
            px-3
            py-2
            w-full
            "
          >
            <option value="">Pilih Supplier</option>

            {supplier.map((item) => (
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
              <label className="block mb-2">Harga Beli</label>

              <input
                type="number"
                min="0"
                value={hargaBeli}
                onChange={(e) => setHargaBeli(Number(e.target.value))}
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

        {/* Detail */}

        <div>
          <h3 className="font-semibold mb-3">Detail Pembelian</h3>

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
                <BarangPembelianRow
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
