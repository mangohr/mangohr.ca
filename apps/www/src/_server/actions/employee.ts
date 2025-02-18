"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { delCache, redisKeys } from "@/_server/cache"
import { getEmployee } from "@/_server/cache/org"
import { db } from "@/_server/db"
import { orgSlugSchema } from "@/schema/default"
import employeeSchema from "@/schema/employee"
import { timeoffSchema } from "@/schema/timeoff"
import { addDays } from "date-fns"
import { Expression, sql, SqlBool } from "kysely"
import { z } from "zod"

export const getAllEmployees = async (props: { searchParams: unknown }) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
  const parsed = employeeSchema.list.read.validate.parse(props.searchParams)
  const { org } = await employeeSchema.list.read.permission(orgSlug)
  const query = db
    .selectFrom("orgs.employee as e")
    .leftJoin("auth.user", "auth.user.id", "e.user_id")
    .select([
      "e.id",
      "username",
      "work_email",
      "email",
      "image",
      sql<string>`trim(COALESCE(e.first_name, '') || ' ' || COALESCE(e.middle_name, '') || ' ' || COALESCE(e.last_name, ''))`.as(
        "name"
      ),
      "department",
      "hired_at",
      "roles",
    ])
    .where((eb) => {
      const filters: Expression<SqlBool>[] = []
      console.log(org!.id)
      filters.push(eb("org_id", "=", org!.id))

      if (parsed.search) {
        const searchConditions = [
          eb("email", "ilike", `%${parsed.search!}%`),
          eb("name", "ilike", `%${parsed.search!}%`),
        ]

        if (Number(parsed.search)) {
          searchConditions.push(eb("e.id", "=", parsed.search!))
        }

        filters.push(eb.or(searchConditions))
      }
      if (parsed.filters.length > 0) {
        parsed.filters.forEach((f) => {
          f.value && filters.push(eb(f.id as any, "=", f.value))
        })
      }

      return eb.and(filters)
    })
  if (parsed.sort.length > 0) {
    const oq = parsed.sort.map(
      (f) => `${f.id} ${f.desc ? "desc" : "asc"}`
    ) as any
    query.orderBy(oq)
  } else {
    query.orderBy(["hired_at desc"])
  }

  const result = await query
    .limit(parsed.limit)
    .offset(parsed.page * parsed.limit)
    .execute()
  return { items: result, hasMore: result.length === parsed.limit }
}

export const updateEmployeeGeneralData = async (props: {
  username: string

  formData: z.infer<typeof employeeSchema.general.edit.validate>
}) => {
  const orgSlug = z.string().parse(headers().get("x-org"))
  const data = employeeSchema.general.edit.validate.parse(props.formData)

  const username = props.username && z.string().parse(props.username)

  const { session, org } = await employeeSchema.general.edit.permission(orgSlug)

  let emp = session.employee

  if (session.user.username !== username) {
    emp = await getEmployee(org!.id, username)
  }
  if (!emp?.user_id) throw Error("Employee not found!")

  await db
    .updateTable("orgs.employee")
    .set(data)
    .where("user_id", "=", emp!.user_id)
    .executeTakeFirstOrThrow()

  await delCache(redisKeys.employee.single(emp.org_id, username))
  revalidatePath("/org/[orgSlug]/employee/[userName]", "layout")
  return true
}

