import { hasPermission } from "@/iam"
import { z } from "zod"

const createSchema = z.object({
  general: z.object({
    full_name: z.string(),
    company_name: z.string(),
    designation: z.string(),
    total_employees: z.coerce.number().int().min(1).catch(1),
  }),
  other: z.object({
    referral: z.string(),
  }),
})

export const userSchema = {
  onboard: {
    create: {
      permission: () => hasPermission("", "userOnboard", "create"),
      validate: createSchema,
    },
  },
}
