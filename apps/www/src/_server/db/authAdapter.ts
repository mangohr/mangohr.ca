import {
  isDate,
  type Adapter,
  type AdapterAccount,
  type AdapterSession,
  type AdapterUser,
  type VerificationToken,
} from "@auth/core/adapters"
import { Kysely, SqliteAdapter, Transaction } from "kysely"

import { DB } from "@/types/db"
import { idGenerate } from "@/lib/idGenerate"

import { db as database } from "."

// import { cache } from "react";

export interface Database {
  User: AdapterUser
  Account: AdapterAccount
  Session: AdapterSession
  VerificationToken: VerificationToken
}

export const format = {
  from<T>(object?: Record<string, any>): T {
    const newObject: Record<string, unknown> = {}
    for (const key in object) {
      const value = object[key]
      if (isDate(value)) newObject[key] = new Date(value)
      else newObject[key] = value
    }
    return newObject as T
  },
  to<T>(object: Record<string, any>): T {
    const newObject: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(object))
      newObject[key] = value instanceof Date ? value.toISOString() : value
    return newObject as T
  },
}

export const createUser = async (
  user: AdapterUser,
  db: Transaction<DB> | Kysely<DB>
) => {
  const username = user.email.split("@")[0]

  const result = await db
    .insertInto("auth.user")
    .values(format.to({ ...user, id: undefined, username }))
    .onConflict((oc) =>
      oc.column("username").doUpdateSet({
        username: idGenerate({ prefix: username, length: 10 }),
      })
    )
    .returning(["id"])
    .executeTakeFirstOrThrow()
  user.id = result.id
  return { ...user, username }
}

export function KyselyAdapter(trx?: Transaction<DB>): Adapter {
  const db = trx ? trx : database
  const { adapter } = db.getExecutor()
  const { supportsReturning } = adapter
  const isSqlite = adapter instanceof SqliteAdapter
  /** If the database is SQLite, turn dates into an ISO string  */
  const to = isSqlite ? format.to : <T>(x: T) => x as T
  /** If the database is SQLite, turn ISO strings into dates */
  const from = isSqlite ? format.from : <T>(x: T) => x as T

  return {
    createUser: async (user: AdapterUser) => {
      return createUser(user, db)
    },
    getUser: async (id: string) => {
      const result = await db
        .selectFrom("auth.user")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst()
      if (!result) return null

      return from(result)
    },
    getUserByEmail: async (email: string) => {
      const result = await db
        .selectFrom("auth.user")
        .selectAll()
        .where("email", "=", email)
        .executeTakeFirst()
      if (!result) return null
      return from(result)
    },
    getUserByAccount: async ({
      providerAccountId,
      provider,
    }: Pick<AdapterAccount, "provider" | "providerAccountId">) => {
      const result = await db
        .selectFrom("auth.user")
        .innerJoin("auth.account", "auth.user.id", "auth.account.userId")
        .selectAll("auth.user")
        .where("auth.account.providerAccountId", "=", providerAccountId)
        .where("auth.account.provider", "=", provider)
        .executeTakeFirst()
      if (!result) return null

      return from(result)
    },
    async updateUser({ id, ...user }) {
      const userData = to(user)
      const query = db
        .updateTable("auth.user")
        .set(userData)
        .where("id", "=", id)
      const result = supportsReturning
        ? query.returningAll().executeTakeFirstOrThrow()
        : query
            .executeTakeFirstOrThrow()
            .then(() =>
              db
                .selectFrom("auth.user")
                .selectAll()
                .where("id", "=", id)
                .executeTakeFirstOrThrow()
            )
      return from(await result)
    },
    async deleteUser(userId) {
      await db
        .deleteFrom("auth.user")
        .where("auth.user.id", "=", userId)
        .executeTakeFirst()
    },
    async linkAccount(account) {
      await db
        .insertInto("auth.account")
        .values(to(account))
        .executeTakeFirstOrThrow()
      return account
    },
    async unlinkAccount({ providerAccountId, provider }) {
      await db
        .deleteFrom("auth.account")
        .where("auth.account.providerAccountId", "=", providerAccountId)
        .where("auth.account.provider", "=", provider)
        .executeTakeFirstOrThrow()
    },
    async createSession(session) {
      await db.insertInto("auth.session").values(to(session)).execute()
      return session
    },
    async getSessionAndUser(sessionToken) {
      const result = await db
        .selectFrom("auth.session")
        .innerJoin("auth.user", "auth.user.id", "auth.session.userId")
        .selectAll("auth.user")
        .select(["auth.session.expires", "auth.session.userId"])
        .where("auth.session.sessionToken", "=", sessionToken)
        .executeTakeFirst()
      if (!result) return null
      const { userId, expires, ...user } = result
      const session = { sessionToken, userId, expires }
      return { user: from(user), session: from(session) }
    },
    async updateSession(session) {
      const sessionData = to(session)
      const query = db
        .updateTable("auth.session")
        .set(sessionData)
        .where("auth.session.sessionToken", "=", session.sessionToken)

      const result = supportsReturning
        ? await query.returningAll().executeTakeFirstOrThrow()
        : await query.executeTakeFirstOrThrow().then(async () => {
            return await db
              .selectFrom("auth.session")
              .selectAll()
              .where("auth.session.sessionToken", "=", sessionData.sessionToken)
              .executeTakeFirstOrThrow()
          })
      return from(result)
    },
    async deleteSession(sessionToken) {
      await db
        .deleteFrom("auth.session")
        .where("auth.session.sessionToken", "=", sessionToken)
        .executeTakeFirstOrThrow()
    },
    async createVerificationToken(data) {
      await db.insertInto("auth.verification_token").values(to(data)).execute()
      return data
    },
    async useVerificationToken({ identifier, token }) {
      const query = db
        .deleteFrom("auth.verification_token")
        .where("auth.verification_token.token", "=", token)
        .where("auth.verification_token.identifier", "=", identifier)

      const result = supportsReturning
        ? await query.returningAll().executeTakeFirst()
        : await db
            .selectFrom("auth.verification_token")
            .selectAll()
            .where("token", "=", token)
            .executeTakeFirst()
            .then(async (res) => {
              await query.executeTakeFirst()
              return res
            })
      if (!result) return null
      return from(result)
    },
  }
}

/**
 * Wrapper over the original `Kysely` class in order to validate the passed in
 * database interface. A regular Kysely instance may also be used, but wrapping
 * it ensures the database interface implements the fields that Auth.js
 * requires. When used with `kysely-codegen`, the `Codegen` type can be passed as
 * the second generic argument. The generated types will be used, and
 * `KyselyAuth` will only verify that the correct fields exist.
 */
export class KyselyAuth<DB extends T, T = Database> extends Kysely<DB> {}

export type Codegen = {
  [K in keyof Database]: { [J in keyof Database[K]]: unknown }
}
