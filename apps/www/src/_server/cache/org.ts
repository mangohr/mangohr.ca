import { SelectType } from "kysely"

import { AuthUser, OrgsList } from "@/types/db"

import { getOrCache, redis, redisKeys } from "."
import { db } from "../db"

export const getOrg = async (slug: SelectType<OrgsList["slug"]>) =>
  getOrCache({
    key: redisKeys.org.single(slug),
    cacheMissFn: async () =>
      await db
        .selectFrom("orgs.list")
        .selectAll()
        .where("slug", "=", slug)
        .executeTakeFirstOrThrow(),
    errorName: "Company not found!",
  })

export const getEmployee = async (
  org: SelectType<OrgsList["id"]>,
  username: SelectType<AuthUser["username"]>
) =>
  getOrCache({
    key: redisKeys.employee.single(org, username),
    cacheMissFn: async () =>
      await db
        .selectFrom("orgs.employee as e")
        .innerJoin("auth.user as u", "u.id", "e.user_id")
        .selectAll(["e"])
        .where("org_id", "=", org)
        .where("u.username", "=", username)
        .executeTakeFirst(),
    errorName: "Employee not found!",
  })
