import { PageConfig } from "next"
import { serverAuthConfig } from "@/auth"
import { StripeRoute } from "@/features/stripe/server.route"
import { hasPermission } from "@/iam"
import { Auth } from "@auth/core"
import { Hono } from "hono"
import { hc } from "hono/client"
import { createMiddleware } from "hono/factory"
import { handle } from "hono/vercel"
import { Session } from "next-auth"

// export const dynamic = "force-dynamic"

declare module "hono" {
  interface ContextVariableMap {
    session: Session
    org: Awaited<ReturnType<typeof hasPermission>>["org"]
  }
}

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// export const config: PageConfig = {
//   api: {
//     bodyParser: false,
//   },
// }

export const authMiddleware = createMiddleware<{
  Variables: {
    session: Session
  }
}>(async (c, next) => {
  const url = new URL(c.req.url)

  const request = new Request(url.origin + "/api/auth/session", {
    headers: { cookie: c.req.header("cookie") ?? "" },
  })
  const auth = (await Auth(request, serverAuthConfig as never)) as any

  const session = await auth.json()
  c.set("session", session)
  await next()
})

const app = new Hono()
  .basePath("/api")
  // .use(logger())
  .use("*", authMiddleware)
  .route("/stripe", StripeRoute)
// app.get("/hello", (c) => {
//   const isNode =
//     typeof process !== "undefined" &&
//     process.versions != null &&
//     process.versions.node != null

//   // Log the runtime environment
//   console.log(`Running in ${isNode ? "Node.js" : "Edge"} environment`)
//   return c.json({
//     message: "Hello from Hono!",
//   })
// })

export const GET = handle(app)
export const POST = handle(app)

const client = hc<typeof app>("")
type Client = typeof client

const hcWithType = (...args: Parameters<typeof hc>): Client =>
  hc<typeof app>(...args)

export { app, hcWithType, type Client }
