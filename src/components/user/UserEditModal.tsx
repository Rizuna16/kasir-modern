import { useEffect, useState } from "react";

import UserModal from "./UserModal";

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
    const {
      name,

      value,
    } = e.target;

    setForm({
      ...form,

      [name]: value,
    });
  }

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setForm({
      ...form,

      role: e.target.value as UserRole,
    });
  }

  function handleAktif(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,

      aktif: e.target.checked,
    });
  }

  function handleSubmit() {
    if (!user) {
      return;
    }

    onSave(
      user.id,

      form,
    );

    onClose();
  }

  return (
    <UserModal isOpen={isOpen} title="Edit User" onClose={onClose}>
      <div className="space-y-4">
        <input
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          className="
            w-full
            border
            rounded
            px-3
            py-2
          "
        />

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="
            w-full
            border
            rounded
            px-3
            py-2
          "
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="
            w-full
            border
            rounded
            px-3
            py-2
          "
        />

        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="
            w-full
            border
            rounded
            px-3
            py-2
          "
        />

        <select
          value={form.role}
          onChange={handleRoleChange}
          className="
            w-full
            border
            rounded
            px-3
            py-2
          "
        >
          <option value="Admin">Admin</option>

          <option value="Kasir">Kasir</option>

          <option value="Owner">Owner</option>
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.aktif} onChange={handleAktif} />
          Aktif
        </label>

        <button
          onClick={handleSubmit}
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Update
        </button>
      </div>
    </UserModal>
  );
}
