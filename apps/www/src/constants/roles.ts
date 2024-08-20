export const roles = {
  owner: {
    label: "Owner",
    description: "Access to everything",
    scopes: ["read_personal"],
  },
  admin: {
    label: "Admin",
    description: "Access to everything except payments & subscription",
    scopes: [],
  },
  manager: {
    label: "Manager",
    description: "Can add, edit and delete employees.",
    scopes: [],
  },
  employee: {
    label: "Employee",
    description: "Employee level access.",
    scopes: [],
  },
}
