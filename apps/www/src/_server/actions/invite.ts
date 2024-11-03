"use server"

import { headers } from "next/headers"
import { redirect, RedirectType } from "next/navigation"
import { db } from "@/_server/db"
import { hasPerm } from "@/_server/helpers/hasPerm"
import { env } from "@/env"
import employeeSchema from "@/schema/employee"
import { newEmployeeEmailRenderer } from "@mhr/mails/emails"
import { sql } from "kysely"
import { z } from "zod"

import { getEmployee } from "../cache/org"
import { createUser } from "../db/authAdapter"
import { sendEmail } from "../mailer/send"

export const inviteEmployeeAction = async (data: string) => {
  const parsed = employeeSchema.invite.create.validate.parse(data)
  const orgSlug = z.string().parse(headers().get("x-org"))
  const { org, session } = await hasPerm({ orgSlug })

  if (session.user.email === parsed.general.email)
    throw Error("You cannot invite yourself.")

  const oldEmp = await db
    .selectFrom("orgs.employee as e")
    .select(["e.id"])
    .leftJoin("auth.user as u", "u.id", "e.user_id")
    .where("org_id", "=", org!.id)
    .where("u.email", "=", parsed.general.email)
    .executeTakeFirst()

  if (oldEmp) throw Error("Employee already exist.")

  let reports_to_emp_id = undefined

  if (parsed.general.job.reports_to) {
    const reportingEmp = await getEmployee(
      org!.id,
      parsed.general.job.reports_to
    ).catch((err) => {
      throw new Error("Reporting employee not found!")
    })

    reports_to_emp_id = reportingEmp.id
  }

  const result = await db.transaction().execute(async (trx) => {
    let user = await trx
      .selectFrom("auth.user")
      .select(["username", "id", "email", "emailVerified", "name", "image"])
      .executeTakeFirst()

    if (!user) {
      user = (await createUser(
        {
          id: "",
          name: `${parsed.general.first_name} ${parsed.general.last_name}`.trim(),
          email: parsed.general.email,
          emailVerified: null,
        },
        trx
      )) as any
    }

    if (!user) {
      throw new Error("Failed to create user!")
    }

    const emp = await trx
      .insertInto("orgs.employee")
      .values({
        org_id: org!.id,
        user_id: user.id,
        role: "employee",
        first_name: parsed.general.first_name,
        last_name: parsed.general.last_name,
        middle_name: parsed.general.middle_name,
        work_email: parsed.general.email,
        address: {},
        emergency_contacts: [],
      })
      .returningAll()
      .executeTakeFirst()

    if (!emp) throw Error("Failed to create employee")

    const job = await trx
      .insertInto("orgs.job")
      .values({
        title: parsed.general.job.title,
        type: parsed.general.job.type,
        start_date: sql`now()`,
        reports_to: reports_to_emp_id,
        employee_id: emp.id,
        org_id: emp.org_id,
      })
      .returning("id")
      .executeTakeFirstOrThrow()

    await trx
      .updateTable("orgs.employee")
      .set({ current_job: job.id })
      .execute()
    return { emp, job, user }
  })

  try {
    const { subject, text, html } = newEmployeeEmailRenderer({
      email: result.user.email,
      company: {
        name: org?.name || "Unknown Company",
      },
      invitee: {
        name:
          (
            session.employee?.first_name +
            " " +
            session.employee?.last_name
          ).trim() || "Unknown Employee",
      },
      employee: {
        name:
          (
            result.emp?.first_name +
            " " +
            result.emp?.middle_name +
            " " +
            result.emp?.last_name
          ).trim() || "Unknown Employee",
      },
      link: `${env.WWW_URL}/org/${org?.slug}/employee/${result.user.username}`,
    })
    await sendEmail({
      subject,
      text,
      html,
      emails: [result.user.email],
    })
  } catch (err) {
    console.log("failed to send new email to new employee")
  }

  return redirect(`employee/${result.user.username}`, RedirectType.replace)
}
