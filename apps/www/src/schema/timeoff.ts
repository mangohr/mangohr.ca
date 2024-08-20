import { scopeIds } from "@/constants/scopes"
import { z } from "zod"

import { dateSchema } from "./default"

const createSchema = z.object({
  request_reason: z.string(),
  start_date: dateSchema,
  cost: z.coerce
    .number()
    .min(0.5, { message: "It should be atleast half day (0.5)" }),
  type: z.string(),
})

export const timeoffSchema = {
  list: {
    read: {
      scope: scopeIds["read:timeoff"],
      validate: null,
    },
  },
  create: {
    scope: scopeIds["create:timeoff"],
    validate: createSchema,
  },
}
