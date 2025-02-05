import { env } from "@/env"
import { hasPermission } from "@/iam"
import { Permissions } from "@/iam/constants"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { createMiddleware } from "hono/factory"
import Stripe from "stripe"

import { stripeSchema } from "./schema"
import { stripe } from "./server.init"

export const honoPermissionMiddleware = <Resource extends keyof Permissions>(
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
) => {
  return createMiddleware<{
    Variables: {
      org: Awaited<ReturnType<typeof hasPermission>>["org"]
    }
  }>(async (c, next) => {
    const body = await c.req.json().catch(() => ({})) // Handle JSON parsing safely
    const orgSlug = body.org_slug || c.req.header("x-org") || ""

    if (!orgSlug) {
      return c.text("Organization slug missing", 400)
    }

    const d = await hasPermission(orgSlug, resource, action, data)
    if (!d.org?.id) {
      throw Error("No Org found!")
    }
    c.set("org", d.org)

    return await next()
  })
}

const app = new Hono()
  .post(
    "/checkout",
    zValidator("json", stripeSchema.checkout),
    honoPermissionMiddleware("attendance", "view"),
    async (c) => {
      const { price_id, units } = stripeSchema.checkout.parse(
        await c.req.json()
      )
      const user_session = c.get("session")
      const org = c.get("org")

      const url = new URL(c.req.url)
      const session = await stripe().checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            quantity: units,
            price: price_id,
          },
        ],
        metadata: {
          user_id: user_session.user.id,
          org_id: org!.id,
        },
        success_url: `${url.origin}/payment/success`,
        cancel_url: `${url.origin}/payment/cancel`,
      })
      return c.json(session.url)
    }
  )
  .post("/webhook", async (context) => {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY)
    const signature = context.req.header("stripe-signature")
    try {
      if (!signature) {
        return context.text("", 400)
      }
      const body = await context.req.text()
      const event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        env.STRIPE_SECRET_KEY
      )
      switch (event.type) {
        case "payment_intent.created": {
          console.log(event.data.object)
          break
        }
        default:
          break
      }
      return context.text("", 200)
    } catch (err) {
      const errorMessage = `⚠️  Webhook signature verification failed. ${
        err instanceof Error ? err.message : "Internal server error"
      }`
      console.log(errorMessage)
      return context.text(errorMessage, 400)
    }
  })

export { app as StripeRoute }
