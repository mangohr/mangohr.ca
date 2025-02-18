import { getStripeProducts } from "./server.actions"
import { stripe } from "./server.init"

export const createSub = async ({
  customer,
  price,
  subscribed_by,
  org_id,
}: {
  customer: string
  price?: string
  subscribed_by: string
  org_id: string
}) => {
  if (!price) {
    price = (await getStripeProducts()).find((f) => f.price.unit_amount === 0)
      ?.price.id
  }
  if (!price) throw Error("Free plan not found!")

  const oldSub = await stripe()
    .subscriptions.list({
      customer,
      price,
      status: "active",
    })
    .then((d) => d.data[0])

  if (oldSub) {
    return oldSub
  }

  return await stripe().subscriptions.create({
    customer,
    items: [{ price }],
    metadata: {
      subscribed_by,
      org_id,
    },
    payment_behavior: "default_incomplete",
    expand: ["latest_invoice.payment_intent"],
  })
}

export const getOrCreateCustomer = async ({ email }: { email: string }) => {
  let customer = await stripe()
    .customers.list({
      email,
      limit: 1,
    })
    .then((d) => d.data[0])

  if (!customer) {
    customer = await stripe().customers.create({
      email,
    })
  }

  if (!customer) throw Error("Failed to get customer data.")

  return customer
}
