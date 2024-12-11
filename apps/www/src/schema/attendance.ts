import { hasPermission } from "@/iam"
import { z } from "zod"

import { dateSchema, listQueryStateSchema } from "./default"

const attendanceSchema = {
  list: {
    read: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "attendanceList", "view"),
      validate: listQueryStateSchema({
        sortIds: z.enum(["id"]),
        filterObj: z.object({ id: z.enum(["id"]), value: z.string() }),
      }),
    },
  },
  read: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "attendance", "view"),
    validate: null,
  },
  update: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "attendance", "update"),
    validate: z
      .object({
        id: z.string().min(1),
        employee: z.string().min(1),
        login: dateSchema,
        logout: dateSchema,
      })
      .refine((data) => data.login < data.logout, {
        message: "Login date must not be greater than logout date",
        path: ["login"], // specify the path for the error
      }),
  },
  delete: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "attendance", "delete"),
    validate: z.object({ id: z.string().min(1) }),
  },
  add: {
    permission: (orgSlug: string) =>
      hasPermission(orgSlug, "attendance", "create"),
    validate: z
      .object({
        employee: z.string().min(1),
        login: dateSchema,
        logout: dateSchema,
      })
      .refine((data) => data.login < data.logout, {
        message: "Login date must not be greater than logout date",
        path: ["login"], // specify the path for the error
      }),
  },
}

export default attendanceSchema
