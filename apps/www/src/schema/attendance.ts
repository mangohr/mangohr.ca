import { scopeIds } from "@/constants/scopes"
import { z } from "zod"

import { listQueryStateSchema } from "./default"

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
}

export default attendanceSchema
