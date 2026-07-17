import type { Dispatch, SetStateAction } from "react";

import { Input, Select } from "../ui";

import type { SupplierFormData } from "../../types/supplierForm";

interface SupplierFormProps {
  form: SupplierFormData;

  setForm: Dispatch<SetStateAction<SupplierFormData>>;
}

export default function SupplierForm({ form, setForm }: SupplierFormProps) {
  return (
    <div className="space-y-6">
      <section>
        <h3
          className="
            mb-4
            text-lg
            font-semibold

            text-gray-900
            dark:text-white
          "
        >
          Informasi Supplier
        </h3>

        <div
          className="
            grid
            grid-cols-1
            gap-5

            md:grid-cols-2
          "
        >
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
            <Select
              label="Status"
              value={form.status}
              onChange={(value) =>
                setForm({
                  ...form,
                  status: value as "Aktif" | "Nonaktif",
                })
              }
              options={[
                {
                  label: "Aktif",
                  value: "Aktif",
                },
                {
                  label: "Nonaktif",
                  value: "Nonaktif",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
