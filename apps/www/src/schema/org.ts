import { hasPermission } from "@/iam"
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
  list: {
    permission: () => hasPermission("", "orgList", "view"),
    validate: null,
  },
  get: {
    permission: (orgSlug: string) => hasPermission(orgSlug, "org", "view"),
    validate: null,
  },
  create: {
    permission: () => hasPermission("", "org", "create"),
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
    permission: (orgSlug: string) => hasPermission(orgSlug, "org", "update"),
    validate: z.object(editOrgSchema),
  },
  delete: {
    permission: (orgSlug: string) => hasPermission(orgSlug, "org", "delete"),
    validate: null,
  },
}

export default orgSchema
