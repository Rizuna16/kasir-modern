import type { UserRole } from "../types/user";

export const ROLE: Record<Uppercase<UserRole>, UserRole> = {
  ADMIN: "Admin",
  KASIR: "Kasir",
  OWNER: "Owner",
} as const;
