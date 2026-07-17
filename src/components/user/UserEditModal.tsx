import { useEffect, useState } from "react";

import UserModal from "./UserModal";

import { Button, Input, Select } from "../ui";

import type { User, UserRole } from "../../types/user";

interface Props {
  isOpen: boolean;

  user: User | null;

  onClose: () => void;

  onSave: (id: number, data: Omit<User, "id">) => void;
}

export default function UserEditModal({
  isOpen,
  user,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState<Omit<User, "id">>({
    nama: "",
    username: "",
    email: "",
    password: "",
    role: "Kasir",
    aktif: true,
  });

  useEffect(() => {
    if (user) {
      setForm({
        nama: user.nama,
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        aktif: user.aktif,
      });
    }
  }, [user]);

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
    if (!user) return;

    onSave(user.id, form);

    onClose();
  }

  return (
    <UserModal isOpen={isOpen} title="Edit User" onClose={onClose}>
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
          type="email"
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
          onChange={handleRoleChange}
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
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.aktif} onChange={handleAktif} />
          <span>Aktif</span>
        </label>

        <div className="flex justify-end">
          <Button variant="success" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </div>
    </UserModal>
  );
}
