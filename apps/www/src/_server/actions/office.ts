"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { db } from "@/_server/db"
import { hasPerm } from "@/_server/helpers/hasPerm"
import officeSchema from "@/schema/office"
import { z } from "zod"

export const updateOfficeAction = async (
  formData: z.infer<
    typeof officeSchema.update.validate | typeof officeSchema.create.validate
  >
) => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const action = (formData as any).id ? "update" : "create"
  const data = officeSchema[action].validate.parse(formData)

  const { org } = await hasPerm({ orgSlug })

  if (action === "update") {
    const { id, ...rest } = data as z.infer<typeof officeSchema.update.validate>
    await db
      .updateTable("orgs.office")
      .set({ ...rest, org_id: org!.id.toString() })
      .where("id", "=", id.toString())
      .execute()
  } else {
    await db
      .insertInto("orgs.office")
      .values({ ...data, org_id: org!.id.toString() })
      .executeTakeFirst()
  }
  revalidatePath("/org/[orgSlug]/company/office", "page")

  return true
}

export const deleteOfficeAction = async (data: string) => {
  const id = officeSchema.delete.validate.parse(data)
  const orgSlug = z.string().parse(headers().get("x-org"))
  const { org } = await hasPerm({ orgSlug })

  await db
    .deleteFrom("orgs.office")
    .where("id", "=", id)
    .where("org_id", "=", org!.id)
    .execute()

  revalidatePath("/org/[orgSlug]/company/office", "page")

  return id
}
