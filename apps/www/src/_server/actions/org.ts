"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect, RedirectType } from "next/navigation"
import { delCache, redisKeys } from "@/_server/cache"
import { db } from "@/_server/db"
import { createSub, getOrCreateCustomer } from "@/features/stripe/helpers"
import { stripe } from "@/features/stripe/server.init"
import { orgSlugSchema } from "@/schema/default"
import orgSchema from "@/schema/org"
import slugify from "@sindresorhus/slugify"
import { z } from "zod"

import { idGenerate } from "@/lib/idGenerate"

import { getOrg } from "../cache/org"

export const createOrgAction = async (
  formData: z.infer<typeof orgSchema.create.validate>,
  noRedirect?: boolean
) => {
  const { general } = orgSchema.create.validate.parse(formData)
  const { session } = await orgSchema.create.permission()
  let slug = slugify(general.name)

  const old = await getOrg(slug).catch(() => {})

  if (old) {
    slug = idGenerate({ prefix: slug, length: 10 })
  }

  const org = await db.transaction().execute(async (trx) => {
    const org = await trx
      .insertInto("orgs.list")
      .values({
        ...general,
        slug: slug,
        owner: session.user.id,
        subscription: {
          id: null,
          provider: "stripe",
          active: false,
          plan: null,
        },
        limits: {
          seats: 1,
        },
      })
      .returning(["slug", "id"])
      .executeTakeFirstOrThrow()

    const [first_name, middle_name, last_name] =
      session.user.name?.split(" ") || [session.user.email?.split("@")[0]] || []
    await trx
      .insertInto("orgs.employee")
      .values({
        org_id: org.id,
        user_id: session.user.id,
        roles: ["owner"],
        address: {},
        first_name,
        last_name,
        middle_name,
        emergency_contacts: [],
      })
      .returningAll()
      .executeTakeFirst()

    return org
  })

  const cus = await getOrCreateCustomer({ email: session.user.email! })
  const sub = await createSub({
    customer: cus.id,
    subscribed_by: session.user.id,
    org_id: org.id,
  })

  const product = await stripe().products.retrieve((sub as any).plan.product)

  await db
    .updateTable("orgs.list")
    .where("id", "=", org.id)
    .set({
      subscription: {
        id: sub.id,
        provider: "stripe",
        active: true,
        plan: product.name,
      },
      limits: {
        seats: 1,
      },
    })
    .execute()

  return noRedirect ? org : redirect("/org/" + org.slug, RedirectType.replace)
}

export const updateOrgAction = async (
  formData: z.infer<typeof orgSchema.update.validate>
) => {
  const data = orgSchema.update.validate.parse(formData)
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
  const { org } = await orgSchema.update.permission(orgSlug)

  const result = await db
    .updateTable("orgs.list")
    .set(data)
    .where("id", "=", org!.id)
    .returning("slug")
    .executeTakeFirstOrThrow()
  await delCache(redisKeys.org.single(orgSlug))
  revalidatePath("/org/[orgSlug]/company", "layout")

  return result
}
