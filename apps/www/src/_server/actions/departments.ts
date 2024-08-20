"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { db } from "@/_server/db"
import { hasPerm } from "@/_server/helpers/hasPerm"
import departmentSchema from "@/schema/department"
import { z } from "zod"

export const updateDepartmentAction = async (
  formData: z.infer<typeof departmentSchema.edit.validate>
) => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const { id, ...rest } = departmentSchema.edit.validate.parse(formData)
  const { org } = await hasPerm({ orgSlug })

  if (!id) {
    await db
      .insertInto("orgs.department")
      .values({ ...rest, org_id: org!.id })
      .execute()
  } else {
    await db
      .updateTable("orgs.department")
      .set(rest)
      .where("id", "=", id)
      .where("org_id", "=", org!.id)
      .execute()
  }
  revalidatePath("/org/[orgSlug]/company/departments", "page")
  return true
}

export const deleteDepartmentAction = async (schedule_id: string) => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const id = departmentSchema.delete.validate.parse(schedule_id)
  await hasPerm({ orgSlug })

  await db.deleteFrom("orgs.department").where("id", "=", id).execute()
  revalidatePath("/org/[orgSlug]/company/departments", "page")
  return true
}
