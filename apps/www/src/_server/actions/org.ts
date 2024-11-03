"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect, RedirectType } from "next/navigation"
import { delCache, redisKeys } from "@/_server/cache"
import { db } from "@/_server/db"
import { hasPerm } from "@/_server/helpers/hasPerm"
import { orgSlugSchema } from "@/schema/default"
import orgSchema from "@/schema/org"
import slugify from "@sindresorhus/slugify"
import { z } from "zod"

import { idGenerate } from "@/lib/idGenerate"

export const createOrgAction = async (
  formData: z.infer<typeof orgSchema.create.validate>
) => {
  const { general } = orgSchema.create.validate.parse(formData)
  const { session } = await hasPerm()
  const slug = slugify(general.name)

  const org = await db.transaction().execute(async (trx) => {
    const org = await db
      .insertInto("orgs.list")
      .values({ ...general, slug, owner: session.user.id })
      .onConflict((oc) =>
        oc
          .column("slug")
          .doUpdateSet({ slug: idGenerate({ prefix: slug, length: 10 }) })
      )
      .returning(["slug", "id"])
      .executeTakeFirstOrThrow()

    await trx
      .insertInto("orgs.employee")
      .values({
        org_id: org.id,
        user_id: session.user.id,
        role: "owner",
        address: {},
        emergency_contacts: [],
      })
      .returningAll()
      .executeTakeFirst()

    return org
  })

  return redirect("/org/" + org.slug, RedirectType.replace)
}

export const updateOrgAction = async (
  formData: z.infer<typeof orgSchema.update.validate>
) => {
  const data = orgSchema.update.validate.parse(formData)
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
  const { org } = await hasPerm({ orgSlug })

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
