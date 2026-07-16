import type { Dispatch, SetStateAction } from "react";

import Input from "../ui/Input";

import type { SupplierFormData } from "../../types/supplierForm";

interface SupplierFormProps {
  form: SupplierFormData;

  setForm: Dispatch<SetStateAction<SupplierFormData>>;
}

export default function SupplierForm({ form, setForm }: SupplierFormProps) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-semibold mb-3">Informasi Supplier</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Kode Supplier"
            placeholder="Contoh : SUP001"
            value={form.kode}
            onChange={(e) =>
              setForm({
                ...form,
                kode: e.target.value,
              })
            }
          />

          <Input
            label="Nama Supplier"
            placeholder="Masukkan nama supplier"
            value={form.nama}
            onChange={(e) =>
              setForm({
                ...form,
                nama: e.target.value,
              })
            }
          />

          <div className="md:col-span-2">
            <Input
              label="Alamat"
              placeholder="Masukkan alamat supplier"
              value={form.alamat}
              onChange={(e) =>
                setForm({
                  ...form,
                  alamat: e.target.value,
                })
              }
            />
          </div>

          <Input
            label="Telepon"
            placeholder="08xxxxxxxxxx"
            value={form.telepon}
            onChange={(e) =>
              setForm({
                ...form,
                telepon: e.target.value,
              })
            }
          />

          <Input
            label="Email"
            placeholder="supplier@email.com"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-medium">Status</label>

            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as "Aktif" | "Nonaktif",
                })
              }
            >
              <option value="Aktif">Aktif</option>

              <option value="Nonaktif">Nonaktif</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
