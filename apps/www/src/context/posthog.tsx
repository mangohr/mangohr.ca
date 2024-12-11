// app/providers.js
"use client"

import { ReactNode, useEffect } from "react"
import dynamic from "next/dynamic"
import { env } from "@/env"
import posthog from "posthog-js"
import { PostHogProvider } from "posthog-js/react"

const PostHogPageView = dynamic(() => import("../hooks/posthog"), {
  ssr: false,
})

export function CSPostHogProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      capture_pageview: false,
      capture_pageleave: true, // Enable pageleave capture
    })
  }, [])

  console.log(env.NEXT_PUBLIC_POSTHOG_KEY, env.NEXT_PUBLIC_POSTHOG_HOST)

  return (
    <PostHogProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PostHogProvider>
  )
}
