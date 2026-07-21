import type { Dispatch, SetStateAction } from "react";

import { Input, Textarea } from "../ui";

import type { PelangganFormData } from "../../types/pelangganForm";

interface PelangganFormProps {
  form: PelangganFormData;

  setForm: Dispatch<SetStateAction<PelangganFormData>>;
}

export default function PelangganForm({ form, setForm }: PelangganFormProps) {
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
          Informasi Pelanggan
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
            label="Kode Pelanggan"
            placeholder="Contoh: PLG001"
            value={form.kode}
            onChange={(e) =>
              setForm({
                ...form,
                kode: e.target.value,
              })
            }
          />

          <Input
            label="Nama Pelanggan"
            placeholder="Masukkan nama pelanggan"
            value={form.nama}
            onChange={(e) =>
              setForm({
                ...form,
                nama: e.target.value,
              })
            }
          />

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
            placeholder="email@contoh.com"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <Input
            label="Kota"
            placeholder="Masukkan kota"
            value={form.kota}
            onChange={(e) =>
              setForm({
                ...form,
                kota: e.target.value,
              })
            }
          />

          <div
            className="
              md:col-span-2
            "
          >
            <Textarea
              label="Alamat"
              placeholder="Masukkan alamat pelanggan"
              rows={3}
              value={form.alamat}
              onChange={(e) =>
                setForm({
                  ...form,
                  alamat: e.target.value,
                })
              }
            />
          </div>

          <div
            className="
              md:col-span-2
            "
          >
            <Textarea
              label="Catatan"
              placeholder="Catatan tambahan (opsional)"
              rows={3}
              value={form.catatan}
              onChange={(e) =>
                setForm({
                  ...form,
                  catatan: e.target.value,
                })
              }
            />
          </div>

          <div
            className="
              md:col-span-2
            "
          >
            <label
              className="
                flex
                items-center
                gap-3

                text-sm

                text-gray-700
                dark:text-gray-200
              "
            >
              <input
                type="checkbox"
                checked={form.aktif}
                onChange={(e) =>
                  setForm({
                    ...form,
                    aktif: e.target.checked,
                  })
                }
                className="
                  h-4
                  w-4

                  rounded
                "
              />
              Pelanggan Aktif
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}
