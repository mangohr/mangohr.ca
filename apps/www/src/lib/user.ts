export const isSuperUser = (role?: string | null) =>
  ["admin", "owner"].indexOf(role || "") !== -1
