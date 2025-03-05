import { OrgsEmployee } from "@/types/db"

export const isSuperUser = (roles?: string[]) =>
  ["admin", "owner"].some((r) => (roles || []).indexOf(r) !== -1) //.indexOf(role || "") !== -1
