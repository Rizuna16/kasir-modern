import { useEffect, useState } from "react";

import type { User } from "../types/user";

import {
  getUser,
  addUser,
  updateUser,
  deleteUser,
} from "../services/userService";

export default function useUser() {
  const [user, setUser] = useState<User[]>([]);

  function loadUser() {
    const data = getUser();

    setUser(data);
  }

  useEffect(() => {
    loadUser();
  }, []);

  function tambahUser(data: Omit<User, "id">) {
    addUser(data);

    loadUser();
  }

  function editUser(
    id: number,

    data: Omit<User, "id">,
  ) {
    updateUser(
      id,

      data,
    );

    loadUser();
  }

  function hapusUser(id: number) {
    deleteUser(id);

    loadUser();
  }

  return {
    user,

    loadUser,

    tambahUser,

    editUser,

    hapusUser,
  };
}
