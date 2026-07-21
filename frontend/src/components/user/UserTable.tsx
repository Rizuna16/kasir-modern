import { Button, DataTable, Badge } from "../ui";

import type { User } from "../../types/user";

interface Props {
  data: User[];

  onEdit: (user: User) => void;

  onDelete: (id: number) => void;
}

export default function UserTable({ data, onEdit, onDelete }: Props) {
  const columns = [
    {
      header: "Nama",

      accessor: "nama" as keyof User,
    },

    {
      header: "Username",

      accessor: "username" as keyof User,
    },

    {
      header: "Email",

      accessor: "email" as keyof User,
    },

    {
      header: "Role",

      accessor: "role" as keyof User,

      render: (item: User) => <Badge variant="info">{item.role}</Badge>,
    },

    {
      header: "Status",

      accessor: "aktif" as keyof User,

      render: (item: User) =>
        item.aktif ? (
          <Badge variant="success">Aktif</Badge>
        ) : (
          <Badge variant="danger">Nonaktif</Badge>
        ),
    },

    {
      header: "Aksi",

      accessor: "id" as keyof User,

      className: "text-center w-44",

      render: (item: User) => (
        <div className="flex justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(item)}
            className="
              text-blue-600
              hover:text-blue-700

              dark:text-blue-400
              dark:hover:text-blue-300
            "
          >
            Edit
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(item.id)}
            className="
              text-red-600
              hover:text-red-700

              dark:text-red-400
              dark:hover:text-red-300
            "
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="Belum ada data user"
    />
  );
}
