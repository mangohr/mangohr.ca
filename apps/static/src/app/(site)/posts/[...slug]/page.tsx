import React from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import config from "@/keystatic/config"
import { RenderMarkdown } from "@/keystatic/markdoc"
import { keystaticReader } from "@/keystatic/reader"
import { Entry } from "@keystatic/core/reader"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Heading, SubHeading } from "@/components/custom/typography"

import PostCard from "../card"

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug

  const reader = await keystaticReader()
  const post = await reader.collections.posts.read(slug)

  if (!post) return notFound()
  const related:
    | Array<
        { entry: Entry<(typeof config)["collections"]["posts"]> } & {
          slug: string
        }
      >
    | [] = []

  for (const s of post.related) {
    if (!s) return
    const p = await reader.collections.posts.read(s)

    if (p) {
      related.push({ entry: p, slug: s } as never)
    }
  }

  if (related.length < 4) {
    const p = (await reader.collections.posts.all()).filter(
      (f) => String(f.slug) !== String(slug)
    )

    p.slice(0, 4 - related.length).forEach((p) => related.push(p as never))
  }

  const { node } = await post.content()

  return (
    <>
      <div className={cn("mx-auto min-h-screen w-full max-w-screen-lg")}>
        <div className="mt-16 space-y-8">
          {post.image && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex">
            <Heading className="max-w-none flex-1">{post.title}</Heading>
            <div className="w-fit">
              {post.publishedDate && (
                <p className="w-fit">{format(post.publishedDate, "PP")}</p>
              )}
            </div>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none text-justify">
          <RenderMarkdown node={node} />
        </div>
        <div className="my-16 space-y-8">
          <SubHeading>More Posts</SubHeading>
          <div className="grid w-full grid-cols-2 gap-12">
            {related.map((p, i) => (
              <PostCard post={p} key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
