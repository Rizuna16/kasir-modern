import type { User } from "../../types/user";

interface Props {
  data: User[];

  onEdit: (user: User) => void;

  onDelete: (id: number) => void;
}

export default function UserTable({
  data,

  onEdit,

  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Nama</th>

            <th className="border px-4 py-2">Username</th>

            <th className="border px-4 py-2">Email</th>

            <th className="border px-4 py-2">Role</th>

            <th className="border px-4 py-2">Status</th>

            <th className="border px-4 py-2">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.nama}</td>

              <td className="border px-4 py-2">{item.username}</td>

              <td className="border px-4 py-2">{item.email}</td>

              <td className="border px-4 py-2">{item.role}</td>

              <td className="border px-4 py-2">
                {item.aktif ? (
                  <span className="text-green-600">Aktif</span>
                ) : (
                  <span className="text-red-600">Nonaktif</span>
                )}
              </td>

              <td className="border px-4 py-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(item)}
                    className="
                      bg-yellow-500
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(item.id)}
                    className="
                      bg-red-600
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
