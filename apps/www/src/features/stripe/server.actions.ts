"use server"

import { headers } from "next/headers"
import { redirect, RedirectType } from "next/navigation"
import { getOrCache } from "@/_server/cache"
import { db } from "@/_server/db"
import { orgSlugSchema } from "@/schema/default"
import Stripe from "stripe"
import { z } from "zod"

import { getHost } from "@/lib/host"

import { createSub, getOrCreateCustomer } from "./helpers"
import { stripePlansCacheKey, stripeSchema, StripeSchemaTypes } from "./schema"
import { stripe } from "./server.init"

export interface StripeProduct {
  id: string
  name: string
  highlight: boolean
  description: string | null
  features: string[]
  price: Stripe.Price
}

export type GetStripeProductsResult = Awaited<
  ReturnType<typeof getStripeProducts>
>

export const getSubscription = async () => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
  const { org } = await stripeSchema.getCustomerPortal.permission(orgSlug)

  if (!org?.subscription.id) {
    throw Error("No Subscription found")
  }

  const sub = await stripe().subscriptions.retrieve(org.subscription.id, {
    expand: ["plan.product", "latest_invoice"],
  })

  const invoices = await stripe().invoices.list({
    limit: 30,
  })

  return {
    sub: {
      plan: (sub as any).plan.product.name,
      start_date: sub.current_period_start,
      end_date: sub.current_period_end,
      price: (sub.latest_invoice as Stripe.Invoice).total / 100 || 0,
      currency: sub.currency,
      active: sub.status,
      quantity: (sub as any).quantity,
    },
    invoices: invoices.data,
  }
}

export const getCustomerPortalStripe = async (
  props: z.infer<typeof stripeSchema.getCustomerPortal.validate>
) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))

  const parsed = stripeSchema.getCustomerPortal.validate.parse(props)

  const { org, session } =
    await stripeSchema.getCustomerPortal.permission(orgSlug)

  let email = session.user.email

  if (session.user.id !== org?.owner) {
    await db
      .selectFrom("auth.user")
      .select("email")
      .where("id", "=", org!.owner)
      .executeTakeFirst()
      .then((e) => {
        return (email = e!.email)
      })
  }

  if (!email) throw Error("Owner email not found!")

  const cus = await getOrCreateCustomer({ email })

  const flow_data: Stripe.BillingPortal.SessionCreateParams["flow_data"] = {
    type: parsed?.flow_type as any,
  }

  const getSubId = () => {
    if (!org?.subscription?.id) throw Error("No active subscription!")
    return org.subscription.id
  }

  switch (parsed?.flow_type) {
    case "subscription_cancel":
      flow_data.subscription_cancel = {
        subscription: getSubId(),
      }
      break
    case "subscription_update":
      flow_data.subscription_update = {
        subscription: getSubId(),
      }
      break
    default:
      break
  }

  const portal = await stripe().billingPortal.sessions.create({
    customer: cus.id,
    flow_data,
    return_url: `${await getHost()}/org/${orgSlug}/`, // Redirect after session
  })

  return portal.url
}

export async function getStripeProducts(): Promise<StripeProduct[]> {
  const cacheMissFn = async () => {
    const products = await stripe().products.list({
      active: true,
      expand: ["data.default_price"],
    })
    return products.data
      .sort(
        (a, b) =>
          ((a.default_price as Stripe.Price).unit_amount || 0) -
          ((b.default_price as Stripe.Price).unit_amount || 0)
      )
      .map((product, i) => ({
        id: product.id,
        name: product.name,
        highlight: i === 1,
        description: product.description,
        features: [
          "Employee Management",
          "Document Management",
          "Audit Trail",
          "Up to 15 users",
          "Role based access",
          "Up to 3GB in storage",
        ],
        price: product.default_price as Stripe.Price,
      }))
  }

  const data = await getOrCache({
    key: stripePlansCacheKey,
    cacheMissFn,
    errorName: "Failed to fetch plans!",
  })

  return data
}

export async function createCheckoutSession(
  props: StripeSchemaTypes["createSubscribe"]
) {
  const parsed = stripeSchema.createSubscribe.validate.parse(props)
  const { org, session } = await stripeSchema.createSubscribe.permission(
    parsed.org_slug
  )

  const host = await getHost()
  let customer_email: string = session.user.email!
  if (org!.owner !== session.user.id) {
    const user = await db
      .selectFrom("auth.user")
      .where("auth.user.id", "=", org!.owner)
      .select("email")
      .executeTakeFirstOrThrow()
    if (!user) throw Error("Failed to find owner!")
    customer_email = user.email
  }

  const price = await stripe().prices.retrieve(parsed.price_id)

  if (!price) throw Error("Price not found!")

  const cus = await getOrCreateCustomer({ email: customer_email })

  if (price.unit_amount === 0) {
    await createSub({
      org_id: org!.id,
      subscribed_by: session!.user.id,
      customer: cus.id,
      price: price.id,
    })
    return redirect("/org/" + org!.slug, RedirectType.replace)
  }

  const checkoutSess = await stripe().checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    customer: cus.id,
    line_items: [
      {
        price: price.id, // Replace with your Stripe free plan price ID
        quantity: price.unit_amount === 0 ? 1 : parsed.units,
      },
    ],
    metadata: {
      subscribed_by: session.user.id,
      org_id: org!.id,
    },
    success_url: `${host}/subscribe/success`,
    cancel_url: `${host}/subscribe/cancel`,
  })

  console.log({ checkoutSess })
  return checkoutSess
}
