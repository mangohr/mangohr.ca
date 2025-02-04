import { env } from "@/env"
import { hc } from "hono/client"

import { app, hcWithType } from "@/app/api/[[...route]]/route"

const path = env.WWW_URL
console.log(path)
// export const rpcClient = hcWithType(path)
export const rpcClient = hc<typeof app>("http://localhost:3000/", {
  headers: {
    "Content-Type": "application/json",
  },
})
