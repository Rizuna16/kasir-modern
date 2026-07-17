import { useState } from "react";

import { Button, Card, ConfirmDialog } from "../components/ui";

import UserTable from "../components/user/UserTable";
import UserTambahModal from "../components/user/UserTambahModal";
import UserEditModal from "../components/user/UserEditModal";

import useUser from "../hooks/useUser";

import type { User } from "../types/user";

export default function UserPage() {
  const {
    user,

    tambahUser,

    editUser,

    hapusUser,
  } = useUser();

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
    <div className="space-y-6">
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
        >
          Master User
        </h1>

        <p
          className="
            text-gray-500
            dark:text-gray-400
          "
        >
          Kelola pengguna dan hak akses sistem
        </p>
      </div>

      <Card>
        <div
          className="
            flex
            justify-end
          "
        >
          <Button variant="primary" onClick={() => setIsTambahOpen(true)}>
            + Tambah User
          </Button>
        </div>
      </Card>

      <Card>
        {user.length === 0 ? (
          <div
            className="
                py-10
                text-center
                text-gray-500
                dark:text-gray-400
              "
          >
            Belum ada data user.
          </div>
        ) : (
          <UserTable data={user} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </Card>

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
