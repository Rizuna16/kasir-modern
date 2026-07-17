import { useState } from "react";

import UserModal from "./UserModal";

import { Button, Input, Select } from "../ui";

import type { User, UserRole } from "../../types/user";

interface Props {
  isOpen: boolean;

  onClose: () => void;

  onSave: (data: Omit<User, "id">) => void;
}

const initialForm: Omit<User, "id"> = {
  nama: "",

  username: "",

  email: "",

  password: "",

  role: "Kasir",

  aktif: true,
};

export default function UserTambahModal({
  isOpen,

  onClose,

  onSave,
}: Props) {
  const [form, setForm] = useState(initialForm);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm({
      ...form,

      [name]: value,
    });
  }

  function handleRoleChange(value: string) {
    setForm({
      ...form,

      role: value as UserRole,
    });
  }

  function handleAktif(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,

      aktif: e.target.checked,
    });
  }

  function handleSubmit() {
    onSave(form);

    setForm(initialForm);

    onClose();
  }

  return (
    <UserModal isOpen={isOpen} title="Tambah User" onClose={onClose}>
      <div className="space-y-4">
        <Input
          label="Nama Lengkap"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Masukkan nama lengkap"
        />

        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Masukkan username"
        />

        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Masukkan email"
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Masukkan password"
        />

        <Select
          label="Role"
          value={form.role}
          options={[
            {
              value: "Admin",
              label: "Admin",
            },
            {
              value: "Kasir",
              label: "Kasir",
            },
            {
              value: "Owner",
              label: "Owner",
            },
          ]}
          onChange={handleRoleChange}
        />

        <label
          className="
            flex
            items-center
            gap-2

            text-sm
            text-gray-700

            dark:text-gray-200
          "
        >
          <input type="checkbox" checked={form.aktif} onChange={handleAktif} />
          Aktif
        </label>

        <div className="flex justify-end">
          <Button variant="primary" onClick={handleSubmit}>
            Simpan
          </Button>
        </div>
      </div>
    </UserModal>
  );
}
