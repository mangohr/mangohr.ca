import "server-only"

import Redis from "ioredis"
import { SelectType } from "kysely"

import { AuthUser, OrgsList } from "@/types/db"

export const redis = new Redis(process.env.REDIS_URL!)

export const redisKeys = {
  org: {
    single: (val: SelectType<OrgsList["id"]>) => `org:${val}`,
  },
  employee: {
    single: (
      org: SelectType<OrgsList["id"]>,
      user: SelectType<AuthUser["username"]>
    ) => `employee:${org}:${user}`,
  },
}

type CacheMissFn<T> = () => Promise<T>

export const getOrCache = async <T>({
  key,
  cacheMissFn,
  errorName,
}: {
  key: string
  cacheMissFn: CacheMissFn<T>
  errorName: string
}) => {
  const cache = await redis.get(key)

  const getFromDB = async () => {
    const result = await cacheMissFn()

    result && (await redis.set(key, JSON.stringify(result), "EX", 60 * 15))
    return result
  }
  const result = cache
    ? (JSON.parse(cache) as Awaited<ReturnType<typeof getFromDB>>)
    : await getFromDB()

  if (!result) {
    throw Error(errorName)
  }
  return result
}

export const delCache = async (key: string) => {
  await redis.del(key)
}
