import { employmentStatus } from "@/constants/employee"
import { z } from "zod"

export const bigintSchema = z
  .number()
  .int()
  .transform((t) => t.toString())

export const bigintStringSchema = z.coerce
  .number()
  .int()
  .transform((t) => t.toString())

export const dateSchema = z.coerce.date().transform((t) => t.toISOString())

export const orgSlugSchema = z.string()

export const columnFilterSchema = <
  T extends z.ZodObject<{
    id: z.ZodEnum<[string, ...string[]]> | z.ZodString
    value: any
  }>,
>(
  obj: T
) =>
  z.preprocess(
    (v) => (v ? JSON.parse(decodeURIComponent(v as any)) : undefined),
    z.array(obj).catch([])
  )

export const employmentStatusSchema = z.enum(employmentStatus)

export const sortingSchema = (
  ids: z.ZodEnum<[string, ...string[]]> | z.ZodString
) =>
  z.preprocess(
    (v) => (v ? JSON.parse(decodeURIComponent(v as any)) : undefined),
    z.array(z.object({ id: ids, desc: z.boolean() })).catch([])
  )

export const listQueryStateSchema = <
  T extends z.ZodObject<{
    id: z.ZodEnum<[string, ...string[]]> | z.ZodString
    value: any
  }>,
>({
  sortIds,
  filterObj,
}: {
  sortIds: z.ZodEnum<[string, ...string[]]> | z.ZodString
  filterObj: T
}) =>
  z.object({
    search: z.string().optional().catch(undefined),
    filters: columnFilterSchema(filterObj),
    sort: sortingSchema(sortIds),
    page: z.coerce.number().int().min(0).catch(0),
    limit: z.coerce.number().int().min(0).max(100).catch(100),
  })
