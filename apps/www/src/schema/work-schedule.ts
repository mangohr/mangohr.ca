import { hasPermission } from "@/iam"
import { z } from "zod"

import { bigintSchema } from "./default"

const edit = z.object({
  id: bigintSchema.optional(),
  name: z.string(),
  type: z.enum(["hour", "day"]),
  active: z.boolean(),
  work_hrs: z.coerce.number(),
  total_hrs: z.coerce.number(),
  daily_hrs: z.array(z.coerce.number()),
  effective_from: z.date(),
})

const workScheduleSchema = {
  get: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "workSchedule", "view"),
    validate: null,
  },
  edit: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "workSchedule", "update"),
    validate: edit,
  },
  delete: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "workSchedule", "delete"),
    validate: z.string(),
  },
}

export default workScheduleSchema
