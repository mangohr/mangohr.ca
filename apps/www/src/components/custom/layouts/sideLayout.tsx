"use client"

import React, { Fragment, ReactNode } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

function SideLayout({
  children,
  title,
  tag,
  description,
  metadata = [],
}: {
  children: ReactNode
  title?: string
  tag?: string
  description?: string
  metadata?: Array<{ key: string; value: string }>
}) {
  const router = useRouter()
  return (
    <div className="relative  h-screen flex-col items-center justify-center sm:grid md:max-w-none md:grid-cols-3 md:px-0">
      <div className="bg-muted relative hidden h-screen flex-col overflow-hidden text-white md:flex dark:border-r">
        <div className="bg-green absolute inset-0" />
        <div className="absolute -bottom-48 -left-24 rotate-[270deg]">
          <Image
            src={"/assets/shapes/leaves.png"}
            alt="Leaves"
            width={600}
            height={600}
          />
        </div>
        <div className="relative z-20 flex h-screen flex-col overflow-y-auto px-10 py-6">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <Button
                className=""
                variant={"outline"}
                size={"icon-sm"}
                onClick={() => router.back()}
              >
                <ArrowLeft />
              </Button>
              <div className="mb-2 flex items-center text-lg font-medium">
                <Image
                  src={"/assets/logo/full-white.png"}
                  alt="Resume Mango Logo"
                  width={110}
                  height={75}
                />
              </div>
            </div>

            <div className="space-y-4 py-8 text-lg">
              <div>
                {tag && <span className="text-xl">{tag}</span>}
                {title && <h1 className="text-5xl font-medium">{title}</h1>}
              </div>
              {description && <p>{description}</p>}
              <div className="grid grid-cols-[100px,auto] gap-y-4 py-4">
                {metadata?.map((k, i) => (
                  <Fragment key={i}>
                    <p>{k.key}</p>
                    <p>{k.value}</p>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This platform has saved me countless hours by
                streamlining employee management. MangoHR is perfect for my
                company!&rdquo;
              </p>
              <span className="text-sm">Sofia Davis</span>
            </blockquote>
          </div>
        </div>
      </div>
      <div className="col-span-2 h-screen overflow-y-auto p-8">{children}</div>
    </div>
  )
}

export default SideLayout
