import { delCache, redisKeys } from "@/_server/cache"
import { db } from "@/_server/db"
import { env } from "@/env"
import { stripePlansCacheKey } from "@/features/stripe/schema"
import { stripe } from "@/features/stripe/server.init"
import Stripe from "stripe"

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
])

const manageSubscriptionStatusChange = async (
  subscription: Stripe.Subscription
) => {
  const sub = await stripe().subscriptions.retrieve(subscription.id, {
    expand: ["plan.product", "latest_invoice"],
  })

  await db
    .updateTable("orgs.list")
    .where("id", "=", subscription.metadata.org_id)
    .set({
      subscription: {
        id: subscription.id,
        provider: "stripe",
        active: subscription.status === "active",
        plan: (sub as any).plan.product.name,
      },
      limits: {
        seats: subscription.items.data[0].quantity || 1,
      },
    })
    .executeTakeFirst()

  await delCache(redisKeys.org.single(subscription.metadata.org_id))
}

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature") as string
  const webhookSecret = env.STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event

  try {
    if (!sig || !webhookSecret)
      return new Response("Webhook secret not found.", { status: 400 })
    event = stripe().webhooks.constructEvent(body, sig, webhookSecret)
    console.log(`🔔  Webhook received: ${event.type}`)
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
        case "price.created":
        case "price.updated":
        case "price.deleted":
        case "product.deleted":
          await delCache(stripePlansCacheKey)
          break
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          await manageSubscriptionStatusChange(
            event.data.object as Stripe.Subscription
          )
          break
        default:
          throw new Error("Unhandled relevant event!")
      }
    } catch (error) {
      console.log(error)
      return new Response(
        "Webhook handler failed. View your Next.js function logs.",
        {
          status: 400,
        }
      )
    }
  } else {
    return new Response(`Unsupported event type: ${event.type}`, {
      status: 400,
    })
  }
  return new Response(JSON.stringify({ received: true }))
}
