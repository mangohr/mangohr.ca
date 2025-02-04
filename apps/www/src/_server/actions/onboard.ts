"use server"

import { redirect, RedirectType } from "next/navigation"
import { env } from "@/env"
import { userSchema } from "@/schema/user"
import { z } from "zod"

import { sendEmail } from "../mailer/send"

export const onboardAction = async (
  formData: z.infer<typeof userSchema.onboard.create.validate>
) => {
  console.log(formData)
  const { general, other } = userSchema.onboard.create.validate.parse(formData)
  const { session } = await userSchema.onboard.create.permission()

  //   await db
  //     .insertInto("orgs.onboarding")
  //     .values({ ...general, ...other, id: session.user.id })
  //     .execute()

  console.log(env.NOTIFY_EMAILS)

  await sendEmail({
    subject: "New User Onboarded",
    emails: env.NOTIFY_EMAILS,
    html: `<p>
    <b>User Information</b><br/>
    Name: ${session.user.name}<br/>
    Email: ${session.user.email}<br/><br/>
    <b>Onboarding Details</b><br/>
    <pre style="font-family: monospace; background: #f4f4f4; padding: 10px; border-radius: 5px;">${JSON.stringify({ id: session.user.id, ...general, ...other }, null, 2)}</pre>
    </p>`,
  })

  return redirect("/org", RedirectType.replace)
}
