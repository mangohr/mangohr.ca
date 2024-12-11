import { timeOffStatus } from "@/constants/employee"
import { hasPermission } from "@/iam"
import { z } from "zod"

import { bigintStringSchema, dateSchema, listQueryStateSchema } from "./default"

const requestSchema = z.object({
  request_reason: z.string().min(1),
  start_date: dateSchema,
  cost: z.coerce
    .number()
    .min(0.5, { message: "It should be atleast half day (0.5)" }),
  type: z.string(),
})

const approveSchema = z.object({
  employee: z.string().min(1),
  request: bigintStringSchema,
  action: z.enum(["approved", "rejected"]),
  message: z.string().min(1),
})

const createSchema = {
  ...requestSchema.shape,
  employee: z.string().min(1),
  status: z.enum(timeOffStatus),
}

const chartSchema = z
  .object({
    start: dateSchema,
    end: dateSchema,
  })
  .refine((data) => data.start < data.end, {
    message: '"start" date must not be greater than "end" date',
    path: ["start"], // specify the path for the error
  })

export const timeoffSchema = {
  list: {
    read: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "timeoff", "view"),
      validate: listQueryStateSchema({
        sortIds: z.enum(["id"]),
        filterObj: z.object({ id: z.enum(["id"]), value: z.string() }),
      }),
    },
    chart: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "timeoff", "view"),
      validate: chartSchema,
    },
  },
  request: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "timeoff", "create"),
    validate: requestSchema,
  },
  approve: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "timeoff", "update"),
    validate: approveSchema,
  },
  create: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "timeoff", "create"),
    validate: z.object(createSchema),
  },
}
