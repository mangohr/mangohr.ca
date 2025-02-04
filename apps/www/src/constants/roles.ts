export const roles = {
  owner: {
    label: "Owner",
    description: "Access to everything",
  },
  admin: {
    label: "Admin",
    description: "Access to everything except payments & subscription",
  },
  manager: {
    label: "Manager",
    description: "Can manage employees.",
  },
  hr: {
    label: "HR",
    description: "Can manage employees, and payroll.",
  },
  employee: {
    label: "Employee",
    description: "Employee level access.",
  },
}
