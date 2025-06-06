// src/app/api/keystatic/[...params]/route.ts
import config from "@/keystatic/config"
import { makeRouteHandler } from "@keystatic/next/route-handler"

export const { POST, GET } = makeRouteHandler({
  config,
})
