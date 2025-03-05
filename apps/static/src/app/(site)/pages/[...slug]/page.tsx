import React from "react"
import { notFound, redirect, RedirectType } from "next/navigation"
import { RenderMarkdown } from "@/keystatic/markdoc"
import { keystaticReader } from "@/keystatic/reader"

import { cn } from "@/lib/utils"

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug

  if (slug === "home") return redirect("/", RedirectType.replace)

  const reader = await keystaticReader()
  const page = await reader.collections.pages.read(slug)

  if (!page) return notFound()

  const { node } = await page.content()

  return (
    <>
      <div
        className={cn(
          page.layout === "container"
            ? "container"
            : page.layout === "post"
              ? "max-w-screen-lg mx-auto"
              : ""
        )}
      >
        <div className="prose dark:prose-invert max-w-none text-justify">
          <RenderMarkdown node={node} />
        </div>
      </div>
    </>
  )
}

export default Page
