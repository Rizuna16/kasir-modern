export type UserRole = "Admin" | "Kasir" | "Owner";

export interface User {
  id: number;

  nama: string;

  username: string;

  email: string;

  password: string;

  role: UserRole;

  aktif: boolean;

  createdAt?: string;

  updatedAt?: string;
}
