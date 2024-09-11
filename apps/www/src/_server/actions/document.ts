"use server"

import { headers } from "next/headers"
import { allowedDocumentTypes } from "@/constants/storage"
import { orgSlugSchema } from "@/schema/default"
import documentSchema from "@/schema/document"
import { Expression, sql, SqlBool } from "kysely"
import { z } from "zod"

import { getEmployee } from "../cache/org"
import { db } from "../db"
import { hasPerm } from "../helpers/hasPerm"
import { getDownloadUrl, getPresignedUrl } from "../helpers/s3"

export const getAllDocuments = async (props: { searchParams: unknown }) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))
  const parsed = documentSchema.list.read.validate.parse(props.searchParams)
  const { org } = await hasPerm({ orgSlug })
  const query = db
    .selectFrom("orgs.storage")
    .select([
      "id",
      "location",
      "name",
      "size",
      "type",
      "employee_id",
      "uploaded_by",
      "uploaded_at",
      "created_at",
    ])
    .where((eb) => {
      const filters: Expression<SqlBool>[] = []
      filters.push(eb("org_id", "=", org!.id))

      if (parsed.search) {
        const searchConditions = [eb("name", "ilike", `%${parsed.search!}%`)]

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
    query.orderBy(["created_at desc"])
  }

  const result = await query
    .limit(parsed.limit)
    .offset(parsed.page * parsed.limit)
    .execute()

  return { items: result, hasMore: result.length === parsed.limit }
}

export const documentUpload = async (data: {
  id: string
  filename: string
  contentType: string
  contentLength: number
  employeeUsername: string
}) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))

  const { id, filename, contentLength, contentType, employeeUsername } = z
    .object({
      id: z.string().uuid(),
      employeeUsername: z.string(),
      filename: z.string().min(1).max(255),
      contentLength: z.number().int(),
      contentType: z
        .string()
        .refine((val) => allowedDocumentTypes.includes(val), {
          message: "Invalid document type",
        }),
    })
    .parse(data)

  const { session, org } = await hasPerm({ orgSlug })

  let emp

  if (employeeUsername === session.user.username) {
    emp = session.employee
  } else {
    emp = await getEmployee(org!.id, employeeUsername)
  }

  const result = await db.transaction().execute(async (trx) => {
    const key = `orgs/${org!.id}/${emp!.id}/${id}.${filename.split(".").pop()}`

    const presigned = await getPresignedUrl({
      contentLength,
      contentType,
      key,
    })

    const url = new URL(presigned)
    await trx
      .insertInto("orgs.storage")
      .values({
        id,
        name: filename,
        type: contentType,
        size: contentLength,
        org_id: org!.id,
        employee_id: emp?.id,
        uploaded_by: session.user.id,
        location: `https://${url.host}/${key}`,
      })
      .execute()

    return presigned
  })

  return result
}

export const onDocumentUploadSuccess = async (data: { id: string }) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))

  const { id } = z
    .object({
      id: z.string().uuid(),
    })
    .parse(data)
  const { session, org } = await hasPerm({ orgSlug })

  const result = await db
    .updateTable("orgs.storage")
    .where("org_id", "=", org!.id)
    .where("uploaded_by", "=", session.user.id)
    .where("id", "=", id)
    .set({
      uploaded_at: sql`now()`,
    })
    .execute()
  return true
}

export const onDocumentUploadRemove = async (data: { id: string }) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))

  const { id } = z
    .object({
      id: z.string().uuid(),
    })
    .parse(data)
  const { session, org } = await hasPerm({ orgSlug })

  await db
    .deleteFrom("orgs.storage")
    .where("org_id", "=", org!.id)
    .where("uploaded_by", "=", session.user.id)
    .where("id", "=", id)
    .execute()
  return id
}

export const getDocumentDownloadUrl = async (data: { path: string }) => {
  const orgSlug = orgSlugSchema.parse(headers().get("x-org"))

  const { path } = z
    .object({
      path: z.string(),
    })
    .parse(data)

  await hasPerm({ orgSlug })

  const url = new URL(path)

  return await getDownloadUrl(url.pathname.substring(1))
}
