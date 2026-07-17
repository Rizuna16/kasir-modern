// src/components/penjualan/PenjualanModal.tsx

import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Card from "../ui/Card";

import PenjualanDetailTable from "./PenjualanDetailTable";

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

  const [pelangganId, setPelangganId] = useState("");

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
    const dataBarang = barang.find((item) => String(item.id) === barangId);

    if (!dataBarang) {
      toastWarning("Silakan pilih barang terlebih dahulu.");

      return;
    }

    const newDetail: DetailPenjualan = {
      id: crypto.randomUUID(),

      barangId: dataBarang.id,

      namaBarang: dataBarang.nama,

      qty,

      hargaJual,

      subtotal: qty * hargaJual,
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
    setDetail(detail.filter((_, i) => i !== index));
  }

  function hitungTotal() {
    return detail.reduce(
      (total, item) => total + item.subtotal,

      0,
    );
  }

  function handleSave() {
    const dataPelanggan = pelanggan.find(
      (item) => String(item.id) === pelangganId,
    );

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

  const pelangganOptions = pelanggan.map((item) => ({
    value: String(item.id),

    label: item.nama,
  }));

  const barangOptions = barang.map((item) => ({
    value: String(item.id),

    label: item.nama,
  }));

  return (
    <Modal isOpen={isOpen} title="Tambah Penjualan" onClose={onClose}>
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
            Informasi Pelanggan
          </h3>

          <Select
            label="Pelanggan"
            value={pelangganId}
            options={pelangganOptions}
            placeholder="Pilih Pelanggan"
            onChange={setPelangganId}
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
              label="Harga Jual"
              type="number"
              min="0"
              value={hargaJual}
              onChange={(e) => setHargaJual(Number(e.target.value))}
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
            Detail Penjualan
          </h3>

          <PenjualanDetailTable
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
                font-semibold
                text-gray-700
                dark:text-gray-300
              "
            >
              Total
            </span>

            <span
              className="
                text-2xl
                font-bold
                text-blue-600
              "
            >
              Rp {hitungTotal().toLocaleString()}
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
