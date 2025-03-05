import React from "react"
import { notFound } from "next/navigation"
import { RenderMarkdown } from "@/keystatic/markdoc"
import { keystaticReader } from "@/keystatic/reader"

const Page = async () => {
  const reader = await keystaticReader()
  const page = await reader.collections.pages.read("home")

  if (!page) return notFound()

  const { node } = await page.content()

  return (
    <div className="">
      <div className="prose dark:prose-invert max-w-none text-justify">
        <RenderMarkdown node={node} />
      </div>
    </div>
  )
}

export default Page
