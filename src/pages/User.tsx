import { useState } from "react";

import UserTable from "../components/user/UserTable";
import UserTambahModal from "../components/user/UserTambahModal";
import UserEditModal from "../components/user/UserEditModal";

import useUser from "../hooks/useUser";

import type { User } from "../types/user";

export default function UserPage() {
  const { user, tambahUser, editUser, hapusUser } = useUser();

  const [isTambahOpen, setIsTambahOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function handleEdit(data: User) {
    setSelectedUser(data);

    setIsEditOpen(true);
  }

  function handleDelete(id: number) {
    const yakin = window.confirm("Apakah Anda yakin ingin menghapus user ini?");

    if (!yakin) {
      return;
    }

    hapusUser(id);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Master User</h1>

        <button
          onClick={() => {
            setIsTambahOpen(true);
          }}
          className="
            bg-blue-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Tambah User
        </button>
      </div>

      <UserTable data={user} onEdit={handleEdit} onDelete={handleDelete} />

      <UserTambahModal
        isOpen={isTambahOpen}
        onClose={() => {
          setIsTambahOpen(false);
        }}
        onSave={(data) => {
          tambahUser(data);

          setIsTambahOpen(false);
        }}
      />

      <UserEditModal
        isOpen={isEditOpen}
        user={selectedUser}
        onClose={() => {
          setIsEditOpen(false);

          setSelectedUser(null);
        }}
        onSave={(id, data) => {
          editUser(
            id,

            data,
          );

          setIsEditOpen(false);

          setSelectedUser(null);
        }}
      />
    </div>
  );
}
