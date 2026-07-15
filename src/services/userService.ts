import type { User } from "../types/user";

let userData: User[] = [
  {
    id: 1,

    nama: "Administrator",

    username: "admin",

    email: "admin@kasir.com",

    password: "admin123",

    role: "Admin",

    aktif: true,
  },

  {
    id: 2,

    nama: "Kasir Utama",

    username: "kasir",

    email: "kasir@kasir.com",

    password: "kasir123",

    role: "Kasir",

    aktif: true,
  },
];

export const getUser = (): User[] => {
  return [...userData];
};

export const addUser = (data: Omit<User, "id">): User => {
  const newUser: User = {
    id: userData.length + 1,

    ...data,
  };

  userData.push(newUser);

  return newUser;
};

export const getUserById = (id: number): User | undefined => {
  return userData.find((item) => item.id === id);
};

export const updateUser = (
  id: number,

  data: Omit<User, "id">,
): User | null => {
  const index = userData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  userData[index] = {
    id,

    ...data,
  };

  return userData[index];
};

export const deleteUser = (id: number): void => {
  userData = userData.filter((item) => item.id !== id);
};
