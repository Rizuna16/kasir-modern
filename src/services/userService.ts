import type { User } from "../types/user";

const STORAGE_KEY = "user";

// Data awal user

const defaultUser: User[] = [
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

// Ambil data user

const getStorage = (): User[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    localStorage.setItem(
      STORAGE_KEY,

      JSON.stringify(defaultUser),
    );

    return defaultUser;
  }

  return JSON.parse(data);
};

// Simpan user

const saveStorage = (data: User[]): void => {
  localStorage.setItem(
    STORAGE_KEY,

    JSON.stringify(data),
  );
};

// Ambil semua user

export const getUser = (): User[] => {
  return getStorage();
};

// Tambah user

export const addUser = (data: Omit<User, "id">): User => {
  const user = getStorage();

  const lastId = user.length > 0 ? Math.max(...user.map((item) => item.id)) : 0;

  const newUser: User = {
    id: lastId + 1,

    ...data,
  };

  user.push(newUser);

  saveStorage(user);

  return newUser;
};

// Ambil user berdasarkan id

export const getUserById = (id: number): User | undefined => {
  const user = getStorage();

  return user.find((item) => item.id === id);
};

// Update user

export const updateUser = (
  id: number,

  data: Omit<User, "id">,
): User | null => {
  const user = getStorage();

  const index = user.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  user[index] = {
    id,

    ...data,
  };

  saveStorage(user);

  return user[index];
};

// Hapus user

export const deleteUser = (id: number): void => {
  const user = getStorage();

  const dataBaru = user.filter((item) => item.id !== id);

  saveStorage(dataBaru);
};
