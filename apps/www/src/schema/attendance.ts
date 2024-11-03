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
    validate: z
      .object({
        employee: z.string().min(1),
        login: dateSchema,
        logout: dateSchema,
      })
      .refine((data) => data.login < data.logout, {
        message: "Login date must not be greater than logout date",
        path: ["login"], // specify the path for the error
      }),
  },
}

export default attendanceSchema
