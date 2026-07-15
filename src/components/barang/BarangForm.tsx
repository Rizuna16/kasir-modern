import Input from "../ui/Input";

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
      {/* INFORMASI BARANG */}

      <section>
        <h3 className="text-lg font-semibold mb-3">Informasi Barang</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Kode Barang"
            placeholder="Contoh: BRG001"
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
            placeholder="Scan barcode"
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
              value={form.nama ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  nama: e.target.value,
                })
              }
            />
          </div>

          {/* KATEGORI */}

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium">Kategori</label>

            <select
              className="
              w-full rounded-lg
              border border-gray-300
              px-3 py-2
              "
              value={form.kategoriId ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  kategoriId: e.target.value,
                })
              }
            >
              <option value="">Pilih Kategori</option>

              {kategori.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>

          {/* SATUAN */}

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium">Satuan</label>

            <select
              className="
              w-full rounded-lg
              border border-gray-300
              px-3 py-2
              "
              value={form.satuanId ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  satuanId: e.target.value,
                })
              }
            >
              <option value="">Pilih Satuan</option>

              {satuan.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>

          {/* SUPPLIER BARU */}

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium">Supplier</label>

            <select
              className="
              w-full rounded-lg
              border border-gray-300
              px-3 py-2
              "
              value={form.supplierId ?? ""}
              onChange={(e) =>
                setForm({
                  ...form,

                  supplierId: e.target.value,
                })
              }
            >
              <option value="">Pilih Supplier</option>

              {supplier.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.nama}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* HARGA */}

      <section>
        <h3 className="text-lg font-semibold mb-3">Harga Barang</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

      {/* STOK */}

      <section>
        <h3 className="text-lg font-semibold mb-3">Persediaan</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
