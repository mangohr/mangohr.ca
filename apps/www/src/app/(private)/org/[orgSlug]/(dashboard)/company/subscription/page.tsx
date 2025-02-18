import React from "react"
import { getSubscription } from "@/features/stripe/server.actions"

import SubscriptionInfo from "../components/subscription"

export default async function Page() {
  const data = await getSubscription()
  return <SubscriptionInfo data={data} />
}
