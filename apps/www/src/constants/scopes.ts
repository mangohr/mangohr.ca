export const scopes = [
  // Organization Scopes
  { id: "read:org", label: "Able to view organizations" },
  { id: "create:org", label: "Able to create organizations" },
  { id: "update:org", label: "Able to update organizations" },
  { id: "delete:org", label: "Able to delete organizations" },

  // Office Scopes
  { id: "read:office", label: "Able to view offices" },
  { id: "create:office", label: "Able to create offices" },
  { id: "update:office", label: "Able to update offices" },
  { id: "delete:office", label: "Able to delete offices" },
  { id: "read:office:schedule", label: "Able to read offices work schedules" },
  {
    id: "edit:office:schedule",
    label: "Able to create, update and delete offices work schedules",
  },

  // Employee Scopes
  {
    id: "read:employee:list",
    label: "Able to create, update and delete offices work schedules",
  },
  {
    id: "read:employee:personal",
    label: "Able to view employee's personal data",
  },
  {
    id: "edit:employee:personal",
    label: "Able to edit employee's personal data",
  },
  {
    id: "create:employee:job",
    label: "Able to assign employee a job position.",
  },
  {
    id: "create:employee:attendance",
    label: "Able to mark attendance.",
  },
  {
    id: "edit:employee:role",
    label: "Able to edit employee's role",
  },

  // Invitations Scopes
  {
    id: "read:invitation",
    label: "Able to read invitations",
  },
  {
    id: "create:invitation",
    label: "Able to send invitations",
  },
  {
    id: "delete:invitation",
    label: "Able to delete invitations",
  },

  // Timeoff Scopes
  {
    id: "read:timeoff",
    label: "Able to read time off requests",
  },
  {
    id: "create:timeoff",
    label: "Able to create time off requests",
  },
  {
    id: "edit:timeoff",
    label: "Able to modify time off requests",
  },

  // Attendance Scopes
  {
    id: "read:attendance:list",
    label: "Able to modify time off requests",
  },
  {
    id: "add:attendance",
    label: "Able to add attendance on employees all behalf",
  },
] as const

// // Extract the types dynamically
type ScopeId = (typeof scopes)[number]["id"]
// type Scope = (typeof scopes)[number];

export const scopeIds = scopes.reduce(
  (a, v) => ({ ...a, [v.id]: v.id }),
  {}
) as Record<ScopeId, ScopeId>
