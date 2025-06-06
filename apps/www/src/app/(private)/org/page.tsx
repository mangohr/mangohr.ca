import React from "react"
import Image from "next/image"
import Link from "next/link"
import { getAllOrgs } from "@/_server/handlers/org"
import { formatDistanceToNow } from "date-fns"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import EmptyPage from "@/components/pages/empty"

async function Orgs() {
  const data = await getAllOrgs()

  const items = data.sort(
    (a, b) =>
      new Date(b.created_at ?? 0).getTime() -
      new Date(a.created_at ?? 0).getTime()
  )

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col space-y-8 p-8">
      <div>
        <Image
          src="/assets/logo/full.png"
          width={150}
          height={45}
          alt="MangoHR"
        />
      </div>
      <div className="flex items-end justify-between border p-8">
        <div className="space-y-1">
          <h1 className="text-3xl leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
            My Organizations
          </h1>
          <p className="text-foreground max-w-2xl font-light">
            List of all organizations you can access.
          </p>
        </div>
        <div>
          {/* <Link className={buttonVariants({ size: "lg" })} href={"/org/new"}>
            <span>
              <Plus className="size-4" />
            </span>{" "}
            <span>Create Organization</span>
          </Link> */}
          <Link href={"org/new"} className={cn(buttonVariants({}))}>
            <span>
              <Plus />
            </span>
            <span>Add Company</span>
          </Link>
        </div>
      </div>{" "}
      {items.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {items.map((d, i) => (
            <Link key={i} href={`/org/${d.slug}`} className="border p-3">
              <p>{d.name || "Untitled"}</p>
              <Label className="font-light">
                Created {formatDistanceToNow(new Date(d.created_at ?? 0))}
              </Label>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyPage label="No organizations found, Let's create one." />
      )}
    </div>
  )
}

export default Orgs
