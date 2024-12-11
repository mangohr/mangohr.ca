import { scopeIds } from "@/constants/scopes"
import { hasPermission } from "@/iam"
import { z } from "zod"

import { listQueryStateSchema } from "./default"

const documentSchema = {
  list: {
    read: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "documents", "view"),
      validate: listQueryStateSchema({
        sortIds: z.enum(["name", "size"]),
        filterObj: z.object({ id: z.enum(["name"]), value: z.string() }),
      }),
    },
  },
  view: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "documents", "view"),
    validate: null,
  },
  create: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "documents", "create"),
    validate: null,
  },
  delete: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "documents", "delete"),
    validate: null,
  },
}

export default documentSchema
