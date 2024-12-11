import React from "react"

export default function Loading({
  title = "Loading...",
  description = "Hold tight, we're processing your request.",
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="m-auto flex flex-1 flex-col items-center justify-center">
      <h1 className="text-xl font-medium">{title}</h1>
      <h1 className="text-md text-muted-foreground">{description}</h1>
      <div className="loader" />
    </div>
  )
}
