import Input from "../ui/Input";
import Select from "../ui/Select";

import type { BarangFormData } from "../../types/barangForm";
import type { Satuan } from "../../types/satuan";
import type { Kategori } from "../../types/kategori";
import type { Supplier } from "../../types/supplier";

interface BarangFormProps {
  form: BarangFormData;

  setForm: React.Dispatch<React.SetStateAction<BarangFormData>>;

  kategori: Kategori[];

  satuan: Satuan[];

  supplier: Supplier[];
}

export default function BarangForm({
  form,
  setForm,
  kategori,
  satuan,
  supplier,
}: BarangFormProps) {
  return (
    <div className="space-y-6">
      {/* ==================== INFORMASI ==================== */}

      <section
        className="
          rounded-xl
          border
          border-gray-200
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          p-6
          shadow-sm
        "
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Informasi Barang
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Lengkapi identitas barang yang akan disimpan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Kode Barang"
            placeholder="Contoh: BRG001"
            helperText="Kode unik barang."
            value={form.kode ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                kode: e.target.value,
              })
            }
          />

          <Input
            label="Barcode"
            placeholder="Scan / Masukkan Barcode"
            value={form.barcode ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                barcode: e.target.value,
              })
            }
          />

          <div className="md:col-span-2">
            <Input
              label="Nama Barang"
              placeholder="Masukkan nama barang"
              value={form.nama ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama: e.target.value,
                })
              }
            />
          </div>

          <Select
            label="Kategori"
            value={form.kategoriId ?? ""}
            placeholder="Pilih Kategori"
            options={kategori.map((item) => ({
              value: String(item.id),
              label: item.nama,
            }))}
            onChange={(value) =>
              setForm({
                ...form,
                kategoriId: value,
              })
            }
          />

          <Select
            label="Satuan"
            value={form.satuanId ?? ""}
            placeholder="Pilih Satuan"
            options={satuan.map((item) => ({
              value: String(item.id),
              label: item.nama,
            }))}
            onChange={(value) =>
              setForm({
                ...form,
                satuanId: value,
              })
            }
          />

          <div className="md:col-span-2">
            <Select
              label="Supplier"
              value={form.supplierId ?? ""}
              placeholder="Pilih Supplier"
              options={supplier.map((item) => ({
                value: String(item.id),
                label: item.nama,
              }))}
              onChange={(value) =>
                setForm({
                  ...form,
                  supplierId: value,
                })
              }
            />
          </div>
        </div>
      </section>

      {/* ==================== HARGA ==================== */}

      <section
        className="
          rounded-xl
          border
          border-gray-200
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          p-6
          shadow-sm
        "
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Harga Barang
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tentukan harga pembelian dan penjualan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Harga Beli"
            type="number"
            value={form.hargaBeli ?? 0}
            onChange={(e) =>
              setForm({
                ...form,
                hargaBeli: Number(e.target.value),
              })
            }
          />

          <Input
            label="Harga Grosir"
            type="number"
            value={form.hargaGrosir ?? 0}
            onChange={(e) =>
              setForm({
                ...form,
                hargaGrosir: Number(e.target.value),
              })
            }
          />

          <Input
            label="Harga Semi Grosir"
            type="number"
            value={form.hargaSemiGrosir ?? 0}
            onChange={(e) =>
              setForm({
                ...form,
                hargaSemiGrosir: Number(e.target.value),
              })
            }
          />

          <Input
            label="Harga Ecer"
            type="number"
            value={form.hargaEcer ?? 0}
            onChange={(e) =>
              setForm({
                ...form,
                hargaEcer: Number(e.target.value),
              })
            }
          />
        </div>
      </section>

      {/* ==================== STOK ==================== */}

      <section
        className="
          rounded-xl
          border
          border-gray-200
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          p-6
          shadow-sm
        "
      >
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Persediaan
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Barang akan dianggap stok menipis jika stok lebih kecil atau sama
            dengan minimal stok.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="Stok"
            type="number"
            value={form.stok ?? 0}
            onChange={(e) =>
              setForm({
                ...form,
                stok: Number(e.target.value),
              })
            }
          />

          <Input
            label="Minimal Stok"
            helperText="Digunakan untuk peringatan stok menipis."
            type="number"
            value={form.minimalStok ?? 0}
            onChange={(e) =>
              setForm({
                ...form,
                minimalStok: Number(e.target.value),
              })
            }
          />
        </div>
      </section>
    </div>
  );
}
