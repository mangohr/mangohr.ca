import { scopeIds } from "@/constants/scopes"
import { z } from "zod"

import { listQueryStateSchema } from "./default"

const documentSchema = {
  list: {
    read: {
      scope: scopeIds["read:attendance:list"],
      validate: listQueryStateSchema({
        sortIds: z.enum(["name", "size"]),
        filterObj: z.object({ id: z.enum(["name"]), value: z.string() }),
      }),
    },
  },
}

export default documentSchema
