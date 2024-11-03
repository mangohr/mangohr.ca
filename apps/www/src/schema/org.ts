import { scopeIds } from "@/constants/scopes"
import { z } from "zod"

import { dateSchema } from "./default"

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
    validate: z.object({
      general: z.object({
        name: z.string().min(1),
        email: z.string().email(),
        established_on: dateSchema.optional(),
        industry: z.string(),
        phone: z.string(),
        website: z.string().optional(),
        location: z.string().optional(),
      }),
    }),
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
