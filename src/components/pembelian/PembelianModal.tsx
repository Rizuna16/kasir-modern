// src/components/pembelian/PembelianModal.tsx

import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Card from "../ui/Card";

import PembelianDetailTable from "./PembelianDetailTable";

import { toastWarning } from "../../utils/toast";
import { formatRupiah } from "../../utils/currency";

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

  function resetForm() {
    setSupplierId("");

    setBarangId("");

    setQty(1);

    setHargaBeli(0);

    setDetail([]);
  }

  function tambahBarang() {
    const dataBarang = barang.find((item) => String(item.id) === barangId);

    if (!dataBarang) {
      toastWarning("Silakan pilih barang terlebih dahulu.");

      return;
    }

    if (qty <= 0) {
      toastWarning("Qty harus lebih dari 0.");

      return;
    }

    if (hargaBeli <= 0) {
      toastWarning("Harga beli harus lebih dari 0.");

      return;
    }

    const newDetail: DetailPembelian = {
      id: crypto.randomUUID(),

      barangId: dataBarang.id,

      namaBarang: dataBarang.nama,

      qty,

      hargaBeli,

      subtotal: qty * hargaBeli,
    };

    setDetail((prev) => [...prev, newDetail]);

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
    setDetail(detail.filter((_, i) => i !== index));
  }

  function hitungTotal() {
    return detail.reduce(
      (total, item) => total + item.subtotal,

      0,
    );
  }

  function handleSave() {
    const dataSupplier = supplier.find(
      (item) => String(item.id) === supplierId,
    );

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

      tanggal: new Date().toISOString().slice(0, 10),

      supplierId: dataSupplier.id,

      supplierNama: dataSupplier.nama,

      detail,

      total: hitungTotal(),

      status: "LUNAS",
    });

    resetForm();

    onSave();
  }

  const supplierOptions = supplier.map((item) => ({
    value: String(item.id),

    label: item.nama,
  }));

  const barangOptions = barang.map((item) => ({
    value: String(item.id),

    label: item.nama,
  }));

  return (
    <Modal isOpen={isOpen} title="Tambah Pembelian" onClose={onClose}>
      <div className="space-y-5">
        <Card>
          <h3
            className="
              mb-4
              text-lg
              font-semibold
              text-gray-800
              dark:text-white
            "
          >
            Informasi Supplier
          </h3>

          <Select
            label="Supplier"
            value={supplierId}
            options={supplierOptions}
            placeholder="Pilih Supplier"
            onChange={setSupplierId}
          />
        </Card>

        <Card>
          <h3
            className="
              mb-4
              text-lg
              font-semibold
              text-gray-800
              dark:text-white
            "
          >
            Tambah Barang
          </h3>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
            "
          >
            <Select
              label="Barang"
              value={barangId}
              options={barangOptions}
              placeholder="Pilih Barang"
              onChange={setBarangId}
            />

            <Input
              label="Qty"
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />

            <Input
              label="Harga Beli"
              type="number"
              min="0"
              value={hargaBeli}
              onChange={(e) => setHargaBeli(Number(e.target.value))}
            />
          </div>

          <div className="mt-5">
            <Button variant="success" onClick={tambahBarang}>
              Tambah Barang
            </Button>
          </div>
        </Card>

        <Card>
          <h3
            className="
              mb-4
              text-lg
              font-semibold
              text-gray-800
              dark:text-white
            "
          >
            Detail Pembelian
          </h3>

          <PembelianDetailTable
            data={detail}
            onChange={handleChangeDetail}
            onDelete={handleDeleteDetail}
          />
        </Card>

        <Card>
          <div
            className="
              flex
              justify-between
              items-center
            "
          >
            <span
              className="
                text-lg
                font-semibold
                text-gray-700
                dark:text-gray-300
              "
            >
              Total Pembelian
            </span>

            <span
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              {formatRupiah(hitungTotal())}
            </span>
          </div>
        </Card>

        <div
          className="
            flex
            justify-end
            gap-3
          "
        >
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>

          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
