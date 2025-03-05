import React from "react"
import Image from "next/image"
import Link from "next/link"
import config from "@/keystatic/config"
import { Entry } from "@keystatic/core/reader"
import { format } from "date-fns"

export default function PostCard({
  post,
}: {
  post: { entry: Entry<(typeof config)["collections"]["posts"]> } & {
    slug: string
  }
}) {
  return (
    <div className="space-y-2">
      <div>
        <Link
          href={"/posts/" + post.slug}
          className="relative aspect-video rounded-lg overflow-hidden block"
        >
          <Image
            src={post.entry.image || ""}
            alt={post.entry.title}
            fill
            className="object-cover"
          />
        </Link>
      </div>
      <div className="space-y-2">
        <Link href={"/posts/" + post.slug} className="space-y-1">
          {post.entry.publishedDate && (
            <p className="text-sm text-muted-foreground">
              {format(post.entry.publishedDate, "PP")}
            </p>
          )}
          <h1 className="hover:text-primary text-lg font-semibold">
            {post.entry.title}
          </h1>
          <p className="line-clamp-2 text-sm">{post.entry.description}</p>
        </Link>
        <Link
          href={"/posts/" + post.slug}
          className="text-primary hover:underline block text-sm"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}
