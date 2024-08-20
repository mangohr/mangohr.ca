import { scopeIds } from "@/constants/scopes"
import { z } from "zod"

import { bigintStringSchema } from "./default"

const edit = z.object({
  id: bigintStringSchema.optional(),
  name: z.string(),
})

const departmentSchema = {
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

export default departmentSchema
