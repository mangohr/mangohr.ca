import { scopeIds } from "@/constants/scopes"
import { z } from "zod"

const editOrgSchema = {
  slug: z.string().optional(),
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email(),
  industry: z.string().optional(),
  company_size: z.string().optional(),
  picture: z.string().optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  established_on: z.coerce.date().optional(),
}

const orgSchema = {
  get: {
    scope: scopeIds["read:org"],
    validate: null,
  },
  create: {
    scope: scopeIds["create:org"],
    validate: z.object({ name: z.string() }),
  },
  update: {
    scope: scopeIds["update:org"],
    validate: z.object(editOrgSchema),
  },
  delete: {
    scope: scopeIds["delete:org"],
    validate: null,
  },
}

export default orgSchema
