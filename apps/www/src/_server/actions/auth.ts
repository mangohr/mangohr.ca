"use server"

import { db } from "@/_server/db"
import { auth, signIn, signOut } from "@/auth"
import { sql } from "kysely"
import { jsonBuildObject } from "kysely/helpers/postgres"
import { z } from "zod"

const redirectTo = "/org"
export async function googleSignIn() {
  await signIn("google", { redirectTo })
}

export async function logout() {
  return await signOut({ redirectTo: "/" })
}

export async function getSession() {
  return await auth()
}

export async function signInWithEmail(data: { email: string }) {
  const { email } = z.object({ email: z.string().email() }).parse(data)
  return await signIn("magic-link", {
    email,
    redirectTo,
  })
}

export async function getUserByEmail() {
  const session = await auth()
  if (!session?.user?.email) return null

  const result = await db
    .selectFrom("auth.user")
    .leftJoin("auth.account", "auth.account.userId", "auth.user.id")
    .select(({ fn, ref }) => [
      "auth.user.id",
      "auth.user.email",
      "auth.user.name",
      "auth.user.emailVerified",
      "auth.user.created_at",
      fn
        .coalesce(
          fn.jsonAgg(
            jsonBuildObject({
              name: ref("auth.account.provider"),
            })
          ),
          sql`'[]'`
        )
        .as("providers"),
    ])
    .where("email", "=", session.user.email)
    .groupBy("auth.user.id")
    .executeTakeFirst()
  if (!result) return null

  return result
}
