import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import BarangForm from "./BarangForm";

import { getSatuan } from "../../services/satuanService";
import { getKategori } from "../../services/kategoriService";
import { getSupplier } from "../../services/supplierService";

import type { Satuan } from "../../types/satuan";
import type { Kategori } from "../../types/kategori";
import type { Supplier } from "../../types/supplier";
import type { BarangFormData } from "../../types/barangForm";

interface BarangModalProps {
  isOpen: boolean;

  title: string;

  onClose: () => void;

  onSave: () => void;

  form: BarangFormData;

  setForm: Dispatch<SetStateAction<BarangFormData>>;
}

export default function BarangModal({
  isOpen,

  title,

  onClose,

  onSave,

  form,

  setForm,
}: BarangModalProps) {
  const [kategori, setKategori] = useState<Kategori[]>([]);

  const [satuan, setSatuan] = useState<Satuan[]>([]);

  const [supplier, setSupplier] = useState<Supplier[]>([]);

  useEffect(() => {
    loadMasterData();
  }, []);

  const loadMasterData = () => {
    const dataKategori = getKategori();

    const dataSatuan = getSatuan();

    const dataSupplier = getSupplier();

    setKategori(dataKategori);

    setSatuan(dataSatuan);

    setSupplier(dataSupplier);
  };

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose}>
      <div className="space-y-6">
        <BarangForm
          form={form}
          setForm={setForm}
          kategori={kategori}
          satuan={satuan}
          supplier={supplier}
        />

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>

          <Button variant="primary" onClick={onSave}>
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
}
