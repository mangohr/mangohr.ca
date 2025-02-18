import { hasPermission } from "@/iam"
import { Role } from "@/iam/constants"
import { orgSlugSchema } from "@/schema/default"
import { z } from "zod"

export const stripePlansCacheKey = "mangohr-plans"

export type SubscribePermission = {
  dataType: null
  action: "view" | "create" | "update" | "delete"
}

export function subscribePermission() {
  const noAccess = {
    view: false,
    create: false,
    update: false,
    delete: false,
  }
  return {
    owner: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
    admin: noAccess,
    manager: noAccess,
    hr: noAccess,
    employee: noAccess,
  } satisfies Record<Role, Record<SubscribePermission["action"], boolean>>
}

export const stripeSchema = {
  getCustomerPortal: {
    validate: z
      .object({
        flow_type: z
          .enum([
            "payment_method_update",
            "subscription_cancel",
            "subscription_update",
            "subscription_update_confirm",
          ])
          .optional(),
      })
      .optional(),
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "subscribe", "view"),
  },
  createSubscribe: {
    validate: z.object({
      price_id: z.string(),
      units: z.number().int().min(1),
      org_slug: orgSlugSchema,
    }),
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "subscribe", "create"),
  },
}

export type StripeSchemaTypes = {
  [K in keyof typeof stripeSchema]: z.infer<
    (typeof stripeSchema)[K]["validate"]
  >
}
