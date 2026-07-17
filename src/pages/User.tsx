import { useState } from "react";

import UserTable from "../components/user/UserTable";
import UserTambahModal from "../components/user/UserTambahModal";
import UserEditModal from "../components/user/UserEditModal";
import ConfirmDialog from "../components/ui/ConfirmDialog";

import useUser from "../hooks/useUser";

import type { User } from "../types/user";

export default function UserPage() {
  const { user, tambahUser, editUser, hapusUser } = useUser();

  const [isTambahOpen, setIsTambahOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  function handleEdit(data: User) {
    setSelectedUser(data);

    setIsEditOpen(true);
  }

  function handleDelete(id: number) {
    setDeleteId(id);

    setIsDeleteOpen(true);
  }

  return (
    <div className="p-6">
      <div className="mb-5 flex justify-between">
        <h1 className="text-2xl font-bold">Master User</h1>

        <button
          onClick={() => {
            setIsTambahOpen(true);
          }}
          className="
            rounded
            bg-blue-600
            px-4
            py-2
            text-white
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
          editUser(id, data);

          setIsEditOpen(false);

          setSelectedUser(null);
        }}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        title="Hapus User"
        message="Apakah Anda yakin ingin menghapus user ini?"
        confirmText="Hapus"
        cancelText="Batal"
        variant="danger"
        onCancel={() => {
          setIsDeleteOpen(false);

          setDeleteId(null);
        }}
        onConfirm={() => {
          if (deleteId !== null) {
            hapusUser(deleteId);
          }

          setIsDeleteOpen(false);

          setDeleteId(null);
        }}
      />
    </div>
  );
}
