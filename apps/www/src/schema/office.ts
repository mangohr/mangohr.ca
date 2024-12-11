import { scopeIds } from "@/constants/scopes"
import { hasPermission } from "@/iam"
import { z } from "zod"

const schema = {
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
  active: z.boolean().catch(true),
}

const create = z.object(schema)

const update = z.object({
  id: z.coerce.number().int(),
  ...schema,
})

const officeSchema = {
  get: {
    permission: (orgSlug: string) => hasPermission(orgSlug, "office", "view"),
    validate: null,
  },
  create: {
    permission: (orgSlug: string) => hasPermission(orgSlug, "office", "create"),
    validate: create,
  },
  update: {
    permission: (orgSlug: string) => hasPermission(orgSlug, "office", "update"),
    validate: update,
  },
  delete: {
    permission: (orgSlug: string) => hasPermission(orgSlug, "office", "delete"),
    validate: z.string(),
  },
}

export default officeSchema
