import { hasPermission } from "@/iam"
import { z } from "zod"

import {
  dateSchema,
  employmentStatusSchema,
  listQueryStateSchema,
} from "./default"

const personalSchema = z.object({
  first_name: z.string().min(1),
  middle_name: z.string(),
  last_name: z.string().min(1),
  gender: z.string(),
  date_of_birth: dateSchema.optional(),
  work_email: z.string(),
  phone: z.string(),
  marital_status: z.string(),
  address: z.object({
    line1: z.string(),
    line2: z.string(),
    city: z.string(),
    state: z.string(),
    zip_code: z.string(),
    country: z.string(),
  }),
  emergency_contacts: z.array(
    z.object({
      name: z.string(),
      phone: z.string(),
      relation: z.string(),
    })
  ),
})

const currentJobSchema = z.object({
  start_date: dateSchema,
  title: z.string(),
  type: employmentStatusSchema,
  reports_to: z.string().optional(),
})

const roleSchema = z.object({
  roles: z.array(z.string()),
})

const inviteSchema = z.object({
  general: z.object({
    first_name: personalSchema.shape.first_name,
    middle_name: personalSchema.shape.middle_name,
    last_name: personalSchema.shape.last_name,
    email: z.string().email().min(1),
    job: currentJobSchema,
    action: z.enum(["create", "invite"]),
  }),
  personal: personalSchema.optional(),
})

const attendanceSchema = z.object({
  date: dateSchema,
})

const employeeListSchema = listQueryStateSchema

const employeeSchema = {
  list: {
    read: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "employeeList", "view"),
      validate: employeeListSchema({
        sortIds: z.enum(["id"]),
        filterObj: z.object({ id: z.enum(["id"]), value: z.string() }),
      }),
    },
  },
  invite: {
    read: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "employeeInvite", "view"),
      validate: null,
    },
    create: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "employeeInvite", "create"),
      validate: inviteSchema,
    },
    delete: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "employeeInvite", "delete"),
      validate: null,
    },
  },

  general: {
    get: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "employeePersonal", "view"),
      validate: null,
    },
    edit: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "employeePersonal", "update"),
      validate: personalSchema,
    },
  },
  currentJob: {
    read: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "employeeJob", "view"),
      validate: null,
    },
    create: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "employeeJob", "create"),
      validate: currentJobSchema,
    },
  },
  role: {
    read: {
      validate: null,
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "employeeRole", "view"),
    },
    edit: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "employeeRole", "update"),
      validate: roleSchema,
    },
  },
  attendance: {
    create: {
      permission: (orgSlug: string) =>
        hasPermission(orgSlug, "attendance", "create"),
      validate: attendanceSchema,
    },
  },
}

export default employeeSchema

// export const EmploymentFromSchema = z.object({
//   hire_date: z.string(),
//   tenure: z.string(),
//   position: z.string(),
// });

// export const CompensationFormSchema = z.object({
//   compensations: z.array(
//     z.object({
//       date: z.string(),
//       job_title: z.string(),
//       type: z.string(),
//       duration: z.object({
//         value: z.number(),
//         type: z.string(),
//       }),
//       amount: z.object({
//         value: z.number(),
//         type: z.string(),
//       }),
//     })
//   ),
// });

// export const ContractTimelineFormSchema = z.object({
//   contract_timelines: z.array(
//     z.object({
//       id: z.string(),
//       name: z.string(),
//       start_date: z.string(),
//       end_date: z.string(),
//     })
//   ),
// });

// export const JobHistoryFormSchema = z.object({
//   job_history: z.array(
//     z.object({
//       start_date: z.string(),
//       end_date: z.string(),
//       content: z.string(),
//     })
//   ),
// })

// export const CompanyInfoFormSchema = z.object({
//   offices: z.string(),
//   tenure: z.string(),
//   position: z.string(),
// });
