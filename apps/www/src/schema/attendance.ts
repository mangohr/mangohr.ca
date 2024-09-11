import { scopeIds } from "@/constants/scopes"
import { z } from "zod"

import { bigintStringSchema, dateSchema, listQueryStateSchema } from "./default"

const attendanceSchema = {
  list: {
    read: {
      scope: scopeIds["read:attendance:list"],
      validate: listQueryStateSchema({
        sortIds: z.enum(["id"]),
        filterObj: z.object({ id: z.enum(["id"]), value: z.string() }),
      }),
    },
  },
  add: {
    scope: scopeIds["add:attendance"],
    validate: z.object({
      employee_id: bigintStringSchema,
      login: dateSchema,
      logout: dateSchema,
    }),
  },
}

export default attendanceSchema
