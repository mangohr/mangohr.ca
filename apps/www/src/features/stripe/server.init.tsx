"use server"

import "server-only"

import { env } from "@/env"
import Stripe from "stripe"

export const stripe = () =>
  new Stripe(env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-01-27.acacia",
    typescript: true,
  })
