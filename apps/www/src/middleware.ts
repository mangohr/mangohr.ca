import { NextResponse } from "next/server"
import micromatch from "micromatch"
import NextAuth from "next-auth"

import { authConfig } from "./auth.config"
import { PUBLIC_ROUTES, SIGN_IN_ROUTE } from "./lib/routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl, headers } = req

  const isAuthAPIRoute = nextUrl.pathname.startsWith("/api/auth")

  if (isAuthAPIRoute) return NextResponse.next()

  const isAuthenticated = !!req.auth
  const isPublicRoute = micromatch([nextUrl.pathname], PUBLIC_ROUTES).length > 0

  const org = nextUrl.pathname.split("/org/")[1]?.split("/")[0]
  const requestHeaders = new Headers(headers)

  if (org) {
    requestHeaders.set("x-org", org)
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  })
  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(SIGN_IN_ROUTE, nextUrl))
  }

  console.log("Auth-Middleware", {
    route: nextUrl.pathname,
    isAuthenticated,
    org,
  })

  return response
})

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  // matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],

  matcher: [
    // Always run for API routes
    "/(api|trpc)(.*)",

    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}
