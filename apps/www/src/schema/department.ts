import { scopeIds } from "@/constants/scopes"
import { hasPermission } from "@/iam"
import { z } from "zod"

import { bigintStringSchema } from "./default"

const edit = z.object({
  id: bigintStringSchema.optional(),
  name: z.string().min(1),
})

const departmentSchema = {
  get: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "department", "view"),
    validate: null,
  },
  edit: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "department", "update"),
    validate: edit,
  },
  delete: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "department", "delete"),
    validate: z.string(),
  },
}

export default departmentSchema
