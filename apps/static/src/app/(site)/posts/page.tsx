import React from "react"
import Image from "next/image"
import Link from "next/link"
import { keystaticReader } from "@/keystatic/reader"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Heading, SubHeading } from "@/components/custom/typography"

import PostCard from "./card"

export default async function Page() {
  // 2. Read the "Posts" collection
  const reader = await keystaticReader()

  const [main, ...posts] = (await reader.collections.posts.all()).sort(
    (a, b) =>
      new Date(b.entry.publishedDate || "").getTime() -
      new Date(a.entry.publishedDate || "").getTime()
  )

  return (
    <div className="container space-y-16">
      <Heading className="text-center py-16 w-full m-auto">
        Insights and inspiration: explore our blog
      </Heading>
      <div className="grid grid-cols-[auto,500px] gap-12">
        <div>
          <Link
            href={"/posts/" + main.slug}
            className="relative rounded-lg overflow-hidden w-full h-full block aspect-video"
          >
            <Image
              src={main.entry.image || ""}
              alt={main.entry.title}
              fill
              className="object-cover"
            />
          </Link>
        </div>
        <div className="space-y-4">
          <Link href={"/posts/" + main.slug} className="space-y-4">
            {main.entry.publishedDate && (
              <p>{format(main.entry.publishedDate, "PP")}</p>
            )}
            <SubHeading className="hover:text-primary">
              {main.entry.title}
            </SubHeading>
            <p>{main.entry.description}</p>
          </Link>
          <Link
            href={"/posts/" + main.slug}
            className="text-primary hover:underline block"
          >
            Read More
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-12">
        {posts.map((p, i) => (
          <PostCard post={p} />
        ))}
      </div>
    </div>
  )
}
