import type { User } from "../types/user";
import { getUser } from "./userService";

const AUTH_KEY = "kasir_auth_user";

// Login user

export const login = (username: string, password: string): User | null => {
  const users = getUser();

  const user = users.find(
    (item) =>
      item.username === username &&
      item.password === password &&
      item.aktif === true,
  );

  if (!user) {
    return null;
  }

  localStorage.setItem(AUTH_KEY, JSON.stringify(user));

  return user;
};

// Logout

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

// Ambil user yang sedang login

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(AUTH_KEY);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

// Cek status login

export const isLogin = (): boolean => {
  return localStorage.getItem(AUTH_KEY) !== null;
};