export const updateEmployeeCurrentJob = async (props: {
  username: string
  formData: z.infer<typeof employeeSchema.currentJob.create.validate>
}) => {
  const orgSlug = z.string().parse(headers().get("x-org"))
  const { reports_to: reporting_username, ...data } =
    employeeSchema.currentJob.create.validate.parse(props.formData)

  const username = props.username && z.string().parse(props.username)

  const { session, org } =
    await employeeSchema.currentJob.create.permission(orgSlug)

  let emp = session.employee

  if (session.user.username !== username) {
    emp = await getEmployee(org!.id, username)
  }
  if (!emp || !emp?.user_id) throw Error("Employee not found!")

  let reports_to_emp_id = undefined
  if (reporting_username) {
    if (reporting_username === session.user.username) {
      reports_to_emp_id = session.employee!.id
    } else {
      const reportingEmp = await getEmployee(org!.id, username).catch((err) => {
        throw new Error("Reporting employee not found!")
      })

      reports_to_emp_id = reportingEmp?.id || undefined
    }
  }

  const values = {
    ...data,
    reports_to: reports_to_emp_id,
    employee_id: emp.id,
    org_id: emp.org_id,
  }
  await db.transaction().execute(async (trx) => {
    await trx
      .updateTable("orgs.job")
      .where("employee_id", "=", emp.id)
      .set({ end_date: sql`now()` })
      .execute()
    const job = await trx
      .insertInto("orgs.job")
      .values(values)
      .returning("id")
      .executeTakeFirstOrThrow()
    await trx
      .updateTable("orgs.employee")
      .set({ current_job: job.id })
      .where("id", "=", emp.id)
      .execute()

    await delCache(redisKeys.employee.single(emp.org_id, username))
  })

  revalidatePath("/org/[orgSlug]/employee/[userName]", "layout")
  revalidatePath("/org/[orgSlug]/employee/[userName]/job-pay", "page")
  return true
}

export const updateEmployeeRole = async (props: {
  username: string
  formData: z.infer<typeof employeeSchema.role.edit.validate>
}) => {
  const orgSlug = z.string().parse(headers().get("x-org"))

  const { roles } = employeeSchema.role.edit.validate.parse(props.formData)

  const username = props.username && z.string().parse(props.username)

  const { session, org } = await employeeSchema.role.edit.permission(orgSlug)

  let emp = session.employee

  if (session.user.username !== username) {
    emp = await getEmployee(org!.id, username)
  }
  if (!emp || !emp?.id) throw new Error("Employee not found!")

  await db
    .updateTable("orgs.employee")
    .set({
      roles: roles,
    })
    .where("id", "=", emp.id)
    .executeTakeFirstOrThrow()

  await delCache(redisKeys.employee.single(org!.id, username))

  revalidatePath("/org/[orgSlug]/company/permission", "page")
  return true
}

export const addEmployeeAttendance = async (props: {
  username: string
  formData: z.infer<typeof employeeSchema.attendance.create.validate>
}) => {
  const orgSlug = z.string().parse(headers().get("x-org"))
  const { date } = employeeSchema.attendance.create.validate.parse(
    props.formData
  )

  const username = props.username && z.string().parse(props.username)

  const { session, org } =
    await employeeSchema.attendance.create.permission(orgSlug)

  let emp = session.employee

  if (session.user.username !== username) {
    emp = await getEmployee(org!.id, username)
  }
  if (!emp || !emp?.user_id) throw new Error("Employee not found!")

  const attendance = await db
    .selectFrom("orgs.attendance")
    .where("employee_id", "=", emp.id)
    .where("logout", "is", null)
    .selectAll()
    .executeTakeFirst()

  if (attendance?.login) {
    await db
      .updateTable("orgs.attendance")
      .set({
        logout: date,
      })
      .where("id", "=", attendance.id)
      .execute()
  } else {
    await db
      .insertInto("orgs.attendance")
      .values({
        employee_id: emp.id,
        login: date,
        org_id: emp.org_id,
      })
      .execute()
  }

  revalidatePath("/org/[orgSlug]/employee/[userName]/attendance", "page")
  return true
}

export const employeeTimeOffRequest = async (props: {
  formData: z.infer<typeof timeoffSchema.request.validate>
  username: string
}) => {
  const orgSlug = z.string().parse(headers().get("x-org"))
  const data = timeoffSchema.request.validate.parse(props.formData)

  const username = props.username && z.string().parse(props.username)

  const { session, org } = await timeoffSchema.request.permission(orgSlug)

  let emp = session.employee

  if (session.user.username !== username) {
    emp = await getEmployee(org!.id, username)
  }
  if (!emp || !emp?.user_id) throw new Error("Employee not found!")

  const end_date = addDays(data.start_date, data.cost)

  await db
    .insertInto("orgs.time_off")
    .values({
      ...data,
      end_date,
      employee_id: emp!.id,
      org_id: emp.org_id,
    })
    .execute()
  revalidatePath("/org/[orgSlug]/employee/[userName]/time-off", "page")

  return true
}
