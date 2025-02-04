import { orgSlugSchema } from "@/schema/default"
import { z } from "zod"

export const stripeSchema = {
  checkout: z.object({
    price_id: z.string(),
    units: z.number().int().min(1),
    org_slug: orgSlugSchema,
  }),
  subscription: z.object({
    subscription_id: z.string(),
  }),
}

export type StripeSchemaTypes = {
  [K in keyof typeof stripeSchema]: z.infer<(typeof stripeSchema)[K]>
}
