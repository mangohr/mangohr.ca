import { scopeIds } from "@/constants/scopes"
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
    scope: scopeIds["read:office:schedule"],
    validate: null,
  },
  edit: {
    scope: scopeIds["edit:office:schedule"],
    validate: edit,
  },
  delete: {
    scope: scopeIds["edit:office:schedule"],
    validate: z.string(),
  },
}

export default workScheduleSchema
