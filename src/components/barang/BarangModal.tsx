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

  function loadMasterData() {
    setKategori(getKategori());

    setSatuan(getSatuan());

    setSupplier(getSupplier());
  }

  return (
    <Modal isOpen={isOpen} title={title} onClose={onClose} size="xl">
      <div className="space-y-6">
        <div>
          <p
            className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Lengkapi informasi barang di bawah ini. Pastikan seluruh data sudah
            benar sebelum disimpan.
          </p>
        </div>

        <BarangForm
          form={form}
          setForm={setForm}
          kategori={kategori}
          satuan={satuan}
          supplier={supplier}
        />

        <div
          className="
            border-t
            border-gray-200
            pt-5

            dark:border-gray-700
          "
        >
          <div
            className="
              flex
              flex-col-reverse
              gap-3

              sm:flex-row
              sm:justify-end
            "
          >
            <Button
              variant="secondary"
              fullWidth
              className="sm:w-auto"
              onClick={onClose}
            >
              Batal
            </Button>

            <Button
              variant="primary"
              fullWidth
              className="sm:w-auto"
              onClick={onSave}
            >
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
