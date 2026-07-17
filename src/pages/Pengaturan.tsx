import { useState } from "react";

import { toast } from "sonner";

import { Button, Card, Input, Textarea } from "../components/ui";

import usePengaturan from "../hooks/usePengaturan";

export default function Pengaturan() {
  const { pengaturan, updatePengaturan } = usePengaturan();

  const [namaToko, setNamaToko] = useState(pengaturan.namaToko);

  const [alamat, setAlamat] = useState(pengaturan.alamat);

  const [telepon, setTelepon] = useState(pengaturan.telepon);

  const handleSave = () => {
    updatePengaturan({
      namaToko,

      alamat,

      telepon,
    });

    toast.success("Pengaturan berhasil disimpan");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          Pengaturan
        </h1>

        <p
          className="
            text-gray-500
            dark:text-gray-400
          "
        >
          Kelola informasi aplikasi dan data toko
        </p>
      </div>

      {/* CONTENT */}

      <Card>
        <div className="space-y-5">
          <Input
            label="Nama Toko"
            value={namaToko}
            onChange={(e) => setNamaToko(e.target.value)}
          />

          <Input
            label="Nomor Telepon"
            value={telepon}
            onChange={(e) => setTelepon(e.target.value)}
          />

          <Textarea
            label="Alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
          />

          <div className="flex justify-end">
            <Button variant="primary" onClick={handleSave}>
              Simpan
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
