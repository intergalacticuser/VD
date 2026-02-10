import { Role } from "@prisma/client";

export function isAdmin(role?: Role | null): boolean {
  return role === Role.ADMIN;
}
