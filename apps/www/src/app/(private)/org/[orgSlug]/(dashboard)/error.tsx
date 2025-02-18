"use client"

import ErrorPage from "@/components/pages/error"

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
  return <ErrorPage error={error} />
}
