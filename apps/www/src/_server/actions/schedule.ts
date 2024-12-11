"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { db } from "@/_server/db"
import workScheduleSchema from "@/schema/work-schedule"
import { z } from "zod"

export const updateScheduleAction = async (
  formData: z.infer<typeof workScheduleSchema.edit.validate>
) => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const { id, ...rest } = workScheduleSchema.edit.validate.parse(formData)
  const { org } = await workScheduleSchema.edit.permission(orgSlug)

  if (!id) {
    await db
      .insertInto("orgs.work_schedule")
      .values({ ...rest, org_id: org!.id })
      .execute()
  } else {
    await db
      .updateTable("orgs.work_schedule")
      .set(rest)
      .where("id", "=", id)
      .where("org_id", "=", org!.id)
      .execute()
  }
  revalidatePath("/org/[orgSlug]/company/work-schedules", "page")
  return true
}

export const deleteScheduleAction = async (schedule_id: string) => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const id = workScheduleSchema.delete.validate.parse(schedule_id)
  await workScheduleSchema.delete.permission(orgSlug)

  await db.deleteFrom("orgs.work_schedule").where("id", "=", id).execute()
  revalidatePath("/org/[orgSlug]/company/work-schedules", "page")
  return true
}
